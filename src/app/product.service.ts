import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class ProductNode {
  id!: string
  title!: string
  featuredImage!: string
  availableForSale!: boolean
  totalInventory!: number
  tags!: string[]
  images!: Images
  variants!: Variants
  priceRange!: PriceRange
  priceRangeV2!: PriceRange
}

class ProductVariantNode {
  availableForSale!: boolean
  currentlyNotInStock!: boolean
  id!: string
  priceV2!: MoneyV2
  title!: string
}

class ProductImageNode {
  src!: string
  id!: string
  altText!: string
}

class PriceRange {
  maxVariantPrice!: {
    amount: number
    currencyCode: string
  }
  minVariantPrice!: {
    amount: number
    currencyCode: string
  }
}

class MoneyV2 {
  amount!: string;
  currencyCode!: string;
}

class Images {
  edges!: any[];
}

class Variants {
  edges!: any[];
}


class ProductEdge {
  node!: ProductNode;
}

class ProductsData {
  products!: {
    edges: ProductEdge[];
  };
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apollo: Apollo) {}

  getProducts(limit: number, sortKey: string = 'PRODUCT_TYPE', filter: string = '') {
    if (sortKey == 'CREATED') sortKey = 'CREATED_AT';
    const GET_PRODUCTS = gql`{
      products(
        first: ${limit},
        sortKey: ${sortKey},
        query: "${filter}"
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
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCTS,
    })
    .valueChanges.pipe(
      map(({ data }) => this.transformArray(data))
    );
  }

  getProduct(productId: string | null): Observable<any> {
    const GET_PRODUCT = gql`{
      product(id: "${productId}") {
        availableForSale
        description
        featuredImage {
          altText
          src
          id
        }
        handle
        id
        images(first: 10) {
          edges {
            node {
              src
              id
              altText
            }
          }
        }
        productType
        tags
        title
        totalInventory
        variants(first: 10) {
          edges {
            node {
              availableForSale
              currentlyNotInStock
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              product {
                title
              }
            }
          }
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
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_PRODUCT,
      variables: { productId },
    })
    .valueChanges.pipe(
      map(({ data }) => this.transformProduct(data))
    );
  }

  transformArray(data: ProductsData) {
    return data.products.edges.map((productEdge: any) => {
      const node = {...productEdge.node} as ProductNode;

      return node;
    });
  }

  transformProduct({ product }: { product: ProductNode }) {
    return {
      ...product,
      images: product.images.edges.map((productImagesEdge: any) => {
        const node = {...productImagesEdge.node} as ProductImageNode;

        return node;
      }),
      variants: product.variants.edges.map((productVariantsEdge: any) => {
        const node = {...productVariantsEdge.node} as ProductVariantNode;

        return node;
      })
    }
  }
}
