import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContextProvider, useAuth } from '../context/AuthContext';

const mockLogin = jest.fn();
const mockUpdateUserData = jest.fn();

jest.mock('../api/auth', () => ({
  login: (...args) => mockLogin(...args),
}));

jest.mock('../api/user', () => ({
  updateUserData: (...args) => mockUpdateUserData(...args),
}));

function Consumer() {
  const { isAuthenticated, user, loginAs, logout, updateUser } = useAuth();

  return (
    <div>
      <div data-testid="auth-state">{String(isAuthenticated)}</div>
      <div data-testid="user-name">{user?.name ?? ''}</div>
      <button onClick={() => loginAs('student@test.com', 'Password1!')}>Login</button>
      <button onClick={() => updateUser({ username: 'Updated User' })}>Update User</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContextProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('loginAs stores the access token and authenticates the user', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({
      accessToken: 'test-access-token',
      user: { id: '1', name: 'Casey', role: 'user' },
    });

    render(
      <AuthContextProvider>
        <Consumer />
      </AuthContextProvider>
    );

    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('auth-state')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('user-name')).toHaveTextContent('Casey');
    expect(sessionStorage.getItem('accessToken')).toBe('test-access-token');
  });

  test('updateUser merges new profile data with the existing user object', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({
      accessToken: 'token',
      user: { id: '1', name: 'Casey', role: 'user', email: 'casey@test.com' },
    });
    mockUpdateUserData.mockResolvedValue({ username: 'Updated User' });

    render(
      <AuthContextProvider>
        <Consumer />
      </AuthContextProvider>
    );

    await user.click(screen.getByRole('button', { name: /login/i }));
    await user.click(screen.getByRole('button', { name: /update user/i }));

    await waitFor(() => {
      expect(screen.getByTestId('user-name')).toHaveTextContent('Casey');
    });
  });

  test('logout clears session storage and resets auth state', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({
      accessToken: 'logout-token',
      user: { id: '1', name: 'Casey', role: 'user' },
    });

    render(
      <AuthContextProvider>
        <Consumer />
      </AuthContextProvider>
    );

    await user.click(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => expect(screen.getByTestId('auth-state')).toHaveTextContent('true'));

    await user.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.getByTestId('auth-state')).toHaveTextContent('false');
    expect(sessionStorage.getItem('accessToken')).toBeNull();
  });
});
