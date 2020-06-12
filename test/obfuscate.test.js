import React from 'react';
import { shallow } from 'enzyme';

import Obfuscate from '../src/obfuscate';

const testEmail = 'coston.perkins@ua.edu';
const testTel = '205-454-1234';
const testTelReveresed = '4321-454-502';
const originalLocation = 'https://example.com/';

describe('obfuscate', () => {
  beforeEach(() => {
    delete global.window.location;

    global.window.location = {
      href: new URL(originalLocation),
    };
  });

  test('renders an obfuscated href', () => {
    const wrapper = shallow(<Obfuscate tel={testTel} />);

    expect(wrapper.prop('href')).toEqual('obfuscated');
  });

  test('properly sets location.href when obfuscated email is clicked', () => {
    const wrapper = shallow(<Obfuscate email={testEmail} />);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual(`mailto:${testEmail}`);
  });

  test('properly sets location.href when obfuscated email with headers is clicked', () => {
    const headers = {
      cc: 'dade@zero-cool.af',
      bcc: 'smith@machina.net',
      subject: 'react-obfuscate',
      body: 'Down with the machines!',
    };
    const wrapper = shallow(<Obfuscate email={testEmail} headers={headers} />);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual(
      `mailto:${testEmail}?${Object.keys(headers)
        .map((key) => `${key}=${encodeURIComponent(headers[key])}`)
        .join('&')}`
    );
  });

  test('properly sets location.href when obfuscated tel is clicked', () => {
    const wrapper = shallow(<Obfuscate tel={testTel} />);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual(`tel:${testTel}`);
  });

  test('properly sets location.href when obfuscated href is clicked', () => {
    const wrapper = shallow(<Obfuscate href={testTel} />);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual(testTel);
  });

  test('properly sets location.href when obfuscated sms is clicked', () => {
    const wrapper = shallow(<Obfuscate sms={testTel} />);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual(`sms:${testTel}`);
  });

  test('properly sets location.href when obfuscated facetime is clicked', () => {
    const wrapper = shallow(<Obfuscate facetime={testTel} />);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual(`facetime:${testTel}`);
  });

  test('properly sets location.href when obfuscated without type is clicked', () => {
    const wrapper = shallow(<Obfuscate>test</Obfuscate>);

    wrapper.simulate('click', { preventDefault: () => {} });
    expect(global.window.location.href).toEqual('test');
  });

  test('renders an unobfuscated href when obfuscate prop equals false', () => {
    const wrapper = shallow(<Obfuscate obfuscate={false} sms={testTel} />);

    expect(wrapper.find('a').text()).toBe(testTel);
    expect(wrapper.prop('href')).toEqual(`sms:${testTel}`);
  });

  test('renders an unobfuscated child element left to right when obfuscate prop equals false', () => {
    const wrapper = shallow(<Obfuscate obfuscate={false} facetime={testTel} />);

    expect(wrapper.find('a').text()).toBe(testTel);
    expect(wrapper.prop('href')).toEqual(`facetime:${testTel}`);
  });

  test('renders an unobfuscated child element right to left when obfuscated', () => {
    const wrapper = shallow(<Obfuscate obfuscate tel={testTel} />);

    expect(wrapper.find('a').text()).toBe(testTelReveresed);
    expect(wrapper.prop('href')).toEqual('obfuscated');
  });

  test('renders a custom element', () => {
    const wrapper = shallow(
      <Obfuscate element="span" viewOnly tel={testTel} />
    );

    expect(wrapper.find('span').text()).toBe(testTelReveresed);
    expect(wrapper.prop('href')).toBeUndefined();
    expect(wrapper.prop('onClick')).toBeUndefined();
  });

  test('calls supplied onClick method', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Obfuscate email={testEmail} onClick={onClick} />);

    wrapper.simulate('mouseover');
    wrapper.simulate('click', { preventDefault: () => {} });
    expect(onClick).toHaveBeenCalled();
    expect(wrapper.prop('href')).toEqual(`mailto:${testEmail}`);
  });

  test('unobfuscates href when user mouses over element', () => {
    const wrapper = shallow(<Obfuscate email={testEmail} />);

    wrapper.simulate('mouseover');
    expect(wrapper.prop('href')).toEqual(`mailto:${testEmail}`);
  });

  test('unobfuscates href when user focuses over element', () => {
    const wrapper = shallow(<Obfuscate email={testEmail} />);

    wrapper.simulate('focus');
    expect(wrapper.prop('href')).toEqual(`mailto:${testEmail}`);
  });

  test('unobfuscates href when user opens context menu over element', () => {
    const wrapper = shallow(<Obfuscate email={testEmail} />);

    wrapper.simulate('contextmenu');
    expect(wrapper.prop('href')).toEqual(`mailto:${testEmail}`);
  });

  test('Human interaction disables onClick setting js location.href', () => {
    const wrapper = shallow(<Obfuscate facetime={testTel} />);
    wrapper.simulate('mouseover');
    wrapper.simulate('click');
    expect(global.window.location.href.toString()).toEqual(originalLocation);
  });

  test('Return empty href link if child is an object and no link is provided', () => {
    const wrapper = shallow(
      <Obfuscate>
        <button type="button">This is a child object</button>
      </Obfuscate>
    );

    wrapper.simulate('mouseover');
    expect(wrapper.prop('href')).toEqual('');
  });

  test('Undefined does not break reversal', () => {
    const wrapper = shallow(<Obfuscate />);
    wrapper.simulate('mouseover');
    expect(wrapper.prop('href')).toBeUndefined();
  });

  test('renders an unobfuscated children when obfuscateChildren is false', () => {
    const wrapper = shallow(
      <Obfuscate obfuscateChildren={false} tel={testTel} />
    );

    expect(wrapper.find('a').text()).toBe(testTel);
    expect(wrapper.prop('href')).toEqual('obfuscated');
    expect(wrapper.prop('style')).toEqual({
      direction: 'ltr',
      unicodeBidi: 'bidi-override',
    });
  });

  test('includes additional style prop values', () => {
    const wrapper = shallow(
      <Obfuscate style={{ color: 'test' }} tel={testTel} />
    );

    expect(wrapper.prop('style')).toEqual({
      color: 'test',
      direction: 'rtl',
      unicodeBidi: 'bidi-override',
    });
  });
});
