import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Button, Typography } from "@mui/material";
import Iconify from "../iconify/Iconify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  setCategoryId,
  setToggleFalse,
  singleCategory,
} from "src/slice/adminSlice/adminCategorySlice";
import BasicModal from "../Form/Popup";
import { Link } from "react-router-dom";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
   
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(categoryName, sizes, action) {
  return { categoryName, sizes };
}

export default function CustomizedTables() {
  const [filteredData, setFilteredData] = React.useState([]);

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    setFilteredData(event.target.value);
  };

  const onSubmit = (values) => {
    dispatch(createCategory({ values, inputImage }));
  };

  const { category } = useSelector((state) => state.AdminCategory);

  const editButton = (id) => {
    dispatch(setToggleFalse());
    dispatch(setCategoryId(id));
  };
  return (
    <TableContainer component={Paper}>
      <Typography sx={{ display: "flex", justifyContent: " end", m: 2 }}>
        <input
          style={{ height: "30px" }}
          placeholder="Search"
          onChange={(event) => handleSearch(event)}
        />
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
          {Object.values(category)
            ?.filter((val) => {
              if (filteredData === "") {
                return val;
              } else if (
                val.category_name
                  ?.toString()
                  .toLowerCase()
                  .includes(filteredData?.toString().toLowerCase())
              ) {
                return val;
              }
            })
            .map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className="product-table-main"
                >
                  <img
                    style={{
                      display: "flex",
                      width: "70px",
                      justifyContent: "center",
                    }}
                    src={
                      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                      row.category_image.filename
                    }
                  />
                  {row.category_name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.sizes}</StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="button">
                    <Button
                      style={{
                        backgroundColor: "#1155C4 ",
                        marginRight: "4px",
                      
                      }}
                      onClick={() => {
                        editButton(row._id);
                        dispatch(singleCategory(row._id));
                      }}
                    >
                      <Link
                        style={{ color: "#ffff" }}
                        to="/dashboard/editcategoryform"
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#A60808",
                    
                        width: "10px",
                        height: "36px",
                      }}
                      sx={{ color: "error.main" }}
                    >
                      <BasicModal categoryId={row._id} />
                    </Button>
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
