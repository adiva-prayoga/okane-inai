import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}

const PaginationControl = ({ totalPages, currentPage, onPageChange, onPrevious, onNext }: PaginationControlProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pageNumbers.map(pageNumber => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onPageChange(pageNumber);
          }}
          isActive={pageNumber === currentPage}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={(event) => { event.preventDefault(); onPrevious(); }} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext href="#" onClick={(event) => { event.preventDefault(); onNext(); }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl