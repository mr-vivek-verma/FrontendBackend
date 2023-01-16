import "../../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { admingetCategory, setToggleTrue } from "src/slice/adminSlice/adminCategorySlice";
import { createProduct, editProduct, setSingleProductClear} from "../.././slice/adminSlice/adminProductSlice";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { category, toggleState } = useSelector((state) => state.AdminCategory);
 const {productId, AdminSingleProduct} = useSelector((state) => state.AdminProduct)

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

  // console.log("adming prod", AdminSingleProduct)

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

  useEffect(() =>{
    setProductName(AdminSingleProduct?.product_name)
    setSku(AdminSingleProduct?.sku)
    setBuyingPrice(AdminSingleProduct?.buying_price)
    setResellingPrice(AdminSingleProduct?.reselling_price)
    setImage("http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/"+ AdminSingleProduct?.main_image?.[0].filename)
    setImage2("http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/"+ AdminSingleProduct?.sharing_images?.[0].filename)
  },[AdminSingleProduct])


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
    
    if(!selectedOption){
      return toast.warn("please select category")
    }
    if(!productName){
      return toast.warn("please select product name")
    }
    if(!sku){
      return toast.warn("please select sku")
    }
    if(!buyingPrice){
      return toast.warn("please select buyingPrice")
    }
    if(!resellingPrice){
      return toast.warn("please select resellingPrice")
    }
    if(!sizes){
      return toast.warn("please select sizes")
    }
    if(!mainImage){
      return toast.warn("please select mainImage")
    }
    if(!sharingImage){
      return toast.warn("please select sharingImage")
    }
    else{
      dispatch(
        createProduct({
          product_name: productName,
          sku: sku,
          buying_price: buyingPrice,
          reselling_price: resellingPrice,
          category_id: selectedOption.id,
          mainImage: mainImage,
          sharingImages: mainImage,
          sizes: sizes,
        })
      );
    
      setTimeout(() => {
        navigate("/dashboard/user");
      }, 1500);
      toast.success("product created successfully");
    }

   
  };
 
  const updateProduct = (e)=>{
    e.preventDefault()
    dispatch(editProduct({
      buying_price:buyingPrice,
      mainImage: images,
      product_name:productName,
      reselling_price:resellingPrice,
      sharingImages:images,
      // id,
      productId,
      category_id: selectedOption?.id,
      sizes,
      sku,
    }))
   
    // dispatch(setSingleProductClear()) 
    // setTimeout(() => {
    //   navigate("/dashboard/user")
    //  }, 1500);
    console.log("updated file",buyingPrice)

     
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
            defaultValue={productName}
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
            defaultValue={sku}
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
              defaultValue={buyingPrice}
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
              defaultValue={resellingPrice}
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
              name="main_image"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {setMainImage(e.target.files[0]);setImage(URL.createObjectURL(e.currentTarget.files[0]))}}
            />
          </div>
          {/* {images.length > 0 && <div className="category-image-filled">
                { <img  src={images} alt="images" />}
              </div> }  */}

            {AdminSingleProduct.main_image?.filename  ? 
            <div className="category-image-filled">
            <img src={images}/>
            </div>: ""}
            {images.length>0 && <div className="category-image-filled">
             
                <img src={images} alt="images" />       
            
              </div>}

          <div className="product-image-sharing">
            <p className="categoryForm-title">
              Sharing Image<span className="categoryForm_span">*</span>
            </p>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              multiple
              onChange={(e) => {setSharingImage(e.target.files); setImage2(URL.createObjectURL(e.currentTarget.files[0]))}}
            />
            
          </div>
         {/* {images2?.length > 0 && <div className="category">
          <img src={images2} alt="sharingImage"/>
         </div>} */}
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
