import React, { useState } from 'react';
import T from 'prop-types';

const combineHeaders = (params) => {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const generateLink = ({
  email,
  headers,
  tel,
  sms,
  facetime,
  href,
  children,
}) => {
  if (email) {
    if (headers) {
      return `mailto:${email}?${combineHeaders(headers)}`;
    }
    return `mailto:${email}`;
  }
  if (tel) {
    return `tel:${tel}`;
  }
  if (sms) {
    return `sms:${sms}`;
  }
  if (facetime) {
    return `facetime:${facetime}`;
  }
  if (href) {
    return href;
  }
  if (typeof children !== 'object') {
    return children;
  }
  return '';
};

const reverse = (content) =>
  typeof content !== 'undefined' &&
  content.split('').reverse().join('').replace('(', ')').replace(')', '(');

const Obfuscate = ({
  element,
  children,
  tel,
  sms,
  facetime,
  email,
  href,
  headers,
  obfuscate,
  obfuscateChildren,
  linkText,
  style,
  onClick,
  ...others
}) => {
  const [humanInteraction, setHumanInteraction] = useState(false);
  const linkProps = children || tel || sms || facetime || email || href;
  const Component = element;

  const linkFromProps = generateLink({
    email,
    headers,
    tel,
    sms,
    facetime,
    href,
    children,
  });

  const handleClick = () => {
    // If focused or hovered, this js will be skipped with preference for html
    if (humanInteraction === false) {
      // Allow instantiator to provide an onClick method to be called
      // before we change location (e.g. for analytics tracking)
      if (onClick && typeof onClick === 'function') {
        onClick();
      }
      window.location.href = linkFromProps;
    }
  };

  const obfuscationOff = humanInteraction === true || obfuscate === false;
  const useClearText = obfuscationOff || obfuscateChildren === false;
  const obfuscatedStyle = {
    ...style,
    unicodeBidi: 'bidi-override',
    writingMode: !useClearText ? 'horizontal-bt' : null,
    direction: !useClearText ? 'rtl' : 'ltr',
  };

  const visibleLink =
    useClearText || typeof children === 'object'
      ? linkProps
      : reverse(linkProps);

  const clickProps =
    Component === 'a'
      ? {
          href: obfuscationOff ? linkFromProps : linkText,
          onClick: handleClick,
        }
      : {};

  return (
    <Component
      onFocus={() => setHumanInteraction(true)}
      onMouseOver={() => setHumanInteraction(true)}
      onContextMenu={() => setHumanInteraction(true)}
      {...others}
      {...clickProps}
      style={obfuscatedStyle}
    >
      {visibleLink}
    </Component>
  );
};

Obfuscate.propTypes = {
  element: T.string,
  children: T.node,
  tel: T.string,
  sms: T.string,
  facetime: T.string,
  email: T.string,
  href: T.string,
  headers: T.shape({}),
  obfuscate: T.bool,
  obfuscateChildren: T.bool,
  linkText: T.string,
  style: T.shape({}),
  onClick: T.func,
};

Obfuscate.defaultProps = {
  element: 'a',
  linkText: 'obfuscated',
  children: undefined,
  tel: undefined,
  sms: undefined,
  facetime: undefined,
  email: undefined,
  href: undefined,
  headers: undefined,
  obfuscate: undefined,
  obfuscateChildren: undefined,
  style: {},
  onClick: undefined,
};

export default Obfuscate;
