export const COLUMNS = [
    {
      Header: "Category Name",
      accessor: "Category Name",
    },
    {
      Header: "Sizes",
      accessor: "Sizes",
    },
    {
      Header: "Action",
      accessor: "action",
      disableSortBy: true,
      Cell: (tableProps) => {
        return (
          <>
            <button className="category-edit-btn">Edit</button>{" "}
            <button className="category-edit-delete">Delete</button>
          </>
        );
      },
    },
  ];