import { Image } from "native-base"
import React from "react"
import FastImage from "react-native-fast-image"
import envVars from "../../../envVars"

type Props = {
  src: string
  width: number
  height: number
  alt?: string
}

const MyFastImage = (props: Props) => {
  if (envVars.ENVIRONMENT === "prod")
    return (
      <FastImage
        source={{ uri: props.src }}
        style={{ width: props.width, height: props.height }}
      />
    )

  return (
    <Image
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.alt}
    />
  )
}

export default MyFastImage
