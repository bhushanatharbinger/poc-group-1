import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import thunk from 'redux-thunk'
import App from './App';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const initialState = { };
const mockStore = configureStore([thunk]);
const store = mockStore(initialState);
test('renders learn react link', () => {
  render(<Provider store={store}>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </Provider>);
  const linkElement = screen.getByText(/POC-GROUP-1/i);
  expect(linkElement).toBeInTheDocument();
});