import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Page {
  body: string;
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private apollo: Apollo) {}

  getPage(handle: string) {
    const GET_FAQ_PAGE = gql`{
      page(handle: "${handle}") {
        id
        title
        body
      }
    }`;
    return this.apollo.watchQuery<any>({
      query: GET_FAQ_PAGE,
    })
    .valueChanges.pipe(
      map(({ data }) => data.page)
    );
  }

}
