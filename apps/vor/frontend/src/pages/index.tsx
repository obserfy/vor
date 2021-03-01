import { t } from "@lingui/macro"
import { PageRendererProps } from "gatsby"
import React, { FC, useEffect } from "react"
import { navigate } from "../components/Link/Link"
import SEO from "../components/seo"
import { STUDENTS_URL } from "../routes"

const IndexPage: FC<PageRendererProps> = () => {
  // TODO: replace with gatsby-link <Redirect /> when it lands, gatsby #26046
  useEffect(() => {
    navigate(STUDENTS_URL)
  }, [])

  return (
    <div>
      <SEO title={t`Home`} />
    </div>
  )
}

export default IndexPage
