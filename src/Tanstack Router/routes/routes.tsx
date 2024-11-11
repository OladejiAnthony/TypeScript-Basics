import { createReactRouter, createRouteConfig } from '@tanstack/react-router';
import HomePage from '../pages//HomePage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import BlogDetailsPage from '../pages/BlogDetailsPage';

const rootRoute = createRouteConfig({
  component: () => (
    <div>
      <h1>My Blog App</h1>
    </div>
  ),
});

const homeRoute = rootRoute.createChild({
  path: '/',
  component: HomePage,
});

const aboutRoute = rootRoute.createChild({
  path: '/about',
  component: AboutPage,
});

const blogRoute = rootRoute.createChild({
  path: '/blog',
  component: BlogPage,
});

const blogDetailsRoute = blogRoute.createChild({
  path: '/:id',
  component: BlogDetailsPage,
});

const routeConfig = rootRoute.addChildren([homeRoute, aboutRoute, blogRoute, blogDetailsRoute]);

export const router = createReactRouter({
  routeConfig,
});
