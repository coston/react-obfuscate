import React, { useState } from 'react';
import T from 'prop-types';

const Obfuscate = (props) => {
  const {
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
  } = props;

  const [humanInteraction, setHumanInteraction] = useState(false);
  const linkProps = children || tel || sms || facetime || email || href;
  const Component = element;

  const generateLink = () => {
    let link;

    // Combine email header parameters for use with email
    const combineHeaders = (params) => {
      return Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
    };

    if (email) {
      link = `mailto:${email}`;

      if (headers) {
        link += `?${combineHeaders(headers)}`;
      }
    } else if (tel) {
      link = `tel:${tel}`;
    } else if (sms) {
      link = `sms:${sms}`;
    } else if (facetime) {
      link = `facetime:${facetime}`;
    } else if (href) {
      link = href;
    } else if (typeof children !== 'object') {
      link = children;
    } else {
      return '';
    }

    return link;
  };

  const handleClick = () => {
    // Allow instantiator to provide an onClick method to be called
    // before we change location (e.g. for analytics tracking)
    if (onClick && typeof onClick === 'function') {
      onClick();
    }

    // If focused or hovered, this js will be skipped with preference for html
    if (humanInteraction === false) {
      window.location.href = generateLink({
        email,
        headers,
        tel,
        sms,
        facetime,
        href,
        children,
      });
    }
  };

  const reverse = (content) =>
    typeof content !== 'undefined' &&
    content.split('').reverse().join('').replace('(', ')').replace(')', '(');

  const obfuscatedStyle = linkText
    ? style
    : {
        ...style,
        unicodeBidi: 'bidi-override',
        direction:
          humanInteraction === true ||
          obfuscate === false ||
          obfuscateChildren === false
            ? 'ltr'
            : 'rtl',
      };

  const renderedLink =
    humanInteraction === true ||
    obfuscate === false ||
    typeof children === 'object' ||
    obfuscateChildren === false // Allow child elements
      ? linkText || linkProps
      : linkText || reverse(linkProps);

  const clickProps =
    Component === 'a'
      ? {
          href:
            humanInteraction === true || obfuscate === false
              ? generateLink()
              : 'obfuscated',
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
      {renderedLink}
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
  children: undefined,
  tel: undefined,
  sms: undefined,
  facetime: undefined,
  email: undefined,
  href: undefined,
  headers: undefined,
  obfuscate: undefined,
  obfuscateChildren: undefined,
  linkText: undefined,
  style: {},
  onClick: undefined,
};

export default Obfuscate;
