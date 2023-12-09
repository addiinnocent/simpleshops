import { Component, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import { ShoppingcartService } from '../../shoppingcart.service';

import { TopbarComponent } from '../topbar/topbar.component';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    CommonModule,
    MatSidenavModule,
    TopbarComponent,
    ShoppingcartComponent,
    FooterComponent,
  ],
})
export class LayoutComponent implements OnInit {
  @ViewChild('main', { static: false }) main!: ElementRef;
  private shoppingcartSubscription!: Subscription;
  isDrawerOpen = false;

  constructor(
    private renderer: Renderer2,
    private shoppingcartService: ShoppingcartService,
  ) {}

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.toggleScrollable();
  }

  toggleScrollable() {
    if (this.isDrawerOpen) {
      this.renderer.setStyle(document.documentElement, 'overflow', 'hidden');
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.setStyle(document.documentElement, 'overflow', 'auto');
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    }
  }

  ngOnInit() {
    this.shoppingcartSubscription = this.shoppingcartService.lines$
    .subscribe((lines) => {
      if (lines.length > 0) {
        this.isDrawerOpen = true;
        this.toggleScrollable();
      }
    });
  }
}
