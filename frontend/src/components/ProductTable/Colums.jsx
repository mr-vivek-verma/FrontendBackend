
export const PRODUCT_COLUMNS = [
    {
      Header: "Product",
      accessor: "product_name",
    },
    {
      Header: "Category",
      accessor: "category.category_name",
    },
    {
      Header: "SKU",
      accessor: "sku",
    },
    {
      Header: "Buying Price",
      accessor: "buying_price",
    },
    {
      Header: "Selling Price",
      accessor: "reselling_price",
    },
    {
      Header: "Publication",
      accessor: "is_draft",
      Cell:(value)=>{
      return value?"false":"true";  
      }
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