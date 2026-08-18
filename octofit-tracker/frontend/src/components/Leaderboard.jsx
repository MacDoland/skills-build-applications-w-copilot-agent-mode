import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceError, ResourceLoading } from './ResourceState.jsx'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    fetchCollection('leaderboard')
      .then((items) => {
        if (!ignore) {
          setLeaderboard(items)
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message)
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return <ResourceLoading />
  }

  if (error) {
    return <ResourceError message={error} />
  }

  return (
    <section className="resource-page">
      <div className="resource-header">
        <div>
          <h1>Leaderboard</h1>
          <p>Competitive ranking by OctoFit score.</p>
        </div>
        <span className="resource-count">{leaderboard.length} entries</span>
      </div>
      <div className="data-grid">
        {leaderboard.map((entry) => (
          <article className="data-card" key={entry._id ?? entry.userEmail}>
            <h2>#{entry.rank} {entry.userName}</h2>
            <dl className="detail-list">
              <div>Score: {entry.score}</div>
              <div>Team: {entry.teamName}</div>
              <div>Email: {entry.userEmail}</div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard