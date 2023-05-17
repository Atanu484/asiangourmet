import Container from "@mui/material/Container";
import ProductCard from "../../components/products/ProductCard";
import Box from "@mui/material/Box";
import { Fragment, useEffect, useRef, useState } from "react";
import BreadCrumbs from "../../components/products/BreadCrumbs";
import FloatingTabs from "../../components/products/FloatingTabs";
import { useParams } from "react-router-dom";
import {
  getDataBasedOnFilters,
  searchProductBasedOnProductInitials,
} from "../../services/productServices";
import { Product } from "../../services/db.model";
import ProductPopup from "../../components/singleProduct";

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const scrollPositionRef = useRef<{ [category: string]: number }>({});
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (category) {
      console.log(category);
      searchProductBasedOnProductInitials("jack");
      getDataBasedOnFilters(category, setProducts);

      //set previous scroll if avaible else set zero
      const scrollYOfNewCategory = scrollPositionRef.current[category]
        ? scrollPositionRef.current[category]
        : 0;
      window.scrollTo(0, scrollYOfNewCategory);
    }
    return () => {
      if (category) {
        // preserve previous category scroll position
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scrollPositionRef.current[category] = window.scrollY;
      }
    };
  }, [category]);
  function handleClose() {
    setSingleProduct(null);
  }

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl">
      {singleProduct && (
        <ProductPopup
          open={!!singleProduct}
          product={singleProduct}
          onClose={handleClose}
        />
      )}
      <Box sx={{ mt: "100px", mb: "40px" }}>
        <BreadCrumbs />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {products.map((product) => {
          return (
            <Fragment key={product.id}>
              <ProductCard setProduct={setSingleProduct} props={product} />
            </Fragment>
          );
        })}
      </Box>
      <FloatingTabs />
    </Container>
  );
}
