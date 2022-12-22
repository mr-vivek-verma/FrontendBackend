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
import { useParams } from "react-router-dom";

const sorting = [
  {
    value: "asc",
    label: "Filter Min to Max Price",
  },
  {
    value: "desc",
    label: "Filter Max to Min Price",
  },
];

const UserCategoryPage = () => {

  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const id = useParams();
  const categoryId = id?.id;

const sortby = "asc"

  const queryParams = "?filter=" + sortby +"&category_id=" +categoryId;

  useEffect(() => {
    // console.log('user');
    dispatch(UserProduct(queryParams));
  }, []);

  return (
    <>
      <Button
        style={{ display: "flex", marginTop: "10px" }}
        variant="contained"
      >
        Back
      </Button>
      <br />
      <TextField id="outlined-basic" placeholder="Search" variant="outlined" />
      <p></p>
      <br />
      <TextField
        style={{ marginTop: "10px" }}
        id="outlined-select-sorting"
        select
        //   label="select"
        onChange={(e) => {
          dispatch(UserProduct(queryParams(e.target.value, categoryId)));
        }}
        defaultValue="SortBy"
        SelectProps={{
          native: true,
        }}
      >
        {sorting.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      <Typography>
        {product.map((item) => {
          return (
            <Card>
              {item && item?.main_image && item.main_image ? (
                <img
                  style={{ width: "300px" }}
                  className="custom-card-img rounded-1"
                  src={
                    "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                    `${item?.main_image?.filename}`
                  }
                  alt={item?.product_name}
                />
              ) : (
                ""
              )}
              <Typography style={{ width: "400px" }}>
                {item.main_image.filename}
              </Typography>
              <Typography>{item.product_name}</Typography>
              <Typography>{item.buying_price}</Typography>
              <div>
                {item.sizes.map((op) => {
                  return (
                    <>
                      <div>{op}</div>
                    </>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </Typography>
    </>
  );
};

export default UserCategoryPage;
