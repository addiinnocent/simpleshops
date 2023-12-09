import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ProductService } from '../product.service';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';
import { ProductTileComponent } from '../components/product-tile/product-tile.component';
import { CarouselComponent } from '../components/carousel/carousel.component';

const tiles = [
  {cols: 5, rows: 4},
  {cols: 3, rows: 2},
  {cols: 3, rows: 2},
]

export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    SearchbarComponent,
    ProductTileComponent,
    CarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  grid: any[] = [];
  carousel: any[] = [];
  tiles: Tile[] = tiles;

  constructor(
    private router: Router,
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  searchFor(filter: string) {
    this.router.navigate(['/search'], { queryParams: { filter: filter } });
  }

  ngOnInit() {
    this.productService.getProducts(this.tiles.length).subscribe((data) => {
      this.grid = data;
    });
    this.productService.getProducts(10).subscribe((data) => {
      this.carousel = data;
    });
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result => {
      if (result.matches) {
        this.tiles = [
          {cols: 8, rows: 8},
          {cols: 8, rows: 8},
          {cols: 8, rows: 8},
        ]
      } else this.tiles = tiles;
    });
  }
}
