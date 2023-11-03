import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  namectrl = new FormControl('');



  constructor(private fb: FormBuilder,private seller:SellerService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
  
    
  }

  profileForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    // description: new FormControl('', Validators.required),
    categoryId: new FormControl('', [Validators.required]),
    categoryName: new FormControl('', [Validators.required]),
    price: new FormControl('', [ Validators.required,Validators.minLength(8), ]),
    totalprice: new FormControl('', [ Validators.required,Validators.minLength(8), ]),
    images: new FormControl('', [ Validators.required ]),
    images1: new FormControl('', [ Validators.required ]),
    images2: new FormControl('', [ Validators.required ]),
    images3: new FormControl('', [ Validators.required ]),
    images4: new FormControl('', [ Validators.required ]),
    
    qty: new FormControl('', [ Validators.required,Validators.minLength(8), ]),
    rating: new FormControl('', [ Validators.required,Validators.minLength(8), ]),
  });

  
  




  // onImageSelect(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.image = file;
  //     this.profileForm.get('image')?.setValue(file);
  //   }
  // }
  



  
 
  onSubmit(data:any) {
    data.sellerId=sessionStorage.getItem("sellerId")
   this.seller.addProduct(data).subscribe()
   alert( "Product added successfully!");
  
   
   console.log("the data is "+JSON.stringify(this.profileForm.value.images));
   
  
   setTimeout(() => {
    window.location.reload()
   }, 1000);
   
  }

}
