import React, { Component } from 'react'

import Field from './Field'

const isFieldSelected = (fieldId, selectedForEditing, selectedForLinking) => {
  if (selectedForEditing && selectedForEditing.id === fieldId) {
    return true
  }
  if (selectedForLinking && selectedForLinking.id === fieldId) {
    return true
  }
  return false
}


class Fields extends Component {
  static propTypes = {
  }

  render() {
    const {
      fields,
      onSelectEdit,
      onSelectLink,
      selectedForEditing,
      selectedForLinking,
    } = this.props

    return (
      <div className="ct-fields">
        <div className="ct-grid">
          {
            fields.map(
              ({
                id, label, value, type,
              }) => (
                <div
                  key={id}
                  className="ct-cell ct-w1/2@sm ct-w1/3@md ct-mb"
                >
                  <Field
                    id={id}
                    selected={isFieldSelected(id, selectedForEditing, selectedForLinking)}
                    label={label}
                    value={value}
                    type={type}
                    onSelectEdit={onSelectEdit}
                    onSelectLink={onSelectLink}
                  />
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
