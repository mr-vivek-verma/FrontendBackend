// import React,{useState} from "react"
// import {
//   Grid,a
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
//   category: Yup.string().required("Required"),
//  size: Yup.string().required("Required"),

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
//           <CardHeader title="Create Categories"/>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}>
//             {({ dirty, isValid, values, handleChange, handleBlur }) => {
//               return (
//                 <Form>
//                   <CardContent>
//                    <Grid item container spacing={4} justify="center">
//                       <Grid item xs={12} sm={6} md={6}>
//                       <InputLabel required shrink htmlFor="bootstrap-input">
//                         Category
//                          </InputLabel>
//                          <br/>
//                         <Field
//                           label="Enter New Category"
//                           variant="outlined"
//                           fullWidth
//                           name="category"
//                           value={values.category}
//                           component={TextField}
//                         />
//                       </Grid>
                      
//                       <Grid item xs={12} sm={6} md={6}>
//                       <InputLabel required shrink htmlFor="bootstrap-input">
//                         Size
//                          </InputLabel>
//                          <br/>
//                         <Field
//                           label="Enter Size"
//                           variant="outlined"
//                           fullWidth
//                           name="size"
//                           value={values.size}
//                           component={TextField}
//                         />
//                       </Grid>
//                      </Grid>
                   
//                   </CardContent>
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
//                     <ImageUpload/>
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
