// export class Data {
//     localData = [{
//         email: "a",
//         password: "1"
//     }]

//     create = (item) => {
//         this.localData.push(item)
//     }

//     read = (id) => {
//         let item = this.localData.find(res => res.email === id)
//         return item
//     }

//     update = (id, value) => {
//         let itemIndex = this.localData.findIndex(res => res.email === id)
//         if(itemIndex <0) return undefined
//         this.localData[itemIndex] = value
//         return this.localData[itemIndex]
//     }

//     delete = (id) => {
//         this.localData = this.localData.filter(res => res.email !== id)
//     }

//     list = () => {
//         return this.localData
//     }
// }
import mongoose from "mongoose";
import bcrypt from "bcryptjs"


mongoose.connect('mongodb://127.0.0.1:27017/form-auth');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, 
                set(val) {
                    var salt = bcrypt.genSaltSync(10)
                    var hash = bcrypt.hashSync(val, salt)
                    return hash
                }
    }
})

export const User = mongoose.model("User", UserSchema);

