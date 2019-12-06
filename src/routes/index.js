import HomePage from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import SecondPage from '../pages/SecondPage';
import App from '../components/App';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        path: '/secondPage/:id',
        ...SecondPage
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
