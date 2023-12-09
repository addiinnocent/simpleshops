import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page, PagesService } from '../pages.service';

@Component({
  selector: 'app-frequently-asked-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frequently-asked-questions.component.html',
  styleUrls: ['./frequently-asked-questions.component.scss']
})
export class FrequentlyAskedQuestionsComponent {
  faqPage: Page | null = null;

  constructor(private pagesService: PagesService) {}

  ngOnInit() {
    this.pagesService.getPage('frequently-asked-questions')
    .subscribe((page) => this.faqPage = page);
  }
}
