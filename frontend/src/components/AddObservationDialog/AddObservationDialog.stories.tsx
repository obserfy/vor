import React, { FC } from "react"
import { action } from "@storybook/addon-actions"
import AddObservationDialog from "./AddObservationDialog"

export default {
  title: "Core|AddObservationDialog",
  component: AddObservationDialog,
  parameters: {
    componentSubtitle: "Just a simple AddObservationDialog",
  },
}

export const Basic: FC = () => (
  <AddObservationDialog
    onCancel={action("cancel")}
    onConfirm={action("confirm")}
  />
)
