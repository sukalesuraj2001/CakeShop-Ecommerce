import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Product } from 'src/app/interfaces/category1';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  date: any;
  selectedQuantity: number = 0;
  discount = 10;
  shipping=40;
  // item.qty:number=1
  selectedItemCount: number = 0;

  selectAllItems: boolean = false;
  cartItem: any[] = [];
  counter: number = 0;
  user: any;
  users: any;
  userId: string = '';
  address: any;
  cartItems: Product[] = [];
  totalPrice: Product[] = [];
  totalmrp: any;
  amount: any;

  constructor(
    private cart: CartService,
    private product: ProductsService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(cartdata: Cart): void {
    this.date = sessionStorage.getItem('date') ?? '';
    // discount on price

    // this.auth.getProfile(new Profile).subscribe((res)=>{
    //   console.log("the profile data is "+JSON.stringify(res));
    //   this.users=res
    // })

    // this.cart.getCart(cartdata).subscribe((res: any) => {
   
    // });

    this.updateSelectedItemCount();

    // this.userId=localStorage.getItem("userId")?? ""
    // this.user=localStorage.getItem("userName")
    // this.address=localStorage.getItem("address")

    this.cart.getCart(cartdata as Cart).subscribe((result: any) => {
      console.log('cart product loaded successfully!');
    
      // for (const product of result) {
      //   this.shipping= product.shipping
       
       
      // }
    
      this.counter = result.length;
      this.cartItems = result;
    
      console.log('the cartdata is ' + JSON.stringify(this.cartItems));
      // this.router.navigate(['/cart'])
    });
    
  }

  increase(item: any) {
    item.qty++;
  }

  decrease(item: any) {
    if (item.qty > 0) {
      item.qty--;
    }
  }

  isCollapsed = true;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  remove(item: Product) {

    console.log("the remove product are"+JSON.stringify(item));

    this.cart.removeCart(item.id).subscribe(
      (result) => {
      alert("product deleted successfully!")
      // window.location.reload()
        const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
        }
      },
      (error) => {
       alert(error)
      }
    );
  }

  // qty functinality start

  selectQuantity(quantity: number) {
    this.selectedQuantity = quantity;
    console.log('the aty is' + this.selectedQuantity);
  }

  // place order functionality

  // placeOrder() {
  //   const selectedItems = this.cartItems.filter(cartItem => cartItem.selected);

  //   if (selectedItems.length === 0) {
  //     alert("Please select products in the cart before placing an order.");
  //     return;
  //   }

  //   const orderID = Math.floor(1000 + Math.random() * 9000);

  //   const totalAmount = selectedItems.reduce((total, cartItem) => {
  //     const totalItemPrice = cartItem.totalprice * cartItem.qty;
  //     return total + totalItemPrice;
  //   }, 0);

  //   this.amount = totalAmount - (totalAmount * (this.discount / 100)) + 40;

  //   // Check if userDetails is empty
  //   if (this.users.length === 0) {
  //     alert("User details are empty. Please fill in user details before placing an order.");
  //     return;
  //   }

  //   const orderData = {
  //     userId: this.userId,
  //     purchaseDate: this.date,
  //     userDetails: this.users,
  //     orderID: orderID,
  //     totalAmount: this.amount,
  //     selectedItems: selectedItems,
  //   };

  //   this.orderservice.orderProduct(orderData).subscribe(() => {
  //     alert("Order placed successfully!");
  //     this.router.navigate(['dashboard/payment']);
  //   });

  // }

  selectAllItemsChanged() {
    for (const item of this.cartItems) {
      item.selected = this.selectAllItems;
    }
    this.totalmrp = this.cartItems.reduce((total, cartItem) => {
      if (cartItem.selected) {
        total += cartItem.totalprice;
      }
      return total;
    }, 0);
    this.updateSelectedItemCount();
  }
  checkItem(item: any) {
    if (!item.selected) {
      this.selectAllItems = false;
    }
    for (const item of this.cartItems) {
      if (item.selected) {
        // this.placeOrder();
      }
    }
    // Calculate total MRP based on selected items
    this.totalmrp = this.cartItems.reduce((total, cartItem) => {
      if (cartItem.selected) {
        total += cartItem.totalprice * cartItem.qty;
      }
      return total;
    }, 0);
    this.updateSelectedItemCount();
  }

  updateSelectedItemCount() {
    this.selectedItemCount = this.cartItems.filter(
      (item) => item.selected
    ).length;
  }
}
