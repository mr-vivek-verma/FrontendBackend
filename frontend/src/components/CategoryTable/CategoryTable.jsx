import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, Typography, MenuItem } from '@mui/material';
import Iconify from '../iconify/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, singleCategory } from 'src/slice/adminSlice/adminCategorySlice';
import { Link } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(categoryName, sizes, action) {
  return { categoryName, sizes };
}


  
  export default function CustomizedTables() {
    const [filteredData, setFilteredData] = React.useState([]);

    const dispatch = useDispatch()

    const handleSearch = (event) => {
      setFilteredData(event.target.value)
      
    }
   
    const onSubmit = (values) => {
 
      dispatch(createCategory({ values,inputImage}))

    }

    const { category } = useSelector((state) => state.AdminCategory)
  return (
    <TableContainer component={Paper}>
    <Typography sx={{ display: 'flex', justifyContent: ' end', m: 2 }}>
          <input style={{ height: '30px' }} placeholder="Search"  onChange={(event) => handleSearch(event)} />
        </Typography>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category Name</StyledTableCell>
            <StyledTableCell align="right">Sizes</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            { category?.filter(val => {
          if (filteredData === "") { return val }
          else if (val.category_name.toString().toLowerCase().includes(filteredData.toString().toLowerCase())) {
            return val
          }
        }).map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.category_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.sizes}</StyledTableCell>
              <StyledTableCell align="right">
              <Typography variant="button">
              <Button onClick={(e) => {dispatch(singleCategory(row._id))}}>
               < Link  to="/dashboard/categoryform" >
               <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}/>
                Edit
              </Link>
             </Button>  

        <Button sx={{ color: 'error.main' }} onClick={(e)=>{dispatch(deleteCategory(row._id))}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }}  />
          Delete
        </Button>
              </Typography></StyledTableCell>
          
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



