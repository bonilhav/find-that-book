import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userId: ID!) {
    user(userId: $userId) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            link
            title
            description
        }
    }
}
`;