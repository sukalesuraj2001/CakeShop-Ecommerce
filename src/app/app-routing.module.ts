import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [

  // // lazy loading for user module start
  {path:'user',loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)},
  // // lazy loading for user module end
  //   // lazy loading for seller module start
    {path:'seller',loadChildren:()=>import('./seller/seller.module').then(mod=>mod.SellerModule)},
    // lazy loading for seller module end

  {path:"", component:HomeComponent},
  {path:"order", component:OrderComponent,title: 'SweetCakes | Order'},
  {path:"cart", component:CartComponent,title: 'SweetCakes | Cart'},
  {path:"profile", component:ProfileComponent,title: 'SweetCakes | Profile'},
  {path:"cakes/:categoryId", component:ProductsComponent,title: 'SweetCakes | Products'},
  {path:"cakes", component:ProductsComponent,title: 'SweetCakes | Products'},
  {path:"search", component:SearchProductsComponent,title: 'SweetCakes |Search Products'},
  {path:"productdetails/:id",component:ProductdetailsComponent,title: 'SweetCakes | ProductsDetails'},
  {path:"productdetails",component:ProductdetailsComponent,title: 'SweetCakes | ProductsDetails'},
  {path:"about",component:ContactComponent,title: 'SweetCakes | Contact'},
  {path:"**",component:PagenotfoundComponent,title: 'SweetCakes | Not Found'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
