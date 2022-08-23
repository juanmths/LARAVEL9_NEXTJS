import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ id, placeholder }) => {
  return (
    <textarea className="rezise-md rounded-md w-full" 
    id={id}
    placeholder={placeholder}
    />
  )
}

Textarea.propTypes = {}

export default Textarea