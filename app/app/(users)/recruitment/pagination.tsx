'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination, calculateTotalPages } from './utils';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export const Pagination = ({ totalEmails }: { totalEmails: number }) => {
  const totalPages = calculateTotalPages(totalEmails, 20);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    params.set('page', pageNumber.toString()); // 'page' 파라미터에 현재 페이지 번호 추가

    return `${pathname}?${params.toString()}`; // 현재 경로와 파라미터를 조합하여 페이지 URL 생성
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx('flex size-10 items-center justify-center border text-sm', {
    'rounded-l-md': position === 'first' || position === 'single',
    'rounded-r-md': position === 'last' || position === 'single',
    'z-10 bg-purple-03 text-white': isActive,
    'hover:bg-gray-100': !isActive && position !== 'middle',
    'text-gray-300': position === 'middle',
  });

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx('flex size-10 items-center justify-center rounded-md border', {
    'pointer-events-none text-gray-300': isDisabled,
    'hover:bg-gray-100': !isDisabled,
    'mr-2 md:mr-4': direction === 'left',
    'ml-2 md:ml-4': direction === 'right',
  });

  const icon =
    direction === 'left' ? <ArrowLeftIcon className="w-4" /> : <ArrowRightIcon className="w-4" />;

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}