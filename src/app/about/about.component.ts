import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page, PagesService } from '../pages.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  aboutPage: Page | null = null;

  constructor(private pagesService: PagesService) {}

  ngOnInit() {
    this.pagesService.getPage('About')
    .subscribe((page) => this.aboutPage = page);
  }
}
