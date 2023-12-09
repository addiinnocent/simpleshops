import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input() images: any[] = [] ;
  current: number = 1;

  handleBack() {
    if (this.current > 1) {
      this.current--;
    }
  }

  handleForward() {
    if (this.current < this.images.length) {
      this.current++;
    }
  }
}
