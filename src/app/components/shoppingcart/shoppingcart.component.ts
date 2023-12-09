import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { ShoppingcartService } from '../../shoppingcart.service';
import { ProductQuantityComponent } from '../product-quantity/product-quantity.component';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ProductQuantityComponent,
  ],
})
export class ShoppingcartComponent implements OnInit {
  @Output() closeDrawer = new EventEmitter<void>();
  checkoutUrl!: string;
  lines!: Observable<any[]>;
  total!: Observable<number>;

  constructor(
    private shoppingcartService: ShoppingcartService,
  ) {}

  handleRemove(line: any) {
    this.shoppingcartService.removeFromShoppingcart(line);
  }

  handleCheckoutButton() {
    this.checkoutUrl = this.shoppingcartService.checkoutUrl;
    window.open(this.checkoutUrl, '_blank')
  }

  handleCloseButton() {
    this.closeDrawer.emit();
  }

  ngOnInit() {
    this.lines = this.shoppingcartService.lines$;
    this.total = this.shoppingcartService.total$;
  }
}
