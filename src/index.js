import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Layer from './Layer'
import Fields from './Fields'
import Editor from './Editor'
import { setCssVar } from './utils'

const Header = ({ onToggle, open }) => (
  <div className="ct-header">
    <div className="ct-title">CSS Themer</div>
    <button
      type="button"
      className="ct-btn-reset ct-toggle"
      onClick={onToggle}
    >
      { open ? 'Close' : 'Open' }
    </button>
  </div>
)

const Main = ({
  loaded,
  fields,
  onSelectEdit,
  onSelectLink,
  selectedForEditing,
  selectedForLinking,
  onChangeField,
}) => (
  <div className="ct-main">
    {
      !loaded
        ? (
          <span>
            Loading...
          </span>
        )
        : (
          <Fragment>
            <div className="ct-main-fields">
              <Fields
                fields={fields}
                onSelectEdit={onSelectEdit}
                onSelectLink={onSelectLink}
                selectedForEditing={selectedForEditing}
                selectedForLinking={selectedForLinking}
              />
            </div>
            <div className="ct-main-side">
              {
                (!selectedForEditing && !selectedForLinking) && (
                  <div className="ct-side-placeholder">Select EDIT on a field to directly change its value or select LINK to link to another field.</div>
                )
              }
              {
                selectedForEditing && <Editor field={selectedForEditing} onChange={onChangeField} />
              }
              {
                selectedForLinking && <div className="ct-linker">Linking dialog to appear here!</div>
              }
            </div>
          </Fragment>
        )
    }
  </div>
)

class CSSThemer extends Component {
  static propTypes = {
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.string,
        type: PropTypes.string,
      }).isRequired,
    ).isRequired,
  }

  constructor(props) {
    super(props)

    const { fields } = props
    this.fieldsById = []
    fields.forEach((field) => {
      this.fieldsById[field.id] = field
    })

    this.state = {
      open: true,
      loaded: false,
      selectedForEditing: undefined,
      selectedForLinking: undefined,
    }
  }

  componentDidMount() {
    if (document.readyState === 'complete') {
      this.handleLoad()
    } else {
      window.addEventListener('load', this.handleLoad)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad)
  }

  handleLoad = () => {
    this.setState(() => ({ loaded: true }))
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleSelectEdit = (fieldId) => {
    const field = this.fieldsById[fieldId]
    console.log('Selected for editing', field)
    this.setState(() => ({
      selectedForEditing: field,
      selectedForLinking: undefined,
    }))
  }

  handleSelectLink = (fieldId) => {
    const field = this.fieldsById[fieldId]
    console.log('Selected for linking', field)
    this.setState(() => ({
      selectedForLinking: field,
      selectedForEditing: undefined,
    }))
  }

  handleChangeField = (fieldId, value) => {
    const field = this.fieldsById[fieldId]
    field.value = value.hex
    setCssVar(fieldId, field.value)
    this.forceUpdate()
  }

  render() {
    const {
      loaded,
      open,
      selectedForEditing,
      selectedForLinking,
    } = this.state
    const { fields } = this.props
    return (
      <Layer>
        <div className={`ct ${open && 'is-open'}`}>
          <Header onToggle={this.handleToggle} open={open} />
          <Main
            fields={fields}
            loaded={loaded}
            onSelectEdit={this.handleSelectEdit}
            onSelectLink={this.handleSelectLink}
            selectedForEditing={selectedForEditing}
            selectedForLinking={selectedForLinking}
            onChangeField={this.handleChangeField}
          />
        </div>
      </Layer>
    )
  }
}

export default CSSThemer
