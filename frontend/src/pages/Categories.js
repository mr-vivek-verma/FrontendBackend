import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../slice/userSlice/categorySlice/categorySlice';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import CategoryTable from '../components/CategoryTable/CategoryTable';
import CategoryForm from '../components/Form/CategoryForm';

import Iconify from '../components/iconify/Iconify';

import { Link } from 'react-router-dom';
import { admingetCategory, setToggleTrue } from 'src/slice/adminSlice/adminCategorySlice';
import { UserProduct } from 'src/slice/userSlice/userProductSlice';
import products from '../_mock/products';
// ----------------------------------------------------------------------

export default function Categories() {
  
  const [openFilter, setOpenFilter] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.AdminCategory)

  useEffect(() => {
    dispatch(admingetCategory());
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
        <title> Categories </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categories
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: ' end', m: 2 }}>
          <Link to="/dashboard/categoryform" variant="contained" starticon={<Iconify icon="eva:plus-fill" />}>
           <button onClick={()=>dispatch(setToggleTrue())}> Create New </button>
          </Link>
        </Typography>
        
        <Typography>
          <CategoryTable />
        </Typography>
      </Container>
      <Typography>
      </Typography>
    </>
  );
}
