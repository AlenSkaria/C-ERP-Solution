import { useState, useEffect } from 'react';

interface User {
  firstName: string;
  lastName: string;
  role: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl mb-2">
            Welcome {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">
            You are logged in as {user.role}
          </p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <p className="text-gray-600">Your daily overview will appear here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <p className="text-gray-600">Your recent activities will appear here</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Notifications</h3>
          <p className="text-gray-600">Your notifications will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 