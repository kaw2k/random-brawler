export const Row: React.SFC = ({ children }) => {
  return (
    <>
      <div className="row">{children}</div>

      <style jsx>{`
        .row {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .row > :global(*) + :global(*) {
          margin-left: 1em;
        }
      `}</style>
    </>
  )
}
