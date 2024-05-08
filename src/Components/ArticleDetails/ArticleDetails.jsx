import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const ArticleDetails = () => {
    const [article, setArticle] = useState(null);
    const {id} = useParams() //récupére id article a partir de l'url 

    useEffect(() => {
        const fetchArticle = async () => {
            try{
                const response = await axios.get(`http://localhost:8888/WP-REACT/wp-json/wp/v2/posts/${id}`);
                setArticle(response.data);
            }catch(error){
                console.error('erreur de récupération de l\'article', error)
            }
        };
        fetchArticle();
    }, [id]); //executer useEffect a chaque fois que l'identifiant change
    if (!article){
        return <div>Chargement ...</div>
    }
    
  return (
    <div>
        <h1>{article.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{__html: article.content.rendered}}></div>
        </div>
  )
}

export default ArticleDetails