import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Form, Input } from "antd";
import SearchList from "../components/SearchList";
import AppPagination from "../components/AppPagination";
import fetchData from "../requests/requests";

const SearchPage = () => {
  const [searchText, setSearchText] = useState(null);
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://api.spotify.com/v1/search?type=artist&q=${searchText}&limit=10&offset=${currentPage}`;

  const onSearch = (value) => {
    setSearchText(value);
    setCurrentPage(0);
  };

  const pageChangeHandler = (page) => {
    setCurrentPage(page - 1);
  };

  useEffect(() => {
    if (searchText && searchText.length >= 3) {
      setIsLoading(true);
      fetchData(url).then((response) => {
        setResults(response.artists.items);
        setTotalCount(response.artists.total);
        setIsLoading(false);
      });
    }
  }, [url, searchText]);

  return (
    <>
      <h1 className="title">Search artists:</h1>
      <Row>
        <Col
          xs={{ span: 20, offset: 2 }}
          sm={{ span: 16, offset: 4 }}
          md={{ span: 12, offset: 6 }}
          lg={{ span: 10, offset: 7 }}
          xl={{ span: 8, offset: 8 }}
        >
          <Form layout="vertical">
            <Input.Search enterButton="Search" size="large" onSearch={onSearch} />
            {searchText && searchText.length < 3 && (
              <p className="mt-2">Please enter at least 3 characters</p>
            )}
          </Form>
        </Col>
      </Row>
      {totalCount !== null && (
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 12, offset: 6 }}
          >
            {isLoading && <p>Fetching artists...</p>}
            {!isLoading && <SearchList results={results} />}

            {!isLoading && totalCount > 10 && (
              <AppPagination
                totalCount={totalCount}
                pageChangeHandler={pageChangeHandler}
                currentPage={currentPage}
              />
            )}
          </Col>
        </Row>
      )}
    </>
  );
};

export default SearchPage;
