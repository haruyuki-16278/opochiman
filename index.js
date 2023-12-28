window.onload = () => {
  // ダイアログの表示
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

  // 欲しいものリストの表示
  const wishListOl = document.querySelector('.wishlist ol');
  const wishList = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

  wishList.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.setAttribute('draggable', true);
    li.setAttribute('data-index', index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => {
      wishList.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(wishList));
      location.reload();
    });
    li.appendChild(deleteButton);

    li.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', index);
    });

    wishListOl.appendChild(li);
  });

  // ドラッグアンドドロップで並び替え
  wishListOl.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  wishListOl.addEventListener('drop', (e) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData('text/plain');
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    const dropIndex = dropTarget.getAttribute('data-index');
    if (dropIndex) {
      const temp = wishList[dropIndex];
      wishList[dropIndex] = wishList[dragIndex];
      wishList[dragIndex] = temp;
      localStorage.setItem('wishlist', JSON.stringify(wishList));
      location.reload();
    }
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
