import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Entity } from '..//models/entity/entity.model';
import { FormGroup } from '@angular/forms';
import { takeUntil, debounceTime } from 'rxjs/operators'
import { Subject } from 'rxjs';


@Component({
    selector: 'job-metadata-table',
    templateUrl: './job-metadata-table.component.html',
    styleUrls: ['./job-metadata-table.component.scss']
})
export class JobMetadataTableComponent implements OnInit, OnChanges {
    // ********************* Variables ***************************
    // the formController
    tableForm: FormGroup;
    // The list of the store/subcontractor$ and the salesRep$
    @Input() storeList: Array<Entity> = null; // use Array<Entity>
    @Input() salesReps: Array<Entity> = null; // use Array<Entity>


    // variable that control the title for the store/subcontractor$
    @Input() tableType = 'STORE';

    // Input to control the visibility of the columns
    @Input() ownerCol = true;
    @Input() subStoreCol = true;
    @Input() saleReCol = true;

    // The variable that control the select option for store/subcontractor$ and salesRep$
    @Input() selectedStore: Entity = null; // Entity
    @Input() selectedSalesRep: Entity = null; // Entity

    // The updated store and sales rep id to send back
    updatedStoreId = '';
    updatedSalesRepId = '';
    storeId: any = null;
    salesRepId: any = null;
    storeOther = false;

    // the Current value the object in the tables have
    currentStore: any = this.tableType;
    currentSalesRep: any = 'SALES REP';
    @Input() owner: Entity = null;
    @Input() ownerForm: FormGroup;
    @Input() middleEntityForm: FormGroup;
    @Input() salesRepForm: FormGroup;

    // Send back the updated ID's
    @Output() updatePurchaseOrderStoreId = new EventEmitter();
    @Output() updatePurchaseOrderSalesRepId = new EventEmitter();
    @Output() updateOwner = new EventEmitter();
    @Output() updateMiddleEntity = new EventEmitter();
    @Output() updateSalesRep = new EventEmitter();

    initialization = true;
    closeObservables$ = new Subject<any>();

    constructor() {



    }

    ngOnInit() {
        this.subscribeToOwnerForm$();
        this.subscribeToMiddleEntityForm$();
        this.subscribeToSalesRepForm$();
    }

    // Functions to get the Owner input Properties
    get emailOw() {
        if(this.ownerForm) {
            return this.ownerForm.get('email');
        }
    }

    get phoneNumberOw() {
        if(this.ownerForm) {
            return this.ownerForm.get('phoneNumber');
        }
    }

    get addrStreetOw() {
        if(this.ownerForm) {
            return this.ownerForm.get('street');
        }
    }

    get addrStateOw() {
        if(this.ownerForm) {
            return this.ownerForm.get('state');
        }
    }

    get addrCityOw() {
        if(this.ownerForm) {
            return this.ownerForm.get('city');
        }
    }

    get addrZipCodeOw() {
        if(this.ownerForm) {
            return this.ownerForm.get('zipCode');
        }
    }

    // Functions to get the State input Properties
    get emailSt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('email');
        }
    }

    get nameSt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('name');
        }
    }

    get phoneNumberSt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('phoneNumber');
        }
    }

    get addrStreetSt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('street');
        }
    }

    get addrStateSt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('state');
        }
    }

    get addrCitySt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('city');
        }
    }

    get addrZipCodeSt() {
        if (this.middleEntityForm) {
            return this.middleEntityForm.get('zipCode');
        }
    }

    ngOnChanges() {


        // Set the value for for the owner Form with the value of owner input
        if (this.owner && this.initialization) {
            // this.loadOwnerInput(); // load the value of the owner @input to the form
            this.initialization = false; // set Initialization to false after loading the info of owner
        }
        // set the current store
        if (this.selectedStore) {
            this.currentStore = this.selectedStore;
        }

        if (this.selectedSalesRep) {
            this.currentSalesRep = this.selectedSalesRep;
        }
        if (this.currentStore.id) {
            this.storeId = this.selectedStore.id;
        }
        if (this.selectedSalesRep) {
            this.salesRepId = this.selectedSalesRep.id;
        }
    }


    // Subscribe to owner form 
    subscribeToOwnerForm$() {
        if(!this.ownerForm) return;
        this.ownerForm.valueChanges
        .pipe(
            takeUntil(this.closeObservables$),
            debounceTime(500)
        )
        .subscribe(value => {
            this.updateOwner.next(value);
        })
    }

    // Subscribe to middle entity form 
    subscribeToMiddleEntityForm$() {
        if(!this.middleEntityForm) return;
        this.middleEntityForm.valueChanges
        .pipe(
            takeUntil(this.closeObservables$),
            debounceTime(500)
        )
        .subscribe(value => {
            this.updateMiddleEntity.next(value);
        })
    }

    // Subscribe to middle entity form 
    subscribeToSalesRepForm$() {
        if(!this.salesRepForm) return;
        this.salesRepForm.valueChanges
        .pipe(
            takeUntil(this.closeObservables$),
            debounceTime(500)
        )
        .subscribe(value => {
            this.updateSalesRep.next(value);
        })
    }

    // On the change of the selected store, update the 'ID' to the parent
    storeChange() {
        this.resetStore();
        if (this.currentStore.id) { // load info for Specific ID
            this.storeOther = false;
            this.updatedStoreId = this.currentStore.id;
            this.updatePurchaseOrderStoreId.emit({ storeId: this.updatedStoreId, store: this.currentStore });
        } else if (this.currentStore === 'other') { // Load the form instead
            this.storeOther = true;
        }

        this.currentStore = 'option' + (Math.random() * 10);
    }

    // Same for the sales rep...
    salesRepChange() {
        this.updatedSalesRepId = this.currentSalesRep.id;
        this.updatePurchaseOrderSalesRepId.emit({ saleRepId: this.updatedSalesRepId, salesRep: this.currentSalesRep });
        this.currentSalesRep = 'option' + (Math.random() * 10);
    }


    loadOwnerInput() {
        this.ownerForm.get('firstName').setValue(`${this.owner.firstName}`);
        this.ownerForm.get('lastName').setValue(`${this.owner.lastName}`);
        this.ownerForm.get('email').setValue(`${this.owner.email}`);
        this.ownerForm.get('phoneNumber').setValue(`${this.owner.phoneNumber}`);
        this.ownerForm.get('street').setValue(`${this.owner.street}`);
        this.ownerForm.get('city').setValue(`${this.owner.city}`);
        this.ownerForm.get('zipCode').setValue(`${this.owner.zipCode}`);
        this.ownerForm.get('state').setValue(`${this.owner.state}`);
    }

    resetStore() {
        this.tableForm.controls.store.markAsUntouched();
        this.tableForm.controls.store.reset();
    }


}
