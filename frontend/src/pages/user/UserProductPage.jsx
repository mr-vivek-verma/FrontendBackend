import { useEffect } from "react";
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
    value: "Sort By",
    label: "Sort By",
  },
  {
    value: "FILTER",
    label: "Filter Max to Min Price",
  },
  {
    value: "FILTER",
    label: "Filter Min to Max Price",
  },
];

const UserCategoryPage = () => {
   const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();
const id= useParams();
const categoryId= id?.id;

  const queryParams= "?category_id=" + `${categoryId}`


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
      <br />
      <TextField
        style={{ marginTop: "10px" }}
        id="outlined-select-sorting"
        select
        //   label="select"
        defaultValue="Sort By"
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
      {product.map((item)=>{
        return(<Card>
        <Typography>
        {item.product_name}
        </Typography>
        <div>
          {item.sizes.map((op)=>{
            return(<>
              <div>{op}</div>
                          </>)
          })}
        </div>
        </Card>)
      })}
     </Typography>
    </>
  );
};

export default UserCategoryPage;
