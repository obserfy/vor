import { QueryState, useQuery } from "react-query"
import { fetchApi } from "./fetchApi"

interface Class {
  id: string
  name: string
  startTime: string
  endTime: string
  weekdays: number[]
}
const useGetClass = (classId: string): QueryState<Class> => {
  const getClass = fetchApi<Class>(`/classes/${classId}`)
  return useQuery(["class", classId], getClass)
}

export default useGetClass
