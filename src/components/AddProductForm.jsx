import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { Container, TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function AddProductForm() {
    const { addProduct } = useContext(ProductsContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
    const onSubmit = (data) => {
      addProduct({
        ...data,
        price: parseFloat(data.price), 
        rating: { rate: 0, count: 0 }, 
      });
      reset(); 
    };
  return (
    <Container sx={{ mt: 4 }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card sx={{ maxWidth: 600, mx: "auto", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom textAlign="center">
              Add New Product
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Title */}
              <TextField
                label="Product Title"
                fullWidth
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              {/* Price */}
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register("price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />

              {/* Description */}
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                {...register("description", { required: "Description is required" })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              {/* Category */}
              <TextField
                label="Category"
                fullWidth
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
              />

              {/* Image URL */}
              <TextField
                label="Image URL"
                fullWidth
                {...register("image", { required: "Image URL is required" })}
                error={!!errors.image}
                helperText={errors.image?.message}
              />

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Add Product
                </Button>
              </motion.div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
