import { Link, useLocation } from "react-router-dom";
function KanbasNavigation() {
    const links = ["account", "Dashboard", "Courses", "Calendar", "signin", "signup", "users"];
    const { pathname } = useLocation();
    return (
        <div className="list-group" style={{ width: 150 }}>
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/Kanbas/${link}`}
                    className={`list-group-item ${pathname.includes(link) && "active"}`}>
                    {link}
                </Link>
            ))}
        </div>
    );
}
export default KanbasNavigation;