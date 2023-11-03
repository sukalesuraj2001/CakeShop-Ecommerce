import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { TotalProductsComponent } from './total-products/total-products.component';

const routes: Routes = [
  {path:"sellerlogin",component:LoginComponent},
  {path:"sellerhome",component:HomeComponent},
  {path:"addproduct",component:AddProductsComponent},
  {path:"totalproduct",component:TotalProductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
