import { useEffect, useState } from "react";
import { Category } from "../../types";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        const fetchCategories = async () => {
            const result = await axios.get<Category[]>("http://localhost:3000/categories");
            setCategories(result.data);
        }
        fetchCategories();

    }, [])
    return (
        <nav className={styles.categoriesNavigation}>
            < ul className={styles.ul}>
                {
                    categories.map((category: Category) => {
                        return (
                            <li key={category.id}>
                                <Link to={`/ads?category=${category.name}`} className={styles.categoryNavigationLink} state={category.name}>{category.name}</Link>
                            </li >
                        )
                    })
                }
            </ul >
        </nav >
    )
}