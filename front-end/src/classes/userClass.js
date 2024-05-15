import { nanoid } from "nanoid"

export default class User {
    constructor(username, password, email, profileImg, balance) {
        this.id = nanoid()
        this.username = username
        this.password = password
        this.createdAt = new Date()
        this.email = email
        this.profileImg = profileImg
        this.balance = balance
        this.role = "client"
        this.basketItems = []
    }
}