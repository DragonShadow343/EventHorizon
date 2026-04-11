import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';

const mockNavigate = jest.fn();
const mockRegister = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../api/auth', () => ({
  register: (...args) => mockRegister(...args),
}));

describe('Signup page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('blocks weak passwords and shows a clear validation message', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/name/i), 'Taylor');
    await user.type(screen.getByPlaceholderText(/^email$/i), 'taylor@test.com');
    await user.type(screen.getByPlaceholderText(/^password$/i), 'weakpass');
    await user.type(screen.getByPlaceholderText(/re-type password/i), 'weakpass');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText(/password must include 1 uppercase letter/i)).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  test('submits valid data and sends the user to login', async () => {
    const user = userEvent.setup();
    mockRegister.mockResolvedValue({ message: 'Registered' });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/name/i), 'Taylor');
    await user.type(screen.getByPlaceholderText(/^email$/i), 'taylor@test.com');
    await user.type(screen.getByPlaceholderText(/^password$/i), 'Password1!');
    await user.type(screen.getByPlaceholderText(/re-type password/i), 'Password1!');
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('Taylor', 'taylor@test.com', 'Password1!');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
