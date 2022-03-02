import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import qs from "qs";

const axios = require("axios");
var Buffer = require("buffer/").Buffer;

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const inputHandler = (event) => {
    setSearchText(event.target.value);
  };

  const searchHandler = (event) => {
    if (searchText) {
      const fetchData = async () => {
        // these should normally be not exposed here
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
          const response = await axios.post("https://accounts.spotify.com/api/token", qs.stringify(data), headers);
          console.log(response.data.access_token);
          token = response.data.access_token;
        } catch (error) {}

        const response = await axios.get(`https://api.spotify.com/v1/search?type=artist&q=${searchText}&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.artists.items);
        setResults(response.data.artists.items);
      };

      fetchData();
    }
  };

  useEffect(() => {
    if (!searchText) {
      setResults([]);
    }
  }, [searchText]);

  return (
    <>
      <h1>Search artists</h1>
      <TextField label="Artist name" type="search" onChange={inputHandler} size="small" />
      <Button variant="contained" onClick={searchHandler}>
        Search
      </Button>
      {results.map((result) => (
        <p key={result.id}>{result.name}</p>
      ))}
    </>
  );
};

export default SearchPage;
