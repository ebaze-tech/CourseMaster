import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box, Grid2 } from "@mui/material";
import API from "../api";
import TestForm from "./TestPage";

const CategorySelection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get("/test/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      {!selectedCategory ? (
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Choose a Category
          </Typography>

          <Grid2 container spacing={3}>
            {categories.map((category, index) => (
              <Grid2 item xs={12} sm={6} key={index}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      ) : (
        <TestForm category={selectedCategory} />
      )}
    </Container>
  );
};

export default CategorySelection;
