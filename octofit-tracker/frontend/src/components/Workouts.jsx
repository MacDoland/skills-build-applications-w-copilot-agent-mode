import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceError, ResourceLoading } from './ResourceState.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    fetchCollection(workoutsEndpoint)
      .then((items) => {
        if (!ignore) {
          setWorkouts(items)
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
          <h1>Workouts</h1>
          <p>Recommended workouts for personalized training plans.</p>
        </div>
        <span className="resource-count">{workouts.length} workouts</span>
      </div>
      <div className="data-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h2>{workout.title}</h2>
            <dl className="detail-list">
              <div>Focus: {workout.focus}</div>
              <div>Difficulty: {workout.difficulty}</div>
              <div>Duration: {workout.durationMinutes} minutes</div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts