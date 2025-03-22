import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, mx: "auto", p: 3, boxShadow: 3 }}>
        <CardMedia component="img" height="300" image={product.image} alt={product.title} sx={{ objectFit: "contain" }} />
        <CardContent>
          <Typography variant="h5" gutterBottom>{product.title}</Typography>
          <Typography variant="h6" color="primary">${product.price}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{product.description}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Category: {product.category}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
