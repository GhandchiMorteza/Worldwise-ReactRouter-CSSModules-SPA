import { Outlet } from 'react-router-dom';
import { CitiesProvider } from '../contexts/CitiesContext';

function Root() {
  return (
    <CitiesProvider>
      <Outlet />
    </CitiesProvider>
  );
}

export default Root;
