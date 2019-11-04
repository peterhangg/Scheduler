import React from "react";

import { render, cleanup } from "@testing-library/react"; // the render function allows us to render Components

import Application from "components/Application"; // import components that we are testing

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
