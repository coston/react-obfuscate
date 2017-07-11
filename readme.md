# React-Obfuscate [![Build Status](https://travis-ci.org/coston/react-obfuscate.png?branch=master)](https://travis-ci.org/coston/react-obfuscate)

> An intelligent React component to obfuscate any contact link

## How it works
The user passes the contact link as a ```email, tel, sms, or facetime``` prop. The component obfuscates href data until an onClick event. The link is rendered in reverse in the dom, but reversed again with css. This making the link user friendly on screen, but useless for spammers.

## Why
The world needs obfuscated links that display the link in a friendly way.

## Usage
```bash
npm install --save react-obfuscate
```

### Input 
```javascript
import react = from 'react'
import Obfuscate = from 'react-obfuscate'

export default () => (
  <p>
    Phone: <Obfuscate tel='205-454-1234' /><br />
    Email: <Obfuscate 
      email='hello@coston.cool' 
      headers={
        {subject:'Question from the website'},
        {cc:'friend@coston.cool'}
        }/>
  </p>
)
```

### Output
```html
<p>
  Phone: <a href="obfuscated" style="direction: rtl; unicode-bidi: bidi-override;">4321-454-502</a><br>
  Email: <a href="obfuscated" style="direction: rtl; unicode-bidi: bidi-override;">looc.notsoc@olleh</a>
</p>
```

## Options

Prop      | Type      | Argument     | Default   | Description
----------|-----------|--------------|-----------|------------
email     | `string`  | `<optional>` | `null`    | email address of the intended recipient.
tel       | `string`  | `<optional>` | `null`    | telephone number of the intended recipient.
sms       | `string`  | `<optional>` | `null`    | sms number of the intended recipient.
facetime  | `string`  | `<optional>` | `null`    | facetime address of the intended recipient.
obfuscate | `boolean` | `<optional>` | `true`    | set to false if you would like.
headers   | `object`  | `<optional>` | `null`    | any standard mail header fields. The most commonly-used of these are "subject", "cc", and "body" (which is not a true header field, but allows you to specify a short content message for the new email).


## Development

```bash
npm run build
```


## Contributing
Please help make this react component better. Submit any issue and/or make a pull request!

### To Do
- Write some good tests
- Convert clipboard text left to right

## License
Licensed under the MIT license.