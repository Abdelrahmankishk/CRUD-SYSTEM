var nameInput = document.getElementById("productName");
var priceInput = document.getElementById("productPrice");
var CategoryInput = document.getElementById("productCategory");
var DescriptionInput = document.getElementById("productDescription");
var ImageInput = document.getElementById("productImage");

var productCard = document.getElementById("displayBox");
var ProductList = [];

function addProduct() {
  var NewProduct = {
    name: nameInput.value.trim(),
    price: priceInput.value.trim(),
    category: CategoryInput.value.trim(),
    description: DescriptionInput.value.trim(),
    image: "images/p-4.jpg",
  };

  ProductList.push(NewProduct);

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
                  <span class="product-index">Index: 0</span>
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
                  <button class="btn btn-brut btn-delete">
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
