import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/EventListPage/SearchBar';

describe('SearchBar', () => {
  test('submits the current query to the parent callback', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();

    render(<SearchBar onSearch={onSearch} />);

    await user.type(screen.getByPlaceholderText(/search for events/i), 'music festival');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith('music festival');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
