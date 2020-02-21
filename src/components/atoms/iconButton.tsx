import * as React from 'react'
import clsx from 'clsx'

export const IconButton: React.SFC<{
  icon: 'refresh' | 'add-person' | 'settings' | 'remove'
  removeBorder?: boolean
  onClick?: () => void
}> = ({ onClick, icon, removeBorder }) => {
  return (
    <>
      <button
        className={clsx('icon-button', { 'remove-border': removeBorder })}
        onClick={onClick}>
        <img src={`/static/${icon}.svg`} />
      </button>
      <style jsx>{`
        .icon-button {
          width: 3em;
          height: 3em;
          padding: 0.5em;
        }

        .icon-button img {
          width: 100%;
          height: 100%;
        }

        .remove-border {
          border: none;
          padding: 0;
        }
      `}</style>
    </>
  )
}
