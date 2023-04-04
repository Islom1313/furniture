import { getElement } from "../utils.js";
import display from "../displayProducts.js";

// setcompanies
const setupCompanies = (store) => {
  let companies = ["all", ...new Set(store.map((product) => product.company))];
  const companiesDOM = getElement(".companies");
  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>
    `;
    })
    .join("");
};

export default setupCompanies;
