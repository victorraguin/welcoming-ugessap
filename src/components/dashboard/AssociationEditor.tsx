import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GeneralInfoSection } from './association/GeneralInfoSection'
import { PartnersSection } from './association/PartnersSection'
import { KeyPointsSection } from './association/KeyPointsSection'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Json } from '@/integrations/supabase/types'
import FloatingSaveButton from '@/components/FloatingSaveButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Building, Users, Key, Loader2 } from 'lucide-react'

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

interface AssociationData {
  name: string
  shortDescription: string
  longDescription: string
  logoUrl: string
}

interface DbPartner {
  id?: string
  name?: string
  description?: string
  logo_url?: string
}

interface DbKeyPoint {
  id?: string
  title?: string
  description?: string
  icon_name?: string
}

interface DbAssociation {
  id: string
  name: string
  short_description?: string | null
  description?: string | null
  logo?: string | null
  partners?: DbPartner[] | null
  key_points?: DbKeyPoint[] | null
  is_open_for_recruitment?: boolean | null
}

const ASSOCIATION_ID = 'd129aa9c-c316-4cea-b3dc-45699cac3be5' // Using a proper UUID

const AssociationEditor = (): JSX.Element => {
  const [associationData, setAssociationData] = useState<AssociationData>({
    name: '',
    shortDescription: '',
    longDescription: '',
    logoUrl: ''
  })

  const [partners, setPartners] = useState<Partner[]>([])
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([])
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [initialData, setInitialData] = useState<{
    association: AssociationData
    partners: Partner[]
    keyPoints: KeyPoint[]
  } | null>(null)
  const [isModified, setIsModified] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // État pour gérer les sections de l'accordéon
  const [openSections, setOpenSections] = useState<string[]>(['general-info'])

  useEffect(() => {
    const fetchAssociationData = async (): Promise<void> => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('association')
          .select('*')
          .eq('id', ASSOCIATION_ID)
          .maybeSingle()

        if (error) throw error

        if (data) {
          const dbData = data as DbAssociation

          const associationInfo: AssociationData = {
            name: dbData.name,
            shortDescription: dbData.short_description || '',
            longDescription: dbData.description || '',
            logoUrl: dbData.logo || '/placeholder.svg'
          }

          setAssociationData(associationInfo)

          let partnersList: Partner[] = []
          if (dbData.partners) {
            partnersList = dbData.partners.map(partner => ({
              id: partner.id || String(Date.now()),
              name: partner.name || '',
              description: partner.description || '',
              logoUrl: partner.logo_url || '/placeholder.svg'
            }))
            setPartners(partnersList)
          }

          let keyPointsList: KeyPoint[] = []
          if (dbData.key_points) {
            keyPointsList = dbData.key_points.map(point => ({
              id: point.id || String(Date.now()),
              title: point.title || '',
              description: point.description || '',
              iconName: point.icon_name || 'Building2'
            }))
            setKeyPoints(keyPointsList)
          }

          // Stocker les données initiales pour la détection des modifications
          setInitialData({
            association: { ...associationInfo },
            partners: JSON.parse(JSON.stringify(partnersList)),
            keyPoints: JSON.parse(JSON.stringify(keyPointsList))
          })
        }
      } catch (error) {
        console.error('Error fetching association data:', error)
        toast.error('Erreur lors du chargement des données')
      } finally {
        setLoading(false)
      }
    }

    fetchAssociationData()
  }, [])

  // Vérifier si des modifications ont été apportées
  useEffect(() => {
    if (!initialData) return

    // Vérifier les changements dans les données générales
    const associationChanged =
      associationData.name !== initialData.association.name ||
      associationData.shortDescription !==
        initialData.association.shortDescription ||
      associationData.longDescription !==
        initialData.association.longDescription ||
      associationData.logoUrl !== initialData.association.logoUrl

    // Vérifier les changements dans les partenaires
    const partnersChanged =
      partners.length !== initialData.partners.length ||
      JSON.stringify(partners) !== JSON.stringify(initialData.partners)

    // Vérifier les changements dans les points clés
    const keyPointsChanged =
      keyPoints.length !== initialData.keyPoints.length ||
      JSON.stringify(keyPoints) !== JSON.stringify(initialData.keyPoints)

    setIsModified(associationChanged || partnersChanged || keyPointsChanged)
  }, [associationData, partners, keyPoints, initialData])

  const handleGeneralInfoUpdate = (
    field: keyof AssociationData,
    value: string
  ): void => {
    setAssociationData(prev => ({ ...prev, [field]: value }))
  }

  const addPartner = (): void => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: '',
      description: '',
      logoUrl: '/placeholder.svg'
    }
    setPartners([...partners, newPartner])
    // Ouvrir automatiquement la section partenaires lors de l'ajout
    if (!openSections.includes('partners')) {
      setOpenSections([...openSections, 'partners'])
    }
  }

  const removePartner = (id: string): void => {
    setPartners(partners.filter(partner => partner.id !== id))
  }

  const updatePartner = (
    id: string,
    field: keyof Partner,
    value: string
  ): void => {
    setPartners(partners.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addKeyPoint = (): void => {
    const newKeyPoint: KeyPoint = {
      id: Date.now().toString(),
      title: '',
      description: '',
      iconName: 'Building2'
    }
    setKeyPoints([...keyPoints, newKeyPoint])
    // Ouvrir automatiquement la section points clés lors de l'ajout
    if (!openSections.includes('key-points')) {
      setOpenSections([...openSections, 'key-points'])
    }
  }

  const removeKeyPoint = (id: string): void => {
    setKeyPoints(keyPoints.filter(point => point.id !== id))
  }

  const updateKeyPoint = (
    id: string,
    field: keyof KeyPoint,
    value: string
  ): void => {
    setKeyPoints(
      keyPoints.map(p => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      setIsSaving(true)

      // Transform partners and keyPoints to match the Json type
      const partnersJson = partners.map(partner => ({
        ...partner,
        logo_url: partner.logoUrl
      })) as Json[]

      const keyPointsJson = keyPoints.map(point => ({
        ...point,
        icon_name: point.iconName
      })) as Json[]

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

      // Mettre à jour les données initiales après sauvegarde
      setInitialData({
        association: { ...associationData },
        partners: JSON.parse(JSON.stringify(partners)),
        keyPoints: JSON.parse(JSON.stringify(keyPoints))
      })
      setIsModified(false)
    } catch (error) {
      console.error('Error saving association data:', error)
      toast.error("Erreur lors de l'enregistrement des modifications")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center h-64 w-full'>
        <Loader2 className='h-8 w-8 animate-spin text-primary mb-2' />
        <p>Chargement des données de l'association...</p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-6 pb-16 w-full mx-auto'>
        <Accordion
          type='multiple'
          value={openSections}
          onValueChange={setOpenSections}
          className='border rounded-md w-full'
        >
          <AccordionItem value='general-info' className='border-b'>
            <AccordionTrigger className='px-2 sm:px-4 py-3 flex items-center hover:bg-gray-50'>
              <div className='flex items-center gap-2'>
                <Building className='h-5 w-5 text-primary' />
                <span className='font-medium text-lg'>
                  Informations générales
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-2 sm:px-4 py-3 bg-gray-50'>
              <GeneralInfoSection
                {...associationData}
                onUpdate={handleGeneralInfoUpdate}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='partners' className='border-b'>
            <AccordionTrigger className='px-2 sm:px-4 py-3 flex items-center hover:bg-gray-50'>
              <div className='flex items-center gap-2'>
                <Users className='h-5 w-5 text-primary' />
                <span className='font-medium text-lg'>Partenaires</span>
                <span className='ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full'>
                  {partners.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-2 sm:px-4 py-3 bg-gray-50'>
              <div className='flex justify-end mb-4'>
                <Button
                  onClick={e => {
                    e.preventDefault()
                    addPartner()
                  }}
                  type='button'
                  size='sm'
                >
                  Ajouter un partenaire
                </Button>
              </div>
              <PartnersSection
                partners={partners}
                onAddPartner={addPartner}
                onRemovePartner={removePartner}
                onUpdatePartner={updatePartner}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='key-points'>
            <AccordionTrigger className='px-2 sm:px-4 py-3 flex items-center hover:bg-gray-50'>
              <div className='flex items-center gap-2'>
                <Key className='h-5 w-5 text-primary' />
                <span className='font-medium text-lg'>Points clés</span>
                <span className='ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full'>
                  {keyPoints.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-2 sm:px-4 py-3 bg-gray-50'>
              <div className='flex justify-around items-center'>
                <div className='flex justify-end mb-4'>
                  <Button
                    onClick={e => {
                      e.preventDefault()
                      addKeyPoint()
                    }}
                    type='button'
                    size='sm'
                  >
                    Ajouter un point clé
                  </Button>
                </div>
                <a
                  className='flex justify-end mb-4'
                  href='https://lucide.dev/icons/'
                  target='_blank'
                >
                  <Button type='button' size='sm'>
                    Voir les icônes
                  </Button>
                </a>
              </div>
              <KeyPointsSection
                keyPoints={keyPoints}
                onAddKeyPoint={addKeyPoint}
                onRemoveKeyPoint={removeKeyPoint}
                onUpdateKeyPoint={updateKeyPoint}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Bouton flottant pour enregistrer */}
        <FloatingSaveButton
          onClick={handleSubmit}
          loading={isSaving}
          initialModified={isModified}
          watchDependencies={[associationData, partners, keyPoints]}
        />
      </form>
      <Toaster />
    </>
  )
}

export default AssociationEditor
