import { useEffect, useState } from "react";
import axios from "axios";
import { Ad } from "../types";
import AdCard from "./AdCard";
import styles from "./RecentAds.module.css"
import "../shared.module.css"

const RecentAds = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    useEffect(() => {
        const fetchAds = async () => {
            const result = await axios.get<Ad[]>("http://localhost:3000/ads");
            setAds(result.data);
        }
        fetchAds();

    }, [])
    return ( // mettre le bouton dans le composant AdCard
        <>
            <h2>Annonces récentes</h2>
            <section className={styles.recentAds}>
                {ads.map((ad: Ad) =>
                    <AdCard {...ad} key={ad.id} />
                )}
            </section >
        </>
    )
}

export default RecentAds;