import { IProduct } from './product';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'

  constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
          catchError(this.handleError)
        )
    }

    // Get one product
  // Since we are working with a json file, we can only retrieve all products
  // So retrieve all products and then find the one we want using 'map'
  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

    private handleError(err: HttpErrorResponse){
      let errorMessage = ''
      if(err.error instanceof ErrorEvent){
        errorMessage =  `An error ocurred: ${err.error.message}`
      }else{
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
      }
      console.error(errorMessage)
      return throwError(() => errorMessage)
    }
    }