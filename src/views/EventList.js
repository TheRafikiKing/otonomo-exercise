import React from 'react'
import Car from './Car.js'

window.React = React

//represente list of card details for each active car in watch list
class EventList extends React.Component {

  //keep references to Car childrens enable parent to
  //filter them by their fuel level state
  //Alternative - would be to signal each car that filter by fuel is 
  //active and let car that needs to be filtered out -> return nothing;
  // in such case
  references = {};

  render() {
    // show only cars that marks in the watch list
    let carlist = Object
      .entries(this.props.carlist)
      .filter(([k,v]) => v.active)

    //filtered by fuel level when actives
    if(this.props.filtered) {
      carlist = carlist.filter(car => this.filterChild(car[0]))
    }

    // TBD - add window sliding for performance
    const events = 
          carlist
          .map((car) =>
              {
                let vin = car[0];
                return (<Car 
                  key={vin} 
                  vin={vin}
                  ref={this.getOrCreateRef(vin)}
                  color={car[1].color}
                  >
                </Car>)
              }
          )

    return (
        <div style={{marginRight:'auto',marginLeft:'auto'}}>
          { events }
        </div>
    )
  }

  filterChild = (id) => {
    return (this.references[id].current &&
      this.references[id].current.isLowFuel())
  }

  getOrCreateRef(id) {
    if (!this.references.hasOwnProperty(id)) {
        this.references[id] = React.createRef();
    }
    return this.references[id];
  }

}


export default EventList