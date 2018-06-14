import React, { Component } from 'react'
import { node, string, object, bool } from 'prop-types'

const combineHeaders = (params = {}) => {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
}

const createContactLink = (tel, sms, facetime, email, headers) => {
  let link
  if (email) {
    link = `mailto:${email}`
    if (headers) {
      link += `?${combineHeaders(headers)}`
    }
  } else if (tel) {
    link = `tel:${tel}`
  } else if (sms) {
    link = `sms:${sms}`
  } else if (facetime) {
    link = `facetime:${facetime}`
  }
  return link
}

class Obfuscate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      humanInteraction: false,
    }
  }
  render() {
    return this.props.obfuscate
      ? this.renderObfuscatedLink()
      : this.renderLink()
  }

  renderLink() {
    const {
      tel,
      sms,
      facetime,
      email,
      obfuscate,
      headers,
      children,
      ...others
    } = this.props
    return (
      <a
        href={createContactLink(tel, sms, facetime, email, headers)}
        {...others}
      >
        {children || tel || sms || facetime || email}
      </a>
    )
  }

  reverse(s) {
    return s
      .split('')
      .reverse()
      .join('')
  }

  renderObfuscatedLink() {
    const {
      tel,
      sms,
      facetime,
      email,
      obfuscate,
      headers,
      children,
      style,
      linkText,
      ...others
    } = this.props

    const obsStyle =
      this.state.humanInteraction === true || children
        ? {
            ...(style || {}),
            unicodeBidi: 'bidi-override',
            direction: 'ltr',
          }
        : {
            ...(style || {}),
            unicodeBidi: 'bidi-override',
            direction: 'rtl',
          }

    let link = state =>
      this.state.humanInteraction === true
        ? children || tel || sms || facetime || email
        : children ||
          this.reverse(tel || sms || facetime || email)
            .replace('(', ')')
            .replace(')', '(')

    return (
      <a
        onClick={this.handleClick.bind(this)}
        onFocus={this.handleCopiability.bind(this)}
        onMouseOver={this.handleCopiability.bind(this)}
        onContextMenu={this.handleCopiability.bind(this)}
        href={linkText || 'obfuscated'}
        {...others}
        style={obsStyle}
      >
        {link()}
      </a>
    )
  }

  handleClick(event) {
    event.preventDefault()
    const { tel, sms, facetime, email, headers } = this.props
    window.location.href = createContactLink(tel, sms, facetime, email, headers)
  }
  handleCopiability() {
    this.setState(state => ({
      ...state,
      humanInteraction: true,
    }))
  }
}

Obfuscate.propTypes = {
  children: node,
  tel: string,
  sms: string,
  facetime: string,
  email: string,
  headers: object,
  obfuscate: bool,
  style: object,
  linkText: string,
}

Obfuscate.defaultProps = {
  obfuscate: true,
}

export default Obfuscate
