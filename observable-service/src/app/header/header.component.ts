import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public cartItemsCount  = 0;

  private shoppingCartSub!: Subscription;

  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  ngOnDestroy(): void {
    this.shoppingCartSub.unsubscribe();
  }

  ngOnInit(): void {
    this.shoppingCartSub = this.shoppingCartService.shoppingCartChanged$.subscribe((newCount) => this.cartItemsCount = newCount);
  }

}
