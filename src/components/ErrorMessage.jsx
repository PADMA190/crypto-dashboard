const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="p-4 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm flex items-center justify-between gap-3">
            <span>{message}</span>
            {onRetry && (
                <button onClick={onRetry} className="px-3 py-1 rounded border border-red-300 bg-white text-red-700 text-xs">Retry</button>
            )}
        </div>
    );
};

export default ErrorMessage;