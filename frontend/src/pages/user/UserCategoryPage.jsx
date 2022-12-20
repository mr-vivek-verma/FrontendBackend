import {useEffect} from 'react'
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from 'react-redux';
import  {getUserCategory}  from '../../slice/userSlice/userSlice';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';


const sorting = [
    {
      value: 'Sort By',
      label: 'Sort By',
    },
    {
      value: 'FILTER',
      label: 'Filter Max to Min Price',
    },
    {
      value: 'FILTER',
      label: 'Filter Min to Max Price',
    },
   
  ];

  const query= ?""+

const UserCategoryPage = () => {
  const { userCat } = useSelector(store => store.usercategory);
    const dispatch = useDispatch();

  useEffect(() => {
    // console.log('user');
    dispatch(getUserCategory ());
  }, []);
     
    
  return (
      <div style={{display: "flex", justifyContent:"", flexWrap:"wrap"}}>
      <Button variant="contained">
            Back
          </Button>
          <br/>
          <TextField id="outlined-basic" placeholder='Search' variant="outlined" />
          <br/>
          <TextField
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
          {userCat && userCat?.map((item) => {
              return (
                
                  <Card style={{margin:"5px"}} key={item._id} >
                      {item && item?.category_image && item.category_image ? (
                          <img style={{width:"300px"}}
                              className="custom-card-img rounded-1"
                              src={
                                  "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com" + 
                                  `${item &&
                                  item?.category_image &&
                                  item.category_image?.filename &&
                                  item.category_image.filename
                                  }`
                              }
                              alt={item?.product_name}
                          />
                      ) : ""}


                      <CardContent >
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
          
            {item.category_namen && item.category_image.filename}
          </Typography>
              </CardContent>
                  </Card>
                          
              )
          })}  
        
      </div>
    
    )
}

export default UserCategoryPage