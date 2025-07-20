export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('id-ID');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export { logger, Logger } from './logger';
