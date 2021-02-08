import { t } from "@lingui/macro"
import { useBreakpointIndex } from "@theme-ui/match-media"
import React, { FC } from "react"
import { Box, Flex } from "theme-ui"
import PageCurriculumArea from "../../../../../components/PageCurriculumArea/PageCurriculumArea"
import PageCurriculumSettings from "../../../../../components/PageCurriculumSettings/PageCurriculumSettings"
import PageCurriculumSubject from "../../../../../components/PageCurriculumSubject/PageCurriculumSubject"
import SEO from "../../../../../components/seo"
import { useQueryString } from "../../../../../hooks/useQueryString"

const Subject = () => {
  const areaId = useQueryString("areaId")
  const subjectId = useQueryString("subjectId")

  return (
    <Box>
      <SEO title={t`Subject`} />
      <Flex>
        <SideBar areaId={areaId} />

        <PageCurriculumSubject subjectId={subjectId} areaId={areaId} />
      </Flex>
    </Box>
  )
}

const SideBar: FC<{ areaId: string }> = ({ areaId }) => {
  const breakpoint = useBreakpointIndex({ defaultIndex: 3 })

  if (breakpoint < 2) return <></>

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: ["100%", "100%", 340],
          display: ["none", "none", "block"],
        }}
      >
        <PageCurriculumSettings />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: ["100%", "100%", 340],
          display: ["none", "none", "block"],
        }}
      >
        <PageCurriculumArea id={areaId} />
      </Box>
    </>
  )
}

export default Subject
