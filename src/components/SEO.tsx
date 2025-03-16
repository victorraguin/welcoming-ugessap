import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

const SEO = ({
  title = 'UGESSAP - Votre santé, notre priorité',
  description = 'Association dédiée à la santé et au bien-être à Montoir-de-Bretagne, proposant des services de proximité adaptés à vos besoins.',
  keywords = 'UGESSAP, santé, bien-être, Montoir-de-Bretagne, centre de santé, services médicaux',
  image = '/og-image.jpg',
  url = 'https://www.ugessap.fr'
}: SEOProps) => {
  const siteUrl = 'https://www.ugessap.fr'
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Helmet>
      {/* Balises meta de base */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullImage} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:type' content='website' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImage} />

      {/* Balise canonique pour éviter le contenu dupliqué */}
      <link rel='canonical' href={fullUrl} />

      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'UGESSAP',
          url: 'https://www.ugessap.fr',
          logo: 'https://www.ugessap.fr/logo.png',
          description:
            'Association dédiée à la santé et au bien-être à Montoir-de-Bretagne',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Rue de la Santé',
            addressLocality: 'Montoir-de-Bretagne',
            postalCode: '44550',
            addressCountry: 'FR'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+33240XXXXXX',
            contactType: 'customer service'
          }
        })}
      </script>
    </Helmet>
  )
}

export default SEO
