import "../App.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import CategoryTable from "../components/CategoryTable/CategoryTable";

import Iconify from "../components/iconify/Iconify";

import { Link } from "react-router-dom";
import {
  admingetCategory,
  setToggleTrue,
  singleCategoryClear
} from "src/slice/adminSlice/adminCategorySlice";

// ----------------------------------------------------------------------

export default function Categories() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.AdminCategory);

  useEffect(() => {
    dispatch(admingetCategory());
  }, []);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };


  const handleCreate=() => { 
    dispatch(singleCategoryClear())
    dispatch(setToggleTrue())
   }
  return (
    <>
      <Helmet>
        <title> Categories </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categories
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: " end", m: 2 }}>
          <Link
            to="/dashboard/categoryform"
            variant="contained"
            starticon={<Iconify icon="eva:plus-fill" />}
          >
            <button
              className="Back-link"
              onClick={() =>{handleCreate()}}
            >
              {" "}
              Create New{" "}
            </button>
          </Link>
        </Typography>

        <Typography>
          <CategoryTable />
        </Typography>
      </Container>
      
    </>
  );
}
