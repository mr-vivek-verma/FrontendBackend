import "../.././App.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  createCategory,
  editCategory,
  setToggleTrue,
  singleCategoryClear,
} from "src/slice/adminSlice/adminCategorySlice";
import { toast } from "react-toastify";



const CategoryForm = () => {


  const { toggleState, category_id, } = useSelector(
    (state) => state.AdminCategory
  );

  const {AdminSingleCategory} = useSelector((state)=>state.AdminCategory)

  // console.log("admin category", AdminSingleCategory)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  // useEffect(()=>{
  //   setCategory_name(AdminSingleCategory?.category_name)
  //    setFieldImage("http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/"+ AdminSingleCategory?.category_image?.filename)
  //   setImage("http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/"+ AdminSingleCategory?.category_image?.filename)
  // },[AdminSingleCategory])
useEffect(()=>{
  setCategory_name(AdminSingleCategory?.category_name)
  setSizes(AdminSingleCategory?.sizes)
  setImage(AdminSingleCategory?.images)
},[AdminSingleCategory])


  const [sizes, setSizes] = useState("");
  const [items, setItems] = useState([]);
  const [category_name, setCategory_name] = useState("");
  const [images, setImage] = useState([]);
  const [fieldImage, setFieldImage] = useState();
 

  const saveCategory = (e) => {
   e.preventDefault();
   if(!category_name){
    return toast.warn("category name is missing")
  }
  
if(!sizes && items.length<1){
  return toast.warn("sizes can't be empty")
}

if(items.length<1){
  return toast.warn("sizes array can't be empty")
}


if(images?.length<1){
  return toast.warn("plz select image")
}
// if(images?.length<1 && images < 5120){
//   return toast.warn("plz select upto 5mb image size")
// }
else{
  dispatch(createCategory({ category_name, items, fieldImage }))
  
  .unwrap() 
  .then(() => navigate("/dashboard/products"))

}
}
    
  
  // console.log("name",category_name)
  // console.log("size",sizes, items)
  // console.log("img",images)
  
  const updateCategory = (e) => {
    e.preventDefault();
    dispatch(editCategory({ category_name, items, fieldImage, category_id}))
   
    
    .unwrap() 
    .then(() => navigate("/dashboard/products"));
      
    dispatch(singleCategoryClear())
  };
  const addSizes = () => {
    const allpost = { id: new Date().getTime().toString(), name: sizes };
    setItems([...items, allpost]);
    setSizes("");
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
        <form action >
          <div className="categoryForm-wrap">
            <div>
              <label htmlFor="category_name" className="categoryForm-title">
                Category<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input
                type="text"
                name="category_name"
                id="category"
                placeholder="Enter New Category"
                className="category-input"
                defaultValue={category_name}
                onChange={(e) => {
                  setCategory_name(e.target.value);
              
                }}
            />
 
            </div>
            <div className="category-image">
              <label htmlFor="size" className="categoryForm-title">
                Size<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input  
                type="text"
                name="size"
                id="size"
                placeholder="Enter size"
                className="size-input"
                defaultValue={sizes}
                onChange={(e) => {
                  setSizes(e.target.value);
                 
                }}
              
              />
             
              <button className="size-btn" type="button" onClick={addSizes}>
                Add Size
              </button>
              <div className="category-size custom-flexwrap">
                {items?.map((item, id) => {
                  return (
                    <div className="save-sizes" key={id}>
                      {item?.name}{" "}
                      <RxCross2 onClick={() => deleteItem(item?.id)} />
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
                accept=".png, .jpg, .jpeg"
                className="category-file"
                name="category_image"
              
                // value={values.category_image}
                onChange={(e) => {
                  setFieldImage(e.target.files[0]);
                  setImage(URL.createObjectURL(e.currentTarget.files[0]))
                   
                }}
             
              />
         
          {AdminSingleCategory?.category_image?.filename ? 
            <div className="category-image-filled">

          <img src={images}/>
            </div>: ""}
           
            {images?.length>0 && <div className="category-image-filled">
             
                <img src={images} alt="images" />       
            
              </div>}
            </p>
          </div>
          <div className="categoryForm-button">
            <Link
              to="/dashboard/products"
              className="Back-link"
              onClick={() => dispatch(setToggleTrue())}
            >
              Back
            </Link>
            {toggleState ? (
              <button
                className="Back-link"
                type="submit"
                onClick={saveCategory}
              >
                Submit
              </button>
            ) : (
              <button
                className="Back-link"
                type="submit"
                onClick={updateCategory}
              >
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
