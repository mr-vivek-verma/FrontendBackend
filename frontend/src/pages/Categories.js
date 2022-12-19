import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// components
import { useDispatch } from 'react-redux';
import { getCategory } from '../slice/categorySlice/categorySlice';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import CategoryTable from '../components/CategoryTable/CategoryTable';
import CategoryForm from '../components/CategoryForm/CategoryForm';

import Iconify from '../components/iconify/Iconify';
import ImageUpload from '../components/ImageUploader/ImageUpload';
import Popup from '../components/CategoryForm/Popup';
// ----------------------------------------------------------------------

export default function Categories() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('helo');
    dispatch(getCategory());
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
          {/* <Button onClick={handleOpenFilter} sx={{background:"blue", color:"#ffff"}}>Create New</Button> */}
          <Button onClick={() => setOpenPopup(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Create New
          </Button>
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: ' end', m: 2 }}>
          <input style={{ height: '30px' }} placeholder="Search" />
        </Typography>
        <Typography>
          <CategoryTable />
        </Typography>
        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        <ProductCartWidget /> */}
      </Container>
      <Typography>
        {/* <Popup 
       openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CategoryForm/>
      </Popup> */}
        {/* <CategoryForm/> */}
        {/* <ImageUpload/> */}
      </Typography>
    </>
  );
}
