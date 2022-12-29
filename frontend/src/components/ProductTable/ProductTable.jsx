import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSortBy, useTable, usePagination } from "react-table";

import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { PRODUCT_COLUMNS } from "../ProductTable/Colums";
import { useDispatch, useSelector } from "react-redux";
import { admingetProduct } from "src/slice/adminSlice/adminProductSlice";
const ProductTable = () => {
  const columns = useMemo(() => PRODUCT_COLUMNS, []);
  const { product } = useSelector((state) => state.AdminProduct)
  console.log(product);
const dispatch= useDispatch()
 

  useEffect(() => {
    dispatch(admingetProduct())
  }, []);
  const data = useMemo(() => product, [product]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;



  return (
    <>
      <table {...getTableProps()} className="category-table">
        <thead className="category-table-head">
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
        <tbody {...getTableBodyProps()} className="category-table-body">
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

        {/* <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}                      
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div> */}
      </table>
    </>
  );
};

export default ProductTable;