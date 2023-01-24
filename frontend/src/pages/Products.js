import "../App.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { Container, Typography } from "@mui/material";
// components

import Iconify from "../components/iconify/Iconify";
import { Link, useNavigate } from "react-router-dom";
import ProductTable from "src/components/ProductTable/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import {
  admingetProduct,
  setProductId,
  setToggleFalse,
  setToggleTrue,
  singleProduct,
} from "src/slice/adminSlice/adminProductSlice";
import BasicModal from "src/components/Form/Popup";

// ----------------------------------------------------------------------

export default function UserPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const { product } = useSelector((state) => state.AdminProduct);
  const data = useMemo(() => product, [product]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const columns = [
    {
      Header: "Product",
      accessor: "product_name",
      Cell: (tableProps) => {
        return (
          <div className="product-table-main">
            <img
              style={{ display: "flex", width: "80px" }}
              src={
                "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                tableProps?.row.original.main_image[0]?.filename
              }
            />
            <p style={{ display: "flex", justifyContent: "center" }}>
              {tableProps?.row.original.product_name}
            </p>
          </div>
        );
      },
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
        const editId = tableProps.row.original.id;
        const [openPopup, setOpenPopup] = useState(false);

        const confirmation = () => {
          setOpenPopup(true);
        };

        const editProduct = () => {
          dispatch(setToggleFalse());
          dispatch(setProductId(tableProps.row.original.id));
          dispatch(singleProduct(tableProps.row.original.id));
        };

        const callbck = (props) => {
          setopenPopup(props.false);
        };

        return (
          <>
            <button
              className="category-edit-btn"
              onClick={() => editProduct(editId)}
            >
              <Link to="/dashboard/editproductform">Edit</Link>
            </button>{" "}
            <button className="category-edit-delete">
              <BasicModal deleteId={deleteId} />
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
            <button
              className="Back-link"
              onClick={() => dispatch(setToggleTrue())}
            >
              {" "}
              Create New{" "}
            </button>
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
