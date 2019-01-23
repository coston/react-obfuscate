import React, { Component } from 'react'

export default class Obfuscate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      humanInteraction: false,
    }
  }

  // Convert contact information to contact URL scheme
  createContactLink(props) {
    let link
    // Combine email header parameters for use with email
    const combineHeaders = (params = {}) => {
      return Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    }
    if (props.email) {
      link = `mailto:${props.email}`
      if (props.headers) {
        link += `?${combineHeaders(props.headers)}`
      }
    } else if (props.tel) {
      link = `tel:${props.tel}`
    } else if (props.sms) {
      link = `sms:${props.sms}`
    } else if (props.facetime) {
      link = `facetime:${props.facetime}`
    } else {
      link = props.children
    }
    return link
  }

  handleClick(event) {
    event.preventDefault()
    window.location.href = this.createContactLink(this.props)
  }

  handleCopiability() {
    this.setState({
      humanInteraction: true,
    })
  }

  reverse(s) {
    return s
      .split('')
      .reverse()
      .join('')
      .replace('(', ')')
      .replace(')', '(')
  }

  render() {
    const { humanInteraction } = this.state
    const {
      children,
      tel,
      sms,
      facetime,
      email,
      headers,
      obfuscate,
      linkText,
      style,
      ...others
    } = this.props

    const propsList = children || tel || sms || facetime || email

    const obsStyle = {
      ...(style || {}),
      unicodeBidi: 'bidi-override',
      direction:
        humanInteraction === true || obfuscate === false ? 'ltr' : 'rtl',
    }

    const link =
      humanInteraction === true || obfuscate === false
        ? propsList
        : this.reverse(propsList)

    const hrefLink = this.createContactLink(this.props)

    return (
      <a
        onClick={this.handleClick.bind(this)}
        onFocus={this.handleCopiability.bind(this)}
        onMouseOver={this.handleCopiability.bind(this)}
        onContextMenu={this.handleCopiability.bind(this)}
        href={
          humanInteraction === true || obfuscate === false
            ? hrefLink
            : linkText || 'obfuscated'
        }
        {...others}
        style={obsStyle}
      >
        {link}
      </a>
    )
  }
}
