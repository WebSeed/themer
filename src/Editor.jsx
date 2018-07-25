import React, { Component } from 'react'
import { ChromePicker as ColorPicker } from 'react-color'

class Editor extends Component {
  handleChange = (color, event) => {
    // console.log('CHANGE', color)
  }

  handleChangeComplete = (color, event) => {
    // console.log('CHANGE COMPLETE', color)
  }

  render() {
    const styles = {
      default: {
        picker: { // See the individual picker source for which keys to use
          boxShadow: 'none',
          width: '100%',
          borderRadius: 0,
        },
      },
    }

    return (
      <div className="ct-editor">
        <ColorPicker
          styles={styles}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
      </div>
    )
  }
}

export default Editor
