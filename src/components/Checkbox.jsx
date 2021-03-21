import React from 'react'
import './Checkbox.scss'

function Checkbox({ type, children, color, ...props }) {
  return (
    <label className="checkbox-label" >
      <input type="checkbox" {...props} />
      <span className="label" style={{ color:color}}>{children}</span>
    </label>
  )
}

export default Checkbox
