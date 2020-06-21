import Loadable from 'react-loadable';
import Loader from './Loader';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loader,
});

const Faq = Loadable({
  loader: () => import('./Faq'),
  loading: Loader,
});

export { Home, Faq };
