import cx from 'clsx'

export const Column: React.SFC<{
  full?: boolean
  padded?: number | boolean
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
}> = ({ padded = 0, children, full, justify = 'flex-start' }) => {
  return (
    <>
      <div className={cx('column', { full: full })}>{children}</div>

      <style jsx>{`
        .column {
          display: flex;
          flex-flow: column;
          justify-content: ${justify};
          padding: ${typeof padded === 'boolean' ? 1 : padded}rem;
        }

        .column > :global(*) + :global(*) {
          margin-top: 1rem;
        }

        .full {
          min-height: 100vh;
        }
      `}</style>
    </>
  )
}
