import AddUser from "../AddUser";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import store from "../../../store";

describe("Test the Login Component", () => {
  test("render the Home on the screen", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddUser />
        </BrowserRouter>
      </Provider>
    );
   
    const First_Name = screen.getByText("First Name");
    expect(First_Name).toBeDefined();
    const Last_Name = screen.getByText("Last Name");
    expect(Last_Name).toBeDefined();
    const Email = screen.getByText("Email");
    expect(Email).toBeDefined();
  });
});
// describe("AddUser", () => {
//   test("renders correctly", () => {
//     render(<AddUser />);
//     // const nameElement = screen.getByRole('textbox');
//     // expect(nameElement).toBeInTheDocument()
//     const first_name = screen.getAllByRole("textbox", { name: "First Name" });
//     expect(first_name).toHaveAttribute('name', 'First Name')
//   });
