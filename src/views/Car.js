import React, { Component } from 'react'

import '../components/EventNotification.scss'
import EventNotification  from '../components/EventNotification'

import createCarStreamer from '../api/car-data-streamer'

import _ from 'lodash'

//wrapper for car event
class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carData: {}
    };
  }
  streamer = createCarStreamer(this.props.vin)

  updateState = carData => {
    this.setState({ carData })
  }

  componentDidMount() {
    this.streamer.subscribe(this.updateState)
    this.streamer.start()
  }

  componentDestroy() {
    this.streamer.stop()
  }

  isLowFuel = () => {
    return this.state.carData.fuel <= 0.15
  }

  render() {

    if(_.isEmpty(this.state.carData)){
      return (<div>Loading...</div>)
    }

    return (
            <EventNotification 
              carEvent={this.state.carData}
              color={this.props.color}
            />
    )
  }
}


export default Car