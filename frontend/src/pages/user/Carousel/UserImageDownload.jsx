import * as React from "react";
import "../../../App.css";
import { useTheme } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { UserProductDetail } from "src/slice/userSlice/userProductSlice";
import FileSaver from "file-saver";

function SwipeableTextMobileStepper() {
  const { user } = useSelector((store) => store.login);
  const navigate = useNavigate();
  const theme = useTheme();
  const { detailProduct } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const handleBackPage = (id) => {
    if (user) navigate(`/dashboard/usercategorypage/${id}`);
    else {
      navigate(`/usercategorypage/${id}`);
    }
  };

  const id = useParams();

  React.useEffect(() => {
    dispatch(UserProductDetail(id.id));
  }, []);

  const serverShareImages = [];
  for (let i = 0; i < detailProduct?.sharing_images?.length; i++) {
    serverShareImages.push(
      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
        `${detailProduct && detailProduct?.sharing_images[i]?.filename}`
    );
  }

  const download = (e) => {
    const mainImage =
      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
      `${detailProduct?.main_image?.[0].filename}`;
    serverShareImages.forEach((item) => {
      FileSaver.saveAs(item, "sharing");
    });
  };

  return (
    <>
      <div>
        <div className="col-md-5  d-flex justify-content-center align-items-center">
          <div className="product-img">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item active"
                  style={{ maxwidth: "500px", maxheight: "450px" }}
                >
                  <img
                    width="500px"
                    height="450px"
                    object-fit="scale-down"
                    src={
                      "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                      `${
                        detailProduct?.main_image?.length > 0
                          ? detailProduct.main_image[0].filename
                          : ""
                      }`
                    }
                    alt={detailProduct?.product_name}
                  />
                </div>
                {serverShareImages &&
                  serverShareImages?.map((item) => {
                    return (
                      <div
                        key={item}
                        className="carousel-item"
                        style={{ maxwidth: "500px", maxheight: "450px" }}
                      >
                        <img
                          width="500px"
                          height="450px"
                          src={item}
                          alt={item}
                        />
                      </div>
                    );
                  })}
              </div>
              <button
                className="carousel-control-prev "
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-primary  rounded-circle"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon bg-primary rounded-circle "
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="down-main">
        <Button
          style={{
            marginTop: "5px",
            backgroundColor: "#133337",
            padding: "5px",
            width: "15%",
            border: "1px solid grey",
            borderRadius: "10px",
            color: "#ffff",
          }}
          onClick={(e) => {
            download(e);
          }}
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
      </div>
    </>
  );
}

export default SwipeableTextMobileStepper;
