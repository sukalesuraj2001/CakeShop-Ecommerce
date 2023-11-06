import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ChartModule } from 'angular-highcharts';
import { TotalProductsComponent } from './total-products/total-products.component';
import { SellerOrderComponent } from './seller-order/seller-order.component';
import { CustomersComponent } from './customers/customers.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    AddProductsComponent,
    TotalProductsComponent,
    SellerOrderComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
  ]
})
export class SellerModule { }
