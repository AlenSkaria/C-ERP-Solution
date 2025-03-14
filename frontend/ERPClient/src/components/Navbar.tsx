import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-300 h-16 fixed top-0 right-0 left-50 z-10">
      <div className="h-full px-4 flex justify-end items-center">
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-gray-700">
              {user.firstName} {user.lastName}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 