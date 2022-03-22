import { FC, useEffect, useState } from "react"
import { useAxios } from "../../hooks"
import { CreateComment } from "./CreateComment"
import { nanoid } from "nanoid"
import { Container, Stack, List, ListItemText, Typography } from "@mui/material"

interface CommentsProps {
  postId: number | null
  isCreateComment: number | null
  setIsCreateComment: (...args: any) => any
}

const Comments: FC<CommentsProps> = ({
  postId,
  isCreateComment,
  setIsCreateComment,
}) => {
  const [comments, setComments] = useState([])
  const { data, loading, error } = useAxios({
    url: `posts/${postId}/comments`,
  })
  useEffect(() => {
    if (data && !loading && !error) {
      setComments(data)
    }
  }, [data, loading, error])

  const handleCommentCreate = (e: any, value: string) => {
    e.preventDefault()
    setComments([...comments, { postId, id: nanoid(), body: value }])
    setIsCreateComment(false)
  }
  return (
    <Container>
      <Typography variant="h6">Comments</Typography>
      <Stack>
        {comments?.map((comment) => {
          return (
            <List key={comment?.id}>
              <ListItemText>{comment?.body}</ListItemText>
            </List>
          )
        })}
      </Stack>
      {isCreateComment ? (
        <CreateComment
          handleCommentCreate={handleCommentCreate}
          setIsCreateComment={setIsCreateComment}
        />
      ) : null}
    </Container>
  )
}

export default Comments
