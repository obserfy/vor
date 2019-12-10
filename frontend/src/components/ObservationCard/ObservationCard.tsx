import React, { FC } from "react"
import differenceInBusinessDays from "date-fns/differenceInBusinessDays"
import Flex from "../Flex/Flex"
import Typography from "../Typography/Typography"
import Pill from "../Pill/Pill"
import Spacer from "../Spacer/Spacer"
import Button from "../Button/Button"
import Card from "../Card/Card"
import { categories } from "../../categories"
import { Observation } from "../../hooks/students/useQueryStudentObservations"
import { useFormatRelativeTime } from "../../intl/useFormatDate"

interface Props {
  observation: Observation
  onDelete: (value: Observation) => void
  onEdit: (value: Observation) => void
}
export const ObservationCard: FC<Props> = ({
  onDelete,
  onEdit,
  observation,
}) => {
  const category = categories[parseInt(observation.categoryId, 10)]

  const createdDateDifference = differenceInBusinessDays(
    Date.parse(observation.createdDate ?? ""),
    Date.now()
  )

  const relativeCreatedDate = useFormatRelativeTime(
    createdDateDifference,
    "day",
    { numeric: "auto" }
  )

  return (
    <Card mb={2} key={observation.id}>
      <Flex
        p={3}
        alignItems="center"
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: "border",
          borderBottomStyle: "solid",
        }}
      >
        <Flex flexDirection="column" alignItems="start">
          <Typography.H6 mb={2}>{observation.shortDesc}</Typography.H6>
          <Flex>
            <Pill
              backgroundColor={category.color}
              text={category.name}
              color={category.onColor}
            />
            <Pill
              ml={2}
              backgroundColor={category.color}
              text={relativeCreatedDate}
              color={category.onColor}
            />
          </Flex>
        </Flex>
      </Flex>
      <Typography.Body fontSize={1} p={3}>
        {observation.longDesc}
      </Typography.Body>
      <Flex
        p={3}
        alignItems="center"
        sx={{
          borderTopWidth: 1,
          borderTopStyle: "solid",
          borderTopColor: "border",
        }}
      >
        <Spacer />
        <Button
          mr={3}
          variant="outline"
          color="danger"
          onClick={() => onDelete(observation)}
        >
          delete
        </Button>
        <Button
          variant="outline"
          data-cy="dialogPositiveAction"
          onClick={() => onEdit(observation)}
        >
          Edit
        </Button>
      </Flex>
    </Card>
  )
}

export default ObservationCard
