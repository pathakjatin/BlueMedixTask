import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { UsersContext } from "../context/UsersContext";

export default function AddUserForm() {
  const { users, addUser } = useContext(UsersContext);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    const newUser = {
      id: users.length+1, 
      email: data.email,
      username: data.username,
      password: data.password,
      phone: data.phone,
      name: {
        firstname: data.firstname,  
        lastname: data.lastname,    
      },
    };

    axios
      .post("https://fakestoreapi.com/users", newUser)
      .then(() => {
        addUser(newUser);
        reset();
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Add New User</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name" fullWidth margin="normal"
          {...register("firstname", { required: "First name is required" })} 
          error={!!errors.firstname} helperText={errors.firstname?.message}
        />
        <TextField
          label="Last Name" fullWidth margin="normal"
          {...register("lastname", { required: "Last name is required" })} 
          error={!!errors.lastname} helperText={errors.lastname?.message}
        />
        <TextField
          label="Email" fullWidth margin="normal"
          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
          error={!!errors.email} helperText={errors.email?.message}
        />
        <TextField
          label="Username" fullWidth margin="normal"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username} helperText={errors.username?.message}
        />
        <TextField
          label="Phone Number" fullWidth margin="normal"
          {...register("phone", { required: "Phone number is required" })}
          error={!!errors.phone} helperText={errors.phone?.message}
        />
        <TextField
          label="Password" type="password" fullWidth margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password} helperText={errors.password?.message}
        />
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add User"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
