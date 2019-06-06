import gql from 'graphql-tag';

export const getAllNews = gql`
  query {
    news {
      id
      title
      description
      category
      image
      source
    }
  }
`;

export const newsAdd = gql`
mutation newNews($news: CreateNewsInput!) {
  newsAdd(news: $news) {
    title
  }
}
`;

export const newsDelete = gql`
  mutation newsDelete($id: String!) {
    newsDelete(id: $id) {
      title
    }
  }
`;
