import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

const mockNavigate = jest.fn();
const mockLoginAs = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    loginAs: mockLoginAs,
  }),
}));

describe('Login page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows validation messages for blank submission', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
    expect(mockLoginAs).not.toHaveBeenCalled();
  });

  test('navigates admins to the admin dashboard after login', async () => {
    const user = userEvent.setup();
    mockLoginAs.mockResolvedValue({ role: 'admin' });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/email/i), 'admin@test.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('navigates regular users to the user dashboard after login', async () => {
    const user = userEvent.setup();
    mockLoginAs.mockResolvedValue({ role: 'user' });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/email/i), 'student@test.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/user/dashboard');
    });
  });
});
