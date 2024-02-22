import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { useEffect } from 'react';

function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(function () {
    if (!isAuthenticated) {
      navigate('/login');
    }
  });
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

interface Props {
  children: React.ReactNode;
}
