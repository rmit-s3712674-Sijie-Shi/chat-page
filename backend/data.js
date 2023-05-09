export class Data {
    localData = [{
        email: "a",
        password: "1"
    }]

    create = (item) => {
        this.localData.push(item)
    }

    read = (id) => {
        let item = this.localData.find(res => res.email === id)
        return item
    }

    update = (id, value) => {
        let itemIndex = this.localData.findIndex(res => res.email === id)
        if(itemIndex <0) return undefined
        this.localData[itemIndex] = value
        return this.localData[itemIndex]
    }

    delete = (id) => {
        this.localData = this.localData.filter(res => res.email !== id)
    }

    list = () => {
        return this.localData
    }
}