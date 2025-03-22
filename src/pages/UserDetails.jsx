import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

export default function UserDetails() {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  if (!user) return <Typography variant="h6" align="center">User not found</Typography>;

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name.firstname} {user.name.lastname}
        </Typography>
        <Typography variant="body1">Username: {user.username}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Phone: {user.phone}</Typography>
        <Typography variant="body1">City: {user.address.city}</Typography>
      </CardContent>
    </Card>
  );
}
