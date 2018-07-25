import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

export default class Layer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el)
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el)
    }
  }

  el

  render() {
    const { children } = this.props
    return createPortal(children, this.el)
  }
}
