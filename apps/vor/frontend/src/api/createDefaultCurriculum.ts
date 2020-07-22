import { getSchoolId } from "../hooks/schoolIdState"

/** @deprecated use the new react-query based hook, create one if it does not exists */
export async function createDefaultCurriculum(
  onSuccess: () => void
): Promise<void> {
  const baseUrl = "/api/v1"
  const response = await fetch(
    `${baseUrl}/schools/${getSchoolId()}/curriculums`,
    {
      credentials: "same-origin",
      method: "POST",
    }
  )
  if (response.status === 201) {
    onSuccess()
    analytics.track("Default curriculum created", {
      responseStatus: response.status,
    })
  } else {
    analytics.track("Create curriculum failed", response.text())
  }
}
