import "../.././App.css";
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

const EditCategoryForm = () => {
  const [sizes, setSizes] = useState("");
  const [items, setItems] = useState([]);
  const [category_name, setCategory_name] = useState("");
  const [images, setImage] = useState([]);
  const [fieldImage, setFieldImage] = useState();
  const { toggleState, category_id } = useSelector(
    (state) => state.AdminCategory
  );

  const { AdminSingleCategory } = useSelector((state) => state.AdminCategory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => {
    setCategory_name(AdminSingleCategory?.category_name);
   
    setItems(AdminSingleCategory?.sizes)
    
    setImage(
      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
        AdminSingleCategory?.category_image?.filename
    );
  }, [AdminSingleCategory]);


 

  const updateCategory = (e) => {
    e.preventDefault();
    if (!category_name) {
      return toast.warn("category name is missing");
    }

    if (!sizes && items.length < 1) {
      return toast.warn("sizes can't be empty");
    }

    if (items.length < 1) {
      return toast.warn("sizes array can't be empty");
    }

    if (images?.length < 1) {
      return toast.warn("Please select image");
    } 
    else {
     
      dispatch(editCategory({ category_name, items, fieldImage, category_id }))
        .unwrap()
        .then(() => navigate("/dashboard/products"));
        dispatch(singleCategoryClear());
    }
  };


  const addSizes = (e) => {

    if(sizes?.length < 1){
      return toast.warn("Please fill the sizes field");
    }

  setItems((prevCount)=> [...prevCount, sizes]),
    setSizes("")
    
  };
const deleteItem = ({index}) => { 
 setItems(items.filter((val, valueIndex)=> (valueIndex !== index)));

  };

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "sizes") {
      let specialChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

      if (value.length < 4) 
      if (!specialChar.test(value)) 
      setSizes(value);
    } else {
      if (name === "category_name") {
        let specialChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

        if (value.length < 8)
          if (!specialChar.test(value)) 
          setCategory_name(value);
          else e.preventDefault();
      }
    }
    const imageUpload = /image\/(jpg|jpeg|png|webp)/i;
    if (!e.target.files[0]?.type.match(imageUpload)) {
    
      toast.warning("Invalid image format, please select correct image type format");
    
      return setFile([]);
    }
    const sizeTest = Object.values(e.target.files);
    let error = false;
    sizeTest.forEach((item) => {
      if (item.size >= 10000000) {
        error = true;
        setImage([]);
        
        
        setFieldImage('');
        return toast.warn("Image size should be  10 mb");

      }
    });
    if (error === true) {
      return;  
    }
    setFieldImage(e.target.files[0]);
    setImage(URL.createObjectURL(e.currentTarget.files[0]));
  };
  

  return (
    <div className="categoryForm">
      <div>
        <p className="categoryForm_heading">Edit Categories</p>
        <hr />
      </div>
      <div className="categoryForm-main">
        <form action>
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
                value={category_name}
                onChange={(e) => {
                  // setCategory_name(e.target.value);
                  handleChange(e)
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
                name="sizes"
                id="size"
                placeholder="Enter size"
                className="size-input"
                value={sizes}
                onChange={(e) => {
                  // setSizes(e.target.value);
                  handleChange(e)
                }}
              />

              <button className="size-btn" type="button" onClick={addSizes}>
                Add Size
              </button>
              <div className="category-size custom-flexwrap">
            
                {items?.map((item, index) => {
                  return (
                    <div className="save-sizes" key={index}  style={{border:"1px solid black"}}>
                      {item}{" "}
                      <RxCross2 onClick={(e) => deleteItem({index})} />
                      {/* <RxCross2 onClick={(e) => console.log("dnex", index)} /> */}
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
                onChange={(e) => {
                  handleChange(e)
                  // setFieldImage(e.target.files[0]);
                  // setImage(URL.createObjectURL(e.currentTarget.files[0]));
                }}
              />
              {AdminSingleCategory?.category_image?.filename ? (
                <div className="category-image-filled">
                  <img src={images} />
                </div>
              ) : (
                ""
              )}
              {/* {images?.length > 0 && (
                <div className="category-image-filled">
                  <img src={images} alt="images" />
                </div>
              )} */}
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

export default EditCategoryForm;
