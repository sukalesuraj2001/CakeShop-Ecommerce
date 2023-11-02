export interface Category{
    categoryId: number
    categoryName:string;
    images:string
}

export interface Ocassion{
    categoryId: number
    categoryName:string;
    images:string
}
export interface Flovour{
    categoryId: number
    categoryName:string;
    images:string
}
export interface Price{
    categoryId: number
    categoryName:string;
    images:string;
    price:number;
}
export interface Color{
    categoryId: number
    categoryName:string;
    images:string
}export interface Product{
    
    productName:string
    price:number,
    rating:number,
    categoryName: string,
    categoryId: number
    images:string;
    delivery:string;
    id:number;
    size:number;
    address:string;
    date:string;
    userId:string;
    qty:number;
    selected:any;
    totalprice:number;
    shipping:number;
}
export interface Cart{
    
    productName:string
    price:number,
    rating:number,
    categoryName: string,
    categoryId: number
    images:string;
    delivery:string;
    id:number;
    size:number;
    address:string;
    date:string;
    userId:string;
    totalprice:number;
    shipping:number;
}

export interface Register{
    firstName:string;
    lastName:string;
    email:string;
    password:string
}
export interface Login{
   
    email:string;
    password:string
}


