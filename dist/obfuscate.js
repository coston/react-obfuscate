'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var combineHeaders = function combineHeaders() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.keys(params).map(function (key) {
    return key + '=' + encodeURIComponent(params[key]);
  }).join('&');
};

var createContactLink = function createContactLink(tel, sms, facetime, email, headers) {
  var link = void 0;
  if (email) {
    link = 'mailto:' + email;
    if (headers) {
      link += '?' + combineHeaders(headers);
    }
  } else if (tel) {
    link = 'tel:' + tel;
  } else if (sms) {
    link = 'sms:' + sms;
  } else if (facetime) {
    link = 'facetime:' + facetime;
  }
  return link;
};

var Obfuscate = function (_Component) {
  _inherits(Obfuscate, _Component);

  function Obfuscate(props) {
    _classCallCheck(this, Obfuscate);

    var _this = _possibleConstructorReturn(this, (Obfuscate.__proto__ || Object.getPrototypeOf(Obfuscate)).call(this, props));

    _this.state = {
      humanInteraction: false
    };
    return _this;
  }

  _createClass(Obfuscate, [{
    key: 'render',
    value: function render() {
      return this.props.obfuscate === false ? this.renderLink() : this.renderObfuscatedLink();
    }
  }, {
    key: 'renderLink',
    value: function renderLink() {
      var _props = this.props,
          tel = _props.tel,
          sms = _props.sms,
          facetime = _props.facetime,
          email = _props.email,
          obfuscate = _props.obfuscate,
          headers = _props.headers,
          children = _props.children,
          others = _objectWithoutProperties(_props, ['tel', 'sms', 'facetime', 'email', 'obfuscate', 'headers', 'children']);

      return _react2.default.createElement(
        'a',
        _extends({
          href: createContactLink(tel, sms, facetime, email, headers)
        }, others),
        children || tel || sms || facetime || email
      );
    }
  }, {
    key: 'reverse',
    value: function reverse(s) {
      return s.split('').reverse().join('');
    }
  }, {
    key: 'renderObfuscatedLink',
    value: function renderObfuscatedLink() {
      var _this2 = this;

      var _props2 = this.props,
          tel = _props2.tel,
          sms = _props2.sms,
          facetime = _props2.facetime,
          email = _props2.email,
          obfuscate = _props2.obfuscate,
          headers = _props2.headers,
          children = _props2.children,
          style = _props2.style,
          linkText = _props2.linkText,
          others = _objectWithoutProperties(_props2, ['tel', 'sms', 'facetime', 'email', 'obfuscate', 'headers', 'children', 'style', 'linkText']);

      var obsStyle = this.state.humanInteraction === true || children ? _extends({}, style || {}, {
        unicodeBidi: 'bidi-override',
        display: 'inline-block',
        direction: 'ltr'
      }) : _extends({}, style || {}, {
        unicodeBidi: 'bidi-override',
        display: 'inline-block',
        direction: 'rtl'
      });

      var link = function link(state) {
        return _this2.state.humanInteraction === true ? children || tel || sms || facetime || email : children || _this2.reverse(tel || sms || facetime || email).replace('(', ')').replace(')', '(');
      };

      return _react2.default.createElement(
        'a',
        _extends({
          onClick: this.handleClick.bind(this),
          onFocus: this.handleCopiability.bind(this),
          onMouseOver: this.handleCopiability.bind(this),
          onContextMenu: this.handleCopiability.bind(this),
          href: linkText || 'obfuscated'
        }, others, {
          style: obsStyle
        }),
        link()
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      var _props3 = this.props,
          tel = _props3.tel,
          sms = _props3.sms,
          facetime = _props3.facetime,
          email = _props3.email,
          headers = _props3.headers;

      window.location.href = createContactLink(tel, sms, facetime, email, headers);
    }
  }, {
    key: 'handleCopiability',
    value: function handleCopiability() {
      this.setState(function (state) {
        return _extends({}, state, {
          humanInteraction: true
        });
      });
    }
  }]);

  return Obfuscate;
}(_react.Component);

exports.default = Obfuscate;