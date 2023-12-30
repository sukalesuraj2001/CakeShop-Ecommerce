import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() rate:number=0;
  starWidth=0
  
  ngOnInit(){
    this.starWidth=this.rate*16
   console.log(this.starWidth)
}
}
