import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Container, Typography, Card, CardMedia, CardContent, CircularProgress, Rating, Box, Stack, Button, TextField
} from "@mui/material";
import { motion } from "framer-motion";
import { ProductsContext } from "../context/ProductsContext";  // Import context

export default function ProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const { products, updateProduct, deleteProduct } = useContext(ProductsContext);  
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  
 
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setUpdatedProduct(foundProduct); 
      setLoading(false);
    } else {
      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setUpdatedProduct(response.data); 
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching product details:", error));
    }
  }, [id, products]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, updatedProduct)
      .then((response) => {
        updateProduct(updatedProduct); t
        setProduct(updatedProduct); 
        setEditMode(false); 
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  const handleDelete = () => {
    console.log("Deleting product with ID:", id); 
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        console.log("Product deleted from API");  
        deleteProduct(id);  
        navigate("/products");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);  
      });
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card sx={{ maxWidth: 800, mx: "auto", p: 3, boxShadow: 3 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.title}
              sx={{ objectFit: "contain", width: "100%" }}
            />
          </motion.div>
          
          <CardContent
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="h5" gutterBottom>
              {editMode ? (
                <TextField
                  fullWidth
                  name="title"
                  value={updatedProduct.title}
                  onChange={handleInputChange}
                />
              ) : (
                product.title
              )}
            </Typography>
            <Typography variant="h6" color="primary">
              ${editMode ? (
                <TextField
                  fullWidth
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                />
              ) : (
                product.price
              )}
            </Typography>

            {/* Rating Section */}
            <Box display="flex" alignItems="center" mt={2}>
              <Rating value={product.rating?.rate} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.rating?.count} reviews)
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {editMode ? (
                <TextField
                  fullWidth
                  multiline
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                />
              ) : (
                product.description
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Category: {product.category}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Buttons for update and delete */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {editMode ? (
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Save Changes
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete Product
          </Button>
        </motion.div>
      </Stack>
    </Container>
  );
}
