import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../types";
import styles from "./NewAddForm.module.css"
import { useNavigate } from "react-router-dom";

export default function NewAddForm() {
    const [categories, setCategories] = useState<Category[]>([])
    const [title, setTitle] = useState<string>("test");
    const [description, setDescription] = useState<string>("un test");
    const [price, setPrice] = useState<number>(10);
    const [location, setLocation] = useState<string>("lalaland");
    const [picture, setPicture] = useState<string>("https://via.placeholder.com/150");
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "price":
                setPrice(Number(value));
                break;
            case "location":
                setLocation(value);
                break;
            case "picture":
                setPicture(value);
                break;
            case "category":
                setSelectedCategory(Number(value));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await axios.get<Category[]>("http://localhost:3000/categories");
            setCategories(result.data);
            setSelectedCategory(result.data[0].id); // rajouter une sécurité pour éviter les erreurs si la liste est vide
        }
        fetchCategories();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // ajouter gestion des erreurs
        e.preventDefault();
        console.log(title, description, price, location, picture, selectedCategory);
        try {
            const response = await axios.post('http://localhost:3000/ads', {
                title,
                description,
                price,
                location,
                picture: picture ? picture : "https://via.placeholder.com/150",
                category: selectedCategory
            });
            const result = response.data;
            console.log('Succès:', result);
            navigate(`/ads/${result.id}`);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Intitulé de l'annonce</label>
                <input type="text" id="title" name="title" aria-required="true" onChange={handleChange} value={title} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" aria-required="true" onChange={handleChange} value={description}></textarea>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="price">Prix en centimes</label>
                <input type="number" id="price" name="price" aria-required="true" onChange={handleChange} value={price} step="100" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="location">Lieu</label>
                <input type="text" id="location" name="location" aria-required="true" onChange={handleChange} value={location} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="picture">Photo</label>
                <input type="text" id="picture" name="picture" aria-required="true" onChange={handleChange} value={picture} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">Catégorie</label>
                <select id="category" name="category" onChange={handleChange} value={selectedCategory}>
                    {categories.map((category: Category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
            </div>
            <button>Poster l'annonce</button>
        </form>
    )
}