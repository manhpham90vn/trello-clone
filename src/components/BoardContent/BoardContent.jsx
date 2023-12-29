import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { mapOrder } from '~/utils/Utils'
import Card from './Card/Card'
import Columns from './Coumns/Columns'
import ListColumns from './ListColumns/ListColumns'

const ACTIVE_GRAG_ITEM_TYPE = {
  COLUMN: 'COLUMN',
  CARD: 'CARD'
}

const BoardContent = ({ board }) => {
  const [orderedColumnsState, setOrderedColumnsState] = React.useState([])
  const [activeDragItemID, setActiveDragItemID] = React.useState(null)
  const [activeDragItemType, setActiveDragItemType] = React.useState(null)
  const [activeDragItemData, setActiveDragItemData] = React.useState(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id'
    )
    setOrderedColumnsState(orderedColumns)
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) {
      return
    }

    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id)
      const dndOrderedColumnsState = arrayMove(
        orderedColumnsState,
        oldIndex,
        newIndex
      )
      const dndOrderedColumnsStateIds = dndOrderedColumnsState.map((c) => c._id)
      console.log(dndOrderedColumnsStateIds)
      setOrderedColumnsState(dndOrderedColumnsState)
    }

    setActiveDragItemID(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const handleDragStart = (event) => {
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_GRAG_ITEM_TYPE.CARD
        : ACTIVE_GRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
        <ListColumns columns={orderedColumnsState} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_GRAG_ITEM_TYPE.COLUMN && (
            <Columns column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_GRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
