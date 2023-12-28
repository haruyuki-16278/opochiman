window.onload = () => {
  const dialog = document.getElementById("wish-list-form");
  const btnOpen = document.getElementById("show-add-wishlist-form");
  const btnClose = document.getElementById("close-add-wish-form");

  btnOpen.addEventListener('click', () => {
    const wishList = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
    console.log("wishList.length:" + wishList.length);
    if (wishList.length < 10) {
      dialog.showModal();
    } else {
      alert("欲しいものリストは10個までです。");
    }
  });

  btnClose.addEventListener('click', () => {
    dialog.close();
  });

  const wishListOl = document.querySelector('.wishlist ol');
  const wishList = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

  wishList.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.name;

    const btnUp = document.createElement('button');
    btnUp.textContent = '↑';
    btnUp.id = 'up';
    btnUp.addEventListener('click', () => {
      if (index > 0) {
        const temp = wishList[index];
        wishList[index] = wishList[index - 1];
        wishList[index - 1] = temp;
        localStorage.setItem('wishlist', JSON.stringify(wishList));
        location.reload();
      }
    });
    li.appendChild(btnUp);

    const btnDown = document.createElement('button');
    btnDown.textContent = '↓';
    btnDown.id = 'down';
    btnDown.addEventListener('click', () => {
      if (index < wishList.length - 1) {
        const temp = wishList[index];
        wishList[index] = wishList[index + 1];
        wishList[index + 1] = temp;
        localStorage.setItem('wishlist', JSON.stringify(wishList));
        location.reload();
      }
    });
    li.appendChild(btnDown);

    wishListOl.appendChild(li);
  });
}

document.getElementById("add-item-button").onclick = () => {
  const wishList = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
  const itemName = document.getElementById("item-input").value;
  const itemPrice = document.getElementById("price-input").value;
  if (itemPrice) {
    const wishItem = { "name": itemName, "price": itemPrice }
    console.log("wishList" + JSON.stringify(wishList));
    wishList.push(wishItem);
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }
}
