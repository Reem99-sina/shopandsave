import clsx from 'clsx';
import React from 'react';
import { Row } from './row.component';
import { HeadRow } from './head-row.component';

export interface Column {
  title: string;
  accessor: string;
}

interface Props<T> {
  columns: Column[];
  items: T[];
  href?: string;
}

export const Table = <T,>({ columns, items, href = '#' }: Props<T>) => {
  return (
    <div className='overflow-auto'>
      <table className={clsx(' w-full border-collapse text-xs text-[#58595B]')}>
        <thead>
          <HeadRow columns={columns} />
        </thead>

        <tbody>
          {items?.map((item, index) => {
            const isFirstRow = index === 0;
            const isLastRow = index === items.length - 1;

            return (
              <Row<T>
                key={index}
                item={item}
                columns={columns}
                index={index}
                isFirstRow={isFirstRow}
                isLastRow={isLastRow}
                href={href}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
