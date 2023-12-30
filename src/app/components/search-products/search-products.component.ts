import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/category1';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent {
  searchKey:string="";
products:Product[]=[]
  productName1:string=""
  constructor(private activate:ActivatedRoute,private product:ProductsService,private router:Router,
    private filter:FilterService,){
    this.activate.params.subscribe((res:any)=>{
    
    this.productName1=res.productName
    
  })
  // console.log("the search product name"+JSON.stringify(this.productName));
  this.getProduct(this.productName1)
    }


  getProduct(productName:string){
    
      }


      ngOnInit(): void {
       
this.product.search.subscribe((res)=>{
  this.searchKey=res
})





        this.product.getProduct().subscribe((res)=>{
          this.products=res
          // .filter((item)=>{
          // item.productName.toLowerCase().includes((this.productName).toLowerCase())
          // })
          console.log("the search products"+JSON.stringify(this.products));
          
          })
      }






      seeMore(categoryId:number){
        this.router.navigate(['cakes',categoryId])
        
       }
      
}
