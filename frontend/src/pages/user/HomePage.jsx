import "../.././App.css";
import {useEffect} from 'react'
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from 'react-redux';
import  {getUserCategory}  from '../../slice/userSlice/userSlice';
import { redirect, useNavigate } from 'react-router-dom';


const HomePage = () => {
  const { userCat } = useSelector(store => store.usercategory);
  const { user } = useSelector((store) => store.login);
    const dispatch = useDispatch();

const navigate= useNavigate();
  useEffect(() => {
    // console.log('user');
    dispatch(getUserCategory ());
  }, []);
     
 
  // useEffect (() => {
  //   window.addEventListener("scroll", handleScroll)
  // })

  const handleClick=(prop)=>{
    console.log("here", prop)
    if(user)
    navigate(`/dashboard/usercategorypage/${prop}`)
  }  
 
  //  const handleScroll = () => {

  //  }
   
  return (
      <div style={{display: "flex", justifyContent:"center", flexWrap:"wrap"}}>
          {userCat && userCat?.map((item) => {
              return (
                    <Card className="custom-card" style={{margin:"5px", cursor: "pointer"}} key={item._id} onClick={(e)=>{handleClick(item._id)}}>
                      {item && item?.category_image && item.category_image ? (
                          <img 
                              className="custom-card-img rounded-1"
                              src={
                                  "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                                  `${item?.category_image?.filename}`
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
        
            {item.category_image.filename && item.category_name }
          </Typography>
              </CardContent>
                  </Card>
                          
              )
          })}  
        
      </div>
    
    )
}

export default HomePage