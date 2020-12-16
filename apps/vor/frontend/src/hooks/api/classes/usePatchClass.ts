import { queryCache, useMutation } from "react-query"
import { getSchoolId } from "../../schoolIdState"
import { patchApi } from "../fetchApi"

interface Class {
  name: string
  startTime: Date
  endTime: Date
  weekdays: number[]
}
const usePatchClass = (classId: string) => {
  const patchClass = patchApi<Class>(`/classes/${classId}`)

  return useMutation(patchClass, {
    onSuccess: async () => {
      analytics.track("Class Updated")
      await Promise.all([
        queryCache.invalidateQueries(["class", classId]),
        queryCache.invalidateQueries(["classes", getSchoolId()]),
      ])
    },
  })
}

export default usePatchClass