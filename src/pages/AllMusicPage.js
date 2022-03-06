import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import qs from "qs";
import AllMusicList from "../components/AllMusicList";
import AppPagination from "../components/AppPagination";
import { Row, Col } from "antd";
import styles from "./styles.module.css";

const axios = require("axios");
var Buffer = require("buffer/").Buffer;

const AllMusicPage = (props) => {
  const params = useParams();
  const { id, name } = params;

  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // clientId & clientSecret should normally be not exposed here
      const clientId = "37ca67209d5d459091f55a8fcc0f34cc";
      const clientSecret = "77fceae630c547829395eda42975f6e3";
      let token;

      const headers = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + new Buffer(clientId + ":" + clientSecret).toString("base64"),
        },
      };
      const data = {
        grant_type: "client_credentials",
      };

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(data),
          headers
        );
        console.log(response.data.access_token);
        token = response.data.access_token;
      } catch (error) {}

      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${id}/albums?limit=10&offset=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(response.data.items);
      setTotalCount(response.data.total);
      setIsLoading(false);
    };

    fetchData();
  }, [id, currentPage]);

  const pageChangeHandler = (page) => {
    setCurrentPage(page - 1);
  };

  return (
    <>
      <h2 className={styles.title}>All music by {name}:</h2>
      <Row>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 14, offset: 5 }}
          xlg={{ span: 10, offset: 7 }}
        >
          {isLoading && <p>Fetching music...</p>}
          {!isLoading && <AllMusicList results={results} />}

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

export default AllMusicPage;
