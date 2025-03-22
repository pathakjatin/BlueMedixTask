import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []); 
  const addProduct = (newProduct) => {

    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, id: prevProducts.length + 1 }, 
    ]);
  };

  // Update an existing product
  const updateProduct = (updatedProduct) => {
    axios
      .put(`https://fakestoreapi.com/products/${updatedProduct.id}`, updatedProduct)
      .then(() => {
        setProducts((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  // Delete a product
  const deleteProduct = (id) => {

    setProducts((prev) => prev.filter((product) => product.id !== id));
  
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        console.log("Product deleted from API");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
