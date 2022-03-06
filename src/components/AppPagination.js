import { Pagination } from "antd";

const AppPagination = ({ totalCount, pageChangeHandler, currentPage }) => {
  const selectPage = (page) => {
    pageChangeHandler(page);
  };

  return (
    <Pagination
      current={currentPage + 1}
      total={totalCount}
      showSizeChanger={false}
      onChange={selectPage}
      className="pagination"
    />
  );
};

export default AppPagination;
