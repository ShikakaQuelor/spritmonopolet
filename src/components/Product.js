import React, { Component } from "react";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { product: Object };
  }

  render() {
    return (
      <div className="productCard">
        <div className="nameData">
          <p> {this.product.name}</p>
          <p> {this.product.brand}</p>
        </div>
      </div>
    );
  }
}
