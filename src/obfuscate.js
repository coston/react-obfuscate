import React, { Component } from 'react'
import {node, string, object, bool} from 'prop-types'

export const combineHeaders = (searchParams = {}) => {
  return Object.keys(searchParams).map(key =>
    `${key}=${encodeURIComponent(searchParams[key])}`
  ).join('&')
}

export const createContactLink = (tel, sms, facetime, email, headers) => {
  let link
  if (email) {
    link = `mailto:${email}`
    if (headers) {
      link += `?${combineHeaders(headers)}`
    }
  }
  else if (tel) {
    link = `tel:${tel}`
  }
  else if (sms) {
    link = `sms:${sms}`
  }
  else if (facetime) {
    link = `facetime:${facetime}`
  }
  return link
}

class Obfuscate extends Component {
  render () {
    return this.props.obfuscate
      ? this.renderObfuscatedLink()
      : this.renderLink()
  }

  renderLink () {
    const { tel, sms, facetime, email, obfuscate, headers, children, ...others } = this.props
    return (
      <a href={createContactLink(tel, sms, facetime, email, headers)} {...others}>
        {tel || sms || facetime || email || children }
      </a>
    )
  }

  reverse (s) {
    return s.split('').reverse().join('')
  }

  renderObfuscatedLink () {
    const { tel, sms, facetime, email, obfuscate, headers, children, ...others } = this.props
    return (
      <a onClick={this.handleClick.bind(this)} href='obfuscated' {...others} style={{direction: 'rtl', unicodeBidi: 'bidi-override'}}>
        { this.reverse(tel || sms || facetime || email) || children }
      </a>
    )
  }

  handleClick (event) {
    event.preventDefault()
    const { tel, sms, facetime, email, headers } = this.props
    window.location.href = createContactLink(tel, sms, facetime, email, headers)
  }
}

Obfuscate.propTypes = {
  children: node,
  tel: string,
  sms: string,
  facetime: string,
  email: string,
  headers: object,
  obfuscate: bool
}

Obfuscate.defaultProps = {
  obfuscate: true
}

export default Obfuscate
