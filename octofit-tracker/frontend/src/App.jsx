import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">OctoFit</div>
        <nav className="nav flex-column gap-2" aria-label="OctoFit sections">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content-pane">
        <Routes>
          <Route element={<Navigate to="/users" replace />} path="/" />
          <Route element={<Users />} path="/users" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
    </div>
  )
}

export default App
