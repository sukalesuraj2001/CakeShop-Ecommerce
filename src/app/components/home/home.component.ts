import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Color, Flovour, Ocassion, Price, } from 'src/app/interfaces/category1';
import { ColorService } from 'src/app/services/color.service';


import { FirstCategoryService } from 'src/app/services/first-category.service';
import { FlovoursService } from 'src/app/services/flovours.service';
import { OcassionsService } from 'src/app/services/ocassions.service';
import { PriceService } from 'src/app/services/price.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
data:Category[]=[];
occasions:Ocassion[]=[];
flovours:Flovour[]=[];
prices:Price[]=[]
color:Color[]=[]

  constructor(private ps1:FirstCategoryService,
  private occassion:OcassionsService,
  private flovour:FlovoursService,
  private price:PriceService,
  private colors:ColorService,
  private router:Router
    
  ) {}
 ngOnInit(): void {
  this.ps1.getCategory().subscribe((res)=>{
this.data=res
});
this.occassion.getOcassion().subscribe((res)=>{
  this.occasions=res
});
this.flovour.getFlovour().subscribe((res)=>{
  this.flovours=res
});
this.price.getPrice().subscribe((res)=>{
this.prices=res
});
this.colors.getColor().subscribe((res)=>{
  this.color=res
})



  
 }


 categoryName(categoryId:number){
  this.router.navigate(['cakes',categoryId])
  
 }

}
