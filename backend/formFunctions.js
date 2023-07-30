// export class formData {
//     localData = [
//         {
//             id: "",
//             title:"title",
//             questions:[{
//                 id: '0',
//                 description:"the first question",
//                 questionsType: "text",
//                 response: "",
//                 maxRate: 0,
//                 minRate: 0
//             }],
//             timestamp: 0,
//             endtime:0
//         }
//     ]

//     create = (item) => {
//         this.localData.push(item)
//     }

//     read = (id) => {
//         let result = this.localData.find(item => item.id === id)
//         return result
//     }

//     update = (id, value) => {
//         let index = this.localData.findIndex(item => item.id === id)
//         if(index < 0) return undefined
//         this.localData[index] = value
//         return this.localData[index]
//     }

//     delete = (id) => {
//         this.localData.filter(item => item.id !== id)
//     }

//     list = () => {
//         return this.localData
//     }
// }

// const data = new formData()

// export function getAllForms(req, res) {
//     res.status(200).json(data.list())
// }

// export function createForms (req, res) {
//     //console.log(req.body)
//     const formData  = req.body || {}
//     console.log(formData)
//     data.create(formData)
//     res.status(201).send("New form is created.")
// }

// export function getSingleForm(req, res) {
//     const { id } = req.body || {}
//     const result = data.read(id)
//     if(result) {
//         res.status(201).send(result)
//     } else {
//         res.status(400).send("No such form.")
//     }
// }

// export function updateForm(req, res) {
//     const { formData } = req.body || {}
//     const result = data.update(formData.id, formData)
//     if(result) {
//         res.status(201).send(result)
//     } else {
//         res.status(400).send("No such form.")
//     }
// }

import { UserForm } from "./data.js";

export async function getUserForms(req, res) {
    const { id } = req.body
    const result = await UserForm.findOne({ userId: id })

    res.send(result)
}

export function createForm(req, res) {
    const { id } = req.body
    UserForm.create({
        userId: id,
        savedForms: [],
        sentForms: [],
        finishedForms: []
    })
    .then(data => res.send(data))
    .catch(err  => res.status(422).send(err.message))
}


// db.stores.updateMany(
//     { _id: 1 },
//     { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } }
// )