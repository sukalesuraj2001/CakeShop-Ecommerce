import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarOpen: boolean = false;

  isSeller: boolean = false; 

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check for the presence of sellerId in localStorage
    const sellerId = localStorage.getItem("sellerId");
    this.isSeller = !!sellerId;
  }

  logout() {
    if (localStorage.getItem("userId") === null) {
      alert('Please login first');
    } else {
      // Clear userId from localStorage and navigate to the home page
      localStorage.removeItem("userId");
      alert("Logout successful!");
      this.router.navigate(['/']);
    }
  }

  // isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  sellerLogout(){
    localStorage.removeItem("sellerId")
   
    setTimeout(() => {
      window.location.reload()
    }, 200);
  }

  







}
