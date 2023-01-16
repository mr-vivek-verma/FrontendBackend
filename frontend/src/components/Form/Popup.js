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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const {deleteId}=props;
const {categoryId}=props
console.log("props from modelsd", categoryId)
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Are you sure
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           You want to delete the product.
          </Typography>
          <Typography>
          
          <Typography>
          <Button onClick={()=>{deleteHandler()}} >Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
          </Typography>

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}