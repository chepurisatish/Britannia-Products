import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  CircularProgress,
  TextField,
  MenuItem,
  Snackbar,
  Pagination,
  Grid
} from "@mui/material";
import ProductGrid from "./components/ProductGrid";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${page}&category=${category}`
        );
        setProducts(response.data.products);
        setTotalPages(parseInt(response.data.totalPages));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [page, category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    navigate(`?page=${value}`);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
        <TextField
          label="Search by product name"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Filter by category"
          value={category}
          onChange={handleCategoryChange}
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <MenuItem value="">All</MenuItem>
          {categories.filter(categoryItem => categoryItem !== "").map((categoryItem) => (
            <MenuItem key={categoryItem} value={categoryItem}>
              {categoryItem}
            </MenuItem>
          ))}
        </TextField>      
        <TextField
          select
          label="Sort by price"
          value={sortOrder}
          onChange={handleSortOrderChange}
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <MenuItem value="asc">Lowest to Highest</MenuItem>
          <MenuItem value="desc">Highest to Lowest</MenuItem>
        </TextField>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <ProductGrid
          products={products}
          searchTerm={searchTerm}
          category={category}
          sortOrder={sortOrder}
        />
      )}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
        style={{ marginTop: "20px" }}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
      />
    </Container>
  );
};

export default App;