import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [navigationLocation, setNavigationLocation] = useState();
    const [animationName, setAnimationName] = useState();

    const openModalHandler = () => {setIsOpen(true)};

    const closeModalHandler = () => {setIsOpen(false)};

    const onClose = (navigation) => {
        navigation.navigate(navigationLocation);
        setIsOpen(false);
    }

    const value = { animationName, isOpen, message, setMessage, setAnimationName, setNavigationLocation, openModalHandler, closeModalHandler, onClose }

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}