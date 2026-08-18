import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceError, ResourceLoading } from './ResourceState.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    fetchCollection('users')
      .then((items) => {
        if (!ignore) {
          setUsers(items)
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
          <h1>Users</h1>
          <p>Profiles connected to OctoFit teams.</p>
        </div>
        <span className="resource-count">{users.length} users</span>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email}>
            <h2>{user.name}</h2>
            <dl className="detail-list">
              <div>Email: {user.email}</div>
              <div>Role: {user.role}</div>
              <div>Team: {user.teamName}</div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users