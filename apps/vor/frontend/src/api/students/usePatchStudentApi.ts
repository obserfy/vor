import { queryCache, useMutation } from "react-query"
import { patchApi } from "../fetchApi"
import { Dayjs } from "../../dayjs"

interface UpdateStudentRequestBody {
  name?: string
  customId?: string
  dateOfBirth?: Dayjs
  dateOfEntry?: Dayjs
  gender?: number
  active?: boolean
  profileImageId?: string
  note?: string
}
export function usePatchStudentApi(id: string) {
  const patchStudent = patchApi<UpdateStudentRequestBody>(`/students/${id}`)

  return useMutation(patchStudent, {
    onSuccess: async () => {
      analytics.track("Student Updated", { id })
      await Promise.all([
        queryCache.invalidateQueries(["student", id]),
        queryCache.invalidateQueries("students"),
      ])
    },
  })
}
