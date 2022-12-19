// import React from "react"
// import {
//   Grid,
//   makeStyles,
//   Card,
//   CardContent,
//   MenuItem,
//   InputLabel,
//   Select,
//   CardActions,
//   Button,
//   CardHeader,
//   FormControl,
// } from "@material-ui/core"

// import { Formik, Form, Field } from "formik"
// import * as Yup from "yup"
// import { TextField } from "formik-material-ui"
// import ImageUpload from "../ImageUploader/ImageUpload"


// const useStyle = makeStyles((theme) => ({
//   padding: {
//     padding: theme.spacing(3),
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }))

// // Data
// const initialValues = {
//   category: "",
//   size: "",
//   productName:"",
//   sku:"",
//   buyingPrice: "",
//   sellingPrice: "",
 
// }

// const options = [
//   { label: "Computer Programmer", value: "Computer_programmer" },
//   { label: "Web Developer", value: "web_developer" },
//   { label: "User Experience Designer", value: "user_experience_designer" },
//   { label: "Systems Analyst", value: "systems_analyst" },
//   { label: "Quality Assurance Tester", value: "quality_assurance_tester" },
// ]



// // validation schema
// const validationSchema = Yup.object().shape({
//  category: Yup.string().required("Required"),
//  size: Yup.string().required("Required"),
//  productName:Yup.string().required("Required"),
//  sku: Yup.string().required("Required"),
//  buyingPrice: Yup.string().required("Required"),
//  sellingPrice: Yup.string().required("Required"),

// })

// const UserForm = () => {
//   const classes = useStyle()

//   const onSubmit = (values) => {
//     console.log(values)
//   }

//   return (
    
//     <Grid container justify="center" spacing={1}>
//       {/* <ImageUpload/> */}
//       <Grid item md={6}>
//         <Card className={classes.padding}>
//           {/* <CardHeader title="Create Categories"/> */}
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}>
//             {({ dirty, isValid, values, handleChange, handleBlur }) => {
//               return (
//                 <Form>
//                   <CardContent>
                 
//                    <Grid item container spacing={5} >
//                    <InputLabel  required shrink color="warning"  htmlFor="bootstrap-input">
//                        Category
//                          </InputLabel>
                         
//                    <Grid item xs={12} sm={6} md={12} >
                   
//                         <FormControl fullWidth variant="outlined">
                        
//                         <InputLabel id="demo-simple-select-outlined-label">
//                             Select category
//                           </InputLabel>
//                           <Select
//                             labelId="demo-simple-select-outlined-label"
//                             id="demo-simple-select-outlined"
//                             label="Select category"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.buyingPrice}
//                             name="buyingPrice">
//                             <MenuItem>None</MenuItem>
//                             {options.map((item) => (
//                               <MenuItem key={item.value} value={item.value}>
//                                 {item.label}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                         </FormControl>
                        
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={6}>
//                       <InputLabel  required shrink color="warning"  htmlFor="bootstrap-input">
//                       Product Name
//                          </InputLabel>
//                         <Field
//                           label="Product Name"
//                           variant="outlined"
//                           fullWidth
//                           name="productName"
//                           value={values.productName}
//                           component={TextField}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={6}>
//                       <InputLabel  required shrink color="warning"  htmlFor="bootstrap-input">
//                       SKU
//                          </InputLabel>
//                         <Field
//                           label="Enter new SKU"
//                           variant="outlined"
//                           fullWidth
//                           name="sku"
//                           value={values.sku}
//                           component={TextField}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={6}>
//                       <InputLabel required shrink htmlFor="bootstrap-input">
//                       Buying Price
//                          </InputLabel>
//                          <br/>
//                         <Field
//                           label="Enter Buying Price"
//                           variant="outlined"
//                           fullWidth
//                           name="category"
//                           value={values.category}
//                           component={TextField}
//                         />
//                       </Grid>
                      
//                       <Grid item xs={12} sm={6} md={6}>
//                       <InputLabel required shrink htmlFor="bootstrap-input">
//                       Buying Price
//                          </InputLabel>
//                          <br/>
//                         <Field
//                           label="Enter Selling Price"
//                           variant="outlined"
//                           fullWidth
//                           name="size"
//                           value={values.size}
//                           component={TextField}
//                         />
//                       </Grid>
//                      </Grid>
                   
//                   </CardContent>
                              
//                   <Grid item xs={12} sm={6} md={6}>
//                   <InputLabel  required shrink color="warning"  htmlFor="bootstrap-input">
//                       Select Sizes
//                          </InputLabel>
//                          <InputLabel  required shrink color="warning"  htmlFor="bootstrap-input">
//                      Main image
//                          </InputLabel>
//                          <ImageUpload/>
//                          <InputLabel  required shrink color="warning"  htmlFor="bootstrap-input">
//                       Sharing image
//                          </InputLabel>
//                          <ImageUpload/>
//                          </Grid>
//                   <CardActions>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       type="Submit"
//                       className={classes.button}>
//                       Back
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       type="Submit"
//                       className={classes.button}>
//                   Submit
//                     </Button>
                    
                   
                   
//                   </CardActions>
                  
//                 </Form>
//               )
//             }}
//           </Formik>
          
//         </Card>
       
//       </Grid>
     
//     </Grid>
//   )
// }

// export default UserForm
