import { Outlet } from 'react-router-dom';
import PageNav from '../components/PageNav';

function Root() {
  return (
    <>
      <PageNav />
      <Outlet />
    </>
  );
}

export default Root;
