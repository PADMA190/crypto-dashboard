const LoadingSkeleton = () => {
    return (
        <div className="p-4 space-y-3">
            {[...Array(8)].map((_, idx) => (
                <div key={idx} className="h-5 bg-gray-200 rounded animate-pulse" />
            ))}
        </div>
    );
};

export default LoadingSkeleton;