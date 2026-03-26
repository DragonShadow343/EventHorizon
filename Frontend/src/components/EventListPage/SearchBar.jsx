import { useState } from 'react';

const SearchBar = ({ className, onSearch }) => {

    const [query, setQuery] = useState('');



    return (
        <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch(query);
              }}
              className="flex gap-x-2"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for events..."
                    className={`w-full px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${className}`}
                />
                <button type="submit" className="bg-blue-500 text-white px-6 hover:bg-blue-400 cursor-pointer rounded-lg">
                    Search
                </button>
            </form>
        </>
    )
}

export default SearchBar