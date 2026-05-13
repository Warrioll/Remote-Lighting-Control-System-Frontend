import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfLoggedIn } from '@/api/auth';

type AccessGuardProps = {
  children: React.ReactNode;
};

export default function AccessGuard({ children }: AccessGuardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const response = await checkIfLoggedIn();
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };

    verifyAccess();
  }, []);

  return <>{children}</>;
}
