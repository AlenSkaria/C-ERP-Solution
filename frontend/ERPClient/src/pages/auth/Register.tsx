import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/auth';

interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await register({ ...formData, role: 'Cashier' });
      navigate('/login');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Handle validation errors from the API response
        const errorMessages = err.response.data.errors.map((error: ValidationError) => error.msg).join('\n');
        setError(errorMessages);
      } else if (err.response?.data?.message) {
        // Handle general error message from the API response
        setError(err.response.data.message);
      } else {
        // Fallback error message
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err.response?.data); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm whitespace-pre-line">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              id="username"
              name="username"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Password (min 8 chars, must contain number)"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              value={formData.dateOfBirth}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className="text-sm text-gray-600 hover:text-black">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 