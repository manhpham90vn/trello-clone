import { Box } from '@mui/material'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from '../Card/Card'

export default function ListCards({ cards }) {
  return (
    <SortableContext
      items={cards?.map((i) => i._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          p: '0 5px',
          m: '0 5px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) =>
            `calc(
                ${theme.trelloApp.boardContentHeight} - 
                ${theme.spacing(5)} - 
                ${theme.trelloApp.columnHeaderHeight} - 
                ${theme.trelloApp.columnFooterHeight}
                )
              `,
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf'
          }
        }}
      >
        {cards?.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
            />
          )
        })}
      </Box>
    </SortableContext>
  )
}
