import { FunctionComponent, ComponentClass } from 'react';
import Home from '../screens/Home';
import Feedback from '../screens/Feedback';
import NotFound from '../screens/NotFound';
import Faq from '../screens/Faq';

type RouteType = {
  key: string;
  path?: string;
  link?: string;
  component: FunctionComponent<any> | ComponentClass<any, any>;
  exact?: boolean;
};

export const routes: RouteType[] = [
  {
    key: 'home',
    link: '/',
    component: Home,
    exact: true,
  },
  {
    key: 'faq',
    link: '/faq',
    component: Faq,
  },
  {
    key: 'feedback',
    link: '/feedback',
    component: Feedback,
  },
  {
    key: '404',
    link: '*',
    component: NotFound,
  },
];

export const privateRoutes: RouteType[] = [];
