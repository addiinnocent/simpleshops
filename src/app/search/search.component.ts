import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ProductService } from '../product.service';
import { CollectionService } from '../collection.service';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';
import { ProductTileComponent } from '../components/product-tile/product-tile.component';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    CommonModule,
    MatGridListModule,
    SearchbarComponent,
    ProductTileComponent,
  ],
})
export class SearchComponent {
  sortOptions: any[] = [{
    key: 'RELEVANCE',
    label: 'Relevance'
  }, {
    key: 'BEST_SELLING',
    label: 'Trending'
  }, {
    key: 'CREATED',
    label: 'Latest arrivals'
  }, {
    key: 'PRICE',
    label: 'Price'
  }];
  pageSize: number = 20;
  currentCollection: string = '';
  sortKey: string = 'RELEVANCE';
  filter: string = '';
  cols: number = 3;
  collections$!: Observable<any[]>;
  products$!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private collectionService: CollectionService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  findProducts() {
    if (this.currentCollection == '') {
      this.products$ = this.productService.getProducts(this.pageSize, this.sortKey, this.filter)
    } else {
      this.products$ = this.collectionService.getProducts(this.pageSize, this.currentCollection, this.sortKey, this.filter)
    }
  }

  setCurrentCollection(collectionId: string) {
    this.currentCollection = collectionId;
    this.findProducts();
  }

  setSortKey(sortKey: string) {
    this.sortKey = sortKey;
    this.findProducts();
  }

  setFilter(filter: string) {
    this.currentCollection = '';
    this.filter = filter;
    this.findProducts();
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.filter = queryParams.get('filter') ?? '';
    });

    this.collections$ = this.collectionService.getCollections(50);
    this.collections$.subscribe((data) => this.findProducts());

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) this.cols = 1;
        if (result.breakpoints[Breakpoints.Small]) this.cols = 2;
        if (result.breakpoints[Breakpoints.Medium]) this.cols = 2;
        if (result.breakpoints[Breakpoints.Large]) this.cols = 3;
      }
    });
  }
}
