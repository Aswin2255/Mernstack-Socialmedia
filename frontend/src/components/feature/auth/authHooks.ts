import { useMutation } from '@tanstack/react-query';
import { signupApi } from './authApi';

export const useSignupMutation = () => {
  const mutation = useMutation({
    mutationFn: signupApi,
  });
  return mutation;
};
