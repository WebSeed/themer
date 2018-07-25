import React, { Component } from 'react'
import { buildTitleFromId } from './utils'

class Linker extends Component {
  handleSelect = (linkedId) => {
    const { selectedField, onLink } = this.props
    onLink(selectedField.id, linkedId)
  }

  render() {
    const { selectedField, fields } = this.props
    return (
      <div className="ct-linker">
        <h3 className="ct-linker-title">Link to</h3>
        <ul className="ct-linker-list">
          {
            fields
              .filter(({ id }) => id !== selectedField.id)
              .map(({ id }) => (
                <li className="ct-linker-item" key={id}>
                  <button
                    type="button"
                    onClick={() => this.handleSelect(id)}
                    className="ct-btn-reset ct-linker-button"
                  >
                    {buildTitleFromId(id)}
                  </button>
                </li>
              ))
          }
        </ul>
      </div>
    )
  }
}

export default Linker
