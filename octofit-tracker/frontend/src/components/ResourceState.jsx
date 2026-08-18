export function ResourceError({ message }) {
  return (
    <div className="status-panel text-danger" role="alert">
      {message}
    </div>
  )
}

export function ResourceLoading() {
  return <div className="status-panel">Loading...</div>
}