import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductService } from './product.service';

class CollectionNode {
  id!: string;
  handle!: string;
}

class CollectionEdge {
  cursor!: string;
  node!: CollectionNode;
}

class CollectionPageInfo {
  hasNextPage!: boolean;
  hasPreviousPage!: boolean;
}

class CollectionsData {
  collections!: {
    edges: CollectionEdge[];
    pageInfo: CollectionPageInfo;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private apollo: Apollo,
    private productService: ProductService,
  ) {}

  getCollections(limit: number) {
    const GET_COLLECTIONS = gql`{
      collections(first: ${limit}) {
        edges {
          cursor
          node {
            id
            title
            handle
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_COLLECTIONS,
    })
    .valueChanges.pipe(
      map(({ data }) => this.transformArray(data))
    );
  }

  getProducts(limit: number, id?: string, sortKey?: string, filter?: string) {
    const GET_PRODUCTS = gql`{
      collection(id: "${id}") {
        id
        title
        products(
          first: ${limit},
          sortKey: ${sortKey},
        ) {
          edges {
            node {
              id
              title
              featuredImage {
                id
                src
                altText
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCTS,
    })
    .valueChanges.pipe(
      map(({ data }) => this.productService.transformArray(data.collection))
    );
  }

  transformArray(data: CollectionsData) {
    return data.collections.edges.map((productEdge: any) => {
      const node = {...productEdge.node} as CollectionNode;

      return node;
    });
  }
}
