import React,{useEffect, useState} from "react"
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  CardActions,
  Button,
  CardHeader,
  FormControl,
} from "@material-ui/core"

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { TextField } from "formik-material-ui"

import { useDispatch, useSelector } from "react-redux"
import { createCategory, editCategory } from "src/slice/adminSlice/adminCategorySlice"
import { useNavigate } from "react-router-dom"


const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

// Data
const initialValues = {
  category: "",
  size: "",
  category_image:""
 
}





// validation schema
const validationSchema = Yup.object().shape({
  category: Yup.string().required("Required"),
 size: Yup.string().required("Required"),

})

const UserForm = () => {
  const navigate = useNavigate()
  // const [inputImage, setInputImage] = useState();
  const [file, setFile] = useState([]);
const [g, setG] = useState([]);

 

const  dispatch = useDispatch();

  const classes = useStyle()
// console.log(category_image)
  
  // const handleImage = (e, values) => {
  //   e.preventDefault();
  //   console.log("image", e.target.files[0])
    
 
   
  //   setInputImage(e.target.files[0]);

    
  // }

  
  // useEffect(() => {
    //   dispatch(createCategory())
    // })
    const onSubmit = (values) => {
 if(!id){
   dispatch(createCategory({ values}))
 }
dispatch(editCategory({values, id}))
  }

  const handleBackPage = () =>{
    navigate("/dashboard/products")
  }
  const { category } = useSelector((state) => state.AdminCategory)
  const [id, setId] = useState("");


  useEffect(()=>{
    setId(category._id)
  },[category])

  console.log(id)
    return (
      
    <Grid container justify="center" spacing={1}>
      
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="Create Categories"/>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ dirty, isValid, values, handleChange, handleBlur,setFieldValue }) => {
              return (  
                <Form>
                  <CardContent>
                   <Grid item container spacing={4} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                      <InputLabel required shrink htmlFor="bootstrap-input">
                        Category
                         </InputLabel>
                         <br/>
                        <Field
                          label="Enter New Category"
                          variant="outlined"
                          fullWidth
                          name="category"
                          value={values.category}
                          component={TextField}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6} md={6}>
                      <InputLabel required shrink htmlFor="bootstrap-input">
                        Size
                         </InputLabel>
                         <br/>
                        <Field
                          label="Enter Size"
                          variant="outlined"
                          fullWidth
                          name="size"
                          value={values.size}
                          component={TextField}
                        />
                        <br/><br/>
                        <input 
                          label="Image"
                          variant="outlined"
                          fullWidth
                          name="category_image"
                          type="file" 
                          onChange={(e)=>{setFieldValue("category_image",e.currentTarget.files[0]); setG(URL.createObjectURL(e.currentTarget.files[0])) }}
                         />
                      <img src={g}/>
                      </Grid>
                     </Grid>
                   
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e)=>{handleBackPage()}}
                      className={classes.button}>
                      Back
                    </Button>
                    <Button
                   
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}>
                  Submit
                    </Button>
                    
                  </CardActions>
                 
                </Form>
              )
            }}
          </Formik>
          
        </Card>
       
      </Grid>
     
    </Grid>
  )
}

export default UserForm
