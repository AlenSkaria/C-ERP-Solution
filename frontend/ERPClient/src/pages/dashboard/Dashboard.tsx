
import { useNavigate } from 'react-router-dom';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

interface NavItem {
  label: string;
  path: string;
  roles: string[];
}

const navigationItems: NavItem[] = [
  // Super Admin only
  { label: 'Company Registration', path: '/company-registration', roles: ['Super Admin'] },
  { label: 'Permission Management', path: '/permissions', roles: ['Super Admin'] },
  
  // Admin, Manager, Super Admin
  { label: 'Sales', path: '/sales', roles: ['Admin', 'Manager', 'Super Admin'] },
  { label: 'Inventory', path: '/inventory', roles: ['Admin', 'Manager', 'Super Admin'] },
  { label: 'Customers', path: '/customers', roles: ['Admin', 'Manager', 'Super Admin'] },
  { label: 'Analytics', path: '/analytics', roles: ['Admin', 'Super Admin'] },
  
  // Cashier only
  { label: 'POS', path: '/pos', roles: ['Cashier'] },
  { label: 'Basic Sales', path: '/basic-sales', roles: ['Cashier'] },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user: User = userData ? JSON.parse(userData) : { firstName: '', lastName: '', role: '' };

  // Filter navigation items based on user role
  const userNavigation = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* <h1 className="text-xl font-semibold">C | ERP</h1> */}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user.firstName} {user.lastName} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Employee Management Card (Super Admin Only) */}
            {user.role === 'Super Admin' && (
              <div 
                onClick={() => navigate('/employees')}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Employee Management</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Manage employee roles and permissions
                  </p>
                </div>
              </div>
            )}

            {userNavigation.map((item) => (
              <div 
                key={item.path}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 