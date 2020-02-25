// @ts-check

import { shuffle } from './shuffle.js'
import { html } from './html.js'

// ============================================================
// TYPES
// ============================================================

/**
 * @typedef {Object} Brawler
 * @property {string} uuid
 * @property {string} brawler
 * @property {string} starPower
 */

/**
 * @typedef {Object} GameMap
 * @property {string} mode
 * @property {string} src
 * @property {string} title
 */

/**
 * @typedef {Object} GameMode
 * @property {string} mode
 * @property {string} src
 */

/**
 * @typedef {Object}
 * @param {Brawler[]} brawlers
 * @param {GameMap} map
 * @param {GameMode[]} modes
 */

const STATE = {
  _brawlers: [],
  get brawlers() {
    return this._brawlers
  },
  set brawlers(brawlers) {
    this._brawlers = brawlers
    document.getElementById('team').innerHTML = this.brawlers
      .map(Brawler)
      .join('')
  },

  _map: null,
  get map() {
    return this._map
  },
  set map(map) {
    this._map = map
    const $map = document.getElementById('map')
    if (map) {
      $map.innerHTML = GameMap(map)
    } else {
      $map.innerHTML = ''
    }
  },

  _modes: [],
  get mode() {
    return this._modes
  },
  set modes(modes) {
    this._modes = modes
    document.getElementById('modes').innerHTML = this._modes
      .map(GameMode)
      .join('')
  },
}

// ============================================================
// DATA FETCHERS
// ============================================================
function getModes() {
  return fetch('/api/modes').then(res => res.json())
}

function getMap() {
  const modes = [...document.getElementsByName('mode')]
    .filter(node => node.checked)
    .map(node => node.value)

  return fetch(`/api/map?modes=${modes.join(',')}`).then(res => res.json())
}

/**
 * @param {number} count
 * @returns {Promise<Brawler[]>}
 */
function getBrawler(count = 1) {
  return fetch(`/api/brawler?count=${count}`).then(res => res.json())
}

// ============================================================
// RENDERERS
// ============================================================

/**
 * @param {Brawler} brawler
 * @returns {string}
 */
function Brawler(brawler) {
  const starSrc = brawler.starPower
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z\-]/g, '')
  const starImage = `https://www.starlist.pro/assets/star-powers/${starSrc}.png`

  return html`
    <div class="brawler">
      <button onclick="reload(${brawler.uuid})">
        <div class="profile">
          <img
            class="image"
            src="https://www.starlist.pro/assets/brawler/${brawler.brawler}.png"
          />
          <h1 class="name">${brawler.brawler}</h1>
        </div>
        <div class="star">
          <img class="image" src="${starImage}" />
          <h2 class="name">${brawler.starPower}</h2>
        </div>
      </button>
      <button class="icon-button" onclick="remove(${brawler.uuid})">
        <img src="/assets/remove.svg" />
      </button>
    </div>
  `
}

/**
 *
 * @param {GameMode} gameMode
 * @returns {string}
 */
function GameMode(gameMode) {
  const { mode, src } = gameMode

  const modeSlug = mode
    .split(' ')
    .join('-')
    .toLowerCase()

  return html`
    <div class="mode">
      <input
        name="mode"
        id="mode-${modeSlug}"
        value="${mode}"
        type="checkbox"
        ${mode.match(/showdown/i) ? '' : 'checked'}
      />
      <label for="mode-${modeSlug}"
        ><img src="https://www.starlist.pro${src}"
      /></label>
    </div>
  `
}

/**
 *
 * @param {GameMap} gameMap
 * @returns {string}
 */
function GameMap(gameMap) {
  const { mode, src, title } = gameMap
  const mapImage = `https://www.starlist.pro/${src}`

  return html`
    <div class="map">
      <h2 class="mode">${mode}</h2>
      <img class="image" src="${mapImage}" />
      <h1 class="name">${title}</h1>
    </div>
  `
}

// ============================================================
// INIT
// ============================================================

// Refresh the map when clicked
document
  .getElementById('map')
  .addEventListener('click', () => getMap().then(map => (STATE.map = map)))

// document.getElementById('team').addEventListener('click', async e => {
//   const brawler = e.target.closest('.brawler')
//   if (brawler) {
//     document.getElementById(brawler.id).innerHTML = Brawler(
//       (await getBrawler())[0]
//     )
//   }
// })

// Fetch data
getModes()
  .then(modes => (STATE.modes = modes))
  .then(() => getMap().then(map => (STATE.map = map)))

window.remove = async function(uuid) {
  STATE.brawlers = STATE.brawlers.filter(b => b.uuid != uuid)
}

window.reload = async function(uuid) {
  const brawler = (await getBrawler())[0]
  STATE.brawlers = STATE.brawlers.map(b => (b.uuid == uuid ? brawler : b))
}

window.refresh = async function() {
  const count = document.getElementById('team').childElementCount
  STATE.brawlers = await getBrawler(count)
}

window.add = async function() {
  const brawler = (await getBrawler())[0]
  STATE.brawlers = STATE.brawlers.concat(brawler)
}
