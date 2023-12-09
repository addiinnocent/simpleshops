import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Policy, PoliciesService } from '../policies.service';

@Component({
  selector: 'app-shipping-return-policy',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './shipping-return-policy.component.html',
  styleUrls: ['./shipping-return-policy.component.scss']
})
export class ShippingReturnPolicyComponent implements OnInit {
  shippingPolicy: Policy | null = null;
  refundPolicy: Policy | null = null;

  constructor(private policiesService: PoliciesService) {}

  ngOnInit() {
    this.policiesService.getShippingRefund()
    .subscribe((shop) => {
      this.shippingPolicy = shop.shippingPolicy;
      this.refundPolicy = shop.refundPolicy;
    });
  }
}
