import { LoaderIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px-80px)]">
      <p className="text-2xl mr-2">Loading</p>
      <LoaderIcon className="animate-spin" size={32} />
    </div>
  );
};

export default Loading;
