import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Register } from 'src/app/interfaces/category1';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ExploresService } from 'src/app/services/explores.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isSidebarOpen: boolean = false;
  islogin: boolean = false;
  firstname: any;
  lastname: any;
  counter: number = 0;
  menus: any;
  search: string = '';
  public searchTerm: string = '';
  isSeller: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cart: CartService,
    private menu: ExploresService,
    private product: ProductsService,
   
  ) {
    this.auth.isSellerLoggedIn$.subscribe((isLoggedIn) => {
      this.isSeller = isLoggedIn;
    });
  }

  ngOnInit(data: Cart): void {
    // Check for the presence of sellerId in localStorage
    const sellerId = localStorage.getItem('sellerId');
    this.isSeller = !!sellerId;
    this.islogin = localStorage.getItem('userId') === null;
    console.log('the search value is' + this.search);

    this.auth.getProfile().subscribe((res) => {
      console.log('All data in res:');
      res.forEach((profile, index) => {
        this.firstname = profile.firstName;
        this.lastname = profile.lastName;
      });
    });

    // this.cart.getCart(data).subscribe((res) => {
    //   const entries = Object.entries(res);
    //   this.counter = entries.length;
    //   console.log('the total products in cart is' + this.counter);
    // });


    this.cart.cartItemCount$.subscribe(count => {
      this.counter = count;
      console.log('the total products in cart is ' + this.counter);
    });

    // Fetch initial cart count
    this.cart.getCart(data).subscribe(res => {
      const entries = Object.entries(res);
      this.counter = entries.length;
      console.log('the total products in cart is ' + this.counter);
    });
  
  


    // -----------------

    this.menu.getMenus().subscribe((res) => {
      console.log('the menus are' + JSON.stringify(res));
      this.menus = res;
    });
  }

  logout() {
    if (localStorage.getItem('userId') === null) {
      Swal.fire('Please login first');
    } else {
      // Clear userId from localStorage and navigate to the home page
      localStorage.removeItem('userId');
      Swal.fire('Logout successful!');
      this.router.navigate(['/']);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  // isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  sellerLogout() {
    localStorage.removeItem('sellerId');
    this.auth.setSellerLoggedInStatus(false);


    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  categoryName(categoryId: number) {
    this.router.navigate(['cakes', categoryId]);
  }

  submit(event: KeyboardEvent) {
    // const searchInput = document.getElementById(
    //   'search-box'
    // ) as HTMLInputElement | null;

    // if (event.key === 'Enter') {
    //   // console.log(searchInput?.value);

    //   this.router.navigate(['search',searchInput?.value])
    // }

    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.product.search.next(this.searchTerm);
    this.router.navigate(['/search']);
  }





  bag(){
   
    window.location.reload()
  }
}
