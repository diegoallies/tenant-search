import Link from 'next/link';
import './navstyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ username }) => {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <h1 className="navbar__heading">Analytics</h1>
      </div>
      <div className="navbar__right">
        <span className="navbar__username">{username}</span>
        <FontAwesomeIcon icon={faUser} className="navbar__profile-icon" />

      </div>
    </nav>
  );
};

export default Navbar;

