import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

import { environment } from '../environments/environment';

const uri = `${environment.shopifyUrl}/api/graphql.json`;
const headers = setContext((operation, context) => ({
    headers: {'X-Shopify-Storefront-Access-Token': environment.shopifyToken},
  }));
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: ApolloLink.from([headers, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
