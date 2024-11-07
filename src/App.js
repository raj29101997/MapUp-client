import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import PrivateRoute from './routes/PrivateRoutes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import WithNavbar from './routes/WithNavbar/WithNavbar';
import InvalidUrlHandler from './routes/Unauthorized/InvalidUrlHandler';

// Lazy-loaded components
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const DataLists = lazy(() => import('./pages/DataLists/DataLists'));
const UserTable = lazy(() => import('./pages/User/UserTable'));
const UploadFile = lazy(() => import('./pages/Uploads/UploadFile'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<PrivateRoute allowedRoles={['Admin', 'Manager', 'User']} />} >
              <Route element={<WithNavbar />} >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/data-lists" element={<PrivateRoute allowedRoles={['Admin', 'Manager']} />}>
                  <Route path="/data-lists" element={<DataLists />} />
                </Route>
                <Route path="/user-lists" element={<PrivateRoute allowedRoles={['Admin']} />}>
                  <Route path="/user-lists" element={<UserTable />} />
                </Route>
                <Route path="/upload" element={<PrivateRoute allowedRoles={['Admin']} />}>
                  <Route path="/upload" element={<UploadFile />} />
                </Route>
              </Route>
            </Route>

            <Route element={<PublicRoute />} >
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route path="*" element={<InvalidUrlHandler />} /> {/* Catch-all route */}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;