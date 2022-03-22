import { FC, useState } from "react"
import { Button, TextField, Container } from "@mui/material"

interface EditPostProps {
  body: string
  handlePostUpdate: (...args: any) => void
  setEditPost: (...args: any) => void
}

export const EditPost: FC<EditPostProps> = ({
  body,
  handlePostUpdate,
  setEditPost,
}) => {
  const [value, setValue] = useState(body)

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
      <div>
        <Button
          size="small"
          type="submit"
          variant="outlined"
          onClick={(e) => {
            handlePostUpdate(e, value)
          }}
        >
          Submit
        </Button>
        <Button
          sx={{ marginLeft: "10px" }}
          size="small"
          variant="outlined"
          onClick={() => setEditPost(null)}
        >
          Cancel
        </Button>
      </div>
    </Container>
  )
}
