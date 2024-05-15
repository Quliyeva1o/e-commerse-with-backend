export default class Order {
    constructor(userId, totalPrice) {
        this.userId=userId,
        this.totalPrice=totalPrice
        this.createdAt=new Date()
        this.items=[]
    }
}  