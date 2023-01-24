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

const CategoryForm = () => {
  const { toggleState, category_id } = useSelector(
    (state) => state.AdminCategory
  );

  const { AdminSingleCategory } = useSelector((state) => state.AdminCategory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sizes, setSizes] = useState("");
  const [items, setItems] = useState([]);
  const [category_name, setCategory_name] = useState("");
  const [images, setImage] = useState([]);
  const [fieldImage, setFieldImage] = useState();


  const saveCategory = (e) => {
    
   
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
    } else {
      dispatch(createCategory({ category_name, items, fieldImage }))
        .unwrap()
        .then(() => navigate("/dashboard/products"));
    }
  };
  const addSizes = () => {
    const allpost = { id: new Date().getTime().toString(), name: sizes };
    if (allpost.name?.length < 1) {
      return toast.warn("Please fill the sizes field");
    }

    setItems([...items, allpost]);
    setSizes("");
  };
  const deleteItem = (current_index) => {
    const updatedItems = items.filter((val) => {
      return current_index !== val.id;
    });
    setItems(updatedItems);
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
        <p className="categoryForm_heading">Create Categories</p>
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
                  handleChange(e)
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
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {images?.length > 0 && (
                <div className="category-image-filled">
                  <img src={images} alt="images" />
                </div>
              )}
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
