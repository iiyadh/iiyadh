import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const siteMetadata = {
  title: 'TABAI Iyadh',
  description:
    'Full-stack JavaScript developer specializing in MERN stack applications, real-time systems, and SaaS platforms.',
  siteUrl: 'https://iiyadh.github.io',
  image: '/og.png',
  twitterUsername: '@iiyadh',
};

const Head = ({ title, description, image }) => {
  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    image: `${siteMetadata.siteUrl}${image || siteMetadata.image}`,
    url: siteMetadata.siteUrl,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${siteMetadata.title}`}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
