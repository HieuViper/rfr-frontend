import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <div className="w-full min-h-[calc(100vh-72px-80px)] flex flex-col gap-y-5 justify-center items-center text-3xl font-semibold">
      <div className="">Không tìm thấy trang</div>
      <Button variant="outline">
        <a href="/">Quay lại trang chủ</a>
      </Button>
    </div>
  );
};

export default NotFound;
