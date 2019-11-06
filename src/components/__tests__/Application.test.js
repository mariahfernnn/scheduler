import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react"; 

import Application from "components/Application";
import useApplicationData from "hooks/useApplicationData";

afterEach(cleanup);

// Add a describe block with the name "Application"
describe("Application", () => {
  // Uses the async/await syntax
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  // Booking an interview
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );

      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  // Cancelling an interview
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the appointment you want to delete.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(getByAltText(appointment, "Delete"));
      // 4. Check that the confirmation message is shown.
      expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
      // 5. Click the "Confirm" button.
      fireEvent.click(getByText(appointment, "Confirm"));
      console.log(prettyDOM(appointment))
    // 6. Check that the element with the text "Deleting" is displayed.
    // 7. Waiting until the element with the "Add" button is displayed.
    // 6. Check that the DayListItem with the text "Monday" also has the text "2 spot remaining".
  })
})
