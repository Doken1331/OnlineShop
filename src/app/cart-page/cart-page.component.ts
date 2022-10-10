import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../shared/interfaces';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts = new Array;
  totalPrice: number = 0;
  added: string = '';

  form!: FormGroup;
  submitted = false;


  constructor(private productServ: ProductService, private orderServ: OrderService) { }

  ngOnInit(): void {
    this.cartProducts = this.productServ.cartProducts;
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash')
    })
  }

  public submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true;
    
    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    console.log(this.form)

    this.orderServ.create(order).subscribe(res => {
      this.form.reset;
      this.added = 'Delivery is framed';
      this.submitted = false;
    })
  }

  public delete(product: IProduct) {
    this.totalPrice -= +product.price!;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }

}
