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

  function getVisiblePages(totalPages, currentPage, pageVisible) {
    let startPage = Math.max(currentPage - Math.floor(pageVisible / 2), 1);
    let endPage = startPage + pageVisible - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pageVisible + 1, 1);
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  const pageVisible = 5;
  const pages = getVisiblePages(pagesCount, pageIndex, pageVisible);
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
