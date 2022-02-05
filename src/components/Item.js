import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const btnClass = item.isInCart ? "remove" : "add";
  const btnText = item.isInCart ? "Remove From" : "Add to";

  function handleAddToCart () {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isInCart: !item.isInCart })
    })
      .then(resp => resp.json())
      .then(updatedItem => onUpdateItem(updatedItem));
  }

  function handleDeleteItem () {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
      .then(resp => resp.json())
      .then( () => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={ btnClass } onClick = { handleAddToCart }>
        { btnText } Cart
      </button>
      <button className="remove" onClick = { handleDeleteItem } >Delete</button>
    </li>
  );
}

export default Item;
