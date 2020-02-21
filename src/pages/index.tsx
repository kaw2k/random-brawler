import BrawlerIcon from '../components/molecules/brawlerIcon'
import { useContext } from 'react'
import { Context } from '../utils/context'
import { Link } from '../components/atoms/link'
import { Row } from '../components/layouts/row'
import { Column } from '../components/layouts/column'
import { IconButton } from '../components/atoms/iconButton'

export default function() {
  const { brawlers, addBrawler, removeBrawler, refreshBrawlers } = useContext(
    Context
  )

  return (
    <>
      <Column padded full justify="space-between">
        <Row>
          <IconButton onClick={addBrawler} icon="add-person" />
          <IconButton onClick={refreshBrawlers} icon="refresh" />
        </Row>

        {!brawlers.length && <h1>Add a brawler to get started</h1>}

        {!!brawlers.length && (
          <div className="brawlers">
            {brawlers.map(brawler => (
              <BrawlerIcon key={brawler.uuid} brawler={brawler} />
            ))}
          </div>
        )}

        <Row>
          <Link href="/settings">SETTINGS</Link>
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
