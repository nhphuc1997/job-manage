export interface Category {
  "createAt": string,
  "updatedAt": string,
  "id": number,
  "name": string
}

export interface Product {
  "createAt": string,
  "updatedAt": string,
  "id": number,
  "name": string,
  "price": string,
  "categoryId": number,
  "categoryName": string,
  "thumnail": string,
  "images": string
}

export interface Order {
  "createAt": string,
  "updatedAt": string,
  "id": number,
  "order_number": string,
  "total_price": string,
  "user_name": string
}

export interface Banner {
  "createAt": string,
  "updatedAt": string,
  "id": number,
  "url": string,
}
