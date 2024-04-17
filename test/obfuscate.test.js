import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Obfuscate from '../src/obfuscate';

const testEmail = 'coston.perkins@ua.edu';
const testTel = '205-454-1234';
const testHref = 'https://test-href.com/';
const testTelReversed = '4321-454-502';
const originalLocation = 'https://example.com/';

describe('obfuscate', () => {
  beforeEach(() => {
    delete global.window.location;

    global.window.location = {
      href: new URL(originalLocation),
    };
  });

  test('renders an obfuscated href', () => {
    const { getByRole } = render(<Obfuscate tel={testTel} />);

    expect(getByRole('link')).toHaveAttribute('href', 'obfuscated');
  });

  test('properly sets location.href when obfuscated email is clicked', () => {
    const { getByRole } = render(<Obfuscate email={testEmail} />);

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual(`mailto:${testEmail}`);
  });

  test('properly sets location.href when obfuscated email with headers is clicked', () => {
    const headers = {
      cc: 'dade@zero-cool.af',
      bcc: 'smith@machina.net',
      subject: 'react-obfuscate',
      body: 'Down with the machines!',
    };
    const { getByRole } = render(
      <Obfuscate email={testEmail} headers={headers} />
    );

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual(
      `mailto:${testEmail}?${Object.keys(headers)
        .map((key) => `${key}=${encodeURIComponent(headers[key])}`)
        .join('&')}`
    );
  });
  test('properly sets location.href when obfuscated tel is clicked', () => {
    const { getByRole } = render(<Obfuscate tel={testTel} />);

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual(`tel:${testTel}`);
  });

  test('properly sets location.href when obfuscated href is clicked', () => {
    const { getByRole } = render(<Obfuscate href={testHref} />);

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual(testHref);
  });

  test('properly sets location.href when obfuscated sms is clicked', () => {
    const { getByRole } = render(<Obfuscate sms={testTel} />);

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual(`sms:${testTel}`);
  });

  test('properly sets location.href when obfuscated facetime is clicked', () => {
    const { getByRole } = render(<Obfuscate facetime={testTel} />);

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual(`facetime:${testTel}`);
  });

  test('properly sets location.href using the child content when obfuscated without type is clicked', () => {
    const { getByRole } = render(<Obfuscate>test</Obfuscate>);

    fireEvent.click(getByRole('link'));
    expect(global.window.location.href).toEqual('test');
  });

  test('renders an unobfuscated href when obfuscate prop equals false', () => {
    const { getByRole } = render(<Obfuscate obfuscate={false} sms={testTel} />);

    expect(getByRole('link')).toHaveAttribute('href', `sms:${testTel}`);
  });

  test('renders an unobfuscated child element left to right when obfuscate prop equals false', () => {
    const { getByRole } = render(
      <Obfuscate obfuscate={false} facetime={testTel} />
    );

    expect(getByRole('link')).toHaveTextContent(testTel);
    expect(getByRole('link')).toHaveAttribute('href', `facetime:${testTel}`);
  });

  test('renders an unobfuscated child element right to left when obfuscated', () => {
    const { getByRole } = render(<Obfuscate obfuscate tel={testTel} />);

    expect(getByRole('link')).toHaveTextContent(testTelReversed);
    expect(getByRole('link')).toHaveAttribute('href', 'obfuscated');
  });

  test('renders a custom element', () => {
    const { getByRole } = render(
      <Obfuscate element="span" role="link" tel={testTel} />
    );

    expect(getByRole('link')).toHaveTextContent(testTelReversed);
    expect(getByRole('link')).not.toHaveAttribute('href');
    expect(getByRole('link')).not.toHaveAttribute('onClick');
  });

  test('calls supplied onClick method', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Obfuscate email={testEmail} onClick={onClick} />
    );

    fireEvent.mouseOver(getByRole('link'));
    fireEvent.click(getByRole('link'));
    expect(onClick).toHaveBeenCalled();
    expect(getByRole('link')).toHaveAttribute('href', `mailto:${testEmail}`);
  });

  test('unobfuscates href when user mouses over element', () => {
    const { getByRole } = render(<Obfuscate email={testEmail} />);

    fireEvent.mouseOver(getByRole('link'));
    expect(getByRole('link')).toHaveAttribute('href', `mailto:${testEmail}`);
  });

  test('unobfuscates href when user focuses over element', () => {
    const { getByRole } = render(<Obfuscate email={testEmail} />);

    fireEvent.focus(getByRole('link'));
    expect(getByRole('link')).toHaveAttribute('href', `mailto:${testEmail}`);
  });

  test('unobfuscates href when user opens context menu over element', () => {
    const { getByRole } = render(<Obfuscate email={testEmail} />);

    fireEvent.contextMenu(getByRole('link'));
    expect(getByRole('link')).toHaveAttribute('href', `mailto:${testEmail}`);
  });

  test('Human interaction disables onClick setting js location.href', () => {
    const { getByRole } = render(<Obfuscate facetime={testTel} />);

    fireEvent.mouseOver(getByRole('link'));
    fireEvent.click(getByRole('link'));
    expect(global.window.location.href.toString()).toEqual(originalLocation);
  });

  test('Return empty href link if child is an object and no link is provided', () => {
    const { getByRole } = render(
      <Obfuscate>
        <button type="button">This is a child object</button>
      </Obfuscate>
    );

    fireEvent.mouseOver(getByRole('button'));
    expect(getByRole('button').closest('a')).toHaveAttribute('href', '');
  });

  test('Undefined does not break reversal', () => {
    const { getByRole } = render(<Obfuscate role="link" />);

    fireEvent.mouseOver(getByRole('link'));
    expect(getByRole('link')).not.toHaveAttribute('href');
  });

  test('renders an unobfuscated children when obfuscateChildren is false', () => {
    const { getByRole } = render(
      <Obfuscate obfuscateChildren={false} tel={testTel} />
    );

    expect(getByRole('link')).toHaveTextContent(testTel);
    expect(getByRole('link')).toHaveAttribute('href', 'obfuscated');
    expect(getByRole('link')).toHaveStyle({
      direction: 'ltr',
      unicodeBidi: 'bidi-override',
    });
  });

  test('includes additional style prop values', () => {
    const { getByRole } = render(
      <Obfuscate style={{ color: 'test' }} tel={testTel} />
    );

    expect(getByRole('link')).toHaveStyle({
      color: 'test',
      direction: 'rtl',
      unicodeBidi: 'bidi-override',
    });
  });
});
