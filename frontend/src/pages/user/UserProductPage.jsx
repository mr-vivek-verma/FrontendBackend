import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UserProduct } from "src/slice/userSlice/userProductSlice";
import { useNavigate, useParams } from "react-router-dom";

const sorting = [
  {
    value: "ace",
    label: "Filter Max to Min Price",
  },
  {
    value: "des",
    label: "Filter Min to Max Price",
  },
];

const UserCategoryPage = () => {
  const { user } = useSelector((store) => store.login);
  const { product } = useSelector((store) => store.product);
  const { scrollPageNo } = useSelector((store) => store.product);
  const [inputData, setInputData] = useState("");
  const [sortData, setSortData] = useState("");
  const [productData, setproductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams();
  const categoryId = id?.id;

  let pageNo = 1;

  const handleDetailpage = (id) => {
    if (user) navigate(`/dashboard/userimgdown/${id}`);
    else {
      navigate(`/userimgdown/${id}`);
    }
  };

  useEffect(() => {
    setproductData([...productData.concat(product)]);
  }, [product]);

  useEffect(() => {
    setproductData([]);
  }, []);
  console.log("first", productData);

  const handleBack = () => {
    setproductData([]);
    if (user) {
      return setproductData([]), navigate(`/dashboard/userpage`);
    } else {
      return setproductData([]), navigate(`/userpage`);
    }
  };

  const handleChange = (e) => {
    setproductData([]);
    setInputData(e.target.value);
  };

  const handlesort = (e) => {
    setproductData([]);
    setSortData(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage < totalPages) {
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleScroll = () => {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (currentPage < scrollPageNo) {
        return setCurrentPage(currentPage + 1);
      }
    }
  };

  const queryParams =
    "?page=" +
    currentPage +
    "&filter=" +
    sortData +
    "&category_id=" +
    categoryId +
    "&product_name=" +
    inputData;
  useEffect(() => {
    dispatch(UserProduct(queryParams));
  }, [currentPage, inputData, sortData, pageNo]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [currentPage, scroll, scrollPageNo]);
  return (
    <>
      <Button
        style={{ display: "flex", marginTop: "10px" }}
        variant="contained"
        onClick={() => {
          handleBack();
        }}
      >
        Back
      </Button>
      <br />
      <TextField
        id="outlined-basic"
        placeholder="Search here"
        variant="outlined"
        defaultValue={inputData}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      <TextField
        style={{ marginTop: "10px" }}
        id="outlined-select-sorting"
        select
        defaultValue={sortData}
        onChange={(e) => {
          handlesort(e);
        }}
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
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {productData?.map((item) => {
          return (
            <Card
              key={item?.id}
              style={{
                maxWidth: "301px",
                height: "300px",
                color: "red",
                margin: "10px",
              }}
              onClick={() => {
                handleDetailpage(item.id);
              }}
            >
              {item.main_image && item.main_image[0] ? (
                <img
                  style={{ width: "300px", height: "250px" }}
                  className="custom-card-img rounded-1"
                  src={
                    "http://chapshopbackend.s3-website.ap-south-1.amazonaws.com/" +
                    `${item?.main_image?.[0].filename}`
                  }
                  //src="https://www.shutterstock.com/image-vector/shopping-cart-vector-icon-flat-600w-1690453492.jpg"
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
              <Typography>Price: {item.reselling_price}</Typography>
              <div>
                {item.sizes?.map((size) => {
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
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
      <div>
        Page {currentPage} of {totalPages}
      </div>
    </>
  );
};

export default UserCategoryPage;
