import * as React from "react";
import "../../../App.css";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { IconButton } from "@material-ui/core";
import ForwardIcon from "@material-ui/icons/NavigateNext";
import BackIcon from "@material-ui/icons/NavigateBefore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { UserProductDetail } from "src/slice/userSlice/userProductSlice";
import FileSaver, { saveAs } from "file-saver";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { detailProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleBackPage = (id) => {
    navigate(`/dashboard/usercategorypage/${id}`);
  };
  const id = useParams();
console.log(id)
  React.useEffect(() => {
    // console.log('user');
    dispatch(UserProductDetail(id.id));
  }, []);

  const images = detailProduct?.sharing_images?.map((item) => {
    return {
      imgPath: `http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/${item.filename}`,
      
    };
  });

  const maxSteps = images?.length;
  
   
  const downloadImg = () => {
    FileSaver.saveAs(images[0].imgPath, "image.jpg");
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>
          {images?.length > 0 && images[activeStep]?.label}
        </Typography>
      </Paper>

      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images?.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  justifyContent: "center",
                  height: 255,
                  display: "flex",
                  maxWidth: 300,
                  overflow: "hidden",
                  width: "50%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
        <br />
      </AutoPlaySwipeableViews>
      <br />
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
        }
        backButton={
          <IconButton
            fontSize="large"
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
        }
      />
      <Button
        style={{
          marginLeft: "415px",
          backgroundColor: "grey",
          padding: "5px",
          width: "20%",
          border: "1px solid grey",
          borderRadius: "10px",
        }}
        onClick={downloadImg}
      >
        Download Img
      </Button>
      <Typography sx={{ width: "300px" }}>
        {detailProduct.product_name}
      </Typography>
      <Typography>Reselling Price:{detailProduct.reselling_price}</Typography>
      <Typography>Sizes:{detailProduct.sizes}</Typography>
      <Typography>Product Id:{detailProduct._id}</Typography>

      <Button
        style={{ display: "flex", marginTop: "10px" }}
        variant="contained"
        onClick={() => {
          handleBackPage();
        }}
      >
        Back
      </Button>
      <br />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
