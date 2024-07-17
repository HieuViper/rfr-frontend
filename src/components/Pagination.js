import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { deleteAttributeInUrl } from "@/lib/utils";

const PaginationComp = (props) => {
  const total = parseInt(props.total);
  const pageIndex = parseInt(props.pageIndex);
  const pageSize = parseInt(props.pageSize);

  const newUrl = deleteAttributeInUrl(window.location.href, [
    "pageIndex",
    "pageSize",
  ]);

  const pagesCount = Math.ceil(total / pageSize);

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => {
    return i + 1;
  });
  return (
    <Pagination>
      <PaginationContent>
        {pageIndex > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`${newUrl}&pageIndex=${pageIndex - 1}&pageSize=${pageSize}`}
            />
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              // onClick={() =>
              // console.log(`${url}?pageIndex=${page}&pageSize=${pageSize}`)
              // }
              href={`${newUrl}&pageIndex=${page}&pageSize=${pageSize}`}
              isActive={page === pageIndex}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageIndex < pagesCount && (
          <PaginationItem>
            <PaginationNext
              href={`${newUrl}&pageIndex=${pageIndex + 1}&pageSize=${pageSize}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
