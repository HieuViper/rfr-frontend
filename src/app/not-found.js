import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px-80px)]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 text-center space-y-4">
        <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          404
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Oops! Trang Không Tồn Tại.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-gray-900 text-gray-50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
          prefetch={false}
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}
