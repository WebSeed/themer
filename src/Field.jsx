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
    onSelectEdit: PropTypes.func.isRequired,
    onSelectLink: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    value: undefined,
    type: 'color',
  }

  constructor(props) {
    super(props)
    const { id } = props
    this.state = {
      computedValue: undefined,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      computedValue: getCssVar(props.id),
    }
  }

  handleSelectEdit = () => {
    const { id, onSelectEdit } = this.props
    onSelectEdit(id)
  }

  handleSelectLink = () => {
    const { id, onSelectLink } = this.props
    onSelectLink(id)
  }

  render() {
    const { computedValue } = this.state
    const {
      id,
      value,
      type,
      selected,
    } = this.props
    const title = buildTitle(id)
    const style = {
      backgroundColor: computedValue,
      color: tinycolor(computedValue).isLight() ? '#000' : '#FFF',
    }
    return (
      <div className={`ct-field ${selected && 'is-selected'}`} style={style}>
        <div className="ct-field-main">
          <h3 className="ct-field-title">{ title }</h3>
          <div className="ct-field-type">{ type }</div>
          <div className="ct-field-info">
            <div><code>{computedValue}</code></div>
            { computedValue !== value && <div><code>{value}</code></div> }
          </div>
        </div>
        <div className="ct-field-controls">
          <button
            type="button"
            className="ct-btn-reset ct-field-control ct-field-edit"
            onClick={this.handleSelectEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="ct-btn-reset ct-field-control ct-field-link"
            onClick={this.handleSelectLink}
          >
            Link
          </button>
        </div>
      </div>
    )
  }
}

export default Field
