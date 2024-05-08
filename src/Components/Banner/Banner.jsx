import React, {useState, useEffect} from 'react'
import styles from './Banner.module.scss';

import axios from 'axios';

const Banner = () => {
    const [bannerUrl, setBannerUrl] = useState([]);
    const url = 'http://localhost:8888/WP-REACT/wp-json/wp/v2/posts?slug=banner';

    useEffect(() => {
        const fetchBanner = async () => {
            const url = 'http://localhost:8888/WP-REACT/wp-json/wp/v2/posts?slug=banner&_embed';
            try {
                const response = await axios.get(url);
                if (response.data.length > 0) {
                    const bannerPost = response.data[0];
                    // Utilisation d'une expression régulière pour extraire l'URL de l'image du contenu
                    const imgSrc = bannerPost.content.rendered.match(/src="([^"]+)"/)[1];
                    setBannerUrl(imgSrc);
                }
            } catch (error) {
                console.error('Erreur dans la récupération de la bannière', error);
            }
        };
        fetchBanner();
    }, []);
  return (
    <div className={styles.banner}>
            {bannerUrl && <img src={bannerUrl} alt="Banner" />}
    </div>
  )
}

export default Banner