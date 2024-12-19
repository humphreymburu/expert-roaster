
import { Suspense } from "react";
import { getExperts } from '@expo/lib/actions/actions';
import {
  User,
  Home,
  MessageSquare,
  FileText,
  Calendar,
  BarChart,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";
import { Header } from '@expo/components/header';
import { SearchHeader } from './components/search-header';
import { TableSkeleton } from './components/table-skeleton';
import { ExpertsTable } from './components/experts-table';



export const revalidate = 0;


export default async function ExpertsPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const page = Number(searchParams.page) || 1;
    const { experts, total, pages } = await getExperts(searchParams.q, page);
    
  console.log(experts, "experts")
  

  return (
    <>
      <Header/>
      <div className="p-8">
          <SearchHeader total={total} />

          <Suspense fallback={<TableSkeleton />}>
            <ExpertsTable
              experts={experts}
              currentPage={page}
              totalPages={pages}
            />
          </Suspense>
      </div>
      </>
    
  );
}