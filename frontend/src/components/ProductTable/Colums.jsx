
export const PRODUCT_COLUMNS = [
    {
      Header: "Product",
      accessor: "name",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Buying Price",
      accessor: "buyingPrice",
    },
    {
      Header: "Reselling Price",
      accessor: "resellingPrice",
    },
    {
      Header: "Publish",
      accessor: "publish",
    },
  
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      Cell: () => {
        return (
          <>
            <button className="category-edit-btn">Edit</button>{" "}
            <button className="category-edit-delete">Delete</button>
          </>
        );
      },
    },
  ];