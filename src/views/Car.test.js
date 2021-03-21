import React from 'react';
import ReactDOM from 'react-dom';
import Car from './Car.js';
import createRandomColor from '../dom-utils/colors.js'

it('Car renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Car vin='ABCDEFG0123456789' backgroundColor={createRandomColor()}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});