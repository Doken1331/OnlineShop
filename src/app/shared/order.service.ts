import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FbResponce } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private https: HttpClient) {}

  public create(order: any) {
    return this.https.post(`${environment.fbDbUrl}/orders.json`, order)
      .pipe(map((res: FbResponce) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  public getAll() {
    return this.https.get(`${environment.fbDbUrl}/orders.json`)
      .pipe(map((res: any) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }))
  }

  public remove(id: string) {
    return this.https.delete(`${environment.fbDbUrl}/orders/${id}.json`);
  }



}

