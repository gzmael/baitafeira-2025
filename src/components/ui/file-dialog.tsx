import {
  type Dispatch,
  type HTMLAttributes,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import Image from 'next/image'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import {
  type Accept,
  type FileRejection,
  type FileWithPath,
  useDropzone,
} from 'react-dropzone'
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Icons } from '@/components/ui/icons'
import type { FileWithPreview } from '@/contracts/commons'
import { cn, formatBytes } from '@/lib/utils'

import 'cropperjs/dist/cropper.css'
import { Headline } from './headline'

// FIXME Your proposed upload exceeds the maximum allowed size, this should trigger toast.error too

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends HTMLAttributes<HTMLDivElement> {
  name: TName
  setValue: UseFormSetValue<TFieldValues>
  accept?: Accept
  maxSize?: number
  maxFiles?: number
  files: FileWithPreview[] | null
  setFiles: Dispatch<SetStateAction<FileWithPreview[] | null>>
  isUploading?: boolean
  disabled?: boolean
  variant?: 'outline' | 'secondary'
}

export function FileDialog<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    'image/*': [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  variant = 'secondary',
  ...props
}: FileDialogProps<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      const totalFiles = (files?.length || 0) + acceptedFiles.length

      if (totalFiles > maxFiles) {
        toast.error('Erro', {
          description: `Você só pode enviar no máximo ${maxFiles} arquivos.`,
        })
        return
      }

      for (const file of acceptedFiles) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        setFiles((prev) => [...(prev ?? []), fileWithPreview])
      }

      if (rejectedFiles.length > 0) {
        for (const { errors } of rejectedFiles) {
          if (errors[0]?.code === 'file-too-large') {
            toast.error('Erro', {
              description: `Arquivo muito grande. Máximo é de ${formatBytes(
                maxSize
              )}`,
            })
            return
          }
          if (errors[0]?.message) {
            toast.error('Erro', {
              description: errors[0].message,
            })
          }
        }
      }
    },

    [files?.length, maxFiles, maxSize, setFiles]
  )

  // Register files to react-hook-form
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  })

  // Revoke preview url when component unmounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    return () => {
      if (!files) return
      for (const file of files) {
        URL.revokeObjectURL(file.preview)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          disabled={disabled}
          className={cn(
            'gap-2',
            variant === 'outline' && 'w-full border-dashed'
          )}
        >
          <Icons.upload className="size-5" />
          {variant !== 'outline' && 'Selecionar'}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[480px]"
        aria-describedby="select-image-dialog"
      >
        <DialogTitle>
          <span className="sr-only">Selecionar imagens</span>
        </DialogTitle>
        <DialogDescription>
          <span className="sr-only">selecione suas imagens</span>
        </DialogDescription>
        <p className="absolute top-4 left-5 font-medium text-base text-muted-foreground">
          Envie suas imagens
        </p>
        <div
          {...getRootProps()}
          className={cn(
            'group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-muted-foreground/25 border-dashed px-5 py-2.5 text-center transition hover:bg-muted/25',
            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            isDragActive && 'border-muted-foreground/50',
            disabled && 'pointer-events-none opacity-60',
            className
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="group grid w-full place-items-center gap-1 sm:px-10">
              <Icons.upload
                className="size-9 animate-pulse text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          ) : isDragActive ? (
            <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
              <Icons.upload
                className={cn('size-8', isDragActive && 'animate-bounce')}
                aria-hidden="true"
              />
              <p className="font-medium text-base">Solte suas imagens aqui</p>
            </div>
          ) : (
            <div className="grid place-items-center gap-1 sm:px-5">
              <Icons.upload
                className="size-8 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-2 font-medium text-base text-muted-foreground">
                Arraste e solte suas images aqui, ou clique para selecionar
              </p>
              <p className="text-slate-500 text-sm">
                Os arquivos deve ter tamanho menor que {formatBytes(maxSize)}
              </p>
            </div>
          )}
        </div>
        <p className="text-center font-medium text-muted-foreground text-sm">
          Você pode enviar no máximo {maxFiles}{' '}
          {maxFiles === 1 ? 'arquivo' : 'arquivos'}
        </p>
        {files?.length ? (
          <div className="grid gap-5">
            {files?.map((file, i) => (
              <FileCard
                key={i}
                i={i}
                files={files}
                setFiles={setFiles}
                file={file}
              />
            ))}
          </div>
        ) : null}
        {files?.length ? (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-2.5 w-full"
            onClick={() => setFiles(null)}
          >
            <Icons.trash className="mr-2 size-4" aria-hidden="true" />
            Remover tudo
            <span className="sr-only">Remover tudo</span>
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

interface FileCardProps {
  i: number
  file: FileWithPreview
  files: FileWithPreview[] | null
  setFiles: Dispatch<SetStateAction<FileWithPreview[] | null>>
}

function FileCard({ i, file, files, setFiles }: FileCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cropData, setCropData] = useState<string | null>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const onCrop = useCallback(() => {
    if (!files || !cropperRef.current) return

    const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas()
    setCropData(croppedCanvas.toDataURL())

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.error('Blob creation failed')
        return
      }
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      })

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: file.name,
      }) satisfies FileWithPreview

      const newFiles = files.map((file, j) =>
        j === i ? croppedFileWithPathAndPreview : file
      )
      setFiles(newFiles)
    })
  }, [file.name, file.type, files, i, setFiles])

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        onCrop()
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [onCrop])

  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Image
          src={cropData ? cropData : file.preview}
          alt={file.name}
          className="size-12 shrink-0 rounded-md object-contain"
          width={48}
          height={48}
          loading="lazy"
        />
        <div className="flex max-w-[300px] flex-col">
          <p
            className="line-clamp-1 overflow-hidden text-ellipsis font-medium text-muted-foreground text-sm"
            title={file.name}
          >
            {file.name}
          </p>
          <p className="text-slate-500 text-xs">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.type.startsWith('image') && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-7"
              >
                <Icons.crop className="size-4 " aria-hidden="true" />
                <span className="sr-only">Crop image</span>
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="crop-image-dialog">
              <DialogTitle asChild>
                <Headline
                  as="h4"
                  size="xs"
                  variant="black"
                  className="m-0 p-0 leading-1"
                >
                  Cortar imagem
                </Headline>
              </DialogTitle>
              <DialogDescription>
                <span className="sr-only">selecione suas imagens</span>
              </DialogDescription>
              <div className="grid place-items-center space-y-5">
                <Cropper
                  ref={cropperRef}
                  className="size-[450px] object-cover"
                  zoomTo={0.5}
                  initialAspectRatio={1 / 1}
                  preview=".img-preview"
                  src={file.preview}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    aria-label="Reset crop"
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      cropperRef.current?.cropper.reset()
                      setCropData(null)
                    }}
                  >
                    <Icons.reset className="mr-2 size-3.5" aria-hidden="true" />
                    Reiniciar Corte
                  </Button>
                  <Button
                    aria-label="Crop image"
                    type="button"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      onCrop()
                      setIsOpen(false)
                    }}
                  >
                    <Icons.crop className="mr-2 size-3.5" aria-hidden="true" />
                    Cortar imagem
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="size-7"
          onClick={() => {
            if (!files) return
            setFiles(files.filter((_, j) => j !== i))
          }}
        >
          <Icons.trash className="size-4" aria-hidden="true" />
          <span className="sr-only">Remover aquivo</span>
        </Button>
      </div>
    </div>
  )
}
