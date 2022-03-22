import React, { useState } from "react"
import { useAxios } from "../../hooks"
import { album } from "../types"
import { PhotosList } from "./PhotosList"
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardActionArea,
  Container,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface AlbumListProps {
  userId: string
}
export const AlbumList: React.FC<AlbumListProps> = ({ userId }) => {
  const { data: albums } = useAxios({
    url: `albums?userId=${userId}`,
  })
  const [albumId, setAlbumId] = useState(null)

  return (
    <section>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>User Albums</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="sm">
            {albums?.map((album: album) => {
              return (
                <Card
                  key={album?.id}
                  sx={{ maxWidth: "100%", marginTop: "20px" }}
                >
                  <CardActionArea>
                    <CardContent onClick={() => setAlbumId(album?.id)}>
                      <Typography gutterBottom variant="h5" component="div">
                        {album?.title}
                      </Typography>
                      {albumId === album?.id ? (
                        <PhotosList albumId={albumId} />
                      ) : null}
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            })}
          </Container>
        </AccordionDetails>
      </Accordion>
    </section>
  )
}
