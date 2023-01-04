// import React,{useEffect, useState} from "react"
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
// import { useDispatch, useSelector } from "react-redux"
// import { createCategory, editCategory } from "src/slice/adminSlice/adminCategorySlice"
// import { useNavigate } from "react-router-dom"


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
//   category_image:""
 
// }
// // validation schema
// const validationSchema = Yup.object().shape({
//   category: Yup.string().required(""),
//  size: Yup.string().required(""),

// })

// const UserForm = () => {
// const [g, setG] = useState([]);
// const [id, setId] = useState("");
// const [addSize,setAddSize]= useState([])
// const [itemSize,setItemSize] = useState([])
 

// const navigate = useNavigate()
// const { category } = useSelector((state) => state.AdminCategory)
// const  dispatch = useDispatch();
// const classes = useStyle()


// useEffect(()=>{
//   setId(category._id)
// },[category])

// const onSubmit = (values) => {
//   console.log(values)
//    if(!id){
//    dispatch(createCategory({ values, itemSize }))
//    }else
//   dispatch(editCategory({values, id}))
//   setTimeout(() => {
//     navigate("/dashboard/products")
//    }, 1500);
//   }
  
//   const handleBackPage = () =>{
//   navigate("/dashboard/products")
//   }
         
//   const saveSizes = () => {
//     const allSizes = { id: new Date().getTime().toString(), name: addSize }
//     setItemSize([...itemSize,allSizes])
//     console.log(itemSize)
    
//   }
 
//   const deleteSize = (id) => {      
//     const updatedItems = itemSize.filter((val) => {
//       return id !== val.id;
//     })
//     setItemSize(updatedItems)
//   } 


//   // const handlechange=(e)=>{
//   //   console.log("first", e.target)
//   // }

//   console.log(itemSize)
//   return (
//   <Grid container justifyContent="center" spacing={1}>
//       <Grid item md={6}>
//         <Card className={classes.padding}>
//           <CardHeader title="Create Categories"/>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}>
//             {({ values,setFieldValue }) => {
//               return (  
//                 <Form>
//                   <CardContent>
//                    <Grid item container spacing={4} justifyContent="center">
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
//                         </Grid>
                      
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
//                           // value={values.size}
//                           // value={values.size}
//                          // onChange={(e)=>handlechange(e)}
//                         //  value={addSize}
//                         //  onChange={(e)=>setAddSize(e.target.value)}
//                           component={TextField}
//                         />
//                         <button type="button" onClick={saveSizes}>add sizes</button>
//                         <br/><br/>
//                         {/* {itemSize.map((item)=>{

//                           return(
//                             <div>
//                               {item.name}
//                               <button type="button" onClick={()=>deleteSize(item.id)}>del</button>
//                             </div>
//                           )
//                         })} */}
//                         <input 
//                           label="Image"
//                           variant="outlined"
//                           fullWidth
//                           name="category_image"
//                           type="file" 
//                           onChange={(e)=>{setFieldValue("category_image",e.currentTarget.files[0]); setG(URL.createObjectURL(e.currentTarget.files[0])) }}
//                          />
//                       <img src={g}/>
//                       </Grid>
//                      </Grid>
                   
//                   </CardContent>
//                   <CardActions>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={(e)=>{handleBackPage()}}
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

// .......................................................................................

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { createCategory, editCategory, setToggleTrue } from "src/slice/adminSlice/adminCategorySlice"
const CategoryForm = () => {
  // const { toggleState,category_id } = useSelector((state) => state.categories);
  const { category,toggleState, category_id } = useSelector((state) => state.AdminCategory)

  const dispatch = useDispatch();
  // const categoryId = category_id._id
  // console.log(categoryId)

  const [post, setPost] = useState("");
  const [items, setItems] = useState([]);
  const [category_name,setCategory_name] = useState()
  const [images, setImage] = useState([]);
  const [fieldImage, setFieldImage] = useState();
  const [id, setId] = useState("");
  // const [toggleState,setToggleState] = useState(true);

  

  
  const saveCategory = (e)=>{
    e.preventDefault()
    console.log({category_name, items, fieldImage})
    dispatch(createCategory({ category_name, items, fieldImage }))
  }

  const updateCategory = (e)=>{
    e.preventDefault()
    dispatch(editCategory({category_name, items, fieldImage, category_id}))
  }
  const addSizes = () => {
    const allpost = { id: new Date().getTime().toString(), name: post };
    setItems([...items, allpost]);
    setPost("");
  };
  const deleteItem = (current_index) => {
    console.log(current_index);
    const updatedItems = items.filter((val) => {
      return current_index !== val.id;
    });
    setItems(updatedItems);
  };
  return (
    <div className="categoryForm">
      <div>
        <p className="categoryForm_heading">Create Categories</p>
        <hr />
      </div>
      <div className="categoryForm-main">
        <form action="">
          <div className="categoryForm-wrap">
            <div>
              <label htmlFor="category" className="categoryForm-title">
                Category<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input
                type="text"
                name="category_name"
                id="category"
                placeholder="Enter New Category"
                className="category-input"
                value={category_name}
                onChange={(e)=>setCategory_name(e.target.value)}
              />
            </div>
            <div className="category-image">
              <label htmlFor="size" className="categoryForm-title">
                Size<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input
                type="text"
                id="size"
                placeholder="Enter size"
                className="size-input"
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
              <button className="size-btn" type="button" onClick={addSizes}>
                Add Size
              </button>
              <div className="category-size custom-flexwrap">
                {items?.map((item, id) => {
                  return (
                    <div className="save-sizes" key={id}>
                      {item.name}{" "}
                      <RxCross2 onClick={() => deleteItem(item.id)} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="categoryForm-file">
            <p className="categoryForm-title">
              Category Image<span className="categoryForm_span">*</span>{" "}
              <input
                type="file"
                className="category-file"
                name="category_image"
                // value={fieldImage}
                onChange={(e) => {setFieldImage(e.target.files[0]); setImage(URL.createObjectURL(e.currentTarget.files[0])) } }
                // onChange={(e)=>{setFieldValue("category_image",e.currentTarget.files[0]); setImage(URL.createObjectURL(e.currentTarget.files[0])) }}
              />
              {images.length >0 && <div className="category-image-filled">
                { <img  src={images} alt="images" />}
              </div> }
              
            </p>
          </div>
          <div className="categoryForm-button">
            <Link to="/category" className="Back-link" onClick={()=>dispatch(setToggleTrue())}>
              Back
            </Link>
            {toggleState ? (
              <button className="Back-link" type="submit" onClick={saveCategory}>
                Submit
              </button>
            ) : (
              <button className="Back-link" type="submit" onClick={updateCategory}>
                update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;