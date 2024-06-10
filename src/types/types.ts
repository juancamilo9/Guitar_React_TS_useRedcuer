// Type
export type GuitarType = {
    id: number
    name: string
    image: string
    description:string
    price:number
}

export type CartItemType = {
    id: number
    name: string
    image: string
    description:string
    price:number
    quantity:number
}

export type GuitarIdType = GuitarType['id']
