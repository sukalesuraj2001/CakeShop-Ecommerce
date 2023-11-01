import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logout() {
    if (localStorage.getItem("userId") === null) {
        alert('Please login first');
    } else {
        localStorage.removeItem("userId");
        alert("logout succeefully!")
    }
}

}
