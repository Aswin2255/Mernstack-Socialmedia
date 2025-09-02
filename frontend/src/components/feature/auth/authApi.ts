import axiosInstance from '../../../axiosInstance';

export const signupApi = async (data: {
  username: string;
  email: string;
  phone: string;
  confirmPPassword: string;
}) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};
