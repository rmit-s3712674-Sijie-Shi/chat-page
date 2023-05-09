export class Data {
    localData = []

    create = (item) => {
        this.localData.push(item)
    }

    read = (id) => {
        let item = this.localData.find(res => res.id === id)
        return item
    }

    update = (id, value) => {
        let itemIndex = this.localData.findIndex(res => res.id === id)
        if(itemIndex <0) return undefined
        this.localData[itemIndex] = value
        return this.localData[itemIndex]
    }

    delete = (id) => {
        this.localData = this.localData.filter(res => res.id !== id)
    }

    list = () => {
        return this.localData
    }
}