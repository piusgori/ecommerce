import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const url = 'https://pius-ecommerce-store.herokuapp.com/';

    const [user, setUser] = useState();
    const [admin, setAdmin] = useState();
    const [passwordResetToken, setPasswordResetToken] = useState();
    const [passwordResetEmail, setPasswordResetEmail] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (name, email, phoneNumber, password) => {
        try {
            const response = await fetch(`${url}auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, phoneNumber })});
            const responseData = await response.json();
            if (!response.ok && response.status === 500 && !responseData.content){
                throw new Error('We are sorry for the inconvenience')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally{
            setIsLoading(false);
        }
    }

    const login = async (email, password) => {
        try {
            const response = await fetch(`${url}auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })});
            const responseData = await response.json();
            if (!response.ok && response.status === 500 && !responseData.content){
                throw new Error('We are sorry for the inconvenience')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally{
            setIsLoading(false);
        } 
    }

    const requestPasswordReset = async (email) => {
        try {
            const response = await fetch(`${url}auth/reset-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })});
            const responseData = await response.json();
            if (!response.ok && response.status === 500 && !responseData.content){
                throw new Error('We are sorry for the inconvenience')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally{
            setIsLoading(false);
        } 
    }

    const enterReceivedCodeHandler = async (code) => {
        try {
            const response = await fetch(`${url}auth/new-password`, { method: 'POST', headers: { 'Content-Type': 'application/json', "Authorization": passwordResetToken }, body: JSON.stringify({ code })});
            const responseData = await response.json();
            if (!response.ok && response.status === 500 && !responseData.content){
                throw new Error('We are sorry for the inconvenience')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally{
            setIsLoading(false);
        } 
    }

    const setNewPasswordHandler = async (password) => {
        try {
            const response = await fetch(`${url}auth/set-password`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: passwordResetEmail, password })});
            const responseData = await response.json();
            if (!response.ok && response.status === 500 && !responseData.content){
                throw new Error('We are sorry for the inconvenience')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally{
            setIsLoading(false);
        }  
    }

    const adminLogin = async (email, password) => {
        try {
            const response = await fetch(`${url}auth/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })});
            const responseData = await response.json();
            if (!response.ok && response.status === 500 && !responseData.content){
                throw new Error('We are sorry for the inconvenience')
            }
            return responseData;
        } catch (err) {
            console.log(err);
        } finally{
            setIsLoading(false);
        }  
    }

    const value = { admin, setAdmin, login, signup, user, setUser, isLoading, setIsLoading, requestPasswordReset, setPasswordResetToken, setPasswordResetEmail, enterReceivedCodeHandler, setNewPasswordHandler, adminLogin }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}