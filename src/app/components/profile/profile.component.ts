import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/interfaces/profileData';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  acc: string = '';
  profiledata: Profile[] = [];
  userName: string = '';
  data:any;
  editMode: boolean = false;
  userId: string="";
  // menuOption: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}
  menuOption: string = '';

  ngOnInit(data: Profile): void {
    // this.auth.getProfile(data).subscribe((res: any) => {
    //   this.data = res[0];
    //   console.log("the data2  is"+JSON.stringify(res));

    // });

    this.menuOption = 'profile';
    this.acc = localStorage.getItem('userName') ?? '';

    this.auth.getProfile().subscribe((res) => {
      this.profiledata = res;
      this.data = res[0];

      console.log('the user id is' + JSON.stringify(this.data.userId));

      if (this.profiledata.length > 0) {
        localStorage.setItem(
          'address',
          JSON.stringify(this.profiledata[0].address1)
        );
      } else {
      }

      const data = JSON.stringify(this.profiledata);
    });
  }

  selectMenu(option: string) {
    this.menuOption = option;
  }

  // edit form  logic

  namectrl = new FormControl('');

  // formGroup
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl(''),
    address1: new FormControl(''),
    // address2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    image: new FormControl(''),
  });

  formsubmit(data: Partial<Profile>): void {
    // Check if 'userId' already exists in localStorage
    const existingUserId = localStorage.getItem("userId");
  
    if (existingUserId) {
      // Check if the provided 'userId' matches the existing one
      if (existingUserId === data.userId) {
        alert("Profile already exists. You can edit your profile.");
      } else {
        alert("A different profile is already associated with this user. You cannot create a new profile.");
      }
    } else {
      // If 'userId' doesn't exist in localStorage, set it and create the profile
      localStorage.setItem("userId", data.userId || "");
      this.auth.addProfile(data as Profile).subscribe((res) => {
        alert("Profile Created Successfully!");
        window.location.reload();
      });
    }
  }
  

  updateProfiles = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl(''),
    address1: new FormControl(''),
  
    city: new FormControl(''),
    state: new FormControl(''),
    image: new FormControl(''),
  });

  updateProfile(data: Partial<Profile>): void {
    data.userId = localStorage.getItem('userId') || '';

    this.auth.updateProfile(data as Profile).subscribe((res) => {
      alert('Profile Updated Successfully!');
      window.location.reload()
    });
  }

  toggleEditForm() {
    this.editMode = !this.editMode;
  }
}
