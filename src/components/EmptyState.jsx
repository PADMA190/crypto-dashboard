const EmptyState = ({ title = 'No results', subtitle = 'Try adjusting your filters.' }) => (
    <div className="p-8 text-center text-sm text-gray-600">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="mt-1">{subtitle}</p>
    </div>
);

export default EmptyState;


