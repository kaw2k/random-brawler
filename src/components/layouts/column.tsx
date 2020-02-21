export const Column: React.SFC = ({ children }) => {
  return (
    <>
      <div className="column">{children}</div>

      <style jsx>{`
        .column {
          display: flex;
          flex-flow: column;
        }

        .column > :global(*) + :global(*) {
          margin-top: 1em;
        }
      `}</style>
    </>
  )
}
