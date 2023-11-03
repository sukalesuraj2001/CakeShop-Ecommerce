import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Product, Register } from 'src/app/interfaces/category1';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userCount: number = 0;
  amount:number=0;
  productCount:number=0;
  orderCount:number=0;

  order: Order[] = [];
  constructor(
    private auth: AuthService,
    private cart: CartService,
    private product: ProductsService,
    private orders:CartService
  ) {}
  ngOnInit(data: Register): void {
    this.auth.userLogin(data).subscribe((res) => {
      this.userCount = res.length;
    });
    this.product.getProduct().subscribe((res)=>{
       this.productCount=res.length;
    })
    this.orders.getAllOrders().subscribe((res) => {
      const ordersArray = Object.values(res);
    
      this.orderCount = ordersArray.length;
    
      let totalSum = 0;
    
      ordersArray.forEach((order:any) => {
        const selectedItems = order.selectedItems;
        let finalAmount = 0;
    
        selectedItems.forEach((item: any) => {
          finalAmount += item.totalprice;
        });
    
        order.finalAmount = finalAmount;
    
        totalSum += finalAmount;
        this.amount=totalSum;
      });
    
      console.log("Updated Orders: ", ordersArray);
    
      console.log("Total Sum of Final Amounts: ", totalSum);
    });
    
    
  }
  chart = new Chart({
    chart: {
      type: 'line',
    },
    title: {
      text: 'Day Wise Users ',
    },
    xAxis: [
      {
        categories: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Sunday',
        ],
      },
    ],
    yAxis: [{ title: { text: 'Number of products' } }],
    series: [
      {
        name: 'SweetCakes',
        type: 'line',
        data: [10, 5, 36, 18, 75, 10],
      },
    ],
  });

  pieChart = new Chart({
    chart: {
      type: 'pie',
    },
    title: {
      text: 'CategoryWise Sales ',
    },
    xAxis: [
      {
        categories: [
          'chocolate',
          'Midnight Delivery Cakes',
          'bestseller',
          'birthday',
          'Friday',
          'Sunday',
        ],
      },
    ],
    yAxis: [{ title: { text: 'Number of products' } }],
    series: [
      {
        name: 'SweetCakes',
        type: 'pie',
        data: [10, 5, 36, 18, 75, 100],
      },
    ],
  });
}
