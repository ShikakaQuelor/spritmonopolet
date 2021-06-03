import React from 'react'
import { Chart } from './Chart'

const Product = ({ product }) => {
  const storeCut = product.systembolagetPercentageCut + product.systembolagetUnitCut

  return (
    <div className="productCard">
      <div className="productImage">
        <img src={product.imgSrc} alt="NO IMAGE" />
      </div>
      <div className="nameData">
        <p><b>{product.name}</b></p>
        {product.subName ? <p>{product.subName}</p> : null}
        {product.brand ? <p>{product.brand}</p> : null}
        <div className="infoData">
          <p>{product.category}</p>
          <p>Volume {product.volumeMl / 10}cl</p>
          <p>{product.alcoholPercent}%</p>
          <p>Art.nr {product.id}</p>
        </div>
      </div>
      <div className="priceData">
        <p><b>Inköp</b></p>
        <p><b>{product.originalPrice.toFixed(2)}</b></p>
        <p>Alkoholskatt</p>
        <p>{product.alcoholTax.toFixed(2)}</p>
        <p>Systembolagets påslag</p>
        <p>{storeCut.toFixed(2)}</p>
        <p>Moms</p>
        <p>{product.vat}</p>
        <p><b>Du betalar</b></p>
        <p><b>{product.totalPrice}</b></p>
      </div>
      <div className="alkoChart">
        <Chart percent={1 - (product.originalPrice / product.totalPrice)} />
      </div>

    </div>
  )
}

export default Product
