import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { cn } from "../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { P } from "./ui/typography";

const LOADING_ROW = {};

const FAKE_LOADING_DATA = Array.from({ length: 4 }).fill(LOADING_ROW);

const EmptyBlock = ({
  className,
  emptyText,
}: {
  emptyText?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-grow justify-center items-center",
        className,
      )}
    >
      <P muted className="mb-0 text-lg">
        {emptyText ?? "No results"}
      </P>
    </div>
  );
};

export const DataTable = <TData extends RowData, TValue>({
  data,
  columns,
  loading,
  defaultSorting,
  className,
  emptyText,
  getRowId,
}: {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  loading?: boolean;
  className?: string;
  defaultSorting?: SortingState;
  emptyText?: string;
  getRowId: (row: TData) => string;
}) => {
  const dataRows = useMemo(() => {
    if (loading) {
      return FAKE_LOADING_DATA as TData[];
    }
    return data;
  }, [data, loading]);

  const mapColumn = useCallback(
    (col: ColumnDef<TData, TValue>) => ({
      ...col,
      cell: (params: CellContext<TData, TValue>) => {
        if (params.row.original === LOADING_ROW) {
          return (
            <div className="flex items-center h-10 w-full">
              <div className="animate-pulse rounded-md bg-muted h-6 w-3/4" />
            </div>
          );
        }
        return typeof col.cell === "function"
          ? (col.cell(params) as ReactNode)
          : col;
      },
    }),
    [],
  );

  const [sorting, setSorting] = useState<SortingState>(defaultSorting ?? []);

  const table = useReactTable({
    data: dataRows,
    columns: columns.map(mapColumn),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getRowId,
    state: {
      sorting,
      columnVisibility: {
        id: false,
      },
    },
  });

  const rows = table.getRowModel().rows;

  const rowElems = rows.map((row) => (
    <CSSTransition
      key={row.id}
      timeout={500}
      classNames={{
        enter: "animate-enter",
        exit: "animate-exit",
      }}
    >
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        className={cn({ "border-none": loading })}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="p-4">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    </CSSTransition>
  ));

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-12 font-semibold p-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {rows.filter((row) => row.original === LOADING_ROW).length > 0 ? (
          <TableBody>{rowElems}</TableBody>
        ) : (
          <TransitionGroup component={TableBody}>
            {rowElems.length > 0 ? (
              rowElems
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  <EmptyBlock emptyText={emptyText} />
                </TableCell>
              </TableRow>
            )}
          </TransitionGroup>
        )}
      </Table>
    </div>
  );
};

export default DataTable;
