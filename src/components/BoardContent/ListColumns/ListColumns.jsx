import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import Columns from '../Coumns/Columns'

export default function ListColumns({ columns }) {
  return (
    <SortableContext
      items={columns?.map((i) => i._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          background: 'inherit',
          width: '100%',
          height: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          '&::-webkit-scrollbar-track': {
            m: 0
          }
        }}
      >
        {columns?.map((column) => (
          <Columns
            key={column._id}
            column={column}
          />
        ))}

        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            backgroundColor: '#ffffff3d'
          }}
        >
          <Button
            startIcon={<NoteAddIcon />}
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}
