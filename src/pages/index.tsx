import BrawlerIcon from '../components/molecules/brawlerIcon'
import { useContext } from 'react'
import { Context } from '../utils/context'
import { Link } from '../components/atoms/link'
import { Row } from '../components/layouts/row'
import { Column } from '../components/layouts/column'

export default function() {
  const { brawlers, addBrawler, removeBrawler } = useContext(Context)

  return (
    <>
      <Column>
        <Row>
          <button onClick={removeBrawler}>less</button>
          <button onClick={addBrawler}>more</button>
          <button>refresh</button>
        </Row>

        {!brawlers.length && <h1>Add a brawler to get started</h1>}

        <div className="brawlers">
          {brawlers.map(brawler => (
            <BrawlerIcon key={brawler.uuid} brawler={brawler} />
          ))}
        </div>

        <Row>
          <Link href="/settings">settings</Link>
        </Row>
      </Column>

      <style jsx>{`
        .brawlers {
          display: grid;
          font-size: 0.6em;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1em;
          gap: 1em;
        }
      `}</style>
    </>
  )
}

// <BrawlerIcon
//   brawler={{
//     brawler: 'Tara',
//     starPowers: ['Black-Portal', 'Healing-Shade'],
//   }}
// />
