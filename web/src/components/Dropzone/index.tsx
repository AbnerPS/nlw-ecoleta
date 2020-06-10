import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import './styles.css'

interface Props {
  onFileUpload: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)

    onFileUpload(file)
  }, [onFileUpload])

  const { getRootProps, getInputProps } = useDropzone({onDrop, accept: 'image/*'})

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl ? 
        <img src={selectedFileUrl} alt="Point thumbnail" /> : 
        (<p>
          <FiUpload />
          Selecione uma imagem para o seu estabelecimento
        </p>)
      }
    </div>
  )
}

export default Dropzone