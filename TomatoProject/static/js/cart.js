


let cart = JSON.parse(localStorage.getItem("cart")) || [];    // store cart

const cart_quantity_check = document.querySelector(".cart_check");      // check cart 
const checkOutContainer = document.querySelector(".check_out_con");     // check out container
const tbody = document.querySelector(".tbody");

const removeFunc = () => {
  const remove_food = document.querySelectorAll('.removeFood');
  remove_food.forEach(variable => {
    variable.addEventListener('click', (e) => {
      deleteFoodFromCart(e.target.parentNode.parentNode.dataset.id);
    });
  });
};




const decrease_quantity = (pos)=>{
  let Quantity = cart[pos].foodQuantity
  // console.log(Quantity)
  if (Quantity > 1 ){
    cart[pos].foodQuantity = Number(Quantity) - 1
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  else{
    cart.splice(pos, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  list_foods();

};

const increase_quantity = (pos)=>{
    cart[pos].foodQuantity = Number(cart[pos].foodQuantity) + 1
    localStorage.setItem("cart", JSON.stringify(cart));
    list_foods();
}

const check_listener = () => { 
  const td = document.querySelectorAll("td"); 
  td.forEach(item => {
    item.addEventListener("click",(e)=>{
      let target = e.target;
      let plus = target.closest(".plus");
      let minus = target.closest(".minus");
      let PosFood = target.parentNode.parentNode.dataset.id;
      let positionThisFoodInCart = cart.findIndex((item) => item.prdId === PosFood)
      if(plus && positionThisFoodInCart >= 0){
        increase_quantity(positionThisFoodInCart);
      }else if(minus && positionThisFoodInCart >= 0){
        decrease_quantity(positionThisFoodInCart);
      }
  
    })
  });  
};

const foodPrice = document.querySelector(".cart__total__amount");
const foodSubAmount = document.querySelector(".cart__sub__amount");
console.log(foodSubAmount);
console.log(foodPrice);
const totalFoodPrice = ()=>{
  let subprice = 0;
  if (cart.length > 0) {
    cart.forEach(price =>{
      subprice += Number((price.foodQuantity)*price.foodPrice);
    });
    console.log(subprice+5);
    foodSubAmount.innerHTML = `$${subprice}`
    foodPrice.innerHTML = `$${subprice + 5}`;
  }
};

const list_foods = () => {
  
  if (cart.length > 0) { 
    cart_quantity_check.style.display = "block";
    tbody.innerHTML = '';
    cart.forEach((item, index) => {
      let tr = document.createElement("tr");
      tr.dataset.id = item.prdId;
      tr.innerHTML = `
        <td><img class='removeFood' src="static/image/assets/cross_icon.png" /></td>
        <td><img src="${item.foodImage}" alt=""></td> 
        <td>${item.foodName}</td>
        <td>
          <img class="QuantControl plus" src="static/image/assets/add_icon_green.png" />
         ${item.foodQuantity}
          <img class="QuantControl minus" src="static/image/assets/remove_icon_red.png" />
        </td>
        <td>$${item.foodPrice * item.foodQuantity}</td>
      `;
      tbody.appendChild(tr);
    });
    totalFoodPrice();
    check_listener();
    removeFunc();
  } else {
    cart_quantity_check.style.display = "none";
    tbody.innerHTML = '';
    checkOutContainer.style.display = "none";
  }
};

const deleteFoodFromCart = (ele) => {
  
  let positionThisFoodInCart = cart.findIndex((item) => item.prdId === ele);

  if (positionThisFoodInCart >= 0) {
    cart.splice(positionThisFoodInCart, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    list_foods();
  }
};





list_foods();
// check_listener();