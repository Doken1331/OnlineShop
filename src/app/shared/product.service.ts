import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {FbResponce, IProduct} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  type: string = 'Phone';
  cartProducts: IProduct[] = [];



  constructor(private https: HttpClient) {}

  public create(product: any) {
    return this.https.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponce) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }))
  }

  public getAll() {
    return this.https.get(`${environment.fbDbUrl}/products.json`)
      .pipe(map((res: any) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  public getById(id: string) {
    return this.https.get<IProduct>(`${environment.fbDbUrl}/products/${id}.json`);
  }

  public remove(id: string) {
    return this.https.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  public update(product: IProduct) {
    return this.https.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }

  public setType(type: string) {
    this.type = type;
  }

  public addProduct(product: IProduct) {
    this.cartProducts.push(product);
  }

}
