import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Layer from './Layer'
import Fields from './Fields'
import Editor from './Editor'

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

const Main = ({ loaded, cssVars }) => (
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
              <Fields cssVars={cssVars} />
            </div>
            <div className="ct-main-editor">
              <Editor />
            </div>
          </Fragment>
        )
    }
  </div>
)

class CSSThemer extends Component {
  static propTypes = {
    cssVars: PropTypes.arrayOf(
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

    this.state = {
      open: true,
      loaded: false,
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

  render() {
    const { loaded, open } = this.state
    const { cssVars } = this.props
    return (
      <Layer>
        <div className={`ct ${open && 'is-open'}`}>
          <Header onToggle={this.handleToggle} open={open} />
          <Main cssVars={cssVars} loaded={loaded} />
        </div>
      </Layer>
    )
  }
}

export default CSSThemer
