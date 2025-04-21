
import { Link } from "react-router-dom";
const FooterLinks = () => (
  <div className="mt-4 flex justify-center gap-4">
    <Link to="/" className="text-white hover:text-blue-100">Home</Link>
    <Link to="/leaderboard" className="text-white hover:text-blue-100">Leaderboard</Link>
    <Link to="/register" className="text-white hover:text-blue-100">Register</Link>
  </div>
);
export default FooterLinks;
