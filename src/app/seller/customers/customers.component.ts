import { Component } from '@angular/core';
import { Profile } from 'src/app/interfaces/profileData';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  users: Profile[] = [];
  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.seller.getAllUsers().subscribe((res) => {
      this.users = res;

    });
  }
}
