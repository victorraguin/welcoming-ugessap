/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GeneralInfoSection } from './association/GeneralInfoSection'
import { PartnersSection } from './association/PartnersSection'
import { KeyPointsSection } from './association/KeyPointsSection'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Json } from '@/integrations/supabase/types'

interface Partner {
  id: string
  name: string
  description: string
  logoUrl: string
}

interface KeyPoint {
  id: string
  title: string
  description: string
  iconName: string
}

const ASSOCIATION_ID = 'd129aa9c-c316-4cea-b3dc-45699cac3be5' // Using a proper UUID

const AssociationEditor = () => {
  const [associationData, setAssociationData] = useState({
    name: '',
    shortDescription: '',
    longDescription: '',
    logoUrl: ''
  })

  const [partners, setPartners] = useState<Partner[]>([])

  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([])

  useEffect(() => {
    const fetchAssociationData = async () => {
      try {
        const { data, error } = await supabase
          .from('association')
          .select('*')
          .eq('id', ASSOCIATION_ID)
          .maybeSingle()

        if (error) throw error

        if (data) {
          setAssociationData({
            name: data.name,
            shortDescription: data.short_description || '',
            longDescription: data.description || '',
            logoUrl: data.logo || '/placeholder.svg'
          })

          if (data.partners) {
            const partnersData = (data.partners as any[]).map(partner => ({
              id: partner.id || String(Date.now()),
              name: partner.name || '',
              description: partner.description || '',
              logoUrl: partner.logo_url || '/placeholder.svg'
            }))
            setPartners(partnersData)
          }

          if (data.key_points) {
            const keyPointsData = (data.key_points as any[]).map(point => ({
              id: point.id || String(Date.now()),
              title: point.title || '',
              description: point.description || '',
              iconName: point.icon_name || 'Building2'
            }))
            setKeyPoints(keyPointsData)
          }
        }
      } catch (error) {
        console.error('Error fetching association data:', error)
        toast.error('Erreur lors du chargement des données')
      }
    }

    fetchAssociationData()
  }, [])

  const handleGeneralInfoUpdate = (field: string, value: string) => {
    setAssociationData(prev => ({ ...prev, [field]: value }))
  }

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: '',
      description: '',
      logoUrl: '/placeholder.svg'
    }
    setPartners([...partners, newPartner])
  }

  const removePartner = (id: string) => {
    setPartners(partners.filter(partner => partner.id !== id))
  }

  const updatePartner = (id: string, field: string, value: string) => {
    setPartners(partners.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addKeyPoint = () => {
    const newKeyPoint: KeyPoint = {
      id: Date.now().toString(),
      title: '',
      description: '',
      iconName: 'Building2'
    }
    setKeyPoints([...keyPoints, newKeyPoint])
  }

  const removeKeyPoint = (id: string) => {
    setKeyPoints(keyPoints.filter(point => point.id !== id))
  }

  const updateKeyPoint = (id: string, field: string, value: string) => {
    setKeyPoints(
      keyPoints.map(p => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Transform partners and keyPoints to match the Json type
      const partnersJson = partners.map(partner => ({
        ...partner,
        logo_url: partner.logoUrl
      })) as Json[]

      const keyPointsJson = keyPoints.map(point => ({
        ...point,
        icon_name: point.iconName
      })) as Json[]

      console.log({
        name: associationData.name,
        description: associationData.longDescription,
        short_description: associationData.shortDescription,
        logo: associationData.logoUrl,
        partners: partners.map(partner => ({
          ...partner,
          logo_url: partner.logoUrl
        })),
        key_points: keyPoints.map(point => ({
          ...point,
          icon_name: point.iconName
        }))
      })

      const { error } = await supabase
        .from('association')
        .update({
          name: associationData.name,
          description: associationData.longDescription,
          short_description: associationData.shortDescription,
          logo: associationData.logoUrl,
          partners: partnersJson,
          key_points: keyPointsJson
        })
        .eq('id', ASSOCIATION_ID)

      if (error) throw error
      toast.success('Modifications enregistrées avec succès')
    } catch (error) {
      console.error('Error saving association data:', error)
      toast.error("Erreur lors de l'enregistrement des modifications")
    }
  }

  console.log('association editor', associationData)

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <GeneralInfoSection
          {...associationData}
          onUpdate={handleGeneralInfoUpdate}
        />
        <PartnersSection
          partners={partners}
          onAddPartner={addPartner}
          onRemovePartner={removePartner}
          onUpdatePartner={updatePartner}
        />
        <KeyPointsSection
          keyPoints={keyPoints}
          onAddKeyPoint={addKeyPoint}
          onRemoveKeyPoint={removeKeyPoint}
          onUpdateKeyPoint={updateKeyPoint}
        />
        <Button type='submit' className='w-full'>
          Enregistrer les modifications
        </Button>
      </form>
      <Toaster />
    </>
  )
}

export default AssociationEditor
