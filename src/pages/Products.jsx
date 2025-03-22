import { useContext, useEffect } from "react";
import { Grid, Container, CircularProgress, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { ProductsContext } from "../context/ProductsContext";

export default function Products() {
  const { products, fetchProducts, loading, error } = useContext(ProductsContext);

  useEffect(() => {
  }, []); 

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Typography variant="h6" align="center" color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
