import { Metadata } from 'next'

import { siteConfig } from './site-config'

interface MetadataProps {
  title: string
  description: string
  path?: string
  imageSrc?: string
  keywords?: string[]
}

export const constructMetadata = ({
  title,
  description,
  path,
  imageSrc,
  keywords,
}: MetadataProps): Metadata => ({
  title: `${title} | ${siteConfig.siteName}`,
  description: `${description} | ${siteConfig.siteName}`,
  openGraph: {
    title: `${title} | ${siteConfig.siteName}`,
    description: `${description} | ${siteConfig.siteName}`,
    siteName: siteConfig.siteName,
    images: imageSrc ? [imageSrc] : [],
  },
  ...(!!keywords && {
    keywords,
  }),
  ...(!!path && {
    alternates: {
      canonical: `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`,
    },
  }),
})