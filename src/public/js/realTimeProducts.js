document.getElementById("deleteForm").onsubmit = function(event) {
  event.preventDefault();

  const productId = document.querySelector('input[name="id"]').value;

  fetch(`/api/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo eliminar el producto");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Producto eliminado:", data);
    window.location.reload();
  })
  .catch((error) => {
    console.error("Error al eliminar el producto:", error);
  });
};
