import { createContext, ReactNode, useContext, useState } from "react";
import { Ad } from "../types";

// Define the shape of the context value
interface CartContextType {
    cart: Ad[];
    setCart: React.Dispatch<React.SetStateAction<Ad[]>>;
}

// Provide an initial value for the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Ad[]>([]);
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};