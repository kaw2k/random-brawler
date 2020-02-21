import { Brawler } from '../../types/brawler'
import { useContext } from 'react'
import { Context } from '../../utils/context'
import { IconButton } from '../atoms/iconButton'

interface Props {
  brawler: Brawler
}

export default function BrawlerIcon({ brawler }: Props) {
  const { refreshBrawler, removeBrawler } = useContext(Context)

  const starSrc = brawler.starPowers[0]
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z\-]/g, '')
  const starImage = `https://www.starlist.pro/assets/star-powers/${starSrc}.png`

  return (
    <>
      <span className="container">
        <button className="brawler" onClick={() => refreshBrawler(brawler)}>
          <div className="profile">
            <img
              className="image"
              src={`https://www.starlist.pro/assets/brawler/${brawler.brawler}.png`}
            />
            <h1 className="name">{brawler.brawler}</h1>
          </div>

          <div className="star">
            <img className="image" src={starImage} />
            <h2 className="name">{brawler.starPowers[0]}</h2>
          </div>
        </button>

        <span className="remove">
          <IconButton
            onClick={() => removeBrawler(brawler)}
            icon="remove"
            removeBorder
          />
        </span>
      </span>

      <style jsx>{`
        .container {
          position: relative;
        }

        .brawler {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-decoration: none;
          text-transform: none;
        }

        .profile .image {
          width: 100%;
          max-width: 100%;
        }

        .star {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1em 0 2em;
        }

        .star .image {
          max-width: 3em;
          margin-right: 0.5em;
        }

        .remove {
          position: absolute;
          top: 0;
          right: 0;
        }
      `}</style>
    </>
  )
}
