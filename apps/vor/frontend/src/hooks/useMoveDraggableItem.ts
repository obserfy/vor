/* eslint-disable no-param-reassign */
import { useCallback } from "react"
import { useImmer } from "use-immer"

enum DragYDirection {
  DOWN = -1,
  UP = 1,
}

export interface OrderedItem {
  id: string
  order: number
}

const checkDragDirection = (newOrder: number, currOrder: number) => {
  return newOrder > currOrder ? DragYDirection.DOWN : DragYDirection.UP
}

const capOrder = (newOrder: number, direction: DragYDirection, max: number) => {
  return direction === DragYDirection.DOWN
    ? Math.min(newOrder, max)
    : Math.max(newOrder, 0)
}

export const useMoveDraggableItem = <T extends OrderedItem[]>(
  items: T
): [T, (currItem: OrderedItem, newOrder: number) => void] => {
  const [cachedItems, setItems] = useImmer(items)

  const moveItem = (currItem: OrderedItem, newOrder: number) => {
    if (currItem.order === newOrder) return
    // Reorder list to reflect position after dragging
    setItems((draft) => {
      const direction = checkDragDirection(newOrder, currItem.order)
      const targetOrder = capOrder(newOrder, direction, draft.length - 1)

      const currItemIdx = draft.findIndex((i) => i.id === currItem.id)
      const targetIdx = draft.findIndex((i) => i.order === targetOrder)

      // Distance between currItem.order and newOrder can be big when user moves
      // the cursor too fast. So we need to update all items with order number
      // between currItem.order and the newOrder
      const currentItem = draft[currItemIdx]
      // assume that the list is always sorted
      for (let i = currItemIdx; i !== targetIdx; i -= direction) {
        const nextItem = { ...draft[i - direction] }
        nextItem.order = draft[i].order
        draft[i] = nextItem
      }
      draft[targetIdx] = currentItem
      draft[targetIdx].order = targetOrder
    })
  }

  const memoizedMoveItem = useCallback(moveItem, [setItems])
  return [cachedItems, memoizedMoveItem]
}
