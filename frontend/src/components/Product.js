import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ height: "auto" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "200px" }}
        />
      </Link>
      <Card.Body>
        <div
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to={`/product/${product._id}`}>
            <Card.Title>
              <h6>{product.name}</h6>
            </Card.Title>
          </Link>
        </div>
        <Card.Text as="div">
          <Rating value={product.rating} />
        </Card.Text>
        <Card.Text as="h3">₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
