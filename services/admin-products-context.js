import { createContext, useContext, useState } from "react";
import { AuthContext } from "./authentication-context";


export const AdminProductsContext = createContext();

export const AdminProductsContextProvider = ({ children }) => {
    const { admin } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const url = 'https://pius-ecommerce-store.herokuapp.com/';

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}shop`);
            const responseData = await response.json();
            if(!response.ok && !responseData.content && response.status === 500){
                throw new Error('An error occurred');
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
            if(!response.ok && !responseData.content && response.status === 500){
                throw new Error('An error occurred');
            }
           setCategories(responseData.categories); 

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

    const getOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}shop/order`);
            const responseData = await response.json();
            if(!response.ok && !responseData.content && response.status === 500){
                throw new Error('An error occurred');
            }
           setOrders(responseData.orders); 

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const createCategory = async (title, image) => {
        try {
            const response = await fetch(`${url}shop/category`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin.token}` }, body: JSON.stringify({ title, image }) });
            const responseData = await response.json();
            if(!response.ok && !responseData.content && response.status === 500){
                throw new Error('An unexpected error has occurred');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${url}shop/product/${productId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin.token}` } });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('An error occurred')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        }
    }

    const editProduct = async (productId, title, isDiscount, isFinished, newPrice) => {
        try {
            const response = await fetch(`${url}shop/product/${productId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin.token}` }, body: JSON.stringify({ title, isDiscount, isFinished, newPrice }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 && !responseData.content){
                throw new Error('A server side error occurred');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        }
    }

    const createProduct = async (title, price, category, image) => {
        try {
            const response =  await fetch(`${url}shop/`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${admin.token}` }, body: JSON.stringify({ title, price, category, image }) });
            const responseData = await response.json();
            if(!response.ok && response.status === 500 & !responseData.content){
                throw new Error('An unexpected error has occurred');
            }
            return responseData;
        } catch (err) {
            console.log(err);
        }
    }

    const delivery = async (orderId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}shop/delivery/${orderId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' } });
            const responseData = await response.json();
            if(!response.ok && !!responseData.content && response.status === 500){
                throw new Error('A server side error occurred');
            }
            return delivery;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const value = { products, categories, orders, isLoading, setIsLoading, setCategories, setProducts, getProducts, getCategories, getOrders, createProduct, createCategory, deleteProduct, editProduct, delivery, sortedProductsByCategory }
    return <AdminProductsContext.Provider value={value}>{children}</AdminProductsContext.Provider>
}