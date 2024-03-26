import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
   return (
    <>
      <div
        className='nav-bar'>
        <Link to="/registration">Registration</Link>
        <Link to="/users">Users</Link>
           </div>

    </>
  );
};
export default NavBar;
