
import { Link } from "react-router-dom"
import { Ad } from "../types";
import styles from "./AdCard.module.css";
import { useCartContext } from "../contexts/CartContext";

export default function AdCard(ad: Ad) {
    const { title, picture, price, id } = ad;
    const { cart, setCart } = useCartContext();
    const addToCart = () => {
        setCart([...cart, ad])
        console.log(cart)
    }
    return (
        <div className={styles.container}>
            < Link className={styles.link} to={`/ads/${id}`} state={ad}>
                <img className={styles.image} src={picture} />
                <div className={styles.text}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.price}>{(price / 100).toFixed(2)} €</div>
                </div>
            </Link >
            <button className="button" onClick={addToCart}>Ajouter au panier</button>
        </div >
    )
}