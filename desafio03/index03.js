class OrderItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getSubtotal() {
    return this.product.price * this.quantity;
  }

  getDetails() {
    return {
      productName: this.product.name,
      quantity: this.quantity,
      unitPrice: this.product.price,
      subtotal: this.getSubtotal(),
    };
  }
}

class Product {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  isValidPrice() {
    return this.price > 0;
  }

  getFormattedInfo() {
    return `${this.name} - R$ ${this.price.toFixed(2)} (${this.category})`;
  }
}

class Order {
  constructor(customer) {
    this.customer = customer;
    this.items = [];
    this.status = "Pendente";
    this.createdAt = new Date();
  }

  addItem(product, quantity) {
    if (!product.isValidPrice()) {
      throw new Error("Produto com preço inválido");
    }

    const item = new OrderItem(product, quantity);
    this.items.push(item);
    return item;
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSummary() {
    return {
      customer: this.customer,
      totalItems: this.getTotalItems(),
      total: this.getTotal(),
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  complete() {
    if (this.items.length === 0) {
      throw new Error("Pedido não pode ser finalizado sem itens");
    }
    this.status = "Completo";
  }
}

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  getFormattedInfo() {
    return `${this.name} (${this.email})`;
  }
}

const customer = new Customer("João Silva", "joao@exemplo.com");
console.log("Cliente:", customer.getFormattedInfo());
console.log("Email válido:", customer.isValidEmail());

const product1 = new Product("Notebook", 2500.0, "Eletrônicos");
const product2 = new Product("Mouse", 50.0, "Periféricos");
const product3 = new Product("Teclado", 150.0, "Periféricos");

console.log("\nProdutos:");
console.log(product1.getFormattedInfo());
console.log(product2.getFormattedInfo());
console.log(product3.getFormattedInfo());

const order = new Order(customer);
order.addItem(product1, 1);
order.addItem(product2, 2);
order.addItem(product3, 1);

console.log("\nItens do pedido:");
order.items.forEach((item, index) => {
  console.log(`${index + 1}.`, item.getDetails());
});

console.log("\nResumo do pedido:", order.getSummary());

order.complete();
console.log("\nPedido finalizado:", order.getSummary());
