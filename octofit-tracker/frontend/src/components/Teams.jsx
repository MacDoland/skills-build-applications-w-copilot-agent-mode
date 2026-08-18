import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceError, ResourceLoading } from './ResourceState.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    fetchCollection(teamsEndpoint)
      .then((items) => {
        if (!ignore) {
          setTeams(items)
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
          <h1>Teams</h1>
          <p>Training groups and coaching assignments.</p>
        </div>
        <span className="resource-count">{teams.length} teams</span>
      </div>
      <div className="data-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h2>{team.name}</h2>
            <dl className="detail-list">
              <div>Coach: {team.coach}</div>
              <div>Region: {team.region}</div>
              <div>Members: {team.memberCount}</div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams