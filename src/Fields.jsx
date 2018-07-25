import React, { Component } from 'react'

import Field from './Field'

class Fields extends Component {
  static propTypes = {
  }

  render() {
    const { cssVars } = this.props
    return (
      <div className="ct-fields">
        <div className="ct-grid">
          {
            cssVars.map(
              ({
                id, label, value, type,
              }) => (
                <div
                  key={id}
                  className="ct-cell ct-w1/2@sm ct-w1/3@md ct-w1/4@lg ct-mb"
                >
                  <Field id={id} label={label} value={value} type={type} />
                </div>
              ),
            )
          }
        </div>
      </div>
    )
  }
}

export default Fields
