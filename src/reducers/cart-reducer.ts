
import db from "../data/db";
import { CartItemType, GuitarIdType, GuitarType } from "../types/types";

// Acciones de nuestro  reducer, funciones a realizar 
export type CartActions =
    { type: 'add-to-cart', payload: { item: GuitarType } } |
    { type: 'remove-from-cart', payload: { id: GuitarIdType } } |
    { type: 'increase-quantity-from-cart', payload: { id: GuitarIdType } } |
    { type: 'remove-quantity-from-cart', payload: { id: GuitarIdType } } |
    { type: 'empty-cart' }


// state del carrito de compras
export type CartState = {
    data: GuitarType[],
    cart: CartItemType[]
}

const initialCart = (): CartItemType[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialstate: CartState = {
    data: db,
    cart: initialCart()
}
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

// Reducer, definición de acciones a realizar por nuestro reducer
export const cartReducer = (
    // Esto nos ayuda con el auto completado de nuestro state
    state: CartState = initialstate,
    action: CartActions
) => {
    if (action.type === 'add-to-cart') {

        const itemExist = state.cart.find((guitar) => guitar.id === action.payload.item.id);
        let updateCart: CartItemType[] = []
        if (itemExist) {
            updateCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < MAX_ITEMS) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: CartItemType = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]
        }

        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'remove-from-cart') {

        const updateCart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart: updateCart
        }
    }

    if (action.type === 'increase-quantity-from-cart') {
        const updatedCart = state.cart.map((item) => {
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'remove-quantity-from-cart') {
        const updatedCart = state.cart.map((item) => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'empty-cart') {
        return {
            ...state,
            cart: []
        }
    }
    // Siempre se retorna el state
    return state
}