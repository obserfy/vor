import React from "react"
import { addDecorator, addParameters, configure } from "@storybook/react"
import { ThemeProvider } from "theme-ui"
import { create } from "@storybook/theming"
import Theme from "../src/gatsby-plugin-theme-ui"
import { Box } from "../src/components/Box/Box"
import "../src/global.css"
import { IntlProvider } from "gatsby-plugin-intl3"
import { withI18n } from "storybook-addon-i18n"

// Setup Custom theme and storybook options
const theme = create({
  base: "dark",
  appBg: "#1d1d1d",
  barBg: "#222222",
  brandUrl: "https://obserfy.com",
  brandName: "Obserfy",
})

const ThemeDecorator = story => (
  <ThemeProvider theme={Theme}>
    <Box backgroundColor="background" fontSize={[16, 20]}>
      {story()}
    </Box>
  </ThemeProvider>
)
addDecorator(ThemeDecorator)

// React Intl
addParameters({
  i18n: {
    provider: IntlProvider,
    providerProps: {},
    supportedLocales: ["en", "id"],
    providerLocaleKey: "locale",
  },
})
addDecorator(withI18n)

// Make gatsby components work on storybook.
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

// automatically import all files ending in *.stories.js
configure(require.context("../src", true, /\.stories\.tsx$/), module)
