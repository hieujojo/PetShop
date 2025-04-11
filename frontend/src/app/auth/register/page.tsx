import RegisterForm from "@/components/auth/Register";
import { Providers } from '@/app/auth/Providers';

const Register = () => {
  return (
    <Providers>
    <RegisterForm />
  </Providers>
  );
};

export default Register;
