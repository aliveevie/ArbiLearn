"use client"

import { SetStateAction, JSX, SVGProps, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
// import { useAccount } from "wagmi";
import Chapter1 from "./chapters/chapter";
import Chapter2 from "./chapters/chapter2";
import Chapter3 from "./chapters/chapter3";
import Chapter4 from "./chapters/chapter4";
import Chapter5 from "./chapters/chapter5";
import Chapter6 from "./chapters/chapter6";
import Chapter7 from "./chapters/chapter7";
import Chapter8 from "./chapters/chapter8";
import Chapter9 from "./chapters/chapter9";
import Chapter10 from "./chapters/chapter10";


export function Dashboard() {
  const [activeSection, setActiveSection] = useState("welcome")
  const handleSectionClick = (section: any) => {
    setActiveSection(section)
  }

  // const { isDisconnected } = useAccount();

  const router = useRouter();

  // if(isDisconnected){
  //   router.push('/') 
  // }

  return (
    <div className="flex w-full min-h-screen">
     <aside className="w-64 bg-gray-800 text-white flex flex-col hover:bg-gray-700 cursor-pointer ">
        <div className="p-4 text-xl font-bold">ArbiLearn</div>
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <span>Back to course page</span>
            <ChevronLeftIcon className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <Progress value={100} className="w-full" />
          </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-2">
          <div
            className={`p-2 rounded ${activeSection === "welcome" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("welcome")}
          >
            <div className="flex items-center space-x-2 hover:bg-gray-700">
              <BookIcon className="w-5 h-5" />
              <span>What is Arbitrum</span>
            </div>
          </div>
          <div
            className={`p-2 rounded ${activeSection === "primer" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("primer")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>How To Start Developing On Arbitrum</span>
            </div>
            
          </div>
          <div
            className={`p-2 rounded ${activeSection === "quiz" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("quiz")}
          >
            <div className="flex items-center space-x-2">
              <FilePenIcon className="w-5 h-5" />
              <span>How Arbitrum Works</span>
            </div>
           
          </div>
          <div
            className={`p-2 rounded ${activeSection === "feedback" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("feedback")}
          >
            <div className="flex items-center space-x-2">
              <ReplyIcon className="w-5 h-5" />
              <span>Run an Orbit</span>
            </div>
          </div>

          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("glossary")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>Build your First dApp
              </span>
            </div>
          </div>

          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("chapter6")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>Run a Node
              </span>
            </div>
          </div>

          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("chapter7")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>Arbitrum Bridge
              </span>
            </div>
          </div>

          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("chapter8")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>Write a Stylus Contract
              </span>
            </div>
          </div>

          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("chapter9")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>FAQ
              </span>
            </div>
          </div>


          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("chapter10")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>Glossary-
              </span>
            </div>
          </div>

        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" className="text-muted-foreground">
            <ChevronLeftIcon className="w-5 h-5" />
            previous
          </Button>
          <Button variant="ghost" className="text-muted-foreground">
            next
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
        {activeSection === "welcome" && (
              <Chapter1 />
        )}

        {activeSection === "primer" && (
              <Chapter2 />
        )}

        {activeSection === "quiz" && (
              <Chapter3 />
        )}
        {activeSection === "feedback" && (
            <Chapter4 />
        )}

        {activeSection === "glossary" && (
            <Chapter5 />
        )}

        {activeSection === "chapter6" && (
            <Chapter6 />
        )}

        {activeSection === "chapter7" && (
            <Chapter7 />
        )}

        {activeSection === "chapter8" && (
            <Chapter8 />
        )}

        {activeSection === "chapter9" && (
            <Chapter9 />
        )}

        {activeSection === "chapter10" && (
            <Chapter10 />
        )}


      </main>
    </div>
  )
}

function BookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function ChevronLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function ReplyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
