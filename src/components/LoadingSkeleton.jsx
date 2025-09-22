const LoadingSkeleton =()=>{
    return(
        <div className="p-4 space-y-2">
            {[...Array(5)].map((_,idx)=>(
                <div key={idx} className="h-6 bg-gray-300 rounded animate-pulse">
            </div>
        ))}
        </div>
    );
};
export default LoadingSkeleton;