import { useNavigate, Link } from 'react-router-dom';
import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi';
import Notifications from '../Notifications/Notifications';
import logo from '../../assets/letter-t.png';

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-surface sticky top-0 z-50 border-b border-border-dark">
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-14 md:h-16">
          <div className="flex items-center space-x-2 md:space-x-0">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-text-primary hover:text-primary transition-colors p-2 -ml-2"
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>
            <Link to="/dashboard" className="flex items-center group">
              <div className="relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 overflow-hidden">
                <img
                  src={logo}
                  alt="ToggleNest Logo"
                  className="w-full h-full object-contain invert"
                />
              </div>
              <span className="text-base md:text-xl font-bold tracking-tight text-text-primary ml-1 md:ml-0">
                <span className="hidden sm:inline">TOGGLE{' '}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  NEST
                </span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Notifications />

            <Link
              to="/profile"
              className="flex items-center space-x-2 md:space-x-3 border-l border-border-dark pl-2 md:pl-4 hover:opacity-80 transition-smooth"
            >
              <div className="hidden md:block text-right">
                <p className="text-xs font-medium text-primary">{user.role}</p>
                <p className="font-semibold text-text-primary text-sm">
                  {user.name}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-border-dark border border-primary flex items-center justify-center text-primary font-bold shadow-md">
                <FiUser size={16} className="md:w-[18px] md:h-[18px]" />
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 md:space-x-2 bg-background border border-border-error text-border-error hover:bg-border-error hover:text-white px-2 md:px-4 py-2 rounded-lg text-sm font-medium transition-smooth"
            >
              <FiLogOut size={16} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
