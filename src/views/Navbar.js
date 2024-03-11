import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        E-Health Tracker
      </Link>
      <ul>
        <CustomLink to="/Home">Home</CustomLink>
        <CustomLink to="/appoinments">Appointments</CustomLink>
        <CustomLink to="/feedback">Feedback</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/logout">Logout</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
