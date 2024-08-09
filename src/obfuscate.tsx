import React, { useState, ReactNode, ElementType } from "react";

interface LinkProps {
  email?: string;
  headers?: Record<string, string>;
  tel?: string;
  sms?: string;
  facetime?: string;
  href?: string;
  children?: ReactNode;
}

interface ObfuscateProps extends LinkProps {
  element?: ElementType;
  obfuscate?: boolean;
  obfuscateChildren?: boolean;
  linkText?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const combineHeaders = (params: Record<string, string>) => {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
};

const generateLink = ({
  email,
  headers,
  tel,
  sms,
  facetime,
  href,
  children,
}: LinkProps) => {
  if (email) {
    let link = `mailto:${email}`;
    if (headers) {
      link += `?${combineHeaders(headers)}`;
    }
    return link;
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

  if (typeof children !== "object") {
    return children;
  }

  return "";
};

const Obfuscate = ({
  element = "a",
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
}: ObfuscateProps) => {
  const [humanInteraction, setHumanInteraction] = useState(false);
  const linkProps = children || tel || sms || facetime || email || href;
  const Component = element;

  const handleClick = () => {
    // Allow instantiator to provide an onClick method to be called
    // before we change location (e.g. for analytics tracking)
    if (onClick && typeof onClick === "function") {
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
      }) as string;
    }
  };

  const reverse = (
    content:
      | string
      | number
      | boolean
      | React.ReactElement<
          unknown,
          string | React.JSXElementConstructor<unknown>
        >
      | Iterable<React.ReactNode>
      | undefined,
  ) =>
    typeof content === "string" &&
    content.split("").reverse().join("").replace("(", ")").replace(")", "(");

  const renderedLink =
    humanInteraction === true ||
    obfuscate === false ||
    typeof children === "object" ||
    obfuscateChildren === false // Allow child elements
      ? linkProps
      : reverse(linkProps as string);

  const clickProps =
    Component === "a"
      ? {
          href:
            humanInteraction === true || obfuscate === false
              ? generateLink({
                  email,
                  headers,
                  tel,
                  sms,
                  facetime,
                  href,
                  children,
                })
              : linkText || "obfuscated",
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
      style={{
        ...style,
        unicodeBidi: "bidi-override",
        direction:
          humanInteraction === true ||
          obfuscate === false ||
          obfuscateChildren === false
            ? "ltr"
            : "rtl",
      }}
    >
      {renderedLink}
    </Component>
  );
};

export default Obfuscate;
