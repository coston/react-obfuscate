import React, { useState } from 'react';
import T from 'prop-types';

function Obfuscate(props) {
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
    let link = '';
  
    if (email) {
      link = email.toLowerCase();
      if (!link.startsWith('mailto:')) {
        link = `mailto:${link}`;        
      }
      if (headers) {
        const headerParams = new URLSearchParams(headers).toString();
        link += `?${headerParams}`;
      }
    } else if (tel) {
      link = tel.startsWith('tel:') ? tel : `tel:${tel}`;
    } else if (sms) {
      link = sms.startsWith('sms:') ? sms : `sms:${sms}`;
    } else if (facetime) {
      link = facetime.startsWith('facetime:') ? facetime : `facetime:${facetime}`;
    } else if (href) {
      link = href;
    } else if (typeof children === 'string') {
      link = children;
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
      window.location.href = generateLink();
    }
  };

  const reverse = (content) =>
    typeof content !== 'undefined' &&
    content.split('').reverse().join('').replace('(', ')').replace(')', '(');

  const obfuscatedStyle = {
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
      ? linkProps
      : reverse(linkProps);

  const clickProps =
    Component === 'a'
      ? {
          href:
            humanInteraction === true || obfuscate === false
              ? generateLink()
              : linkText || 'obfuscated',
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
}

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
  className: T.string
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
  className: ''
};

export default Obfuscate;
