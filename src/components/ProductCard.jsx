import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardActionArea } from "@mui/material";

export default function ProductCard({ id, title, image, price }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"
        }
      }}
    >
      <CardActionArea component={Link} to={`/products/${id}`}> {/* Link to product details */}
        <CardMedia component="img" height="200" image={image} alt={title} sx={{ objectFit: "contain", padding: 2, backgroundColor: "#ffffff" }} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
