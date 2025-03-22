import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Container } from "@mui/material";
import ProductCard from "../components/ProductCard"; // Importing the reusable card

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products data:", error));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard id={product.id} title={product.title} image={product.image} price={product.price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
