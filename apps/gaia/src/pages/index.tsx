import React, { FC } from "react"
import Head from "next/head"
import Img from "react-optimized-image"
import dayjs from "dayjs"
import { Dayjs } from "../utils/dayjs"
import NoPlanIllustration from "../images/no-plan-illustration.svg"

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Obserfy for Parents</title>
      </Head>
      <div className="max-w-3xl mx-auto flex items-center">
        <div className="border-l ml-8 ">
          <div className="flex items-center font-bold -ml-5 mt-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border">
              T
            </div>
            <div className="ml-3">{dayjs().format("dddd, D MMM YYYY")}</div>
          </div>

          <div className="flex items-center font-bold -ml-5 mt-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border">
              I
            </div>
            <div className="ml-3">{dayjs().format("dddd, D MMM YYYY")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const EmptyPlansIllustration: FC<{ loading: boolean; date: Dayjs }> = ({
  loading,
  date,
}) => {
  return (
    <div
      className={`flex flex-col items-center py-16 ${
        loading && "opacity-50"
      } transition-opacity duration-200 max-w-3xl mx-auto`}
    >
      <Img src={NoPlanIllustration} className="w-64 md:w-1/2 mb-3" />
      <h5
        className={`text-xl mx-4 text-center ${
          loading && "opacity-0"
        } transition-opacity duration-200 font-bold`}
      >
        No plans for {date.format("MMMM D")}
      </h5>
    </div>
  )
}

export default IndexPage
