import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from "@mui/material/Typography";


const pieParams = {
  width: 500,  
  height: 350,   
  margin: { right: 5 },
  slotProps: { 
    legend: { hidden: true } 
  },
  tooltip: {
    trigger: 'item', 
    formatter: (params) => `${params.name}: ${params.value}`, 
  },
};

export default function Dashboard() {
  const [products, setProducts] = useState(null);
  const [categoryData, setCategoryData] = useState([]); 
  const [users, setUsers] = useState(null);
  const [userCityData, setUserCityData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("https://fakestoreapi.com/products"),
      axios.get("https://fakestoreapi.com/users"),
    ])
      .then(([productsResponse, usersResponse]) => {
        setProducts(productsResponse.data);
        setUsers(usersResponse.data);
        setLoading(false);
        categorizeProducts(productsResponse.data);
        categorizeUsersByCity(usersResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setError("An error occurred while fetching data");
        setLoading(false);
      });
  }, []);


  const categorizeProducts = (products) => {
    const categoriesCount = products.reduce((acc, product) => {
      const category = product.category;
      if (acc[category]) {
        acc[category] += 1;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});


    const formattedCategoryData = Object.keys(categoriesCount).map((category) => ({
      name: category,
      value: categoriesCount[category],
    }));

    setCategoryData(formattedCategoryData); 
  };

  const categorizeUsersByCity = (users) => {
    const citiesCount = users.reduce((acc, user) => {
      const city = user.address.city;
      if (acc[city]) {
        acc[city] += 1;
      } else {
        acc[city] = 1;
      }
      return acc;
    }, {});


    const formattedCityData = Object.keys(citiesCount).map((city) => ({
      name: city,
      value: citiesCount[city],
    }));

    setUserCityData(formattedCityData); 
  };
  const chartSetting = {
    xAxis: [
      {
        label: 'Product Count',
      },
    ],
    width: 1000,
    height: 500,
  };
  const dataset = categoryData.map((item) => ({
    month: item.name, 
    seoul: item.value, 
  }));
  const valueFormatter = (value) => value;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
<Grid container spacing={-4} columns={{ xs: 4, sm: 8, md: 12 }}>
  <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
    Product Categories Distribution
  </Typography>

  {/* First Pie Chart */}
  <Grid item xs={12} sm={6} md={6}>
    {categoryData.length > 0 ? (
      <PieChart series={[{ data: categoryData }]} {...pieParams} />
    ) : (
      <Typography>Loading chart...</Typography>
    )}
  </Grid>

  {/* Second Pie Chart with title */}
  <Grid item xs={12} sm={6} md={6}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        City Distribution
      </Typography>
      {userCityData.length > 0 ? (
        <PieChart series={[{ data: userCityData }]} {...pieParams} />
      ) : (
        <Typography>Loading chart...</Typography>
      )}
    </Box>
  </Grid>
</Grid>

    </Box>
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
  <Box sx={{ maxWidth: 1000 }}> {/* You can adjust maxWidth if necessary */}
    <Typography variant="h6" gutterBottom>
      Product Categories Count
    </Typography>
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'seoul', label: 'Product Count', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  </Box>
</Box>

    </>
  );
}
