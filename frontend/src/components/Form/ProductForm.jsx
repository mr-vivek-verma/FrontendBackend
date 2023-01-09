import "../../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { admingetCategory, setToggleTrue } from "src/slice/adminSlice/adminCategorySlice";
import { createProduct, editProduct } from "src/slice/adminSlice/adminProductSlice";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { category, toggleState } = useSelector((state) => state.AdminCategory);
 const {productId} = useSelector((state) => state.AdminProduct)
 console.log(productId)
  const [productName, setProductName] = useState();
  const [sku, setSku] = useState();
  const [buyingPrice, setBuyingPrice] = useState();
  const [resellingPrice, setResellingPrice] = useState();
  const [sizes, setSizes] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [sharingImage, setSharingImage] = useState();
  const [images, setImage] = useState([]);
  const [images2, setImage2] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryFiltered = category.filter(
    (item) => item._id === selectedOption?.id
  );
  console.log(categoryFiltered);

  const arraySorted = [];
  category.map((item) => arraySorted.push([item.category_name, item._id]));
  const sortedCategory = arraySorted?.sort();
  const SelectionArray = [];
  sortedCategory.forEach((item) =>
    SelectionArray.push({
      value: item[0],
      label: item[0],
      id: item[1],
    })
  );

  useEffect(() => {
    dispatch(admingetCategory());
  }, []);

  const handleChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) setSizes([...sizes, value]);
    else {
      setSizes(sizes.filter((e) => e !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        product_name: productName,
        sku: sku,
        buying_price: buyingPrice,
        reselling_price: resellingPrice,
        category_id: selectedOption.id,
        mainImage: mainImage,
        sharingImages: sharingImage,
        sizes: sizes,
      })
    );
  
    setTimeout(() => {
      navigate("/dashboard/user");
    }, 1500);
    toast.success("product created successfully");
  };
 
  const updateProduct = (e)=>{
    e.preventDefault()
    dispatch(editProduct({
      buying_price:buyingPrice,
      mainImage,
      product_name:productName,
      reselling_price:resellingPrice,
      sharingImages:sharingImage,
      // id,
      productId,
      category_id: selectedOption.id,
      sizes,
      sku,
    }))
    setTimeout(() => {
      navigate("/dashboard/user")
     }, 1500);
  }
  // console.log(id)
  return (
    <div className="productForm">
      <div className="productForm-main">
        <div className="cat-input">
          <label htmlFor="category" className="categoryForm-title">
            Category<span className="categoryForm_span">*</span>
          </label>
          <br />
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={SelectionArray}
            isClearable
            className="select-category-productForm"
          />
        </div>
        <div className="productName">
          <label htmlFor="ProductName" className="categoryForm-title">
            Product Name<span className="categoryForm_span">*</span>
          </label>
          <br />
          <input  
            type="text"
            placeholder="Enter New Product"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="SKU">
          <label htmlFor="ProductName" className="categoryForm-title">
            SKU<span className="categoryForm_span">*</span>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter New SKU"
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div className="product-price">
          <div>
            <label htmlFor="ProductName" className="categoryForm-title">
              Buying Price<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter buying price"
              onChange={(e) => setBuyingPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ProductName" className="categoryForm-title">
              Reselling Price<span className="categoryForm_span">*</span>
            </label>
            <br />
            <input
              type="text"
              placeholder="Enter reselling price"
              onChange={(e) => setResellingPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="product-size">
          <span>Select Sizes</span>
          <div className="all-size-list">
            {categoryFiltered[0] &&
              categoryFiltered[0]?.sizes?.map((size, idx) => {
                return (
                  <div className="size-label" key={idx}>
                    {" "}
                    <label htmlFor={size}>
                      <input
                        id={size}
                        value={size}
                        type="checkbox"
                        onChange={(e) => handleChecked(e)}
                      />
                      {size}
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="product-image">
          <div className="product-image-main">
            <p className="categoryForm-title">
              Main Image<span className="categoryForm_span">*</span>
            </p>
            <input
              type="file"
              onChange={(e) => {setMainImage(e.target.files[0]);setImage(URL.createObjectURL(e.currentTarget.files[0]))}}
            />
          </div>
          {images.length >0 && <div className="category-image-filled">
                { <img  src={images} alt="images" />}
              </div> } 
          <div className="product-image-sharing">
            <p className="categoryForm-title">
              Sharing Image<span className="categoryForm_span">*</span>
            </p>
            <input
              type="file"
              onChange={(e) => {setSharingImage(e.target.files[0]); setImage2(URL.createObjectURL(e.currentTarget.files[0]))}}
            />
            
          </div>
         
              {images.length >0 && <div className="category-image-filled">
                { <img  src={images2} alt="images" />}
              </div> }
               
        </div>
        <div className="productForm-button">
          <Link to="/dashboard/user" className="Back-link"  onClick={()=>dispatch(setToggleTrue())} >
            back
          </Link>
          {toggleState ? (
            <button onClick={handleSubmit}>Submit</button>
            ) : (
              <button className="Back-link" type="submit" onClick={updateProduct}>
                update
              </button>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
