import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
export default function Gallery2({ children, images }) {
  return (
    <Dialog>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent className="min-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Ảnh Phòng</DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-scroll">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry gutter="16px">
              {images?.map((image) => (
                <Image
                  key={image.url}
                  src={process.env.NEXT_PUBLIC_CDN_URL + image.url}
                  alt={image.name}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 80vw, 20vw"
                  style={{ width: "100%", display: "block" }}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </DialogContent>
    </Dialog>
  );
}
