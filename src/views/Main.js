import React, { Component } from 'react'
import cn from 'classnames'
import createRandomColor from '../dom-utils/colors.js'

import './Main.scss'
import '../components/Input.scss'
import Input from '../components/Input'
import '../components/Checkbox.scss'
import Checkbox from '../components/Checkbox'
import '../components/Button.scss'
import Button from '../components/Button'
import EventList from './EventList.js'

class Main extends Component {

  state = {
    //dictionary will give us O(1) when watch list car is updated
    carlist: {
        'ABCDEFG0123456789':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458689':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458683':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458684':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458685':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458686':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458687':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458688':{ active : true ,color:createRandomColor()},
        'ABCDEFG0123458680':{ active : true ,color:createRandomColor()}
    },
    filterByLowFuelLevel:false,
    newCarVin:'',
    vinErr:false
    
  }

  vinValidator = new RegExp('^(?=.*?[A-Z])(?=.*?[0-9]).{17,}$');

  //handle insert vin number from text box
  //TBD - make separate component so it wont re-render
  //everything on change
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  //add new car to state
  addCar = () => {
      const carVin = this.state.newCarVin
      if (!this.vinValidator.test(carVin) || carVin in this.state.carlist) {
        return this.setState({vinErr: true}) 
      }

      const newCar = {[carVin]:{ active : true, color:createRandomColor() }}
      const newCarList = { 
        ...this.state.carlist,
        ...newCar
      }
      this.setState({carlist: newCarList})
  }

  // activate/deactivate watch on car details
  handleInputListChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const car = this.state.carlist[name]
    const updateCar = {[name]:{ active : value , color: car.color}}
    this.setState(prevState => ({
      carlist: {
        ...prevState.carlist,
        ...updateCar
      }
    }))
    
  }

  render() {
    // send to child wheter the filter is active
    const isFiltered = this.state.filterByLowFuelLevel

    return (
            <div className={cn('d-flex','Main')} >
                <div className={cn('d-flex','flex-column','h-100')} 
                     style={{
                       width:'40%'
                      }}
                >
                  <div style={{
                       position:'fixed',
                       width:'inherit',
                       padding:'0.675em',
                       marginRight:'-0.675em',
                       marginLeft:'-0.675em'
                      }}>
                    <div style={{padding:'0.675em', paddingLeft:'1.350em'}}>
                      <div className={cn('d-flex')} 
                          style={{flexBasis:1}}
                      >
                          <Input 
                            name='newCarVin' 
                            onChange={this.handleInputChange} 
                            style={{ width:'70%', marginRight:'10px'}}/>
                          <Button onClick={this.addCar} style={{ width:'20%' }}> + Add</Button>
                      </div>
                      {this.state.vinErr && <span style={{padding:'0.375em',color:'red'}}>Your Vin is invalid</span>}
                      <div className={cn('d-flex')} >
                        <ul style={{listStyle:'none', padding:'0'}}>
                            {
                                Object.entries(this.state.carlist)
                                .map(([k,v])  => (
                                    <li key={k}>
                                      <Checkbox 
                                        key={k}
                                        name={k}
                                        children={k} 
                                        checked={v.active}
                                        onChange={this.handleInputListChange}
                                        color={v.color}
                                        />
                                    </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    </div>
                  </div>
                </div>
                <div
                   className={cn('d-flex','flex-column','h-100')} 
                   style={{width: '60%'}}
                >
                  <div 
                    className={cn('d-flex')} 
                    style={{
                      position: 'fixed',
                      backgroundColor:'white',
                      height:50,
                      borderBottom:'thin solid grey',
                      borderLeft:'thin solid grey',
                      width:'100%',
                      paddingTop:'1.5em',
                      paddingLeft:'2em'
                    }} 
                  >
                    <Checkbox 
                        name='filterByLowFuelLevel'
                        onClick={this.handleInputChange}
                        children='filter events where fuel level is under 15%' 
                    />
                  </div>
                  <div 
                    className={cn('d-flex')} 
                    style={{
                      flexBasis:1,
                      marginTop:70,
                      padding:'0.675em',
                      borderLeft:'thin solid grey',
                    }}
                  >
                    <EventList 
                      carlist={this.state.carlist} 
                      filtered={isFiltered} 
                    />
                  </div>
                </div>
            </div>
    )
  }
}

export default Main
