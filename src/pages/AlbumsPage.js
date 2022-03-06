import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MusicList from "../components/MusicList";
import AppPagination from "../components/AppPagination";
import { Row, Col } from "antd";
import fetchData from "../requests/requests";

const AlbumsPage = (props) => {
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { id, name } = params;
  const url = `https://api.spotify.com/v1/artists/${id}/albums?limit=10&offset=${currentPage}&include_groups=album`;

  useEffect(() => {
    setIsLoading(true);
    fetchData(url).then((response) => {
      setResults(response.items);
      setTotalCount(response.total);
      setIsLoading(false);
    });
  }, [url]);

  const pageChangeHandler = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <>
      <h2 className="title">Albums by {name}:</h2>
      <Row>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 12, offset: 6 }}
        >
          {isLoading && <p>Fetching albums...</p>}
          {!isLoading && <MusicList results={results} />}

          {!isLoading && totalCount > 10 && (
            <AppPagination
              totalCount={totalCount}
              pageChangeHandler={pageChangeHandler}
              currentPage={currentPage}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default AlbumsPage;
