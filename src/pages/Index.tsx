
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Immediately redirect to splash screen
    navigate('/splash');
  }, [navigate]);

  // Show nothing while redirecting
  return null;
};

export default Index;
