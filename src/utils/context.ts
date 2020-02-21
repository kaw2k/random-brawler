import React from 'react'
import { Brawler } from '../types/brawler'

export interface ContextState {
  brawlers: Brawler[]
  addBrawler: () => void
  removeBrawler: () => void
  refreshBrawler: (brawler: Brawler) => void
  refreshBrawlers: () => void
}

export const Context = React.createContext<ContextState>({
  brawlers: [],
  addBrawler() {},
  removeBrawler() {},
  refreshBrawler(brawler) {},
  refreshBrawlers() {},
})
