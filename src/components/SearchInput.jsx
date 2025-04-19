import { FaSearch } from "react-icons/fa";

export default function SearchInput({
                                   searchQuery,
                                   setSearchQuery,
                                   handleSearch,
                                   clearSearch,
                                   isSearching,
                                   placeholder = "Search...",
                                   minLength = 3,
                               }) {
    const trimmed = searchQuery.trim();
    const tooShort = trimmed.length > 0 && trimmed.length < minLength;

    const onSearchClick = () => {
        if (!tooShort) {
            handleSearch();
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !tooShort) {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col flex-grow max-w-md">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    className={`w-full py-2 px-3 border rounded-md pr-10 text-yellow-400 transition-colors bg-yellow-900/20 placeholder-yellow-300
                        ${tooShort ? 'border-red-500 focus:border-red-500 ' : 'border-yellow-600 focus:border-yellow-300'}`}/>
                <button
                    onClick={onSearchClick}
                    disabled={tooShort}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 transition-colors
                        ${tooShort ? 'text-red-400 cursor-not-allowed' : 'text-yellow-400 hover:text-yellow-300'}`}
                >
                    <FaSearch />
                </button>
            </div>
            {tooShort && (
                <p className="mt-1 text-xs text-red-500">
                    Please enter at least {minLength} characters.
                </p>
            )}
            {isSearching && (
                <button
                    onClick={clearSearch}
                    className="mt-2 py-2 px-3 text-white font-pixelify rounded-md shadow-lg transition-all hover:bg-yellow-500 bg-yellow-400 text-sm sm:text-base"
                >
                    Clear
                </button>
            )}
        </div>
    );
}