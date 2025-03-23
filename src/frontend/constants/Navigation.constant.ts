import { ROUTES } from './Routes.constant';

export interface NavigationItem {
  path: string;
  label: {
    en: string;
    vi: string;
  };
  icon?: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    path: ROUTES.HOME,
    label: {
      en: 'Home',
      vi: 'Trang chủ'
    },
    icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
  },
  {
    path: ROUTES.ABOUT,
    label: {
      en: 'About Us',
      vi: 'Về chúng tôi'
    },
    icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
  },
  {
    path: ROUTES.GRAPHQL,
    label: {
      en: 'GraphQL API',
      vi: 'API GraphQL'
    },
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
  }
]; 