import { createContext, useContext, useState } from "react";
import { CartItem } from "../models/CartItem";
import { AuthContext } from "./authentication-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    const url = 'https://pius-ecommerce-store.herokuapp.com/';
    const { user, setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const updateCart = (product, method) => {
        const theCart = user.cart;
        const item = theCart.find((prod) => prod.id === product.id);
        if (item) {
            for (const a of theCart) {
                if (a.id === product.id){
                    if(method === 'increase'){
                        a.quantity++;
                        a.totalAmount = a.price * a.quantity;
                    } else if (method === 'decrease') {
                        if (a.quantity > 1){
                            a.quantity--;
                            a.totalAmount = a.price * a.quantity;
                        } else if (a.quantity === 1){
                            theCart.filter((each) => each.id !== product.id);
                        }
                    }
                }
            }
        } else if (!item) {
            const newCartItem = new CartItem(product.id, product.title, product.price, 1, product.price);
            theCart.push(newCartItem);
        }
        return theCart;
    }

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}shop/`);
            const responseData = await response.json();
            if(!responseData.content && !response.ok && response.status === 500 ){
                throw new Error('An unexpected error occurred');
            }
            setProducts(responseData.products);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const getCategories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}shop/category`);
            const responseData = await response.json();
            if(!responseData.content && !response.ok && response.status === 500 ){
                throw new Error('An unexpected error occurred');
            }
            setCategories(responseData.categories);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const addToCart = async (product, method, userId) => {
        const newCart = updateCart(product, method);
        try {
            const foundUser = await AsyncStorage.getItem('user');
            const stringifiedUser = JSON.parse(foundUser);
            const updatedUser = { id: stringifiedUser.id, email: stringifiedUser.email, phoneNumber: stringifiedUser.phoneNumber, token: stringifiedUser.token, name: stringifiedUser.name, cart: newCart, sessionExpiry: stringifiedUser.sessionExpiry };
            setUser(updatedUser);
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
            const response = await fetch(`${url}shop/cart/${userId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cart: newCart }) });
            const responseData = await response.json();
            if(!response.ok && !responseData.content && response.status === 500){
                throw new Error('An unexpected error occurred');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const value = { isLoading, setIsLoading, products, categories, addToCart, getCategories, getProducts }

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}