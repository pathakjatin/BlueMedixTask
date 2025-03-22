import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";
import { motion } from "framer-motion";

export default function ProductCard({ id, title, image, price }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card
        sx={{
          maxWidth: 350,
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardActionArea component={Link} to={`/products/${id}`}>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={title}
            sx={{ objectFit: "contain", padding: 2, backgroundColor: "#f8f8f8" }}
          />
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h6" 
              component="div"
              sx={{ fontWeight: "bold", fontSize: 16 }}
            >
              {title.length > 40 ? `${title.slice(0, 40)}...` : title}
            </Typography>
            <Typography variant="h6" sx={{ color: "#A9A9A9", fontWeight: "bold" }}>
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
