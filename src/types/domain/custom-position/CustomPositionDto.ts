export interface CustomPositionDto {
  id: string
  imdbItemId: string
  userId: string
  position: number

  createdAt: string
  updatedAt: string
}

export const buildCustomPositionDto = (
  p?: Partial<CustomPositionDto>
): CustomPositionDto => ({
  id: "",
  imdbItemId: "",
  userId: "",
  position: 0,

  createdAt: "",
  updatedAt: "",
  ...p,
})
