import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeManagement from './pages/employees/EmployeeManagement';
import Inventory from './pages/inventory/Inventory';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Customers from './pages/customers/Customers';
import POS from './pages/pos/POS';
import Sales from './pages/sales/Sales';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1">
                  <Navbar />
                  <main className="mt-16 p-4">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/employees" element={<EmployeeManagement />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/pos" element={<POS />} />
                      <Route path="/sales" element={<Sales />} />
                      {/* Add other protected routes here */}
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
