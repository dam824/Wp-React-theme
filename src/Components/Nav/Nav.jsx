import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Nav.module.scss'

const Nav = () => {
    const [categorie, setCategorie] = useState([]);

 useEffect (() => {
    const fetchCategorie = async () => {
        try{
            const response = await axios.get('http://localhost:8888/WP-REACT/wp-json/wp/v2/categories');
            setCategorie(response.data);
        }catch(error){
            console.error('erreur lors du chargement d\'une categorie');
        }
        
    };
    fetchCategorie()
 }, []);
  return (
    <div className={styles.navigation}>
  <ul>
    {categorie.map((c)=> (
        <li key={c.id}>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </li>
       
    ))}
     <li><Link to="/category/all">Tous les articles</Link></li>
  </ul>
    </div>
  )
}

export default Nav