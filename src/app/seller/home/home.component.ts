import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Product, Register } from 'src/app/interfaces/category1';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userCount: number = 0;
  amount: number = 0;
  productCount: number = 0;
  orderCount: number = 0;
  categoryCountsArray: any;
  pieChart: Chart = new Chart();
  lineChart: Chart = new Chart;

  order: Order[] = [];
  constructor(

    private auth: AuthService,
    private cart: CartService,
    private product: ProductsService,
    private orders: CartService,
    private seller:SellerService
  ) {}
  ngOnInit(data: Register): void {
    this.seller.getAllUsers().subscribe((res) => {
      this.userCount = res.length;
    });
    this.product.getProduct().subscribe((res) => {
      this.productCount = res.length;
    });
    this.orders.getAllOrders().subscribe((res) => {
      // console.log('the all orders are' + JSON.stringify(res));

      const ordersArray = Object.values(res);

      this.orderCount = ordersArray.length;

      let totalSum = 0;

      ordersArray.forEach((order: any) => {
        const selectedItems = order.selectedItems;
        let finalAmount = 0;

        selectedItems.forEach((item: any) => {
          finalAmount += item.totalprice;
        });

        order.finalAmount = finalAmount;

        totalSum += finalAmount;
        this.amount = totalSum;
      });

      console.log('Updated Orders: ', ordersArray);

      console.log('Total Sum of Final Amounts: ', totalSum);
    });

    this.orders.getAllOrders().subscribe((res: any) => {
      const ordersArray = Object.values(res);

      const categoryCounts: { [key: string]: number } = {};

      ordersArray.forEach((order: any) => {
        const selectedItems = order.selectedItems;

        selectedItems.forEach((item: any) => {
          const categoryName = item.categoryName;

          if (categoryCounts.hasOwnProperty(categoryName)) {
            categoryCounts[categoryName] += 1;
          } else {
            categoryCounts[categoryName] = 1;
          }
        });
      });

      // Collect the category names and counts
      const categoryData = Object.entries(categoryCounts).map(
        ([name, count]) => ({
          name,
          y: count,
        })
      );

      this.pieChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'CategoryWise Sales',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y}',
            },
          },
        },
        series: [
          {
            name: 'Total Sales',
            type: 'pie',
            data: categoryData,
            
          },
        ],
      });
    });

    // Fetch user data from your service (this.seller.getUsers() in your case)
    this.seller.getUsers().subscribe((userData: any) => {
      const registrationCounts = this.countUserRegistrationsByDay(userData);

      const categories = Object.keys(registrationCounts);
      const data = categories.map((day) => registrationCounts[day]);

      this.lineChart = new Chart({
        chart: {
          type: 'line',
        },
        title: {
          text: 'Day Wise User Registrations',
        },
        xAxis: {
          categories: categories,
        },
        yAxis: {
          title: {
            text: 'Number of Registrations',
          },
        },
        series: [
          {
            name: 'User Registrations',
            type: 'line',
            data: data,
          },
        ],
      });
    });
  }

  countUserRegistrationsByDay(userData: any[]): { [day: string]: number } {
    const registrationCounts: { [day: string]: number } = {};

    userData.forEach((user: any) => {
      if (user.date) {
        const registrationDate = new Date(user.date);
        const dayOfWeek = this.getDayOfWeek(registrationDate);

        if (registrationCounts[dayOfWeek]) {
          registrationCounts[dayOfWeek]++;
        } else {
          registrationCounts[dayOfWeek] = 1;
        }
      }
    });

    return registrationCounts;
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }





  showAlert() {
    Swal.fire('Hello, World!');
  }








  

}
