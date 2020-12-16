import { useMutation } from "react-query"
import { deleteApi } from "../fetchApi"

const useDeleteSubject = (subjectId: string) => {
  const deleteSubject = deleteApi(`/curriculums/subjects/${subjectId}`)

  return useMutation(deleteSubject, {
    onSuccess: () => {
      analytics.track("Subject Deleted")
    },
  })
}

export default useDeleteSubject