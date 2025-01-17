import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerOrdersDataService } from '../services';
import { CustomerVm } from './customer-vm';

/**
 * Master/Detail following the Container/Presenter pattern.
 * Master: customer list of Customer ViewModels
 * Detail: detail about a selected Customer ViewModel
 */
@Component({
  selector: 'app-vm-container',
  styleUrls: ['./view-model.css'],
  template: `

  <button (click)="addCustomer()" class="btn btn-primary button-row">Add Customer</button>

  <!-- Bind to "showDeleted" as a checkbox and toggle it when changed -->
  <div (click)="toggleShowDeleted()"><input type="checkbox" [checked]="showDeleted"> Show Deleted</div>

  <div *ngIf="vms$ | async as vms" class="row">

    <!-- Customer List -->
    <div class="col-md-2">
      <app-vm-customer-list [vms]="vms" (selected)="selected($event)"></app-vm-customer-list>
    </div>

    <!-- Customer Detail -->
    <div class="col-md-5">
      <app-vm-customer-details [vm]="selectedVm" (cancel)="cancel()" (save)="save($event)"></app-vm-customer-details>
    </div>

  </div>

  `,
})
export class VmContainerComponent {

  vms$: Observable<CustomerVm[]>;
  selectedVm: CustomerVm;
  showDeleted: boolean;

  // Add "showDeleted" boolean property

  constructor(private dataService: CustomerOrdersDataService) {
    this.createVm$();
  }

  /** Create observable of Customer ViewModels from cached customers */
  createVm$() {
    this.vms$ = this.dataService.customers$.pipe(
      map(customers =>
        // Filter customers before mapping to include or exclude deleted customers based on showDeleted flag.
        customers
          .filter(customer => this.showDeleted || !customer.isDeleted)
          .map(customer => CustomerVm.create(customer))
      )
    );
  }

  addCustomer() {
    this.selectedVm = CustomerVm.create();
  }

  cancel() {
    this.selectedVm = null;
  }

  save(vm: CustomerVm) {
    this.selectedVm = null;
    const customer = vm.toCustomer();
    customer.id == null
      ? this.dataService.addCustomer(customer)
      : this.dataService.updateCustomer(customer);
  }

  selected(vm: CustomerVm) {
    this.selectedVm = vm.clone();
  }

  // The toggleShowDeleted method should (a) toggle the flag and (b) re-create the ViewModel observable
  toggleShowDeleted() {
    this.showDeleted = !this.showDeleted;
    this.createVm$();
  }
}
