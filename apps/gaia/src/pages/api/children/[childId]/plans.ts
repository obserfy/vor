import auth0 from "../../../../utils/auth0"
import { findLessonPlanByChildIdAndDate } from "../../../../db"
import { getFirstQueryValue } from "../../../../utils/rest"
import { Dayjs } from "../../../../utils/dayjs"

export interface GetChildPlansResponse {
  id: string
  title: string
  description: string
  date: Dayjs
  area?: {
    id: string
    name: string
  }
}
export default auth0.requireAuthentication(async (req, res) => {
  try {
    const date = getFirstQueryValue(req, "date")
    const childId = getFirstQueryValue(req, "childId")

    const plans: GetChildPlansResponse[] = await findLessonPlanByChildIdAndDate(
      childId as string,
      date
    )

    res.status(200).json(plans)
  } catch (err) {
    console.error(err)
    res.status(err.status || 500).end(err.message)
  }
})
