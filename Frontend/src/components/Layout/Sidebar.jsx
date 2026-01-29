import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFolder, FiUser, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Projects', path: '/projects', icon: FiFolder },
    { name: 'Profile', path: '/profile', icon: FiUser },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 lg:top-14 md:lg:top-16 left-0 z-50 lg:z-auto
          w-64 bg-surface shadow-xl border-r border-border-dark
          h-screen lg:h-[calc(100vh-3.5rem)] md:lg:h-[calc(100vh-4rem)]
          overflow-y-auto custom-scrollbar
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-border-dark">
          <h2 className="text-lg font-bold text-text-primary">Menu</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-2 pb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={`group flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-text-secondary hover:bg-border-dark hover:text-secondary'
                }`}
              >
                <Icon
                  className={
                    isActive
                      ? 'text-white mr-3'
                      : 'text-text-secondary group-hover:text-secondary mr-3 transition-colors'
                  }
                  size={20}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
