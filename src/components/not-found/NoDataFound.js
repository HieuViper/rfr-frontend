const NoDataFound = () => {
  return (
    <div className="min-h-[calc(100vh-72px-80px-160px)] justify-center flex flex-col items-center bg-white p-8 rounded-lg ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-24 w-24 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h18v18H3z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 9l6 6M9 15l6-6"
        />
      </svg>
      <h1 class="mt-4 text-3xl font-semibold text-gray-700">Trống</h1>
      <p class="mt-2 text-gray-500">Không có dữ liệu để hiển thị.</p>
    </div>
  );
};

export default NoDataFound;
