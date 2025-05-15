const Loading = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin mx-auto mb-4"></div>
                {/* <p className="text-lg font-medium">Loading, please wait...</p> */}
            </div>
        </div>
    );
};

export default Loading;