import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Header from "../components/Header";
import userReducer from "../utils/userSlice";
import gptReducer from "../utils/gptSlice";
import configReducer from "../utils/configSlice";

jest.mock("../utils/firebase", () => ({
  auth: {},
}));

const mockStore = configureStore({
  reducer: {
    user: userReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

describe("Header Component", () => {
  test("should render Header component", () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });
});
