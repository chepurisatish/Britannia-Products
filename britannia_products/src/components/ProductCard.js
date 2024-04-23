import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardActionArea>
        <Grid container spacing={1}>
          {Object.entries(product.images).map(([position, imageUrl]) => (
            <Grid item key={position} xs={6} sm={4}>
              {imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={imageUrl}
                  alt={`${product.name} (${position})`}
                />
              )}
            </Grid>
          ))}
        </Grid>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: {product.mrp ? `${product.mrp.currency} ${product.mrp.mrp}` : "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.main_category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;