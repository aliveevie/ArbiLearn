"use client"

import { SetStateAction, JSX, SVGProps, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("welcome")
  const handleSectionClick = (section: any) => {
    setActiveSection(section)
  }
  return (
    <div className="flex w-full min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold">Arbitrum 101</div>
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
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>1.1 Welcome to Arbitrum 101</span>
            </div>
            <div className="ml-7">ebook</div>
          </div>
          <div
            className={`p-2 rounded ${activeSection === "primer" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("primer")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>1.2 Primer on Arbitrum</span>
            </div>
            <div className="ml-7">ebook</div>
          </div>
          <div
            className={`p-2 rounded ${activeSection === "quiz" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("quiz")}
          >
            <div className="flex items-center space-x-2">
              <FilePenIcon className="w-5 h-5" />
              <span>Chapter 1 Quiz</span>
            </div>
            <div className="ml-7">Exam</div>
          </div>
          <div
            className={`p-2 rounded ${activeSection === "feedback" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("feedback")}
          >
            <div className="flex items-center space-x-2">
              <ReplyIcon className="w-5 h-5" />
              <span>Chapter 1 Feedback</span>
            </div>
            <div className="ml-7">Course evaluation (short)</div>
          </div>
          <div
            className={`p-2 rounded ${activeSection === "glossary" ? "bg-blue-600" : ""}`}
            onClick={() => handleSectionClick("glossary")}
          >
            <div className="flex items-center space-x-2">
              <BookIcon className="w-5 h-5" />
              <span>Arbitrum 101 Glossary</span>
            </div>
            <div className="ml-7">ebook</div>
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
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-md mb-4">
              <h1 className="text-2xl font-bold">1.1 Welcome to Arbitrum 101</h1>
            </div>
            <div className="space-y-4">
              <p>
                Welcome to the Arbitrum 101 course! This course has been designed to give you all the tools and
                knowledge you will need to be able to start building useful dApps (decentralized applications) on the
                Arbitrum network using Arbitrum.
              </p>
              <p>
                The course offers a comprehensive overview of dApp development using Arbitrum, beginning with basic
                concepts like the Arbitrum Rollup, the Arbitrum Virtual Machine, and the process of setting up the
                essential tools for network development. It then progresses to more advanced topics, including the
                creation of fungible and non-fungible resources, concluding with insights into managing authorization
                rules.
              </p>
              <p>
                If some of the terms used here don't quite make sense to you, do not worry! We will explain what all of
                this means in the following chapters. Plus we have included a glossary at the end of this chapter to
                help with terminology as well.
              </p>
              <p>
                This course is designed in a way that allows you to learn at your own pace but you can expect it to take
                around two weeks to complete if you are going through a couple of lessons each day. By the end of the
                course, you should feel confident participating in Arbitrum challenges and hackathons - and even bring
                your awesome ideas to working prototypes!
              </p>
            </div>
          </div>
        )}
        {activeSection === "primer" && (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-md mb-4">
              <h1 className="text-2xl font-bold">1.2 Primer on Arbitrum</h1>
            </div>
            <div className="space-y-4">
              <p>
                This section will provide a primer on Arbitrum, covering the basics of what Arbitrum is, how it works,
                and why it is an important development in the world of blockchain technology.
              </p>
              <p>
                Arbitrum is a Layer 2 scaling solution for Ethereum, which means it is built on top of the Ethereum
                blockchain to provide faster and cheaper transactions. Arbitrum uses a technology called "optimistic
                rollups" to achieve this.
              </p>
              <p>
                Optimistic rollups work by batching multiple Ethereum transactions together and submitting them to the
                Ethereum mainnet as a single transaction. This reduces the load on the Ethereum network and allows for
                much faster and cheaper transactions.
              </p>
              <p>
                Arbitrum also has its own virtual machine, called the Arbitrum Virtual Machine (AVM), which is
                compatible with Ethereum's Ethereum Virtual Machine (EVM). This means that developers can write smart
                contracts for Arbitrum using the same tools and languages they use for Ethereum.
              </p>
              <p>
                One of the key benefits of Arbitrum is that it inherits the security guarantees of the Ethereum
                blockchain. This means that transactions on Arbitrum are just as secure as transactions on Ethereum, but
                with much faster and cheaper processing.
              </p>
            </div>
          </div>
        )}
        {activeSection === "quiz" && (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-md mb-4">
              <h1 className="text-2xl font-bold">Chapter 1 Quiz</h1>
            </div>
            <div className="space-y-4">
              <p>
                This is the Chapter 1 quiz. You will be asked a series of questions to test your understanding of the
                material covered in the first chapter of the Arbitrum 101 course.
              </p>
              <p>Good luck!</p>
            </div>
          </div>
        )}
        {activeSection === "feedback" && (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-md mb-4">
              <h1 className="text-2xl font-bold">Chapter 1 Feedback</h1>
            </div>
            <div className="space-y-4">
              <p>
                This is the Chapter 1 feedback form. Please take a few minutes to provide your thoughts and feedback on
                the first chapter of the Arbitrum 101 course.
              </p>
              <p>Your feedback is valuable and will help us improve the course for future students.</p>
            </div>
          </div>
        )}
        {activeSection === "glossary" && (
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-md mb-4">
              <h1 className="text-2xl font-bold">Arbitrum 101 Glossary</h1>
            </div>
            <div className="space-y-4">
              <p>
                This is the Arbitrum 101 glossary. Here you will find definitions and explanations of the key terms and
                concepts covered in the course.
              </p>
              <p>Feel free to refer back to this glossary as you progress through the course.</p>
            </div>
          </div>
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
