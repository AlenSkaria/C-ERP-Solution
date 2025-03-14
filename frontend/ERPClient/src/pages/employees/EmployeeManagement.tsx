import { useState, useEffect } from 'react';
import { getEmployees, promoteEmployee, Employee } from '../../api/employees';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handlePromote = async (employeeId: string, newRole: string) => {
    if (!['Admin', 'Manager'].includes(newRole)) {
      setError('Invalid role. Can only promote to Admin or Manager');
      return;
    }

    try {
      await promoteEmployee(employeeId, { newRole, reason: `Promoted to ${newRole}` });
      await fetchEmployees(); // Refresh the list
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Failed to promote employee');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {employees.map((employee) => (
          <div 
            key={employee._id}
            className="border p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{employee.firstName} {employee.lastName}</h3>
                <p className="text-gray-600">{employee.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {employee.role}
                </span>
                {employee.role !== 'Super Admin' ? (
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    onChange={(e) => handlePromote(employee._id, e.target.value)}
                    value={employee.role}
                  >
                    <option value="Cashier">Cashier</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  <span className="text-sm text-gray-500 italic">Cannot change Super Admin role</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement; 