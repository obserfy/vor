import React, { FC } from "react"
import PageEditGuardians from "../../../../../../components/PageEditGuardians/PageEditGuardians"
import { useQueryString } from "../../../../../../hooks/useQueryString"

const EditGuardians: FC = () => {
  const id = useQueryString("id")

  return <PageEditGuardians id={id} />
}

export default EditGuardians
