import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/category1';
import { Order } from 'src/app/interfaces/order';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-total-products',
  templateUrl: './total-products.component.html',
  styleUrls: ['./total-products.component.css']
})
export class TotalProductsComponent {
  orders:Product[]=[];
  constructor(private product:ProductsService,private seller:SellerService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.product.getProduct().subscribe((res)=>{
      this.orders=res
    })
  }

  remove(data:Product){
   this.seller.removeProduct(data).subscribe((res)=>{
    alert("product remove successfully!")
   })
    
  }

}
