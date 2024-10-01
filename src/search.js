import { Box, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import List from "./list";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "./utility";

function Search() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setList(res?.data.products);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);
  const fetchProductsByQuery = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      setList(res?.data.products);
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };
  const debouncedFunc = debounce(fetchProductsByQuery, 500)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1em",
        alignItems: "center",
      }}
    >
      <TextField
        sx={{ width: { xs: "100%", sm: "12em", md: "16em" } }}
        id="search.filter"
        label="Search.."
        variant="outlined"
        onChange={(e) => debouncedFunc(e.target.value)}
      />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            height: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <List data={list} />
      )}
    </Box>
  );
}

export default Search;
