import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
    const { user } = useSelector((state) => state.user);
    
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                E-Health Tracker
            </Link>
            <ul>
                <CustomLink to="/Home">Home</CustomLink>
                {user?.isAdmin?<CustomLink to="/admin/users">Users</CustomLink> : ''}
                {user?.isAdmin?<CustomLink to="/admin/doctors">Doctors</CustomLink> : ''}
                {user?.isDoctor?<CustomLink to="/doctor/appoinments">Appointments</CustomLink> : ''}
                {user?.isDoctor === false && user?.isAdmin === false?<CustomLink to="/appoinments">Appointments</CustomLink> : ''}
                {user?.isDoctor?<CustomLink to={`/doctor/profile/${user?._id}`}>Profile</CustomLink> : ''}
                {user?.isDoctor === false && user?.isAdmin === false ?<CustomLink to="/apply-doctor">Apply Doctor</CustomLink> : ''}
                <CustomLink to="/feedback">Feedback</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink
                    onClick={() => {
                        localStorage.clear();
                    }}
                    to="/login"
                >
                    Logout
                </CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
