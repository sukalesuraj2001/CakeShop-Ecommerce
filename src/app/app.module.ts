import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component'
import { ToastrModule } from 'ngx-toastr';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductdetailsComponent,
    CartComponent,
    ProfileComponent,
    // WishlistComponent,
    OrderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   HttpClientModule,
   ToastrModule.forRoot(),
 
  
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
