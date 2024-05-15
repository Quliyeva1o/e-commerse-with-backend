import { nanoid } from "nanoid";

export default class Category{
    constructor(name){
        this.id=nanoid()
        this.name=name
    }
} 