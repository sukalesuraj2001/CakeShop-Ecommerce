import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [

  // lazy loading for user module start
  {path:'user',loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)},
  // lazy loading for user module end

  {path:"", component:HomeComponent},
  {path:"cart", component:CartComponent},
  {path:"profile", component:ProfileComponent},
  {path:"cakes/:categoryId", component:ProductsComponent},
  {path:"productdetails/:id",component:ProductdetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
