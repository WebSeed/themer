import React, { Component } from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'

import { getCssVar, setCssVar } from './utils'

const buildTitle = (id) => id.replace(/-/g, ' ')

class Field extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    // label: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    value: undefined,
    // label: undefined,
    type: 'color',
  }

  constructor(props) {
    super(props)
    const { id, value } = props
    this.state = {
      value,
      computedValue: getCssVar(id),
    }
  }

  // handleChange = (event) => {
  //   const { value } = event.target
  //   this.setState(() => ({ value }))

  //   // TODO: temp
  //   const { id } = this.props
  //   setCssVar(id, value)
  // }

  // handleClick = () => {
  //   console.log('CLICK')
  // }

  render() {
    const { value, computedValue } = this.state
    const { id, type } = this.props
    const title = buildTitle(id)
    const style = {
      backgroundColor: computedValue,
      color: tinycolor(computedValue).isLight() ? '#000' : '#FFF',
    }
    return (
      <div className="ct-field" style={style}>
        <div className="ct-field-main">
          <h3 className="ct-field-title">{ title }</h3>
          <div className="ct-field-type">{ type }</div>
          <div className="ct-field-info">
            <div><code>{computedValue}</code></div>
            { computedValue !== value && <div><code>{value}</code></div> }
          </div>
        </div>
        <div className="ct-field-controls">
          <button type="button" className="ct-btn-reset ct-field-control ct-field-edit">Edit</button>
          <button type="button" className="ct-btn-reset ct-field-control ct-field-link">Link</button>
        </div>
      </div>
    )
  }
}

export default Field
