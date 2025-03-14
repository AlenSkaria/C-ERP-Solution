import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    }
  }, []);

  return (
    <div className="bg-gray-100 w-50 min-h-screen p-4 border-r border-gray-300">
      <h1 className="text-xl font-bold mb-6 p-2">CL | ERP</h1>
      <ul className="space-y-4 text-sm">
        <li>
          <Link to="/dashboard" className="block p-2 hover:bg-gray-200 rounded">
            Dashboard
          </Link>
        </li>

        {/* Super Admin Links */}
        {userRole === 'Super Admin' && (
          <>
            <li>
              <Link to="/employees" className="block p-2 hover:bg-gray-200 rounded">
                Employee Management
              </Link>
            </li>
            <li>
              <Link to="/company-registration" className="block p-2 hover:bg-gray-200 rounded">
                Company Registration
              </Link>
            </li>
            <li>
              <Link to="/permissions" className="block p-2 hover:bg-gray-200 rounded">
                Permissions
              </Link>
            </li>
            
          </>
        )}

        {/* Admin and Manager Links */}
        {(userRole === 'Admin' || userRole === 'Manager' || userRole === 'Super Admin') && (
          <>
            <li>
              <Link to="/sales" className="block p-2 hover:bg-gray-200 rounded">
                Sales
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="block p-2 hover:bg-gray-200 rounded">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/customers" className="block p-2 hover:bg-gray-200 rounded">
                Customers
              </Link>
            </li>
          </>
        )}

        {/* Admin Only Links */}
        {(userRole === 'Admin' || userRole === 'Super Admin') && (
          <li>
            <Link to="/analytics" className="block p-2 hover:bg-gray-200 rounded">
              Analytics
            </Link>
          </li>
        )}

        {/* Cashier Links */}
        {userRole === 'Cashier' && (
          <>
            <li>
              <Link to="/pos" className="block p-2 hover:bg-gray-200 rounded">
                POS
              </Link>
            </li>
            <li>
              <Link to="/basic-sales" className="block p-2 hover:bg-gray-200 rounded">
                Basic Sales
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar; 