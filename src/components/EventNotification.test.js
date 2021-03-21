import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import createRandomColor from '../dom-utils/colors.js'

import EventNotification from "./EventNotification";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("car event card is rendered", () => {
  const fakeCar = {
    vin:'ABCDEFG0123456789', // the vin you entered
    timestamp: 43904830948, // event timestamp
    fuel: 0.23, // fuel level (max is 1)
    wiperFluid: 0.69, // wiper fluid level (max is 1)
    location: {lat: 34.94585948, lng: 48.48348}, // car coordinates
  }
  act(() => {
    render(<EventNotification carEvent={fakeCar} backgroundColor={createRandomColor()}/>, container);
  });
  expect(container.querySelector('.car-event__vin').textContent).toBe("ABCDEFG0123456789");
  expect(container.querySelector('.car-event__time').textContent)
    .toBe(new Date(fakeCar.timestamp).toLocaleString('en-GB'));

  expect(container.querySelector('.car-event__stat.car-event__location .car-event__value').textContent)
    .toBe(JSON.stringify(fakeCar.location));
});