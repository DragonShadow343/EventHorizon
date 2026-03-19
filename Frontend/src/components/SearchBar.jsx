const SearchBar = ({ className }) => {
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Search for events..."
                    className={`w-full h-13 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 ${className}`}
                />
            </div>
        </>
    )
}

export default SearchBar