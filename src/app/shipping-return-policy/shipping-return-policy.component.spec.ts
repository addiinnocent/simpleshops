import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingReturnPolicyComponent } from './shipping-return-policy.component';

describe('ShippingReturnPolicyComponent', () => {
  let component: ShippingReturnPolicyComponent;
  let fixture: ComponentFixture<ShippingReturnPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShippingReturnPolicyComponent]
    });
    fixture = TestBed.createComponent(ShippingReturnPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
