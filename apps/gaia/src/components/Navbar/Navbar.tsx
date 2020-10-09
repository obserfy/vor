import React, { FC } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

interface Props {
  childId: string
}
const Navbar: FC<Props> = ({ childId }) => {
  const router = useRouter()

  return (
    <div className="sticky top-0 bg-surface border-b z-30">
      <nav className="w-full flex max-w-3xl mx-auto pl-1">
        <ul className="flex">
          <li className="mr-1" style={{ marginBottom: -1 }}>
            <Link href={`/?childId=${childId}`}>
              <a
                className={`${
                  router.pathname === "/"
                    ? "border-b-2 border-black"
                    : "text-gray-700"
                } bg-white inline-block p-2 text-sm`}
              >
                Lesson Plan
              </a>
            </Link>
          </li>
          <li className="mr-1" style={{ marginBottom: -1 }}>
            <Link href={`/gallery?childId=${childId}`}>
              <a
                className={`${
                  router.pathname === "/gallery"
                    ? "border-b-2 border-black"
                    : "text-gray-700"
                } bg-white inline-block p-2 text-sm`}
              >
                Gallery
              </a>
            </Link>
          </li>
          <li className="mr-1" style={{ marginBottom: -1 }}>
            <Link href={`/support?childId=${childId}`}>
              <a
                className={`${
                  router.pathname === "/support"
                    ? "border-b-2 border-black"
                    : "text-gray-700"
                } bg-white inline-block p-2 text-sm`}
              >
                Support
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
