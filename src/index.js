// @ts-check
import { html } from './html.js'

const pluck = (array, key) => array.map((obj) => obj[key]);
const querify = (href, params) => {
  const url = new URL(href, window.location.href);

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return `${url}`;
}

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
 * @property {string} modeSrc
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
    document.getElementById('team1').innerHTML = this.brawlers
      .map((brawler, index) => (index % 2) ? null : Brawler(brawler))
      .join('')
    document.getElementById('team2').innerHTML = this.brawlers
      .map((brawler, index) => (index % 2) ? Brawler(brawler) : null)
      .join('')

    if (brawlers.length > 6) {
      document.getElementById('teams').classList.add('many');
    } else {
      document.getElementById('teams').classList.remove('many');
    }

    if (brawlers.length >= 10) {
      document.getElementById('add').disabled = true;
    } else {
      document.getElementById('add').disabled = false;
    }
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
    .join(',')

  return fetch(querify(`/api/map`, {modes})).then(res => res.json())
}

/**
 * @param {number} count
 * @returns {Promise<Brawler[]>}
 */
function getBrawler(count = 1, unique = true) {
  const queryParams = {
    count,
    ...(unique && STATE.brawlers.length ? {filter: pluck(STATE.brawlers, 'brawler')}: {})
  }

  return fetch(querify('/api/brawler', queryParams)).then(res => res.json())
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
          <div class="info">
            <h3 class="label">
              <img src="${starImage}" />
              ${brawler.starPower}
            </h3>
          </div>
        </div>
      </button>
      <button class="icon-button remove" onclick="remove(${brawler.uuid})">
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
  const { mode, src, modeSrc, title } = gameMap
  const mapImage = `https://www.starlist.pro/${src}`

  return html`
    <button class="map" onclick="newmap()">
      <img class="image" src="${mapImage}" />
      <h2 class="info label">
        <img src="https://www.starlist.pro/${modeSrc}" />
        ${title}
      </h2>
    </button>
  `
}

// ============================================================
// INIT
// ============================================================
// Fetch data
getModes()
  .then(modes => (STATE.modes = modes))
  .then(() => getMap().then(map => (STATE.map = map)))

window.newmap = async function() {
  getMap().then(map => (STATE.map = map))
}

window.remove = async function(uuid) {
  STATE.brawlers = STATE.brawlers.filter(b => b.uuid != uuid)
}

window.reload = async function(uuid) {
  const brawler = (await getBrawler())[0]
  STATE.brawlers = STATE.brawlers.map(b => (b.uuid == uuid ? brawler : b))
}

window.refresh = async function() {
  const count = STATE.brawlers.length;
  STATE.brawlers = await getBrawler(count)
}

window.add = async function() {
  const brawler = (await getBrawler())[0]
  STATE.brawlers = STATE.brawlers.concat(brawler)
}
