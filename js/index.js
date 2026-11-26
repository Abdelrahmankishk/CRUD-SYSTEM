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

async function addProduct() {
  if (
    !NameValidation() ||
    !PriceValidation() ||
    !categoryValidation() ||
    !DescriptionValidation() ||
    !ImageValidation()
  ) {
    return;
  }

  try {
    const imageData = await readImageAsDataURL(ImageInput.files[0]);

    const NewProduct = {
      name: nameInput.value.trim(),
      price: priceInput.value.trim(),
      category: CategoryInput.value.trim(),
      description: DescriptionInput.value.trim(),
      image: imageData,
    };

    ProductList.push(NewProduct);

    if (!saveProducts()) {
      ProductList.pop();
      return;
    }

    DisplayData();
    clearInputs();
  } catch (error) {
    console.error(error);
    alert("Unable to read the selected image.");
  }
}

function clearInputs() {
  nameInput.value = null;
  priceInput.value = null;
  CategoryInput.value = null;
  DescriptionInput.value = null;
  ImageInput.value = null;

  nameInput.classList.remove("is-valid");
  priceInput.classList.remove("is-valid");
  CategoryInput.classList.remove("is-valid");
  DescriptionInput.classList.remove("is-valid");
  ImageInput.classList.remove("is-valid");
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
  const deletedProduct = ProductList.splice(index, 1)[0];

  if (!saveProducts()) {
    ProductList.splice(index, 0, deletedProduct);
    return;
  }

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
  ImageInput.value = "";
  ImageInput.classList.remove("is-valid", "is-invalid");
}

async function UpdateProduct() {
  if (
    !NameValidation() ||
    !PriceValidation() ||
    !categoryValidation() ||
    !DescriptionValidation() ||
    !ImageValidation(false)
  ) {
    return;
  }

  try {
    const currentProduct = ProductList[updateProductIndex];

    const selectedFile = ImageInput.files[0];

    // Keep the existing image unless a new one is selected.
    const imageData = selectedFile
      ? await readImageAsDataURL(selectedFile)
      : currentProduct.image;

    const updatedProduct = {
      name: nameInput.value.trim(),
      price: priceInput.value.trim(),
      category: CategoryInput.value.trim(),
      description: DescriptionInput.value.trim(),
      image: imageData,
    };

    const oldProduct = currentProduct;

    ProductList.splice(updateProductIndex, 1, updatedProduct);

    if (!saveProducts()) {
      ProductList.splice(updateProductIndex, 1, oldProduct);
      return;
    }

    DisplayData();
    clearInputs();

    Updatebtn.classList.add("d-none");
    Addbtn.classList.remove("d-none");
  } catch (error) {
    console.error(error);
    alert("Unable to update the product image.");
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

function ImageValidation(required = true) {
  const file = ImageInput.files[0];

  // During editing, selecting a new image is optional.
  if (!file && !required) {
    ImageInput.classList.remove("is-invalid", "is-valid");
    return true;
  }

  if (!file) {
    ImageInput.classList.add("is-invalid");
    ImageInput.classList.remove("is-valid");
    return false;
  }

  const validTypes = ["image/jpeg", "image/png"];

  const isValid = validTypes.includes(file.type) && file.size <= MAX_IMAGE_SIZE;

  ImageInput.classList.toggle("is-valid", isValid);
  ImageInput.classList.toggle("is-invalid", !isValid);

  return isValid;
}

const MAX_IMAGE_SIZE = 1024 * 1024; // 1 MB

function readImageAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the image."));
    };

    reader.readAsDataURL(file);
  });
}

function saveProducts() {
  try {
    localStorage.setItem("Products", JSON.stringify(ProductList));

    return true;
  } catch (error) {
    console.error("Storage error:", error);

    alert(
      "Unable to save products. Browser storage may be full. " +
        "Try using smaller images or removing existing products.",
    );

    return false;
  }
}
