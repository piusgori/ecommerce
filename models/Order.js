export class Order {
    constructor(totalAmount, productsOrdered, delivered){
        this.totalAmount = totalAmount;
        this.productsOrdered = productsOrdered;
        this.delivered = delivered;
    }
}