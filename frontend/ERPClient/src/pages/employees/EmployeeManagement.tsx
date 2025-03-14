import  { useState, useEffect } from 'react';
import { getEmployees, getPromotionHistory, promoteEmployee, Employee, PromotionHistory } from '../../api/employees';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newRole, setNewRole] = useState('');
  const [promotionReason, setPromotionReason] = useState('');
  const [promotionHistory, setPromotionHistory] = useState<PromotionHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  // Fetch promotion history for an employee
  const fetchPromotionHistory = async (employeeId: string) => {
    try {
      const data = await getPromotionHistory(employeeId);
      setPromotionHistory(data);
    } catch (err) {
      setError('Failed to fetch promotion history');
    }
  };

  // Handle employee promotion
  const handlePromote = async () => {
    if (!selectedEmployee || !newRole || !promotionReason) return;

    try {
      setLoading(true);
      await promoteEmployee(selectedEmployee.id, {
        newRole,
        reason: promotionReason,
      });
      
      // Refresh employee list and promotion history
      fetchEmployees();
      fetchPromotionHistory(selectedEmployee.id);
      // Reset form
      setNewRole('');
      setPromotionReason('');
      setSelectedEmployee(null);
    } catch (err) {
      setError('Failed to promote employee');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Employee List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Employees</h2>
        <div className="grid gap-4">
          {employees.map((employee) => (
            <div 
              key={employee.id}
              className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedEmployee(employee);
                fetchPromotionHistory(employee.id);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{employee.firstName} {employee.lastName}</h3>
                  <p className="text-gray-600">{employee.email}</p>
                </div>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {employee.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotion Form */}
      {selectedEmployee && (
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Promote {selectedEmployee.firstName} {selectedEmployee.lastName}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reason for Promotion</label>
              <textarea
                value={promotionReason}
                onChange={(e) => setPromotionReason(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                rows={3}
              />
            </div>

            <button
              onClick={handlePromote}
              disabled={loading || !newRole || !promotionReason}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
            >
              {loading ? 'Promoting...' : 'Promote Employee'}
            </button>
          </div>
        </div>
      )}

      {/* Promotion History */}
      {selectedEmployee && promotionHistory.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Promotion History</h2>
          <div className="space-y-2">
            {promotionHistory.map((promotion) => (
              <div key={promotion.id} className="border p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">
                    {promotion.oldRole} → {promotion.newRole}
                  </span>
                  <span className="text-gray-500">
                    {new Date(promotion.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{promotion.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement; 