import React from 'react';
import Head from 'next/head';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Obfuscate from '../src';
import { Browser, Terminal } from 'react-window-ui';

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
                min-height: 100%;
                background: #ffd0d4;
            }
            a {
                color: #000;
            }
            a:hover {
                    background:#fc929e;
                }
            h1 {
                font-size: 2.5em;
            }
            h2 {
                border-bottom: 3px solid #000;
            }
            code {
                font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
                background:rgba(255,255,255,0.7);
                color: black;
            }
            ::-moz-selection { background: #fc929e; color: #000;}
            ::selection { background: #fc929e; color: #000; }
            ul li, ol li {
              line-height:140%; 
            }
            table {
              border-collapse: collapse;
              background:rgba(255,255,255,0.7);
          }

          th,
          td {
              border: 1px solid #000;
              padding: 0.75rem;
              text-align: left;
          }

          th {
              font-weight: bold;
              white-space: nowrap;
              background: #000;
              color: #fff;
          }

          tr:first-of-type th:not(:last-child) {
              border-right-color: transparent;
          }

          tr:first-child th:first-child,
          tr:not(:first-child):not(:last-child) th {
              border-bottom-color: transparent !important;
          }
    `}</style>

        <div
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '900px',
            padding: '1em',
          }}
        >
          <h1>react-obfuscate ☁️</h1>
          <p>
            <a
              style={{ borderBottom: 'none', marginRight: '5px' }}
              target="_blank"
              href="https://coveralls.io/github/coston/react-obfuscate?branch=master"
            >
              <img
                src="https://coveralls.io/repos/github/coston/react-obfuscate/badge.svg?branch=master"
                alt="Coverage Status"
              />
            </a>
            <a
              style={{ borderBottom: 'none', marginRight: '5px' }}
              target="_blank"
              href="https://travis-ci.org/coston/react-obfuscate"
            >
              <img
                src="https://travis-ci.org/coston/react-obfuscate.svg?branch=master"
                alt="Travis"
              />
            </a>
            <a
              style={{ borderBottom: 'none', marginRight: '5px' }}
              target="_blank"
              href="https://www.npmjs.com/package/react-obfuscate"
            >
              <img
                src="https://badge.fury.io/js/react-obfuscate.svg"
                alt="npm version"
              />
            </a>
            <a
              style={{ borderBottom: 'none', marginRight: '5px' }}
              target="_blank"
              href="https://www.npmjs.com/package/react-obfuscate"
            >
              <img
                src="https://img.shields.io/npm/dm/react-obfuscate.svg"
                alt="npm"
              />
            </a>
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
              <div>
                <h2>Try Me</h2>
                <p>
                  Inspect and click these robot-resistant, user friendly,
                  contact links
                </p>
                <Browser boxShadow="none">
                  <LivePreview />
                </Browser>
              </div>
            </div>
            <h2>Live Code</h2>
            <Terminal boxShadow="none">
              <LiveEditor
                aria-describedby="Live Code Editor"
                theme={theme}
                style={{
                  background: 'black',
                  overflow: 'scroll',
                }}
              />
              <LiveError />
            </Terminal>
          </LiveProvider>

          <h2 id="howitworks">How It Works</h2>

          <p>
            Pass the contact link as an <code>email</code>, <code>tel</code>,{' '}
            <code>sms</code>, <code>facetime</code>, or <code>href</code> prop.
            The component obfuscates href data until an onClick event. Links are
            given their proper URL schemes (mailto, facetime, etc.) The link is
            rendered in reverse in the dom, but reversed again with css. This
            making the link useless for spammers, but user friendly on screen.
          </p>

          <h2 id="why">Why</h2>

          <p>
            The world needs obfuscated links that display the link in a friendly
            way.
          </p>

          <h2 id="usage">Install</h2>

          <p>
            <code>npm install react-obfuscate --save</code>
          </p>

          <h2>Github</h2>
          <p>
            <a href="https://github.com/coston/react-obfuscate">
              View documentation on GitHub
            </a>
          </p>
          <div className="hint" />
        </div>
      </div>
    );
  }
}

export default App;

const theme /*: PrismTheme */ = {
  plain: {
    color: '#fc929e',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: '#fc929e',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: '#fff',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: '#9a86fd',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#fff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#fff',
      },
    },
    {
      types: [
        'boolean',
        'string',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'at-rule',
        'placeholder',
        'variable',
      ],
      style: {
        color: '#fc929e',
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#6c6783',
      },
    },
  ],
};

const headerCode = `
<>
<table>
  <tr>
    <th>Name</th>
    <th>Email</th> 
  </tr>
  <tr>
  <td>Calderón de la Barca</td>
    <td><Obfuscate 
      email="1111111111111-22222222222222@333333333333333-44444444444.io" 
    /></td> 
  </tr>
</table>
<ul>
  <li>
    Telephone: 
    <Obfuscate tel="(202) 224-5744" />
  </li>

  <li>
    Email: 
    <Obfuscate 
      email="hello@coston.io" 
      headers={{
        cc: 'kate@acidburn.af',
        bcc: 'tanderson@metacortex.net',
        subject: 'react-obfuscate',
        body: 'Down with the machines!'
      }}
    />
  </li>

  <li>
    SMS: 
    <Obfuscate sms="+1 (202) 224-5744" />
  </li>

  <li>
    Facetime: 
    <Obfuscate facetime="202.224.5744" />
  </li>

  <li>
    Any other URL: 
    <Obfuscate href="https://wa.me/15551234567">
      Chat On WhatsApp
    </Obfuscate>
  </li>

  <li>
    Child Elements: 
    <Obfuscate email="hello@coston.io" aria-label="Email Me">
      <svg width={24} height={21}>
        <path 
          fill="#000" 
          d="M12 12.713L.0 3h23.97L12 12.713zm0 2.574L0 5.562V21h24V5" 
        />
      </svg>
    </Obfuscate>
  </li>
</ul>
</>
`.trim();
