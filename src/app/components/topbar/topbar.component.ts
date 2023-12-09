import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';

import { ShoppingcartService } from '../../shoppingcart.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
  ],
})
export class TopbarComponent implements OnInit {
  @Input() isDrawerOpen: boolean = false;
  @Output() toggleDrawerEvent = new EventEmitter<void>();
  currentRoute: string | undefined;

  lines!: Observable<any[]>;
  amount: number = 0;

  constructor(
    private router: Router,
    private shoppingcartService: ShoppingcartService,
  ) {}

  toggleDrawer(): void {
    this.toggleDrawerEvent.emit();
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
    
    this.lines = this.shoppingcartService.lines$;
    this.lines.subscribe((lines: any[]) => {
      this.amount = lines.length;
    })
  }
}
