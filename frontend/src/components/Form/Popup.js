import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import {  deleteProduct  } from "src/slice/adminSlice/adminProductSlice";
import { deleteCategory } from 'src/slice/adminSlice/adminCategorySlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius:  "5px",
  boxShadow: 2,
  p: 3,
};


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const {deleteId}=props;
const {categoryId}=props
const dispatch = useDispatch();


const deleteHandler = () =>{
  if(categoryId){
    dispatch(deleteCategory(categoryId))
  }else{
    dispatch(deleteProduct(deleteId))
}}

  return (
    <div>
      <Button onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:"#A60808 "}}>
           Confirm Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2}}>
           Are you sure you want to delete this item?
          </Typography>
          <Typography>
          
          <Typography>
          <Button style={{backgroundColor:"#1155C4 ", margin:"5px", color:"#ffff"}} onClick={()=>{deleteHandler()}} >Confirm</Button>
          <Button style={{backgroundColor:"#1155C4 ", margin:"5px", color:"#ffff"}} onClick={handleClose}>Cancel</Button>
          </Typography>

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}