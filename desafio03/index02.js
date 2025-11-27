class DiscountCalculator {
  calculate(price) {
    return price;
  }
}

class NoDiscount extends DiscountCalculator {
  calculate(price) {
    return price;
  }
}

class PercentageDiscount extends DiscountCalculator {
  constructor(percentage) {
    super();
    this.percentage = percentage;
  }

  calculate(price) {
    return price * (1 - this.percentage / 100);
  }
}

class FixedDiscount extends DiscountCalculator {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  calculate(price) {
    return Math.max(0, price - this.amount);
  }
}

class ProgressiveDiscount extends DiscountCalculator {
  constructor(threshold, discountPercentage) {
    super();
    this.threshold = threshold;
    this.discountPercentage = discountPercentage;
  }

  calculate(price) {
    if (price >= this.threshold) {
      return price * (1 - this.discountPercentage / 100);
    }
    return price;
  }
}

class Product {
  constructor(name, price, discountStrategy = new NoDiscount()) {
    this.name = name;
    this.basePrice = price;
    this.discountStrategy = discountStrategy;
  }

  getPrice() {
    return this.discountStrategy.calculate(this.basePrice);
  }

  setDiscountStrategy(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  getInfo() {
    return {
      name: this.name,
      basePrice: this.basePrice,
      finalPrice: this.getPrice(),
      discount: this.basePrice - this.getPrice(),
    };
  }
}

const product1 = new Product("Notebook", 2000);
console.log("Produto sem desconto:", product1.getInfo());

const product2 = new Product("Mouse", 100, new PercentageDiscount(10));
console.log("Produto com 10% de desconto:", product2.getInfo());

const product3 = new Product("Teclado", 150, new FixedDiscount(30));
console.log("Produto com desconto fixo de R$ 30:", product3.getInfo());

const product4 = new Product("Monitor", 800, new ProgressiveDiscount(500, 15));
console.log("Produto com desconto progressivo:", product4.getInfo());

product1.setDiscountStrategy(new PercentageDiscount(5));
console.log("Produto 1 com novo desconto:", product1.getInfo());
