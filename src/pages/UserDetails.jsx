import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, TextField, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { UsersContext } from "../context/UsersContext";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser, deleteUser } = useContext(UsersContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    axios.put(`https://fakestoreapi.com/users/${id}`, formData)
      .then(() => {
        updateUser(formData);
        setUser(formData);
        setEditMode(false);
      })
      .catch(error => console.error("Error updating user:", error));
  };

  const handleDelete = () => {
    axios.delete(`https://fakestoreapi.com/users/${id}`)
      .then(() => {
        deleteUser(id);
        alert("User deleted successfully!");
        navigate("/users");
      })
      .catch(error => console.error("Error deleting user:", error));
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (!user) return <Typography variant="h6" align="center">User not found</Typography>;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            margin: "auto",
            mt: 4,
            p: 3,
            borderRadius: 5,
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#0e0e0e",
          }}
        >
          <CardContent>
            {editMode ? (
              <>
                <TextField fullWidth margin="normal" label="First Name"
                  name="name.firstname" value={formData.name.firstname || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="Last Name"
                  name="name.lastname" value={formData.name.lastname || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="City"
                  name="address.city" value={formData.address.city || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="Street"
                  name="address.street" value={formData.address.street || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="Zip Code"
                  name="address.zipcode" value={formData.address.zipcode || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="Username"
                  name="username" value={formData.username || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="Email"
                  name="email" value={formData.email || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
                <TextField fullWidth margin="normal" label="Phone"
                  name="phone" value={formData.phone || ""}
                  onChange={handleChange} sx={{ color: "#fff" }}
                />
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fefefe", textAlign: "center", mb: 5 }}>
                  {user.name.firstname} {user.name.lastname}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 18, color: "#f6f6f6", mb: 3 }}>
                  <strong>Username:</strong> {user.username}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 18, color: "#f6f6f6", mb: 3 }}>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 18, color: "#f6f6f6", mb: 3 }}>
                  <strong>Phone:</strong> {user.phone}
                </Typography>

                {/* ✅ Display Address Fields */}
                <Typography variant="body1" sx={{ fontSize: 18, color: "#f6f6f6", mb: 3 }}>
                  <strong>City:</strong> {user.address.city}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 18, color: "#f6f6f6", mb: 3 }}>
                  <strong>Street:</strong> {user.address.street}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 18, color: "#f6f6f6", mb: 3 }}>
                  <strong>Zip Code:</strong> {user.address.zipcode}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ✅ Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        {editMode ? (
          <>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outlined" color="warning" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="contained" color="success" onClick={() => setEditMode(true)}>
                Update
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete Profile
              </Button>
            </motion.div>
          </>
        )}
      </Stack>
    </>
  );
}
