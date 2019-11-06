import reducer, { SET_DAY, SET_INTERVIEW, SCHED_API } from "reducers/application";
/*
Write a test called "throws an error with an unsupported type". 
Confirm that it throws the unsupported action error when we call the reducer with an empty state object 
and an action with null as the value of type.
*/
describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
  });
})