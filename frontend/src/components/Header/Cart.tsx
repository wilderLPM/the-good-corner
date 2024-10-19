import { useState } from "react";
import { useCartContext } from "../../contexts/CartContext"
import { Ad } from "../../types";
import styles from "./Cart.module.css"

export default function Cart() {
    const { cart, setCart } = useCartContext();
    const [isOpen, setIsOpen] = useState(false);

    const removeAdFromCart = (adId: number) => {
        setCart(cart.filter((ad: Ad) => ad.id !== adId));
    };

    // const manageCart = () => {
    //     if (cart.length > 0) {
    //         return cart.map((ad: Ad) => {
    //             return (
    //                 <div key={ad.id} className={styles.cart}>
    //                     <p>{ad.title}</p>
    //                     <p>{ad.price}</p>
    //                     <button onClick={() => removeAdFromCart(ad.id)}>Enlever</button>
    //                 </div>
    //             );
    //         });
    //     } else {
    //         return <p>Votre panier est vide</p>

    // }

    const handleClick = () => {
        if (cart.length > 0) setIsOpen(!isOpen);
    }

    return (
        <>
            <button onClick={handleClick} className="button">Panier {!isOpen ? `(${cart.length})` : ""}</button>
            {isOpen && cart.map((ad: Ad) => {
                return (
                    <div key={ad.id} className={styles.cart}>
                        <p>{ad.title}</p>
                        <p>{ad.price}</p>
                        <button onClick={() => removeAdFromCart(ad.id)}>Enlever</button>
                    </div>
                );
            })}
        </>
    )
}