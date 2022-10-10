import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { SearchPipe } from 'src/app/shared/search.pipe';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = new Array;
  pSub = new Subscription();
  rSub = new Subscription();
  productName: any;

  constructor(private productServ: ProductService) { }


  ngOnInit(): void {
    this.productServ.getAll().subscribe(products => {
      this.products = products;
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
    this.rSub = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

}
