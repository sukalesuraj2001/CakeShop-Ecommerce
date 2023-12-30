import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { TotalProductsComponent } from './total-products/total-products.component';
import { SellerOrderComponent } from './seller-order/seller-order.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {path:"sellerlogin",component:LoginComponent,title: 'SweetCakes | SllerLogin'},
  {path:"sellerhome",component:HomeComponent,title: 'SweetCakes | SellerHome'},
  {path:"addproduct",component:AddProductsComponent,title: 'SweetCakes | AddProduct'},
  {path:"totalproduct",component:TotalProductsComponent,title: 'SweetCakes | TotalProduct'},
  {path:"sellerorder",component:SellerOrderComponent,title: 'SweetCakes | Order'},
  {path:"customers",component:CustomersComponent,title: 'SweetCakes | TotalCustomers'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
