
import React from 'react'
import Head from 'next/head'
import Obfuscate from '../src/obfuscate'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Browser, Terminal } from 'react-window-ui'

class App extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>react-obfuscate ☁️</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <style>{`
      html {
        background-image: linear-gradient(-225deg, #2cd8d5, #c5c1ff 56%, #ffbac3);
        min-height: 100%;
      }
    `}</style>
        <div style={{
          fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
          fontSize: '14px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '760px',
          padding: '1em',
        }}>
          <h1>react-obfuscate ☁️</h1>
          <h2><a href="https://github.com/coston/react-obfuscate">View project on GitHub</a></h2>
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
                <LiveEditor style={{ color: 'white', background: 'black', overflow: 'scroll' }} />
                <LiveError />
              </Terminal>
            </LiveProvider>
            <br />
            <h2 id="howitworks">How it works</h2>

            <p>
              Pass the contact link as an <Code>email</Code>, <Code>tel</Code>, <Code>sms</Code>, or <Code>facetime</Code>{' '}
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

            <h2 id="usage">Install</h2>

            <p>
              <Code>npm install react-obfuscate --save</Code>
            </p>
            <p>
              <a
                target="_blank"
                href="https://www.npmjs.com/package/react-obfuscate"
              >
                Read the complete docs at npm
          </a>
            </p>
          <div className="hint">
          </div>
        </div>
      </div>
    )
  }
}

export default App

const Code = props => (
  <code style={{background:"black", color: "white", padding: '1px 5px'}}>{props.children}</code>
)

const headerCode = `
<div>
  <h2>🔖Try Me</h2>
  <p>
    Inspect and click these robot-resistant, user friendly, contact links
  </p>
  <p>
    ➡️ Phone: 
    <Obfuscate tel="(202) 224-5744" />
    <br />
    ➡️ Email:
    <Obfuscate 
      email="coston.perkins@ua.edu" 
      headers={{
        cc: 'kate@acidburn.af',
        bcc: 'tanderson@metacortex.net',
        subject: 'react-obfuscate',
        body: 'Down with the machines!'
     }}
    />
    <br/>
    ➡️ sms: 
    <Obfuscate sms="+1 (202) 224-5744" />
    <br />
    ➡️ facetime: 
    <Obfuscate facetime="202.224.5744" />
    <br />
    ➡️ Children and Styles:
    <Obfuscate 
      style={{color: 'red', 
      fontWeight:'Bold'}} 
      tel="(202) 224-5744"
    >
      Call me!
    </Obfuscate>
  </p>
</div>
`.trim()
