export type ExpenseTypes = {
  id: number;
  amount: string;
  title: string;
  date: string;
  userId: string;
  createdAt: string | null;
}

export type PaginationControlTypes = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  onPrevious: () => void
  onNext: () => void
}