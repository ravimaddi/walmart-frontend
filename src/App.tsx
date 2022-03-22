import { UserList, UserDetails } from "./components"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"

interface AppProps {
  [key: string]: any
}
const theme = createTheme({
  palette: {
    mode: "light",
  },
})

const App: React.FC<AppProps> = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
