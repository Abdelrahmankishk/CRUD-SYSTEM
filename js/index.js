const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const CategoryInput = document.getElementById("productCategory");
const DescriptionInput = document.getElementById("productDescription");
const ImageInput = document.getElementById("productImage");
const emptyState = document.getElementById("emptyState");
const SearchInput = document.getElementById("searchInput");
const Addbtn = document.getElementById("btnAdd");
const Updatebtn = document.getElementById("btnUpdate");

const productCard = document.getElementById("displayBox");

var ProductList = JSON.parse(localStorage.getItem("Products")) ?? [];

var updateProductIndex = 0;
DisplayData();

function addProduct() {
  if (
    NameValidation() &&
    PriceValidation() &&
    categoryValidation() &&
    DescriptionValidation()
  ) {
    var NewProduct = {
      name: nameInput.value.trim(),
      price: priceInput.value.trim(),
      category: CategoryInput.value.trim(),
      description: DescriptionInput.value.trim(),
      image: `images/products/${ImageInput.files[0]?.name === undefined ? "test.jpg" : ImageInput.files[0]?.name}`,
    };

    ProductList.push(NewProduct);

    localStorage.setItem("Products", JSON.stringify(ProductList));
    DisplayData();
    clearInputs();
  }
}

function clearInputs() {
  nameInput.value = null;
  priceInput.value = null;
  CategoryInput.value = null;
  DescriptionInput.value = null;
  ImageInput.value = null;
}

function DisplayData() {
  toggleEmptyState(ProductList);
  var box = "";
  for (var i = 0; i < ProductList.length; i++) {
    box += displayHTMLCol(i);
  }
  productCard.innerHTML = box;
}

function toggleEmptyState(list) {
  emptyState.classList.toggle("d-none", list.length > 0);
}

function deleteProduct(index) {
  ProductList.splice(index, 1);
  localStorage.setItem("Products", JSON.stringify(ProductList));
  DisplayData();
}

function displayHTMLCol(i) {
  return `
            <div class="col">
              <article class="product-card">
                <div class="product-media">
                  <div class="product-frame">
                    <img
                      class="product-img"
                      src="${ProductList[i].image}"
                      alt="Product Image"
                    />
                  </div>
                  <span class="product-index">Index: ${i + 1}</span>
                  <span class="product-price"
                    ><i class="fas fa-tag" aria-hidden="true"></i> ${ProductList[i].price} EGP</span
                  >
                </div>

                <div class="product-body">
                  <span class="product-category">mobile</span>
                  <h3 class="product-name">${ProductList[i].name}</h3>
                  <p class="product-desc">
                    ${ProductList[i].description}
                  </p>
                </div>

                <div class="product-actions">
                  <button  onclick="deleteProduct(${i})" class="btn btn-brut btn-delete">
                    <i class="fas fa-trash"></i> Delete
                  </button>
                  <button onclick="getProductDataForUpdate(${i})" class="btn btn-brut btn-edit">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </article>
            </div>
        `;
}

function searchProducts() {
  var search = SearchInput.value;
  var box = "";
  for (var i = 0; i < ProductList.length; i++) {
    if (ProductList[i].name.toLowerCase().includes(search.toLowerCase())) {
      box += displayHTMLCol(i);
    }
  }
  productCard.innerHTML = box;
}

function getProductDataForUpdate(i) {
  updateProductIndex = i;
  nameInput.value = ProductList[i].name;
  priceInput.value = ProductList[i].price;
  CategoryInput.value = ProductList[i].category;
  DescriptionInput.value = ProductList[i].description;

  Addbtn.classList.add("d-none");
  Updatebtn.classList.remove("d-none");
}

function UpdateProduct() {
  if (
    NameValidation() &&
    PriceValidation() &&
    categoryValidation() &&
    DescriptionValidation()
  ) {
    var updatedProduct = {
      name: nameInput.value.trim(),
      price: priceInput.value.trim(),
      category: CategoryInput.value.trim(),
      description: DescriptionInput.value.trim(),
      image: `images/products/${ImageInput.files[0]?.name === undefined ? "test.jpg" : ImageInput.files[0]?.name}`,
    };

    ProductList.splice(updateProductIndex, 1, updatedProduct);

    localStorage.setItem("Products", JSON.stringify(ProductList));
    DisplayData();
    clearInputs();

    btnUpdate.classList.add("d-none");
    Addbtn.classList.remove("d-none");
  }
}

function NameValidation() {
  var nameRegex = /^[A-Za-z][A-Za-z0-9\W_]{2,29}$/;
  var name = nameInput.value;

  if (nameRegex.test(name)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    return false;
  }
}
function PriceValidation() {
  var priceRegex = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
  var Price = priceInput.value;

  if (priceRegex.test(Price)) {
    priceInput.classList.add("is-valid");
    priceInput.classList.remove("is-invalid");
    return true;
  } else {
    priceInput.classList.add("is-invalid");
    priceInput.classList.remove("is-valid");
    return false;
  }
}

function categoryValidation() {
  var categoryRegex = /^(?:tv|mobile|screens|electronic)$/;
  var category = CategoryInput.value;

  if (categoryRegex.test(category)) {
    CategoryInput.classList.add("is-valid");
    CategoryInput.classList.remove("is-invalid");
    return true;
  } else {
    CategoryInput.classList.add("is-invalid");
    CategoryInput.classList.remove("is-valid");
    return false;
  }
}
function DescriptionValidation() {
  var descriptionRegex = /^.{3,150}$/m;
  var des = DescriptionInput.value;

  if (descriptionRegex.test(des)) {
    DescriptionInput.classList.add("is-valid");
    DescriptionInput.classList.remove("is-invalid");
    return true;
  } else {
    DescriptionInput.classList.add("is-invalid");
    DescriptionInput.classList.remove("is-valid");
    return false;
  }
}
