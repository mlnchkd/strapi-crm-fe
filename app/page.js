"use client"
import React from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:1337/api/banners?populate=*").then(function(response) {
        return response.json();
      }).catch(function(err) {
        console.log(err); 
      });
      console.log("response: ", res);
      const imageUrl = res.data[0].attributes.url.data.attributes.url;
      setBannerUrl(imageUrl);
    }

    fetchData();
  }, []);


  return (
    <main className={styles.main}>
      <p className={styles.title}>New STRAPI CRM with Next.js</p>

      {bannerUrl && 
        <img src={`http://localhost:1337${bannerUrl}`} alt="banner" width="1080" height="600"/>
      }
    </main>
  )
}
