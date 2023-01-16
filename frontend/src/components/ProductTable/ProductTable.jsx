import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSortBy, useTable, usePagination, useGlobalFilter } from "react-table";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Search from "./search/Search";


const ProductTable = ({data,columns}) => {


const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  
const {GlobalFilter} = state
  return (
    <>
    <Search setGlobalFilter={setGlobalFilter} filter={GlobalFilter}/>
      <table {...getTableProps()} className="product-table">
        <thead className="product-table-head">
          {headerGroups.map((headerGroups) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map((columns) => (
                <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>
                  {columns.render("Header")}
                  <span>
                    {columns.isSorted ? (
                      columns.isSortedDesc ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleUp />
                      )
                    ) : (
                      ""
                    )}  
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="product-table-body">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <th {...cell.getCellProps()}>{cell.render("Cell")}</th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;