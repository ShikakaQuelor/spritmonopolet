import { calculateTaxAndSystembolaget } from "../Misc/TaxHelper";

function getImageSource(rawProduct) {
  const hasImage = rawProduct?.images?.length > 0;
  if (hasImage) return rawProduct.images[0].imageUrl + "_200.png";
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (rawProduct, index, variables) {
  const productModel = {
    id: rawProduct.productId,
    name: rawProduct.productNameBold,
    subName: rawProduct.productNameThin,
    brand: rawProduct.producerName,
    totalPrice: rawProduct.price,
    volumeMl: rawProduct.volume,
    alcoholPercent: rawProduct.alcoholPercentage,
    category: rawProduct.categoryLevel1,
    category2: rawProduct.categoryLevel2,
    category3: rawProduct.categoryLevel3,
    category4: rawProduct.categoryLevel4,
    categories: [
      rawProduct.categoryLevel1,
      rawProduct.categoryLevel2,
      rawProduct.categoryLevel3,
      rawProduct.categoryLevel4,
    ],
    imgSrc: getImageSource(rawProduct),
  };

  calculateTaxAndSystembolaget(productModel, variables);

  return productModel;
}
