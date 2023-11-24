import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-5 mx-sm-3 mx-md-4 mx-lg-5 mx-xl-5">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top img-fluid"
            alt={product.name}
            style={{ objectFit: "cover", maxHeight: "80%", width: "100%" }}
          />
        </div>
        <div className="col-md-6  ">
          <h2 className="mt-2 p-name"> {product.name}</h2>
          <hp className="mt-3 p-desc">{product.description}</hp>
          <h5 className="mt-3 p-price">Price : {product.price} €</h5>
          <p className="mt-3 p-category">
            In Category : {product?.category?.name}
          </p>
          <button
            className="btn  addtocartbtn mt-5"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>{" "}
        </div>
      </div>
      <hr />
      <div className="row container text-center">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap justify-content-center ">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> € {p.price}</p>
                <button
                  className="btn ms-1 moredetailsbtn"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  class="btn ms-1 addtocartbtn"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
