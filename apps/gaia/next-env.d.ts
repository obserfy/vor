/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="optimized-images-loader" />

declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.ico" {
  const content: string
  export default content
}

declare const Canny: (method: string, data: any) => void

declare module "formidable-serverless" {
  // eslint-disable-next-line import/no-extraneous-dependencies
  export * from "formidable"
}

declare module "@segment/snippet"
