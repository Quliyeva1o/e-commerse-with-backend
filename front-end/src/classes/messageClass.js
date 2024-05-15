import { nanoid } from "nanoid"

export default class Message{
    constructor(fullName, email, title, message){
        this.id=nanoid()
        this.fullName=fullName
        this.email=email
        this.title=title
        this.message=message
        this.createdAt=new Date()
        this.isRead=false
    }
}