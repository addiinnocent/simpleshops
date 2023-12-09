import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

import { ProductService } from '../product.service';
import { ShoppingcartService } from '../shoppingcart.service';
import { LayoutComponent } from '../components/layout/layout.component';
import { ImageSliderComponent } from '../components/image-slider/image-slider.component';
import { CarouselComponent } from '../components/carousel/carousel.component';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    CommonModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    LayoutComponent,
    ImageSliderComponent,
    CarouselComponent,
  ],
})
export class ProductComponent implements OnInit {
  loading: boolean = false;
  variant: any;
  product$!: Observable<any>;
  recommended$!: Observable<any[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private productService: ProductService,
    private shoppingcartService: ShoppingcartService,
    private snackBar: MatSnackBar
  ) { }

  handleAction() {
    if (this.variant) {
      this.loading = true;
      this.shoppingcartService.addToShoppingcart(this.variant)
      .subscribe(({ loading }) => this.loading = loading);
    } else  this.snackBar.open(
      'Please, select the size!',
      'Close', {
        duration: 3000,
        verticalPosition: 'top',
      }
    );
  }

  selectVariant(variant: any) {
    this.variant = variant;
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }

    this.product$ = this.productService.getProduct(routeParams.get('productId'));
    this.recommended$ = this.productService.getProducts(10)
  }

}
