import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AdminRoute, PrivateRoute } from '../components/ProtectedRoute';

const mockUseAuth = jest.fn();

jest.mock('../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

function renderWithRoutes(initialEntry, protectedElement, targetLabel = 'Protected content') {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<div>Login page</div>} />
        <Route path="/home" element={<div>Home page</div>} />
        <Route path="/private" element={protectedElement}>
          <Route index element={<div>{targetLabel}</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Protected routes', () => {
  test('PrivateRoute redirects unauthenticated users to login', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    renderWithRoutes('/private', <PrivateRoute />);

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  test('PrivateRoute renders child route for authenticated users', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });

    renderWithRoutes('/private', <PrivateRoute />);

    expect(screen.getByText(/protected content/i)).toBeInTheDocument();
  });

  test('AdminRoute redirects authenticated non-admin users to home', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, user: { role: 'user' } });

    renderWithRoutes('/private', <AdminRoute />);

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  test('AdminRoute allows authenticated admins through', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, user: { role: 'admin' } });

    renderWithRoutes('/private', <AdminRoute />, 'Admin dashboard');

    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });
});
