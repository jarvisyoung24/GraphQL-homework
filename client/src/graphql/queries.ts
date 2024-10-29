import { gql } from '@apollo/client';

export const ME = gql`
query me {
  me {
    username
    email
    _id
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`;