import { FC, useState } from "react"
import { Button, Container, TextField } from "@mui/material"

interface CreateComponentProps {
  handleCommentCreate: (...args: any) => void
  setIsCreateComment: (...args: any) => void
}
export const CreateComment: FC<CreateComponentProps> = ({
  handleCommentCreate,
  setIsCreateComment,
}) => {
  const [value, setValue] = useState("")

  return (
    <Container>
      <form>
        <TextField
          sx={{ margin: "10px" }}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </form>
      <div style={{ margin: "10px" }}>
        <Button
          size="small"
          type="submit"
          variant="outlined"
          onClick={(e) => {
            handleCommentCreate(e, value)
          }}
        >
          Submit
        </Button>
        <Button
          sx={{ marginLeft: "10px" }}
          size="small"
          variant="outlined"
          onClick={() => setIsCreateComment(null)}
        >
          Cancel
        </Button>
      </div>
    </Container>
  )
}
