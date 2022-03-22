import { FC } from "react"
import {
  Card,
  CardContent,
  Avatar,
  Container,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material"
import { User } from "./types"
import CallIcon from "@mui/icons-material/Call"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import LanguageIcon from "@mui/icons-material/Language"

interface UserProfileProps {
  user: User
}

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
}

export const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ maxWidth: "100%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                {user?.name[0]}
              </Avatar>
            }
            title={user?.name}
            subheader={user?.email}
          />
          <CardContent>
            <List sx={style}>
              <ListItem button>
                <ListItemIcon>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText primary={user?.phone} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary={user?.address?.city} />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={user?.website} />
              </ListItem>
              <Divider />
            </List>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
