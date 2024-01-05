import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import { cloneDeep, isEmpty } from 'lodash'
import React, { useCallback, useEffect, useRef } from 'react'
import { MouseSensor, TouchSensor } from '~/utils/DnDKitCustomSensors'
import { generatePlaceHolders, mapOrder } from '~/utils/Utils'
import Card from './Card/Card'
import Columns from './Coumns/Columns'
import ListColumns from './ListColumns/ListColumns'

const ACTIVE_GRAG_ITEM_TYPE = {
  COLUMN: 'COLUMN',
  CARD: 'CARD'
}

const BoardContent = ({
  board,
  createNewColumn,
  createNewCard,
  moveColumns
}) => {
  const [orderedColumnsState, setOrderedColumnsState] = React.useState([])
  const [activeDragItemID, setActiveDragItemID] = React.useState(null)
  const [activeDragItemType, setActiveDragItemType] = React.useState(null)
  const [activeDragItemData, setActiveDragItemData] = React.useState(null)
  const [oldColumeWhenDragingCard, setoldColumeWhenDragingCard] =
    React.useState(null)
  const lastOverID = useRef(null)

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

  const moveCardBeetweenColumns = (
    overColumn,
    overCardID,
    active,
    over,
    activeColumn,
    activeDragingCardID,
    activeDragingCardData
  ) => {
    setOrderedColumnsState((prevColumne) => {
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardID
      )
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      const newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.card?.length + 1

      const nextColumne = cloneDeep(prevColumne)
      const nextActiveColumne = nextColumne.find(
        (columne) => columne._id === activeColumn._id
      )
      const nextOverColumne = nextColumne.find(
        (columne) => columne._id === overColumn._id
      )

      if (nextActiveColumne) {
        nextActiveColumne.cards = nextActiveColumne.cards.filter(
          (card) => card._id !== activeDragingCardID
        )

        if (isEmpty(nextActiveColumne.cards)) {
          nextActiveColumne.cards = [generatePlaceHolders(nextActiveColumne)]
        }

        nextActiveColumne.cardOrderIds = nextActiveColumne.cards.map(
          (card) => card._id
        )
      }

      if (nextOverColumne) {
        nextOverColumne.cards = nextOverColumne.cards.filter(
          (card) => card._id !== activeDragingCardID
        )

        const rebuildActiveDragingCardData = {
          ...activeDragingCardData,
          columnId: nextOverColumne._id
        }

        nextOverColumne.cards = nextOverColumne.cards.toSpliced(
          newCardIndex,
          0,
          rebuildActiveDragingCardData
        )

        nextOverColumne.cards = nextOverColumne.cards.filter(
          (card) => !card.fe_place_holder
        )

        nextOverColumne.cardOrderIds = nextOverColumne.cards.map(
          (card) => card._id
        )
      }

      return nextColumne
    })
  }

  const findColumneByCardID = (cardID) => {
    const column = orderedColumnsState.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardID)
    )
    return column
  }

  const handleDragStart = (event) => {
    setActiveDragItemID(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_GRAG_ITEM_TYPE.CARD
        : ACTIVE_GRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setoldColumeWhenDragingCard(findColumneByCardID(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_GRAG_ITEM_TYPE.COLUMN) {
      return
    }

    const { active, over } = event
    if (!over) {
      return
    }

    const {
      id: activeDragingCardID,
      data: { current: activeDragingCardData }
    } = active
    const { id: overCardID } = over

    const activeColumn = findColumneByCardID(activeDragingCardID)
    const overColumn = findColumneByCardID(overCardID)

    if (!activeColumn || !overColumn) {
      return
    }

    if (activeColumn._id !== overColumn._id) {
      moveCardBeetweenColumns(
        overColumn,
        overCardID,
        active,
        over,
        activeColumn,
        activeDragingCardID,
        activeDragingCardData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || !active) {
      return
    }

    if (activeDragItemType === ACTIVE_GRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragingCardID,
        data: { current: activeDragingCardData }
      } = active
      const { id: overCardID } = over

      const activeColumn = findColumneByCardID(activeDragingCardID)
      const overColumn = findColumneByCardID(overCardID)

      if (!activeColumn || !overColumn) {
        return
      }
      if (oldColumeWhenDragingCard._id !== overColumn._id) {
        moveCardBeetweenColumns(
          overColumn,
          overCardID,
          active,
          over,
          activeColumn,
          activeDragingCardID,
          activeDragingCardData
        )
      } else {
        const oldCardIndex = oldColumeWhenDragingCard?.cards?.findIndex(
          (c) => c._id === activeDragingCardID
        )
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardID
        )
        const dndOrderedCardState = arrayMove(
          oldColumeWhenDragingCard?.cards,
          oldCardIndex,
          newCardIndex
        )
        setOrderedColumnsState((prevColumne) => {
          const nextColumns = cloneDeep(prevColumne)

          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCardState
          targetColumn.cardOrderIds = dndOrderedCardState.map((c) => c._id)
          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_GRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumeIndex = orderedColumnsState.findIndex(
          (c) => c._id === active.id
        )
        const newColumeIndex = orderedColumnsState.findIndex(
          (c) => c._id === over.id
        )
        const dndOrderedColumnsState = arrayMove(
          orderedColumnsState,
          oldColumeIndex,
          newColumeIndex
        )
        moveColumns(dndOrderedColumnsState)
        setOrderedColumnsState(dndOrderedColumnsState)
      }
    }

    setActiveDragItemID(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setoldColumeWhenDragingCard(null)
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

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType == ACTIVE_GRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      const pointerInterSection = pointerWithin(args)

      if (!pointerInterSection?.length) {
        return
      }

      let overID = getFirstCollision(pointerInterSection, 'id')

      if (overID) {
        const intersectColumn = orderedColumnsState.find(
          (c) => c._id === overID
        )
        if (intersectColumn) {
          overID = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (c) =>
                c.id !== overID && intersectColumn?.cardOrderIds?.includes(c.id)
            )
          })[0]?.id
        }

        lastOverID.current = overID
        return [{ id: overID }]
      }
      return lastOverID.current ? [{ id: lastOverID.current }] : []
    },
    [activeDragItemType, orderedColumnsState]
  )

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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
        <ListColumns
          columns={orderedColumnsState}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
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
