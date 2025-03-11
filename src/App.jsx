import { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { store } from './store/store';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        {/* Header */}
        <Header className="shadow-md bg-blue-600 text-white p-4 text-center text-xl font-semibold" />

        {/* Main Content */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer className="bg-gray-800 text-white text-center p-3 mt-auto" />
      </div>
    </>
  );
}

export default App;
