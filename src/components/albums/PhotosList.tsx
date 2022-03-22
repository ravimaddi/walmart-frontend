import React from "react"
import { useAxios } from "../../hooks"
import { photo } from "../types"
import { ImageList, ImageListItem } from "@mui/material"
interface PhotosListProps {
  albumId: number
}

export const PhotosList: React.FC<PhotosListProps> = ({
  children,
  albumId,
}) => {
  const { data: photos } = useAxios({
    url: `photos?albumId=${albumId}`,
  })

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {photos?.map((photo: photo) => {
        return (
          <ImageListItem key={photo?.id}>
            {
              <img
                height={100}
                width={200}
                src={`${photo?.url}`}
                alt={`${photo?.title}`}
                title={photo?.title}
                loading="lazy"
              />
            }
          </ImageListItem>
        )
      })}
      {children}
    </ImageList>
  )
}
