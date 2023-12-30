import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart, Product } from 'src/app/interfaces/category1';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent {
  selectedDate: string = '';

  currentDate: Date | null = null;
  addressResult: any;
  id: number = 0;
  size: number = 0;
  products: Product[] = [];
  constructor(
    private activate: ActivatedRoute,
    private product: ProductsService,
    private router: Router,
    private cart: CartService,private toast:ToastrService
  ) {
    this.activate.params.subscribe((res: any) => {
      this.id = res.id;
    });
    // console.log("the productid in product details  are"+JSON.stringify(this.id));
    this.getProduct(this.id);
  }

  getProduct(categoryId: number) {
    this.product.getProductDetails(this.id).subscribe((res) => {
      this.products = res;
      //  console.log("the data of product details is"+JSON.stringify(this.products));
    });
  }

  selectSize(size: number) {
    this.toast.success("Great ");
    this.size = size;
  }

  addToCart(data: Product) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      Swal.fire({
        title: 'You need to log in to add products to the cart.',
        icon: 'info',
        html: 'Firstly Fill Your profile details and then Add products to cart',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
      });

      // Swal.fire('');
      this.router.navigate(['user/login']);
      return;
    }

    if (this.size === 0) {
      Swal.fire('Please select a size before adding the product to the cart.');
     
      return;
    }
    if (this.selectedDate === '') {
      Swal.fire(
        'Please select a Date of Delivery before adding the product to the cart.'
      );
      return;
    }
    if (this.addressResult === '') {
      Swal.fire(
        'Please select a Address of Delivery before adding the product to the cart.'
      );
      return;
    }
    data.size = this.size;
    data.date = this.selectedDate;
    // data.address = this.addressResult;
    data.userId = userId || '';

    // console.log('the cart data are ' + JSON.stringify(data));

    this.cart.getCart(data).subscribe((res: any) => {
      let sum = 0;

      for (const key of Object.keys(res)) {
        const p = res[key];
        console.log(p);

        if (data.id === p.id) {
          sum++;
        }
      }

      if (sum > 0) {
        Swal.fire(
          'Ohhh Shitt!',
          'Product Already exists in the cart.',
          'question'
        )
    
      } else {
        this.cart.addToCart(data).subscribe((result) => {
          Swal.fire(
            'Great!',
            'Product Successfully Added In Cart.',
            'success'
          )          // this.router.navigate(['/cart']);
          console.log(data);
        });
      }
    });
 
  }

  lookupLocation() {
    const locationInput = document.getElementById(
      'locationInput'
    ) as HTMLInputElement | null;
    const addressResult = document.getElementById(
      'addressResult'
    ) as HTMLElement | null;

    if (locationInput && addressResult) {
      const location = locationInput.value;
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=${location}&format=json`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const address = data[0].display_name;
            this.addressResult = 'Address: ' + address;

            this.currentDate = new Date();
            const randomDays = Math.floor(Math.random() * 8) + 1;
            this.currentDate.setDate(this.currentDate.getDate() + randomDays);
            sessionStorage.setItem('date', JSON.stringify(this.currentDate));
          } else {
            this.addressResult = 'Address not found for the given location';
            this.currentDate = null;
          }
        });
    }
  }
  getDate() {
    const dateInput = document.getElementById('date') as HTMLInputElement;
    if (dateInput) {
      this.selectedDate = dateInput.value; // Store the selected date in the variable
      // console.log('Selected Date:', this.selectedDate);
    }
  }

  // add to wishlist
  wishlist(result: Product) {
    result.userId = localStorage.getItem('userId') ?? '';
    this.cart.getWishlist(result).subscribe(() => {
      alert('Added to WishList');

      setTimeout(() => {
        this.router.navigate(['wishlist']);
      }, 100);
    });
    // this.isWishlistClicked = !this.isWishlistClicked;
  }
}
