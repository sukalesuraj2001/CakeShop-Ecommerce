import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/category1';
import { ExploresService } from 'src/app/services/explores.service';
import { FilterService } from 'src/app/services/filter.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  categoryId:number=0
  products:Product[]=[]
  searchKey:string=""
  constructor(
    private activate: ActivatedRoute,
    private product: ProductsService,
    private router: Router,
    private filter: FilterService,
  ) {
    this.activate.paramMap.subscribe((params: ParamMap | null) => {
      if (params && params.has('categoryId')) {
        const categoryIdString = params.get('categoryId');
        this.categoryId = categoryIdString ? +categoryIdString : 0; // Use 0 as a default if categoryId is not a valid number
        console.log("the categoryId is" + this.categoryId);
        this.getProduct(this.categoryId);
      }
    });
  }
  
  




getProduct(categoryId:number){
this.product.getCategoryName(this.categoryId).subscribe((res)=>{
this.products=res
})
}


// ngOnInit(): void {
//   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//   //Add 'implements OnInit' to the class.
//   this.product.getAllData().subscribe((res)=>{
//     this.products=res
//   })
// }

productDetails(id:number){
 
  this.router.navigate(['productdetails',id])

}

chocolate(categoryName:string){
  // console.log("the categoryName is"+categoryName);
  this.filter.getFilterProducts(categoryName).subscribe((res)=>{
    this.products=res
    
  })

}


under(){
  this.filter.getMin().subscribe((res:any)=>{
    console.log("the data is"+JSON.stringify(res));
    this.products=res
    
  })
}

between(){
  this.filter.getBet().subscribe((res:any)=>{
    this.products=res
  })
}
above(){
  this.filter.getAbove().subscribe((res:any)=>{
     this.products=res
  })
}
clear(){
  window.location.reload()
}

// filter section start




}
