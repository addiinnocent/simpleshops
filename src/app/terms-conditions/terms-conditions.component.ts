import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Policy, PoliciesService } from '../policies.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  termsOfService: Policy | null = null;

  constructor(private policiesService: PoliciesService) {}

  ngOnInit() {
    this.policiesService.getTermsOfService()
    .subscribe((shop) => this.termsOfService = shop.termsOfService);
  }
}
