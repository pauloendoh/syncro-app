import React, { useEffect, useRef, useState } from "react"

import { Image } from "react-native"

import * as FileSystem from "expo-file-system"

type Props = {
  src: string
  cacheKey: string
  width: number
  height: number
  alt?: string
}

const CachedImage = (props: Props) => {
  const { src, cacheKey } = props
  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`

  const [imgURI, setImgURI] = useState<string | null>(filesystemURI)

  const componentIsMounted = useRef(true)

  useEffect(() => {
    const loadImage = async ({ fileURI }: { fileURI: string }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI)
        if (!metadata.exists) {
          // download to cache
          if (componentIsMounted.current) {
            setImgURI(null)
            await FileSystem.downloadAsync(src, fileURI)
          }
          if (componentIsMounted.current) {
            setImgURI(fileURI)
          }
        }
      } catch (err) {
        console.log()
        setImgURI(src)
      }
    }

    loadImage({ fileURI: filesystemURI })

    return () => {
      componentIsMounted.current = false
    }
  }, [])

  return <Image {...props} source={{ uri: String(imgURI) }} />
}

export default CachedImage
