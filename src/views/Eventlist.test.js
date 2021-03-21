import React from 'react';
import ReactDOM from 'react-dom';
import EventList from './EventList.js';
import createRandomColor from '../dom-utils/colors.js'

it('EventList renders without crashing', () => {
  const carlist= {
        'ABCDEFG0123456789':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458689':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458683':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458684':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458685':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458686':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458687':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458688':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458680':{ active : true ,color:createRandomColor()}
    };
  const div = document.createElement('div');
  ReactDOM.render(<EventList carlist={carlist} />, div);
  ReactDOM.unmountComponentAtNode(div);
});