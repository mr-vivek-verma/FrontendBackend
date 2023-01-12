import "../.././App.css"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  createCategory,
  editCategory,
  setToggleTrue,
} from "src/slice/adminSlice/adminCategorySlice";
import { useFormik } from "formik";
import { categoryFormSchema } from "./Schemas";

const initialValues = {
  category_name: "",
  post: "",
  category_image: "",
};

const CategoryForm = () => {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: categoryFormSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  const { toggleState, category_id } = useSelector(
    (state) => state.AdminCategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [post, setPost] = useState("");
  const [items, setItems] = useState([]);
  const [category_name, setCategory_name] = useState();
  const [images, setImage] = useState([]);
  const [fieldImage, setFieldImage] = useState();

  const saveCategory = (e) => {
    e.preventDefault();

    dispatch(createCategory({ category_name, items, fieldImage }));
    setTimeout(() => {
      navigate("/dashboard/products");
    }, 1500);
  };

  const updateCategory = (e) => {
    e.preventDefault();
    dispatch(editCategory({ category_name, items, fieldImage, category_id }));
    setTimeout(() => {
      navigate("/dashboard/products");
    }, 1500);
  };
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
        <form action onSubmit={handleSubmit}>
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
                value={values.category_name}
                onChange={(e) => {
                  setCategory_name(e.target.value);
                  handleChange;
                }}
                onBlur={handleBlur}
              />
              {errors.category_name && touched.category_name ? (
                <p className="error-msg">{errors.category_name}</p>
              ) : null}
            </div>
            <div className="category-image">
              <label htmlFor="post" className="categoryForm-title">
                Size<span className="categoryForm_span">*</span>
              </label>
              <br />
              <input
                type="text"
                name="post"
                id="size"
                placeholder="Enter size"
                className="size-input"
                value={values.post}
                onChange={(e) => {
                  setPost(e.target.value);
                  handleChange;
                }}
                onBlur={handleBlur}
              />
              {errors.post && touched.post ? (
                <p className="error-msg">{errors.post}</p>
              ) : null}
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
                value={values.category_image}
                onChange={(e) => {
                  setFieldImage(e.target.files[0]);
                  setImage(URL.createObjectURL(e.currentTarget.files[0])),
                    handleChange;
                }}
                onBlur={handleBlur}
              />
               {errors.category_image && touched.category_image ? (
                <p className="error-msg">{errors.category_image}</p>
              ) : null}
              {images.length > 0 && (
                <div className="category-image-filled">
                  {<img src={images} alt="images" />}
                </div>
              )}
            </p>
          </div>
          <div className="categoryForm-button">
            <Link
              to="/category"
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
