import { Box } from '@mui/material'
import { mapOrder } from '~/utils/Utils'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = ({ board }) => {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloApp.boardContentHeight,
        display: 'flex',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        padding: '10px 0'
      }}
    >
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
