import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getButtonAction = (link: string): string => {
  if (/^https?:\/\//.test(link)) {
    return link // Lien URL
  } else if (/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(link)) {
    return `mailto:${link}` // Adresse email
  } else if (/^\d{10}$/.test(link)) {
    return `tel:${link}` // Numéro de téléphone français
  } else {
    console.warn(`Format inconnu pour le lien: ${link}`)
    return '#' // Lien invalide
  }
}
