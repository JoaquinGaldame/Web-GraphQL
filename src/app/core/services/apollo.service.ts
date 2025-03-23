import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const uri = 'https://your-graphql-endpoint.com/graphql'; // Reemplaza con tu endpoint
    const http = httpLink.create({ uri });

    this.apollo.create({
      link: http,
      cache: new InMemoryCache(),
    });
  }
}