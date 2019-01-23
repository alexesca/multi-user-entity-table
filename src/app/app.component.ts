import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'app';
  tableForm: FormGroup;
  owner: string;
  middleEntity: string;
  salesRep: string;

  entityList = [
    {
      firstName: '',
      lastName: '',
      name: 'Jeremy Bosco',
      email: 'j@gmail.com',
      phoneNumber: '890-456-6433',
      state: 'UT',
      zipCode: '78978',
      street: '489 north avenue',
      city: 'Provo',
      id: '7392817389273982323213',
    },
    {
      firstName: '',
      lastName: '',
      name: 'JJ Sanchez',
      email: 'js@gmail.com',
      phoneNumber: '900-456-6433',
      state: 'UT',
      zipCode: '78978',
      street: '489 north avenue',
      city: 'Provo',
      id: '7392817389273982323213',
    }
  ]

  salesRepList = [
    {
      firstName: '',
      lastName: '',
      name: 'Kevin Dunno',
      email: 'j@gmail.com',
      phoneNumber: '890-456-6433',
      state: 'UT',
      zipCode: '78978',
      street: '489 north avenue',
      city: 'Provo',
      id: '7392817389273982323213',
    },
    {
      firstName: '',
      lastName: '',
      name: 'Mike Pikes',
      email: 'js@gmail.com',
      phoneNumber: '900-456-6433',
      state: 'UT',
      zipCode: '78978',
      street: '489 north avenue',
      city: 'Provo',
      id: '7392817389273982323213',
    }
  ]

  constructor(private fb: FormBuilder) {
    // Setting up OwnerForm the form for the tableForm
    const ownerForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      city: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      zipCode: ['', [
        Validators.required
      ]],
      street: ['', [
        Validators.required
      ]]
    });

    // Setting up StoreForm for the tableForm
    const storeForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      city: ['', [
        Validators.required
      ]],
      state: ['', [
        Validators.required
      ]],
      zipCode: ['', [
        Validators.required
      ]],
      street: ['', [
        Validators.required
      ]]
    });

    // Setting up sales rep for the form
    const salesRepForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
    });

    // Setting up the TableForm with OwnerForm and StoreForm
    this.tableForm = this.fb.group({
      owner: ownerForm,
      middleEntity: storeForm,
      salesRep: salesRepForm
    });

  }


  // On update owner
  onUpdateOwner(info: any) {
    this.owner = info;
  }

  // On update store/subcontractor
  onUpdateMiddleEntity(info: any) {
    this.middleEntity = info;
  }

  // On update rep
  onUpdateSalesRep(info: any) {
    this.salesRep = info;
  }
}
