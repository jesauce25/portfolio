import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  path?: string; // For canonical URL or specific page URL
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title = "Paulo L. Abaquita | Frontend Developer & Business Partner",
  description = "Paulo L. Abaquita crafts modern, interactive web experiences. As a dedicated frontend developer and business partner, he builds digital solutions that drive growth and success.",
  imageUrl = "/image/paulo/webquita.jpg", // Assuming a relevant profile image for Open Graph
  path = "", // Default to empty, should be set by individual pages
}) => {
  const fullTitle = title.includes("Paulo L. Abaquita") ? title : `${title} | Paulo L. Abaquita`;
  const canonicalUrl = `https://yourportfolio.com${path}`; // Replace with your actual domain

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Favicons (always keep these as they are global) */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      {/* Add apple-touch-icon and manifest if you have them */}
      {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
      {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
    </Helmet>
  );
};

export default SeoHead; 