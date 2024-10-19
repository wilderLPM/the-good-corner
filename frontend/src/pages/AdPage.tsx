import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ad } from "../types";

export default function AdPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState<Ad>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    useEffect(() => {
        const fetchAdById = async () => {
            const result = await axios(`http://localhost:3000/ads/${params.id}`);
            setAd(result.data)
        }
        fetchAdById();
    }, [params])

    const doDelete = async () => {
        const result = await axios.delete(`http://localhost:3000/ads/${params.id}`);
        console.log(result);
        setAd(undefined);
        setIsDeleted(true);
    }
    return (
        <>
            {!isDeleted && ad === undefined && <p>Aucune offre ne correspond à l'id {params.id}</p>}
            {isDeleted && <p>L'annonce a bien été supprimée</p>}
            {ad ? (<div>
                <h3>{ad.title}, à {ad.location}</h3>
                <p>{(ad.price / 100).toFixed(2)} €</p>
                <p>{ad.description}</p>
                <p>Posté le {(ad.created_at).toString().slice(0, 10)}</p>
                <button onClick={doDelete}>Supprimer l'offre</button>
            </div>) : <button onClick={() => navigate("/")}>Revenir à l'accueil</button>}
        </>
    )
}