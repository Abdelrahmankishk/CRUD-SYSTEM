const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const CategoryInput = document.getElementById("productCategory");
const DescriptionInput = document.getElementById("productDescription");
const ImageInput = document.getElementById("productImage");
const emptyState = document.getElementById("emptyState");

const productCard = document.getElementById("displayBox");

var ProductList = JSON.parse(localStorage.getItem("Products")) ?? [];

DisplayData();

function addProduct() {
  var NewProduct = {
    name: nameInput.value.trim(),
    price: priceInput.value.trim(),
    category: CategoryInput.value.trim(),
    description: DescriptionInput.value.trim(),
    image: "images/p-4.jpg",
  };

  ProductList.push(NewProduct);
  console.log(ProductList);

  localStorage.setItem("Products", JSON.stringify(ProductList));
  DisplayData();
  clearInputs();
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
    box += `
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
                    ><i class="fas fa-tag" aria-hidden="true"></i> ${ProductList[i].price}</span
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
                  <button class="btn btn-brut btn-edit">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </article>
            </div>
        `;
  }
  productCard.innerHTML = box;
}

function toggleEmptyState(list) {
  emptyState.classList.toggle("d-none", list.length > 0);
}

function deleteProduct(index) {
  ProductList.splice(index);
  localStorage.setItem("Products", JSON.stringify(ProductList));
  DisplayData();
}
