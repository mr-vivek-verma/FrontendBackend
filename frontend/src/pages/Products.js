import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
// components

import Iconify from "../components/iconify/Iconify";
import { Link } from "react-router-dom";
import ProductTable from "src/components/ProductTable/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import {
  admingetProduct,
  deleteProduct,
} from "src/slice/adminSlice/adminProductSlice";

// ----------------------------------------------------------------------

export default function UserPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const { product } = useSelector((state) => state.AdminProduct);
  const data = useMemo(() => product, [product]);

  const dispatch = useDispatch();

  const columns = [
    {
      Header: "Product",
      accessor: "product_name",
    },
    {
      Header: "Category",
      accessor: "category.category_name",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Buying Price",
      accessor: "buying_price",
    },
    {
      Header: "Selling Price",
      accessor: "reselling_price",
    },
    {
      Header: "Publication",
      accessor: "is_draft",
      Cell: (value) => {
        return value ? "false" : "true";
      },
    },

    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      Cell: (tableProps) => {
        const deleteId = tableProps.row.original.id;
        console.log(deleteId);
        return (
          <>
            <button className="category-edit-btn">Edit</button>{" "}
            <button
              className="category-edit-delete"
              onClick={() => dispatch(deleteProduct(deleteId))}
            >
              Delete
            </button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(admingetProduct());
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  console.log(data);

  return (
    <>
      <Helmet>
        <title> Products </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: " end", m: 2 }}>
          <Link
            to="/dashboard/productform"
            variant="contained"
            starticon={<Iconify icon="eva:plus-fill" />}
          >
            <button> Create New </button>
          </Link>
        </Typography>

        <Typography>
          {data.data?.length > 0 && (
            <ProductTable data={data.data} columns={columns} />
          )}
        </Typography>
      </Container>
      <Typography></Typography>
    </>
  );
}
