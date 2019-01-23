import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobMetadataTableComponent } from './job-metadata-table.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { Entity} from '../../models/entity/entity.model';
import {EntityGenerator} from '../../../features/work-order/utils/class-ToReplaceLater/class/entity/entityGenerator';
import { SalesRep } from './../../../features/work-order/utils/class-ToReplaceLater/sales-reps/sales-rep.model';
import { FormBuilder } from '@angular/forms';

describe('JobMetadataTableComponent', () => {
  let component: JobMetadataTableComponent;
  let fixture: ComponentFixture<JobMetadataTableComponent>;
  let theHtml: HTMLElement;
  const generalVal = new SalesRep( {
      _id: '5a4c052e62dfaaabc086d13c',
      firstName: 'Kevin',
      middleName: 'miguel',
      lastName: 'Smith',
      address: {
          address: '4000 N canyon',
          countryCode: '45',
          city: 'Provo',
          state: 'UT',
          country: 'Colombia'
      },
      email: 'kevinemail@gmail.com',
      phoneNumber: '801-190-4535',
      __v: 0
  });
  const entityList: Array<any> = [
      new EntityGenerator(generalVal, 'REP').getEntity(),
      new EntityGenerator( generalVal, 'REP').getEntity(),
      new EntityGenerator( generalVal, 'REP').getEntity()
  ];

    function updateStore() {
        component.tableForm.get('store').get('email').setValue('lele@gmail.com');
        component.tableForm.get('store').get('phoneNumber').setValue('801-545-6433');
        component.tableForm.get('store').get('name').setValue('Aztec');
        component.tableForm.get('store').get('address').get('street').setValue('louisville 874 Rd');
        component.tableForm.get('store').get('address').get('state').setValue('UT');
        component.tableForm.get('store').get('address').get('zipCode').setValue('78231');
        component.tableForm.get('store').get('address').get('city').setValue('Provo');
        fixture.detectChanges();
        // comp.loginForm.controls['password'].setValue(userPassword);
    }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobMetadataTableComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
          FormBuilder
      ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobMetadataTableComponent);
    component = fixture.componentInstance;
    component.owner = entityList[0];
    component.selectedSalesRep = entityList[0];
    component.selectedStore = entityList[1];
    component.storeList = entityList;
    component.salesReps = entityList;
    // component.storeId = entityList[0].id;
    // component.salesRepId = entityList[0].id;
    component.ngOnChanges();
    theHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  describe('General test', () => {
      it('should create', () => {
          expect(component).toBeTruthy();
      });

      it('Should contain the table', () => {
          expect(theHtml.querySelector('table')).not.toBe(null);
      });
  });

  describe('Columns specification test', () => {
        it('Should not contain Owner', () => {
            component.ownerCol = false;
            fixture.detectChanges();
            expect(theHtml.textContent).not.toContain('OWNER');
        });

        it('Should not contain SalesRep', () => {
            component.saleReCol = false;
            fixture.detectChanges();
            expect(theHtml.textContent).not.toContain('SALES REP');
        });

        it('Should not contain Store', () => {
            component.subStoreCol = false;
            fixture.detectChanges();
            expect(theHtml.textContent).not.toContain('STORE');
        });
  });

  describe('Check if the variable have been updated properly', () => {
      it('Should update the owner$', () => {
          expect(component.owner).not.toEqual(undefined);
      });

      it('Should update the storeList', () => {
          expect(component.storeList).not.toEqual(undefined);
      });

      it('Should update the saleRepList', () => {
          expect(component.salesReps).not.toEqual(undefined);
      });

       it('Should keep Store as the default title table tableType', () => {
           expect(component.tableType).toEqual('STORE');
       });

       it('Should update properly the tableType variable', () => {
         component.tableType = 'SUBCONTRACTOR';
         expect(component.tableType).toEqual('SUBCONTRACTOR');
       });
  });

  describe('Check if the tableForm Has been set up properly', () => {
      it('TableForm should not be null', () => {
          expect(component.tableForm).not.toBe(null);
      });

      it('Check OwnerForm for update and invalidity ', () => {
          let ownerForm = component.tableForm.controls.owner.valid;
          expect(ownerForm).toBe(true);

          const before = component.tableForm.get('owner').get('email').value;
          component.tableForm.get('owner').get('email').setValue('lele@gmail.com');
          const after = component.tableForm.get('owner').get('email').value;
          expect(before).not.toBe(after);

          component.tableForm.get('owner').get('email').setValue('');
          ownerForm = component.tableForm.controls.owner.valid;
          expect(ownerForm).toBe(false);
      });

      it('Check StoreForm for update and invalidity', () => {
          let storeForm = component.tableForm.controls.store.valid;
          expect(storeForm).toBe(false);

          updateStore();
          storeForm = component.tableForm.controls.store.valid;
          expect(storeForm).toBe(true);

          const before = component.tableForm.get('store').get('email').value;
          component.tableForm.get('store').get('email').setValue('lele2@gmail.com');
          const after = component.tableForm.get('store').get('email').value;
          expect(before).not.toBe(after);

          // component.tableForm.get('store').get('email').setValue('');
          // storeForm = component.tableForm.controls.store.valid;
          // expect(storeForm).toBe(false);
      });

      it('Should check phoneNumber for owner', () => {
          component.tableForm.get('owner').get('phoneNumber').setValue('232');
          fixture.detectChanges();
          let ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('phoneNumber').setValue('2324358976');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('phoneNumber').setValue('nurirw');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('phoneNumber').setValue('803-456-432p');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('phoneNumber').setValue('803-456-4325');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(true);
      });

      it('Should check phoneNumber for store', () => {
          component.tableForm.get('store').get('phoneNumber').setValue('232');
          fixture.detectChanges();
          let ownerF = component.tableForm.controls.store.get('phoneNumber').valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('store').get('phoneNumber').setValue('2324358976');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.store.get('phoneNumber').valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('store').get('phoneNumber').setValue('nurirw');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.store.get('phoneNumber').valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('store').get('phoneNumber').setValue('803-456-432p');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.store.get('phoneNumber').valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('store').get('phoneNumber').setValue('803-456-4325');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.store.get('phoneNumber').valid;
          expect(ownerF).toBe(true);
      });

      it('Check email for Owner', () => {
          let ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(true);

          component.tableForm.get('owner').get('email').setValue('');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('email').setValue('uituiuifsfds');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);


          component.tableForm.get('owner').get('email').setValue('lele.gmail');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('email').setValue('lele@gmail.');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(false);

          component.tableForm.get('owner').get('email').setValue('lele@gmail.com');
          fixture.detectChanges();
          ownerF = component.tableForm.controls.owner.valid;
          expect(ownerF).toBe(true);
      })
  });
});
