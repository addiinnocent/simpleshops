import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { fromEvent } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ProductTileComponent } from '../product-tile/product-tile.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, MatGridListModule, ProductTileComponent],
})
export class CarouselComponent implements AfterViewInit {
  @Input() products: any[] | null = [];
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  startCarousel() {
    const duration = 100000;
    const endScroll = 4000;
    const easing = (t: number) => t;

    let startTime: number | undefined;
    let animationFrameId: number | undefined;
    let currentScroll: number = 0;
    let stopped: boolean = false;

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const easedProgress = easing(progress);
      const scroll = currentScroll + (endScroll - currentScroll) * easedProgress;
      this.carousel.nativeElement.scrollLeft = scroll;

      if (progress < 1 && animationFrameId !== undefined) {
        animationFrameId = requestAnimationFrame(animateScroll);
      }
    };

    const stopAnimation = () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
        currentScroll = this.carousel.nativeElement.scrollLeft;
        stopped = true;
      }
    };

    const startAnimation = () => {
      if (animationFrameId === undefined) {
        animationFrameId = requestAnimationFrame(animateScroll);
        startTime = undefined;
        stopped = false;
      }
    };

    this.carousel.nativeElement.addEventListener('mouseenter', stopAnimation);
    this.carousel.nativeElement.addEventListener('mouseleave', startAnimation);
    this.carousel.nativeElement.addEventListener('scroll', () => {
      if (stopped) {
        currentScroll = this.carousel.nativeElement.scrollLeft;
      }
    });

    startAnimation();
  }

  ngAfterViewInit() {
    if (this.products) {
      if (this.products!.length > 10) {
        this.startCarousel();
      }
    }
  }
}
