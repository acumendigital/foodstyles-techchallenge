/**
 * @format
 */

import React from "react";
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ApolloProvider, ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from "@apollo/client";

const token =  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzY5LCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjU0NjM4MjUxLCJleHAiOjE2NTUyNDMwNTF9.POlGnDh92uRurUPmksdzNYe5ufgBf85BnNsZ0OyRTSkO-wYr1TYmuUGUCnU82lWgcapzeLilNKWN_GARZDcQksVO3THNbi_q5lL5-1K4COuw-tUgOICPsrPmmVuZNmx9VGSFzE5dA0GqBwAgzUVsTnx9rqBTneOSj6KWye6aOTwn6mEMF-2h_4yVPzSDzOJKXjLwT_6B_pwdOr1MKcBPciBXnkJcbV3jygFdWLfMf4ZCx07_GZfNwAwd9LyD-8l4OXaKsIoabYehKyf5MEwvwcGv6B2QNOIRDA4WXgjxXEEes-cIvePWiNFvpjtskPy9E-TIzJ7unAsPjpnokdYngw';

const httpLink = new HttpLink({ uri: 'https://api-dev.foodstyles.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        }
    }));

    return forward(operation);
})

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});


const Root = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Root);
