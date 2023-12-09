import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map, catchError } from 'rxjs/operators';

class CartData {
  cartLinesAdd!: any;
  cartLinesUpdate!: any
}

class CartLineNode {
  id!: string;
  merchandise!: ProductVariantNode | null; // Adjust the type based on your actual response structure
}

class CartLineEdge {
  node!: CartLineNode;
}

class ProductVariantNode {
  id!: string;
}

const RESPONSE = `{
  cart {
    id
    checkoutUrl
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              product {
                id
                title
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
}`

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  private cartId!: string;
  private lines = new BehaviorSubject<CartLineNode[]>([]);
  private total = new BehaviorSubject<number>(0);
  checkoutUrl!: string;
  lines$ = this.lines.asObservable();
  total$ = this.total.asObservable();

  constructor(
    private apollo: Apollo
  ) {
    this.createShoppingcart().subscribe((response: any) => {
      this.cartId = response.data.cartCreate.cart.id;
      this.checkoutUrl = response.data.cartCreate.cart.checkoutUrl;
    });
  }

  createShoppingcart() {
    const CREATE_CART = gql`
      mutation {
        cartCreate(input: {}) {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: CREATE_CART,
    });
  }

  addToShoppingcart(item: any) {
    const ADD_LINE = gql`
      mutation {
        cartLinesAdd(
          cartId: "${this.cartId}"
          lines: [{
            quantity: 1
            merchandiseId: "${item.id}"
          }],
        ) ${RESPONSE}
      }
    `;
    const observable = this.apollo.mutate({
      mutation: ADD_LINE,
    });
    observable.pipe(
      map(({ data }) => ({
        lines: this.transformCart(data as CartData),
        cost: Object.values(data as CartData)[0].cart.cost,
      })),
    ).subscribe(({lines, cost}) => {
      this.lines.next(lines);
      this.total.next(cost.totalAmount.amount);
    });

    return observable as Observable<any>;
  }

  changeItemQuantity(quantity: number, lineId: string) {
    const UPDATE_LINE = gql`
      mutation {
        cartLinesUpdate(
          cartId: "${this.cartId}"
          lines: {
            id: "${lineId}"
            quantity: ${quantity}
          }
        ) ${RESPONSE}
      }
    `;
    const observable = this.apollo.mutate({
      mutation: UPDATE_LINE,
    })
    observable.pipe(
      map(({ data }) => ({
        cost: Object.values(data as CartData)[0].cart.cost,
        data: data,
      })),
    ).subscribe(({ cost, data }) => {
      console.log(data);
      this.total.next(cost.totalAmount.amount);
    });

    return observable as Observable<any>;
  }


  removeFromShoppingcart(lineId: string) {
    const REMOVE_LINE = gql`
      mutation {
        cartLinesRemove(
          cartId: "${this.cartId}",
          lineIds: "${lineId}",
        ) ${RESPONSE}
      }
    `;
    const observable = this.apollo.mutate({
      mutation: REMOVE_LINE,
    })
    observable.pipe(
      map(({ data }) => ({
        lines: this.transformCart(data as CartData),
        cost: Object.values(data as CartData)[0].cart.cost,
      })),
    ).subscribe(({ lines, cost }) => {
      console.log(lines);
      this.lines.next(lines);
      this.total.next(cost.totalAmount.amount);
    });

    return observable as Observable<any>;
  }

  transformCart(data: CartData): CartLineNode[] {
    return Object.values(data)[0].cart.lines.edges.map((lineEdge: CartLineEdge) => {
      return lineEdge.node as CartLineNode;
    });
  }

}
