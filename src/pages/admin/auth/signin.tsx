/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Icon } from '@iconify/react'; // <-- Updated import for icons

import { AuthCredentials, signInWithPassword } from '@/lib/db/auth';
import { CustomButton } from '@/components/shared/shared_customs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLoginSuccess } from '@/store/features/auth';

const AdminSignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithPassword(credentials);
      const { user } = await signInWithPassword(credentials);
      console.log(user);
      if (user) {
        dispatch(onLoginSuccess({ id: user.id, email: user.email }));
        navigate('/admin');
      } else {
        setError('Login failed: No user data returned.');
        throw new Error('Login failed: No user data returned.');
      }
    } catch (err: any) {
      setError(
        err.message || 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Sign-In</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            isRequired
            isClearable
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={credentials.email}
            onChange={handleChange}
            isDisabled={loading}
          />

          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            variant="bordered"
            value={credentials.password}
            onChange={handleChange}
            isDisabled={loading}
            type={isPasswordVisible ? 'text' : 'password'}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {/* Updated to use the Icon component */}
                <Icon
                  icon={
                    isPasswordVisible
                      ? 'mdi:eye-off-outline'
                      : 'mdi:eye-outline'
                  }
                  className="text-2xl text-default-400 pointer-events-none"
                />
              </button>
            }
          />

          {error && (
            <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          <CustomButton
            color="primary"
            type="submit"
            isLoading={loading}
            className="bg-primary rounded-md text-white"
          >
            Sign In
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default AdminSignInPage;
