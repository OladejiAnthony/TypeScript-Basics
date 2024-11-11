import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/routes';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
