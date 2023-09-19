export class ProductDTO {
  constructor(title, description, price, category, code, stock, thumbnails, status) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.code = code;
    this.stock = stock;
    this.thumbnails = thumbnails;
    this.status = status;
  }
}
