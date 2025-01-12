import { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const transparentOption = 'rgba(0, 0, 0, 0)'

const RichTextEditor = ({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'], // Text styling
            [
              {
                color: [
                  '#2C89C3', // Custom blue
                  '#fb923c', // Orange
                  '#65a30d', // Green
                  '#ef4444', // Red
                  '#000000', // Black
                  '#ffffff' // White
                ]
              }
            ], // Color dropdown
            [
              {
                background: [
                  transparentOption, // Ajout de l'option transparente
                  '#2C89C3',
                  '#fb923c',
                  '#65a30d',
                  '#ef4444',
                  '#000000',
                  '#ffffff'
                ]
              }
            ], // Background color dropdown
            [{ list: 'ordered' }, { list: 'bullet' }] // Lists
          ]
        }
      })

      quillRef.current = quill

      // Update the parent component when the content changes
      quill.on('text-change', () => {
        onChange(quill.root.innerHTML)
      })

      // Set initial content
      quill.root.innerHTML = value
    }
  }, [])

  // Sync the value prop with Quill content
  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== value) {
      quillRef.current.root.innerHTML = value
    }
  }, [value])

  return <div ref={editorRef} />
}

export default RichTextEditor
