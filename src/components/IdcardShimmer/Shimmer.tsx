const Shimmer = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="w-[370px] h-[560px] mx-auto animate-pulse"
          >
            <div className="w-full h-full shadow-[0px_4px_24px_0px_#00000026] rounded-xl bg-white overflow-hidden">
              {/* Top Image Section */}
              <div className="bg-gray-200 h-[220px] w-full flex justify-center items-center">
                <div className="w-[130px] h-[130px] bg-gray-300 rounded-full" />
              </div>

              {/* Name & Role */}
              <div className="text-center py-4 space-y-2">
                <div className="h-4 w-1/2 bg-gray-300 mx-auto rounded" />
                <div className="h-3 w-1/3 bg-gray-200 mx-auto rounded" />
              </div>

              {/* Details Section */}
              <div className="px-8 py-5 grid gap-3">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>

              {/* Barcode Section */}
              <div className="p-4 flex justify-center">
                <div className="w-[70%] h-12 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;

