import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import Obfuscate from '../src/obfuscate'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { Browser, Terminal } from 'react-window-ui'

class App extends React.Component {
  render() {
    return (
      <div>
        <p>
          <a
            style={{ borderBottom: 'none' }}
            target="_blank"
            href="https://travis-ci.org/coston/react-obfuscate"
          >
            <img
              src="https://img.shields.io/travis/coston/react-obfuscate.svg"
              alt="Travis"
            />
          </a>&nbsp;
          <a
            style={{ borderBottom: 'none' }}
            target="_blank"
            href="https://www.npmjs.com/package/react-obfuscate"
          >
            <img
              src="https://badge.fury.io/js/react-obfuscate.svg"
              alt="npm version"
            />
          </a>&nbsp;
          <a
            style={{ borderBottom: 'none' }}
            target="_blank"
            href="https://www.npmjs.com/package/react-obfuscate"
          >
            <img
              src="https://img.shields.io/npm/dm/react-obfuscate.svg"
              alt="npm"
            />
          </a>&nbsp;
        </p>
        <LiveProvider
          code={headerCode}
          scope={{
            styled,
            Obfuscate,
          }}
        >
          <div
            style={{
              height: 'auto',
              minWidth: '100%',
              marginBottom: '2em',
            }}
          >
            <Browser>
              <LivePreview />
            </Browser>
          </div>
          <Terminal>
            <LiveEdit style={{ background: 'black' }} />
            <LiveError />
          </Terminal>
        </LiveProvider>
        <br />
        <h2 id="howitworks">How it works</h2>

        <p>
          Pass the contact link as an <code>email, tel, sms, or facetime</code>{' '}
          prop. The component obfuscates href data until an onClick event. Links
          are given their proper URL schemes (mailto, facetime, etc.) The link
          is rendered in reverse in the dom, but reversed again with css. This
          making the link useless for spammers, but user friendly on screen.
        </p>

        <h2 id="why">Why</h2>

        <p>
          The world needs obfuscated links that display the link in a friendly
          way.
        </p>

        <h2 id="usage">Usage</h2>

        <p>
          <code>npm install react-obfuscate --save</code>
        </p>
        <p>
          <a
            target="_blank"
            href="https://www.npmjs.com/package/react-obfuscate"
          >
            Read the complete docs at npm
          </a>
        </p>
      </div>
    )
  }
}

export default App

const headerCode = `
<div>
  <h2>🔖Try Me</h2>
  <p>
    Inspect and click these robot-resistant, user friendly, contact links
  </p>
  <p>
    ➡️ Phone: 
    <Obfuscate tel="012-345-6789" />
    <br />
    ➡️ Email:
    <Obfuscate 
      email="hello@coston.cool" 
      headers={{ subject: 'wow' }}
    />
  </p>
</div>
`.trim()

const LiveEdit = styled(LiveEditor)`
  overflow: scroll;
`

ReactDOM.render(<App />, document.getElementById('app'))
