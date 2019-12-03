/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUnemployment = `query GetUnemployment($id: ID!) {
  getUnemployment(id: $id) {
    id
    period
    year
    total
    men
    women
  }
}
`;
export const listUnemployments = `query ListUnemployments(
  $filter: ModelunemploymentFilterInput
  $limit: Int
  $nextToken: String
) {
  listUnemployments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      period
      year
      total
      men
      women
    }
    nextToken
  }
}
`;
