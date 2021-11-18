import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private readonly shoppingCartService: ShoppingCartService) { }


  public onAddToCartClick(): void {
    this.shoppingCartService.addToCart();
  }

}
