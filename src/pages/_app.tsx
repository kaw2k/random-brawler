import React, { useState } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ContextState, Context } from '../utils/context'
import { Brawler } from '../types/brawler'
import { getBrawler } from '../utils/getBrawler'

export default function({ Component, pageProps }: AppProps) {
  const [brawlers, setBrawlers] = useState<Brawler[]>([])

  function removeBrawler() {
    setBrawlers(brawlers.slice(0, -1))
  }

  async function addBrawler() {
    setBrawlers(brawlers.concat(await getBrawler()))
  }

  async function refreshBrawler(brawler: Brawler) {
    const newBrawler = await getBrawler({
      filter: brawlers.map(b => b.brawler),
    })
    setBrawlers(
      brawlers.map(b => (b.uuid === brawler.uuid ? newBrawler[0] : b))
    )
  }

  async function refreshBrawlers() {
    setBrawlers(await getBrawler({ count: brawlers.length }))
  }

  return (
    <Context.Provider
      value={{
        brawlers,
        addBrawler,
        removeBrawler,
        refreshBrawler,
        refreshBrawlers,
      }}>
      <Head>
        <title>Random Brawler</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lilita+One&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>

      <Component {...pageProps} />

      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }

        html,
        a {
          font-family: 'Lilita One', cursive;
          font-size: 20px;
          background-color: #171717;
          color: white;
        }

        html,
        body {
          min-width: 100%;
          min-height: 100%;
        }

        body {
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .svg {
          color: white;
        }

        a,
        button {
          background: none;
          border: 2px solid white;
          font-size: 1em;
          font-family: inherit;
          color: inherit;
          padding: 0.5em 1em;
          cursor: pointer;
          text-decoration: none;
          text-transform: uppercase;
        }
      `}</style>
    </Context.Provider>
  )
}
