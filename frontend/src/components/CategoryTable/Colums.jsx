export const COLUMNS = [
    {
      Header: "Category Name",
      accessor: "name",
    },
    {
      Header: "Sizes",
      accessor: "phone",
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