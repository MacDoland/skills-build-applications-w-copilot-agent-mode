import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ResourceError, ResourceLoading } from './ResourceState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    fetchCollection('activities')
      .then((items) => {
        if (!ignore) {
          setActivities(items)
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
          <h1>Activities</h1>
          <p>Recent training sessions logged by athletes.</p>
        </div>
        <span className="resource-count">{activities.length} activities</span>
      </div>
      <div className="data-grid">
        {activities.map((activity) => (
          <article className="data-card" key={activity._id ?? `${activity.userEmail}-${activity.date}`}>
            <h2>{activity.type}</h2>
            <dl className="detail-list">
              <div>Athlete: {activity.userEmail}</div>
              <div>Duration: {activity.durationMinutes} minutes</div>
              <div>Calories: {activity.caloriesBurned}</div>
              <div>Date: {new Date(activity.date).toLocaleDateString()}</div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities