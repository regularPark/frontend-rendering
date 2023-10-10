import { RouterPath } from '../types';

export const ROUTER_PATH: Record<string, RouterPath> = {
  customerList: '/',
  adminLogin: '/admin/login',
  adminAuth: '/admin/login/auth/kakao',
  auth: '/login/auth/kakao',
  adminSignUp: '/admin/sign-up',
  enterReward: '/admin/enter-reward',
  enterStamp: '/admin/enter-stamp',
  manageCafe: '/admin/manage-cafe',
  modifyCouponPolicy: '/admin/modify-coupon-policy',
  registerCafe: '/admin/register-cafe',
  earnStamp: '/admin/earn-stamp',
  templateCouponDesign: '/template-coupon-design',
  customCouponDesign: '/custom-coupon-design',
  useReward: '/admin/use-reward',
} as const;

export const PARAMS_ERROR_MESSAGE = '[ERROR] params를 지정해주세요.';
