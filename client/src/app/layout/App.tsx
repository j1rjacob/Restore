import { useEffect, useState } from "react"
import type { Product } from "../models/product";
import Catalog from "../features/catalog/Catalog";
import { Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import Navbar from "./navbar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light' ? '#eaeaea' : '#121212')
      }
    }
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
  }, [])

  const addProduct = () => {
    setProducts(prevState => [...prevState, 
      {
        id: prevState.length + 1,
        name: 'product' + (prevState.length + 1),
        price: (prevState.length*100)+100,
        quantityInStock: 100,
        description: 'test',
        pictureUrl: 'https://picsum.photo/200',
        type: 'test',
        brand: 'test'
      }])
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Box 
       sx={{
        minHeight: '100vh',
        background: darkMode 
        ? 'radial-gradient(circle, #1e3aBa, #111B27)' 
        : 'radial-gradient(circle, #baecf9, #f0f9ff)', 
        py: 6
       }}>
        <Container maxWidth='xl' sx={{mt: 8}}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
