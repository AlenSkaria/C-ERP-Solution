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
      if (Array.isArray(data)) {
        // Validate that each employee has all required fields
        const validEmployees = data.filter(emp => 
          emp.firstName && 
          emp.lastName && 
          emp.username && 
          emp.email && 
          emp.dateOfBirth && 
          emp.role
        );
        setEmployees(validEmployees);
      } else {
        setEmployees([]);
      }
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (employee: Employee, newRole: string) => {
    if (!['Admin', 'Manager'].includes(newRole)) {
      setError('Invalid role. Can only promote to Admin or Manager');
      return;
    }

    // Validate employee data before sending
    if (!employee.firstName || !employee.lastName || !employee.username || 
        !employee.email || !employee.dateOfBirth || !employee.role) {
      setError('Employee data is incomplete. Missing required fields.');
      console.error('Incomplete employee data:', employee);
      return;
    }

    const promotionData = {
      newRole,
      reason: `Promoted to ${newRole}`,
      firstName: employee.firstName,
      lastName: employee.lastName,
      username: employee.username,
      email: employee.email,
      dateOfBirth: employee.dateOfBirth,
      role: employee.role
    };

    console.log('Sending promotion data:', promotionData);

    try {
      await promoteEmployee(employee._id, promotionData);
      await fetchEmployees(); // Refresh the list
      setError('');
    } catch (err: any) {
      console.error('Promotion error:', err.response?.data);
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.message || 
                         'Failed to promote employee';
      setError(errorMessage);
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
            className="border p-4 rounded-lg bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{employee.firstName} {employee.lastName}</h3>
                <p className="text-gray-600">{employee.email}</p>
                <p className="text-sm text-gray-500">Username: {employee.username}</p>
                <p className="text-sm text-gray-500">Date of Birth: {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {employee.role}
                </span>
                {employee.role !== 'Super Admin' && (
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    onChange={(e) => handlePromote(employee, e.target.value)}
                    value={employee.role}
                  >
                    <option value="Cashier">Cashier</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
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