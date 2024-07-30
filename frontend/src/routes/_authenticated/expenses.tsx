import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllExpensesQueryOptions } from "@/lib/api";

import PaginationControl from "@/components/PaginationControl";
import TableExpenses from "@/components/TableExpenses";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const totalPages = Math.ceil((data?.expenses?.length ?? 0) / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = data?.expenses?.slice(startIndex, startIndex + itemsPerPage) ?? [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="p-2 max-w-3xl m-auto">
      <TableExpenses 
        currentExpenses={currentExpenses} 
        isPending={isPending}
      />
      <PaginationControl
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </section>
  );
}
