/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUnemployment = `mutation CreateUnemployment(
  $input: CreateUnemploymentInput!
  $condition: ModelunemploymentConditionInput
) {
  createUnemployment(input: $input, condition: $condition) {
    id
    period
    year
    total
    men
    women
  }
}
`;
export const updateUnemployment = `mutation UpdateUnemployment(
  $input: UpdateUnemploymentInput!
  $condition: ModelunemploymentConditionInput
) {
  updateUnemployment(input: $input, condition: $condition) {
    id
    period
    year
    total
    men
    women
  }
}
`;
export const deleteUnemployment = `mutation DeleteUnemployment(
  $input: DeleteUnemploymentInput!
  $condition: ModelunemploymentConditionInput
) {
  deleteUnemployment(input: $input, condition: $condition) {
    id
    period
    year
    total
    men
    women
  }
}
`;
