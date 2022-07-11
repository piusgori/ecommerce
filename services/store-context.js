import { createContext, useContext, useState } from "react";
import { CartItem } from "../models/CartItem";
import { AuthContext } from "./authentication-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from "../models/Order";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
    const url = 'https://pius-ecommerce-store.herokuapp.com/';
    const { user, setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const updateCart = (product, method) => {
        let theCart = user.cart;
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
                            theCart = theCart.filter((each) => each.id !== product.id);
                        }
                    }
                }
            }
        } else if (!item) {
            const itsPrice = product.isDiscount ? product.newPrice : product.price;
            const newCartItem = new CartItem(product.id, product.title, itsPrice, 1, itsPrice);
            theCart.push(newCartItem);
        }
        return theCart;
    }

    const createNewOrderHandler = () => {
        const finalCart = user.cart;
        const finalTotalAmount = finalCart.reduce((total, item) => total + item.totalAmount, 0);
        const finalProductsOrdered = [];
        for(const b of finalCart){
            finalProductsOrdered.push({ title: b.title, quantity: b.quantity, price: b.price, totalPrice: b.totalAmount })
        };
        const orderToSubmit = new Order(finalTotalAmount, finalProductsOrdered, false);
        return orderToSubmit;
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

    const sortedProductsByCategory = (catName) => {
        const sortedProducts = products.filter((prod) => prod.category === catName);
        return sortedProducts;
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
            const updatedUser = { id: user.id, email: user.email, phoneNumber: user.phoneNumber, token: user.token, name: user.name, cart: newCart, sessionExpiry: user.sessionExpiry };
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

    const submitOrder = async(userId, address, location) => {
        const userOrder = createNewOrderHandler();
        setIsLoading(true);
        try {
            const response = await fetch(`${url}shop/order/${userId}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ address, location, order: userOrder }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('An unexpected error has occurred');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const value = { isLoading, setIsLoading, products, categories, addToCart, getCategories, getProducts, submitOrder, sortedProductsByCategory }

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    )
}