export default function Pagination({ page, totalPages, setPage }) {
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-yellow-400 text-white rounded-md mr-2 disabled:opacity-50"
            >
                Previous
            </button>
            <span className="self-center text-yellow-400 text-lg">
                Page {page + 1} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
                className="px-4 py-2 bg-yellow-400 text-white rounded-md ml-2 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
