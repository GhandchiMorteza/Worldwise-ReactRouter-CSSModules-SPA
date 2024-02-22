import { Outlet } from 'react-router-dom';
import { CitiesProvider } from '../contexts/CitiesContext';
import { AuthProvider } from '../contexts/FakeAuthContext';

function Root() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Outlet />
      </CitiesProvider>
    </AuthProvider>
  );
}

export default Root;
