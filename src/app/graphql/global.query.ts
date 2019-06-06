import gql from 'graphql-tag';

export const addTvShow = gql`
  mutation addTvShow(
    $title: String!
    $description: String
    $actor: String
    $image: String
    $scoring: Int
  ) {
    addTvShow(
      title: $title
      description: $description
      actor: $actor
      image: $image
      scoring: $scoring
    ) {
      id
      title
      description
      actor
      image
      scoring
    }
  }
`;

export const newsAdd = gql`
  mutation newsCreate(news: {
    $title: String!, $description: String, image: String, category: String source: String
  }){
    newsAdd(news: {title: $title, description: $description,
    image: $image, category: $category, source: $source})
  }
`;

export const getAllTvShows = gql`
  query {
    tvShows {
      id
      title
      description
      actor
      image
      scoring
    }
  }
`;

export const removeTvShow = gql`
  mutation removeTvShow($id: String!) {
    removeTvShow(id: $id) {
      id
      title
      description
      actor
      image
      scoring
    }
  }
`;

export const updateTvShow = gql`
  mutation updateTvShow(
    $id: String!
    $title: String!
    $description: String
    $actor: String
    $image: String
    $scoring: Int
  ) {
    updateTvShow(
      id: $id
      title: $title
      description: $description
      actor: $actor
      image: $image
      scoring: $scoring
    ) {
      id
      title
      description
      actor
      image
      scoring
    }
  }
`;
