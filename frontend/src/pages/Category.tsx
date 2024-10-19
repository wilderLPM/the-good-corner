import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AdCard from "../components/AdCard";
import { Ad } from "../types";
import axios from "axios";

export default function Category() {
    const location = useLocation();
    console.log(location)
    const [ads, setAds] = useState<Ad[]>([]);
    useEffect(() => { // if location.state is not defined navigate to home
        const fetchAds = async () => {
            const result = await axios.get(`http://localhost:3000/ads?category=${location.state}`);
            console.log(result);
            setAds(result.data);
        }
        fetchAds();
    }, [location.state])
    return (
        <section>
            {ads.map((ad: Ad) => {
                return (
                    <AdCard key={ad.id} {...ad} />
                )
            })}
        </section>
    )
}