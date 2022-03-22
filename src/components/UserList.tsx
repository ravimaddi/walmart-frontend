import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAxios } from "../hooks"
import { User } from "./types"
import {
  Container,
  Stack,
  Popover,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material"

export const UserList: React.FC = () => {
  const {
    data: users,
    error,
    loading,
  } = useAxios({
    url: "users",
  })
  const [popoverContent, setPopoverContent] = useState(null)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const navigate = useNavigate()

  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
    )
  }

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    user: User
  ) => {
    setAnchorEl(event.currentTarget)
    setPopoverContent(user)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  return (
    <Container>
      <h1>Users List</h1>
      <Stack spacing={2}>
        {users?.map((user: User) => (
          <List
            key={user?.id}
            onMouseEnter={(e) => handlePopoverOpen(e, user)}
            onMouseLeave={handlePopoverClose}
          >
            <ListItemButton onClick={() => navigate(`user/${user?.id}`)}>
              <ListItemText primary={user?.name} />
            </ListItemButton>
          </List>
        ))}
      </Stack>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          <span>{popoverContent?.username}</span>
          <br />
          <span>{popoverContent?.email}</span>
        </Typography>
      </Popover>
    </Container>
  )
}
