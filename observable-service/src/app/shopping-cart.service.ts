import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public shoppingCartChanged$: Observable<any>;

  private itemsInCart = 0;

  private readonly shoppingCartSubject$ = new Subject();

  constructor() {
    this.shoppingCartChanged$ = this.shoppingCartSubject$.asObservable();
  }

  public addToCart(): void {
    this.shoppingCartSubject$.next(++this.itemsInCart);
  }
}
