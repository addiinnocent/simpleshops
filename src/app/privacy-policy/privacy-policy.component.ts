import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Policy, PoliciesService } from '../policies.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicy: Policy | null = null;

  constructor(private policiesService: PoliciesService) {}

  ngOnInit() {
    this.policiesService.getPrivacyPolicy()
    .subscribe((shop) => this.privacyPolicy = shop.privacyPolicy);
  }
}
