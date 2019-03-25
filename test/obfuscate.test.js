import React from 'react'
import Obfuscate from '../src/obfuscate.js'

const testEmail = 'coston.perkins@ua.edu'
const testTel = '205-454-1234'
const testTelReveresed = '4321-454-502'


describe('obfuscate', () => {
  beforeEach(() => {
    delete global.window.location

    global.window.location = {
      href: new URL('https://example.com'),
    }
  })

  test('renders an ofuscated href', () => {
    const wrapper = shallow(
      <Obfuscate tel={testTel} />
    )

    expect(wrapper.prop('href')).toEqual('obfuscated')
  })

  test('properly sets location.href when ofuscated email is clicked', () => {
    const wrapper = shallow(
      <Obfuscate email={testEmail} />
    )

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(global.window.location.href).toEqual(`mailto:${testEmail}`)
  })

  test('properly sets location.href when ofuscated email with headers is clicked', () => {
    const headers = {
      cc: 'dade@zero-cool.af',
      bcc: 'smith@machina.net',
      subject: 'react-obfuscate',
      body: 'Down with the machines!'
    }
    const wrapper = shallow(
      <Obfuscate email={testEmail} headers={headers} />
    )

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(global.window.location.href).toEqual(`mailto:${testEmail}?${Object.keys(headers)
      .map(key => `${key}=${encodeURIComponent(headers[key])}`)
      .join('&')}`)
  })

  test('properly sets location.href when ofuscated tel is clicked', () => {
    const wrapper = shallow(
      <Obfuscate tel={testTel} />
    )

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(global.window.location.href).toEqual(`tel:${testTel}`)
  })

  test('properly sets location.href when ofuscated sms is clicked', () => {
    const wrapper = shallow(
      <Obfuscate sms={testTel} />
    )

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(global.window.location.href).toEqual(`sms:${testTel}`)
  })

  test('properly sets location.href when ofuscated facetime is clicked', () => {
    const wrapper = shallow(
      <Obfuscate facetime={testTel} />
    )

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(global.window.location.href).toEqual(`facetime:${testTel}`)
  })

  test('properly sets location.href when ofuscated without type is clicked', () => {
    const wrapper = shallow(
      <Obfuscate>test</Obfuscate>
    )

    wrapper.simulate('click', { preventDefault: () => {} })
    expect(global.window.location.href).toEqual('test')
  })

  test('renders an unofuscated href when obfuscate prop equals false', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={false} sms={testTel} />
    )

    expect(wrapper.find('a').text()).toBe(testTel)
    expect(wrapper.prop('href')).toEqual(`sms:${testTel}`)
  })

  test('renders an unofuscated child element left to right when obfuscate prop equals false', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={false} facetime={testTel} />
    )

    expect(wrapper.find('a').text()).toBe(testTel)
    expect(wrapper.prop('href')).toEqual(`facetime:${testTel}`)
  })

  test('renders an unofuscated child element right to left when obfuscated', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={true} tel={testTel} />
    )

    expect(wrapper.find('a').text()).toBe(testTelReveresed)
    expect(wrapper.prop('href')).toEqual('obfuscated')
  })

  test('renders a custom element', () => {
    const wrapper = shallow(
      <Obfuscate element="span" viewOnly tel={testTel} />
    )

    expect(wrapper.find('span').text()).toBe(testTelReveresed)
    expect(wrapper.prop('href')).toBeUndefined()
    expect(wrapper.prop('onClick')).toBeUndefined()
  })

  test('calls supplied onClick method before changing location', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <Obfuscate email={testEmail} onClick={onClick} />
    )
    
    wrapper.simulate('click', { preventDefault: () => {} })
    expect(onClick).toHaveBeenCalled()
    expect(global.window.location.href).toEqual(`mailto:${testEmail}`)
  })

  test('unobfuscates href when user interacts with element', () => {
    const wrapper = shallow(
      <Obfuscate email={testEmail} />
    )

    wrapper.simulate('mouseover')
    expect(wrapper.prop('href')).toEqual(`mailto:${testEmail}`)
  })

  test('Return empty href link if child is an object and no link is provided', () => {
    const wrapper = shallow(
      <Obfuscate ><button>This is a child object</button></Obfuscate>
    )

    wrapper.simulate('mouseover')
    expect(wrapper.prop('href')).toEqual('')
  })

  test("Undefined does not break reversal", () => {
    const wrapper = shallow(
      <Obfuscate></Obfuscate>
    )
    wrapper.simulate('mouseover')
    expect(wrapper.prop('href')).toBeUndefined()
  })
  
})
