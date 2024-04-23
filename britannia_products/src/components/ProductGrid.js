import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, searchTerm, category, sortOrder }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (category) {
      filtered = filtered.filter(product => product.main_category === category);
    }
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
    setLoading(false); 
  }, [products, searchTerm, category, sortOrder]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : (
        filteredProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProductGrid;