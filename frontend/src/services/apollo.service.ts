import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { ACCESS_TOKEN, baseURL } from '../config';
import { AuthService } from './auth.service';

const httpLink  = createHttpLink({
    uri: baseURL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const errorLink = onError(({ graphQLErrors }) => {

    if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
            if (error.extensions && error.extensions.code === 'UNAUTHENTICATED') {
                AuthService.deleteToken();
                window.location.href = '/login';
            }
        });
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache()
});

export {
    client,
}