import { Container } from '@mui/material'
import SelectMode from './SelectMode'

const App = () => {
  return (
    <Container sx={{ height:'100vh', backgroundColor: 'primary.main' }}>
      <SelectMode />
    </Container>
  )
}

export default App