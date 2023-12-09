import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import { ShoppingcartService } from '../../shoppingcart.service';

@Component({
  selector: 'app-product-quantity',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input() line: any;

  constructor(
    private shoppingcartService: ShoppingcartService,
  ) {}

  increaseAmount() {
    if (this.line.quantity < 99) {
      this.line.quantity++;
      this.shoppingcartService.changeItemQuantity(this.line.quantity, this.line.id);
    }
  }

  decreaseAmount() {
    if (this.line.quantity > 1) {
      this.line.quantity--;
      this.shoppingcartService.changeItemQuantity(this.line.quantity, this.line.id);
    }
  }
}
