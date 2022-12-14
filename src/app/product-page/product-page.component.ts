import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {ProductService} from 'src/app/shared/product.service';
import { IProduct } from '../shared/interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {



  loading: any;
  product$: Observable<IProduct> = new Observable();

  constructor(private productServ: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productServ.getById(params['id'])
      }));
  }

  addProduct(product: IProduct) {
    this.productServ.addProduct(product);
  }

}
