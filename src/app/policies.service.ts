import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Policy {
  body: string;
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})

export class PoliciesService {
  
  constructor(private apollo: Apollo) {}

  getShippingRefund() {
    const GET_SHIPPING_REFUND = gql`{
      shop {
        refundPolicy {
          id
          body
          title
        }
        shippingPolicy {
          id
          body
          title
        }
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_SHIPPING_REFUND,
    })
    .valueChanges.pipe(
      map(({ data }) => data.shop)
    );
  }

  getTermsOfService() {
    const GET_TERMS_OF_SERVICE = gql`{
      shop {
        termsOfService {
          id
          body
          title
        }
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_TERMS_OF_SERVICE,
    })
    .valueChanges.pipe(
      map(({ data }) => data.shop)
    );
  }

  getPrivacyPolicy() {
    const GET_PRIVACY_POLICY = gql`{
      shop {
        privacyPolicy {
          id
          body
          title
        }
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_PRIVACY_POLICY,
    })
    .valueChanges.pipe(
      map(({ data }) => data.shop)
    );
  }
}
