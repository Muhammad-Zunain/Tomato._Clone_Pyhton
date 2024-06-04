// <-------------------------------- Remove Navbar Hover, Active ---------------------------------------->
// Start

const link = document.querySelectorAll(".nav__link");

link.forEach((element) => {
  element.addEventListener("mouseover", () => {
    if (element.classList.contains("active")) {
      element.classList.remove("nav__link");
    }
  });
});

// End

// <-------------------------------- Filtered Food Display On Index Page ---------------------------------->
// Start

const food_img = document.querySelectorAll(".food__image");
const list_foods = document.querySelector(".menu__food__content");

food_img.forEach((foodElement) => {
  foodElement.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("food__image__active")) {
      target.classList.remove("food__image__active");
      $.ajax({
        type: "GET",
        url: "menuItem",
        data: { name: "None" },
        success: function (data) {
          if (data.msg === "success") {
            location.reload();
          }
        },
      });
    } else {
      food_img.forEach((val) => {
        if (val.classList.contains("food__image__active")) {
          val.classList.remove("food__image__active");
        }
      });
      target.classList.add("food__image__active");

      const name = target.nextElementSibling.innerHTML;

      $.ajax({
        type: "GET",
        url: "menuItem",
        data: { name: name },
        dataType: "json",
        success: function (food) {
          // e.preventDefault();
          list_foods.innerHTML = "";
          const item = JSON.parse(food.food_items);
          for (let i in item) {
            let div = document.createElement("div");
            div.classList.add("menu__food");
            div.dataset.id = item[i].fields.food_item_name;
            div.innerHTML = `<div class="menu__food">
                        <div class="food__img">
                          <img
                            src="${item[i].fields.food_item_image}"
                            class="food__icon"
                          />
                          <img
                            src="static/image/assets/add_icon_white.png"
                            class="add__icon"
                            alt=""
                          />
                          <div class="quantity__cart__food">
                            <img
                              src="static/image/assets/add_icon_green.png"
                              alt=""
                              class="increased__quantity"
                            />>
                            <span class="quantity">1</span>
                            <img
                              src="static/image/assets/remove_icon_red.png"
                              alt=""
                              class="decreased__quantity"
                            />
                          </div>
                        </div>
                        <div class="food__content">
                          <span style="text-transform: capitalize"
                            >${item[i].fields.food_item_name}</span
                          >
                          <img
                            src="static/image/assets/rating_starts.png"
                            alt=""
                            style="margin: 1rem 0"
                          />
                          <p>${item[i].fields.food_item_description}</p>
                          <span>$${item[i].fields.food_item_price}</span>
                        </div>
                    </div>`;

            list_foods.appendChild(div);
          }
          setLocalStorageQuantity();
        },
      });
    }
  });
});

//End

// <-------------------------------- Food Quantity Control ------------------------------------------------>
// Start
let cart = [];
const menu_items = document.querySelectorAll(".menu__food");

const setLocalStorageQuantity = () => {
  const menu_items = document.querySelectorAll(".menu__food");
  menu_items.forEach((item) => {
    let prodoct_id = item.dataset.id;
    let positionThisFoodInCart = cart.findIndex((item) => {
      return item.prdId == prodoct_id;
    });
    if (positionThisFoodInCart >= 0) {
      let target = item.children[0].children[1];
      if (target.classList.contains("add__icon")) {
        quantity_display(target);
        target.nextElementSibling.children[1].innerHTML =
          cart[positionThisFoodInCart].foodQuantity;
      } else {
        target = item.children[0].children[0].children[1];
        quantity_display(target);
        target.nextElementSibling.children[1].innerHTML =
          cart[positionThisFoodInCart].foodQuantity;
      }
    }
  });
};

const add_click = () => {
  document.addEventListener("click", (e) => {
    // Add event listener to the common parent element of menu items

    let target = e.target;
    let menuItem = target.closest(".menu__food");
    if (menuItem) {
      if (target.classList.contains("add__icon")) {
        quantity_display(target);
        food_save_quantity(menuItem, 1);
      } else if (target.classList.contains("increased__quantity")) {
        quantity_item_handler_increased(menuItem);
      } else if (target.classList.contains("decreased__quantity")) {
        quantity_item_handler_decreased(menuItem);
      }
    }
  });
};

// quantity_item_handler_increased function
const quantity_item_handler_increased = (item) => {
  let quantity_control = item.querySelector(".quantity"); // Assuming quantity control is inside the menu item
  let quantity = Number(quantity_control.innerHTML);

  quantity = quantity + 1;
  quantity_control.innerHTML = quantity;

  food_save_quantity(item, quantity);
};

// quantity_item_handler_decreased function (similar to increased function)
const quantity_item_handler_decreased = (item) => {
  let quantity_control = item.querySelector(".quantity"); // Assuming quantity control is inside the menu item
  let quantity = Number(quantity_control.innerHTML);
  if (quantity > 1) {
    quantity = quantity - 1;
    quantity_control.innerHTML = quantity;
  } else if (quantity <= 1) {
    quantity = quantity - 1;
    item.children[0].children[2].style = "display: none";
    item.children[0].children[1].style = "display: block";
  }
  food_save_quantity(item, quantity);
};

const quantity_display = (item) => {
  item.style = "display: none"; //  Display to Change the Quantity For it Need
  item.nextElementSibling.style = "display: flex";
};

const food_save_quantity = (target, quantity) => {
  let food_name = target.children[1].children[0].innerHTML;
  let prd_id = food_name;

  let positionThisFoodInCart = cart.findIndex((item) => {
    return item.prdId == prd_id;
  });

  let food_image = target.children[0].children[0].src;
  let food_quantity = Number(quantity);
  let food_price = Number(target.children[1].children[3].innerHTML.slice(1));
  if (quantity >= 1) {
    if (cart.length <= 0) {
      cart = [
        {
          prdId: prd_id,
          foodImage: food_image,
          foodName: food_name,
          foodQuantity: food_quantity,
          foodPrice: food_price,
        },
      ];
    } else if (positionThisFoodInCart < 0) {
      cart.push({
        prdId: prd_id,
        foodImage: food_image,
        foodName: food_name,
        foodQuantity: food_quantity,
        foodPrice: food_price,
      });
    } else {
      cart[positionThisFoodInCart].foodQuantity = Number(quantity);
    }
  } else if (quantity <= 0) {
    cart.splice(
      Number(positionThisFoodInCart),
      Number(positionThisFoodInCart + 1)
    );
  }
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

let cart_quantity_check = document.querySelector(".cart_check");
const add_cart_tag = () => {
  if (cart.length <= 0) {
    cart_quantity_check.style.display = "none";
  } else {
    cart_quantity_check.style.display = "block";
  }
};

const initApp = () => {
  if (localStorage.getItem("cart") !== null) {
    cart = JSON.parse(localStorage.getItem("cart"));
    // console.log("cart", cart);
    setLocalStorageQuantity();
    add_cart_tag();
  }
  add_click();
};

window.addEventListener("click", () => {
  add_cart_tag();
});

window.addEventListener("load", () => {
  initApp();
});
// End

// export default function add_cart_tag() { return add_cart_tag = true; } // End add_cart_tag
