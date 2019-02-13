import React from 'react'
import Obfuscate from '../src/obfuscate.js'

describe('obfuscate', () => {
  test('renders an ofuscated href', () => {
    const wrapper = shallow(
      <Obfuscate tel='205-454-1234' />
    )

    expect(wrapper.prop('href')).toEqual('obfuscated')
  })

  test('renders an unofuscated href when obfuscate prop equals false', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={false} sms='205-454-1234' />
    )

    expect(wrapper.find('a').text()).toBe("205-454-1234")
    expect(wrapper.prop('href')).toEqual('sms:205-454-1234')
  })

  test('renders an unofuscated child element left to right when obfuscate prop equals false', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={false} facetime='205-454-1234' />
    )

    expect(wrapper.find('a').text()).toBe("205-454-1234")
    expect(wrapper.prop('href')).toEqual('facetime:205-454-1234')
  })

  test('renders an unofuscated child element right to left when obfuscated', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={true} tel='205-454-1234' />
    )

    expect(wrapper.find('a').text()).toBe("4321-454-502")
    expect(wrapper.prop('href')).toEqual('obfuscated')
  })

  test('renders a custom element', () => {
    const wrapper = shallow(
      <Obfuscate element="span" viewOnly tel='205-454-1234' />
    )

    expect(wrapper.find('span').text()).toBe("4321-454-502")
    expect(wrapper.prop('href')).toBeUndefined()
    expect(wrapper.prop('onClick')).toBeUndefined()
  })
})
