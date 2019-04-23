"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Obfuscate =
/*#__PURE__*/
function (_Component) {
  _inherits(Obfuscate, _Component);

  function Obfuscate(props) {
    var _this;

    _classCallCheck(this, Obfuscate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Obfuscate).call(this, props));
    _this.state = {
      humanInteraction: false
    };
    return _this;
  } // Convert contact information to contact URL scheme


  _createClass(Obfuscate, [{
    key: "createContactLink",
    value: function createContactLink(props) {
      var link; // Combine email header parameters for use with email

      var combineHeaders = function combineHeaders(params) {
        return Object.keys(params).map(function (key) {
          return "".concat(key, "=").concat(encodeURIComponent(params[key]));
        }).join('&');
      };

      if (props.email) {
        link = "mailto:".concat(props.email);

        if (props.headers) {
          link += "?".concat(combineHeaders(props.headers));
        }
      } else if (props.tel) {
        link = "tel:".concat(props.tel);
      } else if (props.sms) {
        link = "sms:".concat(props.sms);
      } else if (props.facetime) {
        link = "facetime:".concat(props.facetime);
      } else if (props.href) {
        link = props.href;
      } else if (_typeof(props.children) !== 'object') {
        link = props.children;
      } else {
        return '';
      }

      return link;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var onClick = this.props.onClick; // If focused or hovered, this js will be skipped with preference for html

      if (this.state.humanInteraction === false) {
        event.preventDefault(); // Allow instantiator to provide an onClick method to be called
        // before we change location (e.g. for analytics tracking)

        if (onClick && typeof onClick === 'function') {
          onClick();
        }

        window.location.href = this.createContactLink(this.props);
      }
    }
  }, {
    key: "handleCopiability",
    value: function handleCopiability() {
      this.setState({
        humanInteraction: true
      });
    }
  }, {
    key: "reverse",
    value: function reverse(string) {
      if (typeof string !== 'undefined') {
        return string.split('').reverse().join('').replace('(', ')').replace(')', '(');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var humanInteraction = this.state.humanInteraction;

      var _this$props = this.props,
          _this$props$element = _this$props.element,
          Element = _this$props$element === void 0 ? 'a' : _this$props$element,
          children = _this$props.children,
          tel = _this$props.tel,
          sms = _this$props.sms,
          facetime = _this$props.facetime,
          email = _this$props.email,
          href = _this$props.href,
          headers = _this$props.headers,
          obfuscate = _this$props.obfuscate,
          obfuscateChildren = _this$props.obfuscateChildren,
          linkText = _this$props.linkText,
          style = _this$props.style,
          others = _objectWithoutProperties(_this$props, ["element", "children", "tel", "sms", "facetime", "email", "href", "headers", "obfuscate", "obfuscateChildren", "linkText", "style"]);

      var propsList = children || tel || sms || facetime || email || href;

      var obsStyle = _objectSpread({}, style || {}, {
        unicodeBidi: 'bidi-override',
        direction: humanInteraction === true || obfuscate === false || obfuscateChildren === false ? 'ltr' : 'rtl'
      });

      var link = humanInteraction === true || obfuscate === false || _typeof(children) === 'object' || obfuscateChildren === false // Allow child elements
      ? propsList : this.reverse(propsList);
      var clickProps = Element === 'a' ? {
        href: humanInteraction === true || obfuscate === false ? this.createContactLink(this.props) : linkText || 'obfuscated',
        onClick: this.handleClick.bind(this)
      } : {};

      var props = _objectSpread({
        onFocus: this.handleCopiability.bind(this),
        onMouseOver: this.handleCopiability.bind(this),
        onContextMenu: this.handleCopiability.bind(this)
      }, others, clickProps, {
        style: obsStyle
      });

      return _react["default"].createElement(Element, props, link);
    }
  }]);

  return Obfuscate;
}(_react.Component);

exports["default"] = Obfuscate;