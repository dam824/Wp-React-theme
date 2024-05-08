import React, { useState, useEffect } from 'react';
import axios from "axios";
import styles from './CatPage.module.scss';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'


const CatPage = () => {
    const [articles, setArticles] = useState([]);
    const {categoryName} = useParams();

    useEffect(() => {
        const fetchArticles = async () => {
            let url = `http://localhost:8888/WP-REACT/wp-json/wp/v2/posts?per_page=10`;

            if (categoryName !== 'all') {
                // Récupérer l'ID de la catégorie à partir du slug
                const catResponse = await axios.get(`http://localhost:8888/WP-REACT/wp-json/wp/v2/categories?slug=${categoryName}`);
                if (catResponse.data.length > 0) {
                    const categoryId = catResponse.data[0].id;
                    url += `&categories=${categoryId}`;
                }
            }

            try {
                const articlesResponse = await axios.get(url);
                //filtrage pour les articles qui ont une etiquette tag id = 4
                const filteredArticle = articlesResponse.data.filter(article => !article.tags.includes(4));

                const articlesWithMedia = await Promise.all(filteredArticle.map(async (article) => {
                    const mediaResponse = await axios.get(`http://localhost:8888/WP-REACT/wp-json/wp/v2/media?parent=${article.id}`);
                    const imageUrl = mediaResponse.data.length > 0 ? mediaResponse.data[0].source_url : null;
                    return { ...article, imageUrl };
                }));
                setArticles(articlesWithMedia);
            } catch (error) {
                console.error('Erreur lors de la récupération des articles', error);
            }
        };
        fetchArticles();
    }, [categoryName]);

    const trimText = (text, maxLength) => {
        if(text.length <= maxLength){
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className={styles.container}>
        {articles.map(article => (
          <div key={article.id} className={styles.articleCard}>
            <img src={article.imageUrl} alt={article.title.rendered} />
            <div className={styles.articleCardContent}>
              <h2>{article.title ? article.title.rendered : 'Titre non disponible'}</h2>
              <p dangerouslySetInnerHTML={{ __html: trimText(article.excerpt ? article.excerpt.rendered : 'Extrait non disponible', 100) }}></p>
              <button><Link to ={`/article/${article.id}`}>Read more</Link></button>
            </div>
          </div>
        ))}
      </div>
    );
};

export default CatPage;
