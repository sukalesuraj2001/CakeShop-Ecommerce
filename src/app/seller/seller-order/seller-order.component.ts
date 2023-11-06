import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-seller-order',
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent {
  orderData:any
  constructor(private order:CartService){}
  
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  this.order.getAllOrders().subscribe((res) => {
    this.orderData=res
    
    console.log("The data of order is:"+JSON.stringify(this.orderData));
    res.forEach((order, index) => {
      // console.log(`Order ${index + 1}:`);
      // console.log(`Purchase Date: ${order.purchaseDate}`);
      // console.log(`Order ID: ${order.orderID}`);
      
      // console.log(`Total Amount: ${order.totalAmount}`);
      
      // Access and log user details
      if (Array.isArray(order.userDetails)) {
        const userDetails = order.userDetails[0]; // Assuming you want the first user detail
        
        // console.log("User Details:");
        // console.log(`First Name: ${userDetails.firstName}`);
        // console.log(`Last Name: ${userDetails.lastName}`);
        // console.log(`Email: ${userDetails.email}`);
        // console.log(`Mobile Number: ${userDetails.mobileNumber}`);
        // console.log(`Address 1: ${userDetails.address1}`);
        // console.log(`Address 2: ${userDetails.address2}`);
        // console.log(`City: ${userDetails.city}`);
        // console.log(`State: ${userDetails.state}`);
        // console.log(`Image: ${userDetails.image}`);
        console.log(`UserId is: ${userDetails.userId}`);
      }
  
      // Access and log selected items
      if (Array.isArray(order.selectedItems)) {
        console.log("Selected Items:");
        order.selectedItems.forEach((item, itemIndex) => {
          // this.userImage=item.images
          // console.log(`Item ${itemIndex + 1}:`);
         
          // console.log(`Product Name: ${item.productName}`);
          // console.log(`Description: ${item.description}`);
          // console.log(`Category: ${item.category}`);
          // console.log(`Price: ${item.price}`);
          // console.log(`Total Price: ${item.totalprice}`);
          console.log(`Image of items: ${item.date}`);
          
          // Add more fields as needed
        });
      }
      
      console.log(`ID: ${order.id}`);
      console.log(); 
    });
  });
  
}
}
