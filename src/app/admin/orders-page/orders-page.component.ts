import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders = new Array;
  pSub = new Subscription();
  rSub = new Subscription();

  constructor(private orderServ: OrderService) { }


  ngOnInit(): void {
    this.orderServ.getAll().subscribe(orders => {
      this.orders = orders;
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

  }

  public remove(id: string) {
    this.rSub = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(orders => orders.id !== id)
    })
  }

}
