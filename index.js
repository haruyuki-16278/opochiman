window.onload = () => {
  const dialog = document.getElementById("wish-list-form");
  const btnOpen = document.getElementById("show-add-wishlist-form");
  const btnClose = document.getElementById("close-add-wish-form");

  btnOpen.addEventListener('click', () => {
    dialog.showModal();
  });

  btnClose.addEventListener('click', () => {
    dialog.close();
  });

  const wishListOl = document.querySelector('.wishlist ol');
  const wishList = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

  wishList.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;

    const btnUp = document.createElement('button');
    btnUp.textContent = '+';
    btnUp.id = 'up';
    li.appendChild(btnUp);

    const btnDown = document.createElement('button');
    btnDown.textContent = '-';
    btnDown.id = 'down';
    li.appendChild(btnDown);

    wishListOl.appendChild(li);
  });
}

document.getElementById("add-item-button").onclick = () => {
  const itemName = document.getElementById("item-input").value;
  const itemPrice = document.getElementById("price-input").value;
  const wishList = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
  if (itemPrice) {
    const wishItem = { "name": itemName, "price": itemPrice }
    console.log("wishList" + JSON.stringify(wishList));
    wishList.push(wishItem);
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }
}
