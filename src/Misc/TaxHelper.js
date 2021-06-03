/**************************************************************************************
*    Title: Alkoholskatt
*    Author: Borgström, J
*    Date: 2021
*    Code version: n/a
*    Availability: http://www.herrborgstrom.se
*
***************************************************************************************/

export function round(input) {
  return Math.round(input * 100) / 100;
}

const SKATTEVERKET_MELLANKLASS = "Mellanklassprodukt";

function findSystembolagetType(product, variables) {
  const categories = variables.systembolaget.categories;
  product.meta.isNonAlcoholic = product.categories.some((c) => c === categories.nonAlcoholic);
  product.meta.isSmallPackage = product.volumeMl <= 350;

  if (product.categories.find((c) => c === categories.beer)) {
    product.meta.systembolagetType = categories.beer;
  } else if (product.categories.find((c) => c === categories.wine)) {
    product.meta.systembolagetType = categories.wine;
  } else if (product.categories.find((c) => c === categories.spirit)) {
    product.meta.systembolagetType = categories.spirit;
  } else if (product.categories.find((c) => c === categories.cider)) {
    product.meta.systembolagetType = categories.cider;
  }
}

function findSkatteverketType(product, variables) {
  const categories = variables.systembolaget.categories;
  const mellanklassCategories = variables.systembolaget.mellanklassCategories;
  if (product.categories.find((c) => mellanklassCategories.find((mc) => mc === c))) {
    product.meta.skatteverketType = SKATTEVERKET_MELLANKLASS;
  } else if (product.meta.systembolagetType === categories.cider) {
    product.meta.skatteverketType = categories.wine;
  } else {
    product.meta.skatteverketType = product.meta.systembolagetType;
  }
}

function getTaxLevel(product, taxLevelList) {
  const foundLevel = taxLevelList.find((tax) => tax.alcFrom < product.alcoholPercent && tax.alcTo >= product.alcoholPercent);
  if (!foundLevel) {
    return taxLevelList[taxLevelList.length - 1];
  }

  return foundLevel;
}

function calcPerPercentageAndLiter(product, taxLevel) {
  return round(product.alcoholPercent * taxLevel.taxPerPercentageAndLiter * (product.volumeMl / 1000));
}

function calcPerLiter(product, taxLevel) {
  return round(taxLevel.taxPerLiter * (product.volumeMl / 1000));
}

function calcPerPureLiter(product, taxLevel) {
  const pureAlcohol = ((product.alcoholPercent / 100) * product.volumeMl) / 1000;
  return round(pureAlcohol * taxLevel.taxPerLiter);
}

function calculateTaxes(product, variables) {
  const categories = variables.systembolaget.categories;
  if (product.meta.skatteverketType === categories.beer) {
    const taxLevel = getTaxLevel(product, variables.skatteverket.beer);
    product.alcoholTax = calcPerPercentageAndLiter(product, taxLevel);
  } else if (product.meta.skatteverketType === categories.wine) {
    const taxLevel = getTaxLevel(product, variables.skatteverket.wine);
    product.alcoholTax = calcPerLiter(product, taxLevel);
  } else if (product.meta.skatteverketType === SKATTEVERKET_MELLANKLASS) {
    const taxLevel = getTaxLevel(product, variables.skatteverket.mellanklass);
    product.alcoholTax = calcPerLiter(product, taxLevel);
  } else if (product.meta.skatteverketType === categories.spirit) {
    const taxLevel = getTaxLevel(product, variables.skatteverket.spirit);
    product.alcoholTax = calcPerPureLiter(product, taxLevel);
  } else {
    product.alcoholTax = 0;
    console.log("Could not calculate taxes", product.name);
  }
}

function calculateSystembolagetUnitCut(product, variables) {
  const categories = variables.systembolaget.categories;
  const unitCuts = variables.systembolaget.unitCuts;
  if (product.meta.isNonAlcoholic) {
    if (product.meta.systembolagetType === categories.wine) {
      product.systembolagetUnitCut = unitCuts.wineNonAlcoholic;
    } else if (product.meta.systembolagetType === categories.cider ||
      product.meta.systembolagetType === categories.beer) {
      product.systembolagetUnitCut = unitCuts.beerAndCiderNonAlcoholic;
    } else {
      product.systembolagetUnitCut = 0;
      console.log("Could not calculate unit cut", product.name);
    }
  } else if (product.meta.systembolagetType === categories.wine) {
    product.systembolagetUnitCut = product.meta.isSmallPackage ? unitCuts.wineSmall : unitCuts.wine;
  } else if (product.meta.systembolagetType === categories.beer) {
    product.systembolagetUnitCut = unitCuts.beer;
  } else if (product.meta.systembolagetType === categories.cider) {
    product.systembolagetUnitCut = unitCuts.cider;
  } else if (product.meta.systembolagetType === categories.spirit) {
    product.systembolagetUnitCut = unitCuts.spirit;
  } else {
    product.systembolagetUnitCut = 0;
    console.log("Could not calculate unit cut", product.name);
  }
}

function calculateSystembolagetPercentageCut(product, variables) {
  const percentageCut = variables.systembolaget.percentageCut;
  const priceBefore = product.totalPrice - product.vat - product.systembolagetUnitCut - product.alcoholTax;
  const beforePercentageCut = priceBefore / (1 + percentageCut);
  product.systembolagetPercentageCut = round(beforePercentageCut * percentageCut);
}

export function calculateTaxAndSystembolaget(product, variables) {
  product.meta = product.meta || {};
  product.vat = round(product.totalPrice * .2);

  findSystembolagetType(product, variables);
  findSkatteverketType(product, variables);

  calculateTaxes(product, variables);
  calculateSystembolagetUnitCut(product, variables);
  calculateSystembolagetPercentageCut(product, variables);
  product.originalPrice = product.totalPrice - product.vat - product.systembolagetPercentageCut - product.systembolagetUnitCut - product.alcoholTax;
}