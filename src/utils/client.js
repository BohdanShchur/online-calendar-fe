import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
const token = localStorage.getItem('token');
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: token || "",
        }
    }
});
const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false
    }),
    connectToDevTools: true
});