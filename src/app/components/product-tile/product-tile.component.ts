import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatChipsModule],
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent {
  @Input() product: any;
}
