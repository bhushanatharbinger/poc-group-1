import Home from "../Home";
import thunk from 'redux-thunk'
import { MemoryRouter } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
const onSubmit = jest.fn();

const initialState = {};
const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe("Test the Login Component", () => {
    test("render the Home on the screen", async () => {
        render(<Provider store={store}>
            <MemoryRouter><Home />
            </MemoryRouter></Provider>);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(3);
    });

    //   test("email input field should accept email ", () => {
    //     render(<Home />);
    //     const email = screen.getByPlaceholderText("Enter email");
    //     userEvent.type(email, "dipesh");
    //     expect(email.value).not.toMatch("dipesh.malvia@gmail.com");
    //   });

    //   test("passport input should have type password ", () => {
    //     render(<Home />);
    //     const password = screen.getByPlaceholderText("Password");
    //     expect(password).toHaveAttribute("type", "password");
    //   });

    //   test("should display alert if error", () => {
    //     render(<Home />);
    //     const email = screen.getByPlaceholderText("Enter email");
    //     const password = screen.getByPlaceholderText("Password");
    //     const buttonList = screen.getAllByRole("button");

    //     userEvent.type(email, "dipesh");
    //     userEvent.type(password, "123456");
    //     userEvent.click(buttonList[0]);
    //     const error = screen.getByText("Email is not valid");
    //     expect(error).toBeInTheDocument();
    //   });

    //   test("should be able to reset the form ", () => {
    //     const { getByLabelText, getByTestId } = render(<Home />);
    //     const resetBtn = getByTestId("reset");
    //     const emailInputNode = getByLabelText("Email");
    //     const passwordInputNode = getByLabelText("Password");
    //     fireEvent.click(resetBtn);
    //     expect(emailInputNode.value).toMatch("");
    //     expect(passwordInputNode.value).toMatch("");
    //   });

    //   test("should be able to submit the form", () => {
    //     const component = render(<Home />);
    //     const email = screen.getByPlaceholderText("Enter email");
    //     const password = screen.getByPlaceholderText("Password");
    //     const btnList = screen.getAllByRole("button");

    //     userEvent.type(email, "dipesh@gmail.com");
    //     userEvent.type(password, "123456");
    //     userEvent.click(btnList[0]);

    //     const user = screen.getByText("dipesh@gmail.com");
    //     expect(user).toBeInTheDocument();
    //   });
});