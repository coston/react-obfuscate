import React from 'react'
import Obfuscate from '../src/obfuscate.js'

describe('React-Obfuscate', () => {
  
  // test('renders the document title via Helmet', () => {
  //   const wrapper = shallow(
  //     <PageTitle name="Amazing Page" />
  //   );
  //   console.log(wrapper.find(Helmet))
  //   expect(wrapper.find(Helmet).length).toBe(1);
  //   expect(wrapper.find(Helmet).prop('title')).toEqual('Amazing Page')
  // });

  // test('renders the document title via Helmet', () => {
  //   const wrapper = shallow(
  //     <PageTitle name="Amazing Page" />
  //   );
  //   console.log(wrapper.find(Helmet))
  //   expect(wrapper.find(Helmet).length).toBe(1);
  //   expect(wrapper.find(Helmet).prop('title')).toEqual('Amazing Page')
  // });

  test('Renders email with headers', () => {
    const wrapper = shallow(
      <Obfuscate
      email='hello@coston.cool'
      headers={{subject:'Question from the website', cc:'friend@coston.cool', bcc: 'comrade@coston.cool', body: 'Great library'}}/>
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Renders tel', () => {
    const wrapper = shallow(
      <Obfuscate tel='205-454-1234' />
    )
    expect(wrapper).toMatchSnapshot()
  })
  
  test('Renders facetime', () => {
    const wrapper = shallow(
      <Obfuscate facetime='205-454-1234' />
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Renders sms', () => {
    const wrapper = shallow(
      <Obfuscate sms='205-454-1234' />
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('Renders without obfuscation', () => {
    const wrapper = shallow(
      <Obfuscate obfuscate={false} sms='205-454-1234' />
    )
    expect(wrapper).toMatchSnapshot()
  })

})




