import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login, Register } from 'src/app/interfaces/category1';
import { AuthService } from 'src/app/services/auth.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isUserLogginIn = new BehaviorSubject<boolean>(false);

  constructor(
  
    private router: Router,
    private seller:SellerService
  ) {}

  ngOnInit(): void {}

  //  for register user
  namectrl = new FormControl('');
  registrationSuccess = false;
  loginSuccess = false;
  loginAttempt = false;

  // custom validations for email start

  emailContainsAt(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string | null;

    //check email is null or undefined or not contains the sign
    if (email === null || email === undefined || email.indexOf('@') === -1) {
      return { emailDoesNotContainAt: true };
    }

    return null;
  }
  // custom email validation end

  // custom password validation start

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value as string;

    if (!password) {
      return null;
    }

    // for  Check for at least one uppercase character
    if (!/[A-Z]/.test(password)) {
      return { missingUppercase: true };
    }
    //for checking atkeast one special symbol
    if (!/[!@#$%^&*]/.test(password)) {
      return { missingSpecialCharacter: true };
    }

    return null;
  }
  // custom password validation end

  // formGroup

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailContainsAt,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.passwordValidator,
    ]),
  });

  formsubmit(): void {
    const formData = this.profileForm.value;
    const userData: Register = {
      firstName: formData.firstName || '', 
      lastName: formData.lastName || '',
      email: formData.email || '',
      password: formData.password || '',
    };
  
    this.seller.sellerRegister(userData).subscribe(() => {
      this.registrationSuccess = true;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
  
  // get user() {
  //   return this.profileForm.get('user');
  // }

  // register section end
  showLoginForm = true;

  // login section start

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onLoginSubmit(): void {
    const formData = this.loginForm.value;
    const userData: Login = {
      email: formData.email || '', // Use empty string as a default value if it's null or undefined
      password: formData.password || '', // Use empty string as a default value if it's null or undefined
    };
  
    this.seller.sellerLogin(userData as Register).subscribe((responseData: any) => {
      let count = 0;
  
      responseData &&
        responseData.forEach((element: any) => {
          console.log(element.email);
          console.log(element.id);
          if (
            element.email === formData.email &&
            element.password === formData.password
          ) {
            count++;
            localStorage.setItem('sellerId', element.id);
          
          }
        });
  
      if (count > 0) {
        this.loginSuccess = true;
       
  
        this.router.navigate(['/seller/sellerhome']);
        setTimeout(() => {
          window.location.reload()
        }, 200);
      } else {
        this.loginSuccess = false;
      }
  
      this.loginAttempt = true;
    });
  }
  

}
