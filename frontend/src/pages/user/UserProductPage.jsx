import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getUserCategory } from "../../slice/userSlice/userSlice";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UserProduct } from "src/slice/userSlice/userProductSlice";
import { useNavigate, useParams } from "react-router-dom";

const sorting = [
  {
    value: "asc",
    label: "Filter Min to Max Price",
  },
  {
    value: "des",
    label: "Filter Max to Min Price",
  },
];

const UserCategoryPage = () => {
const [inputData, setInputData] =useState("");
const [sortData, setSortData] =useState("");
const navigate=useNavigate()
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const id = useParams();
  const categoryId = id?.id;

const handleChange = (e) =>{
  console.log("chnage")
  setInputData(e.target.value);
}

const handlesort=(e)=>{
  console.log("filter", e.target.value)
setSortData(e.target.value)
}

  const queryParams = "?filter=" + sortData +"&category_id=" +categoryId + "&product_name=" + inputData;

  useEffect(() => {
    // console.log('user');
    dispatch(UserProduct(queryParams));
  }, [inputData, sortData]);
console.log("product", product)

const handleDetailpage = (id) =>{
  navigate(`/dashboard/userimgdown/${id}`)
}

const handleBack = (id) =>{
  navigate(`/dashboard/userpage`)
}

  return (
    <>
      <Button
        style={{ display: "flex", marginTop: "10px" }}
        variant="contained"
        onClick={()=>{handleBack()}}
      >
        Back
      </Button>
      <br />
      <TextField id="outlined-basic" placeholder="Search here" variant="outlined" defaultValue={inputData}
       onChange={(e)=>{handleChange(e)}} />
       <br />
      <TextField
        style={{ marginTop: "10px" }}
        id="outlined-select-sorting"
        select
        defaultValue={sortData}
        onChange={(e)=>{handlesort(e)}}
        SelectProps={{
          native: true,
        }}
      >
        {sorting.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
            
          </option>
        ))}
      </TextField>
      <div style={{display: "flex"}}>
        {product.map((item) => {
          return (
            <Card key={item?.id} style={{ maxWidth:"301px", height:"450px", color:'red', "marginLeft":"5px"}} 
            onClick={()=>{handleDetailpage(item.id)}}>
              {product? (
                <img
                  style={{ width: "300px", height:"250px" }}
                  className="custom-card-img rounded-1"
                  src={
                    "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                    `${item?.main_image?.[0].filename}`
                  }
                  alt={item?.product_name}
                />
              ) : (
               <img
                  style={{ width: "300px" }}
                  className="custom-card-img rounded-1"
                  src="https://www.shutterstock.com/image-vector/shopping-cart-vector-icon-flat-600w-1690453492.jpg"
                  alt={item?.product_name}
                />
              )}
               <Typography>{item.product_name}</Typography>
              <Typography>Price: {item.buying_price}</Typography>
              <div>
                {item.sizes.map((size) => {
                  return (
                    <>
                      <div key={size}>{size}</div>
                    </>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default UserCategoryPage;
