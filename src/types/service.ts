import { icons } from 'lucide-react'

export interface Service {
  maps_url: string
  id: string
  icon: string
  title: string
  shortDescription: string
  longDescription: string
  address?: {
    street: string
    city: string
    postalCode: string
    maps_url: string
  }
  order_index: number
  hours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  keyPoints: Array<{
    id: string
    icon: string
    text: string
  }>
  images: Array<{
    id: string
    url: string
    alt: string
  }>
  buttons: Array<{
    id: string
    text: string
    link: string
  }>
}

export interface ServiceData {
  id: string
  icon: keyof typeof icons
  title: string
  description: string
  mission: string
  address: {
    street: string
    city: string
    postalCode: string
  }
  hours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  keyPoints: Array<{
    title: string
    description: string
    icon: keyof typeof icons
  }>
  images: Array<{
    url: string
    alt: string
    description: string
  }>
  actions: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'outline'
  }>
}
