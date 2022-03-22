import React, { FC, useEffect, useState, Suspense } from "react"
import { useAxios } from "../../hooks"
import { EditPost } from "./EditPost"
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Container,
  AppBar,
  Toolbar,
  InputBase,
  CircularProgress,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DeleteIcon from "@mui/icons-material/Delete"
import CommentIcon from "@mui/icons-material/Comment"
import SearchIcon from "@mui/icons-material/Search"
import { styled, alpha } from "@mui/material/styles"
const Comments = React.lazy(() => import("./Comments"))

interface UserPostsProps {
  userId: string
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

export const UserPosts: FC<UserPostsProps> = ({ userId }) => {
  const { data } = useAxios({
    url: `posts?userId=${userId}`,
  })
  const [showCommnets, setShowCommnets] = useState(null)
  const [posts, setPosts] = useState([])
  const [editPost, setEditPost] = useState(null)
  const [searchValue, setSearchValue] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [isCreateComment, setIsCreateComment] = useState(null)
  useEffect(() => {
    if (data) {
      setPosts(data)
      setFilteredPosts(data)
    }
  }, [data])

  const handlePostUpdate = async (e: any, value: string) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editPost}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            body: value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      const updatedValue = await response.json()
      const newPosts = filteredPosts.map((post) => {
        if (post.id === editPost) {
          return { ...post, body: updatedValue?.body }
        }
        return post
      })
      setFilteredPosts(newPosts)
      setEditPost(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async (postId: number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      })
      const newPosts = filteredPosts.filter((post) => post?.id !== postId)
      setFilteredPosts(newPosts)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value)
    const newPosts = posts.filter((post) =>
      post?.title.includes(e.target.value)
    )
    setFilteredPosts(newPosts)
  }

  return (
    <section>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>User Posts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="sm">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Posts</Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={(e) => {
                      handleSearch(e)
                    }}
                    value={searchValue}
                    placeholder="Search…"
                  />
                </Search>
              </Toolbar>
            </AppBar>

            {filteredPosts?.map((userPost) => {
              return (
                <Card
                  key={userPost?.id}
                  sx={{ maxWidth: "100%", marginTop: "20px" }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {userPost?.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                      >
                        {editPost === userPost?.id ? (
                          <EditPost
                            body={userPost?.body}
                            handlePostUpdate={handlePostUpdate}
                            setEditPost={setEditPost}
                          />
                        ) : (
                          userPost?.body
                        )}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      onClick={() => setEditPost(userPost?.id)}
                      variant="outlined"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setShowCommnets(userPost?.id)}
                      variant="outlined"
                    >
                      Show Comments
                    </Button>
                    <Button
                      onClick={() => handleDeletePost(userPost?.id)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        setShowCommnets(userPost?.id)
                        setIsCreateComment(userPost?.id)
                      }}
                      variant="contained"
                      endIcon={<CommentIcon />}
                    >
                      Comment
                    </Button>
                  </CardActions>
                  <Suspense fallback={<CircularProgress />}>
                    {showCommnets === userPost?.id ? (
                      <Comments
                        postId={showCommnets}
                        isCreateComment={isCreateComment}
                        setIsCreateComment={setIsCreateComment}
                      />
                    ) : null}
                  </Suspense>
                </Card>
              )
            })}
          </Container>
        </AccordionDetails>
      </Accordion>
    </section>
  )
}
