import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { Connector } from "wagmi";
import learner1 from '../../public/learner1.jpg';
import learner2 from '../../public/learner2.jpg';
import learner3 from '../../public/learner3.jpg';
import Image from "next/image";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { HeaderComponent } from "./header";


export function Hero() {

  const { open, close } = useWeb3Modal()

  function handleModalShow(){
      open()
  }
  
  return (
    <><HeaderComponent /><div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Learn Arbitrum and Web3 with ArbiLearn
                  </h1>
                  <p className="max-w-xl text-muted-foreground md:text-xl">
                    Dive into the world of Arbitrum and Web3 with interactive tutorials, quizzes, and a comprehensive
                    glossary. Start your journey to becoming a Web3 expert today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                    onClick={handleModalShow}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
              <Image
                src={learner1}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square" />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <Image
                src={learner2}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square" />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Unlock Your Web3 Potential
                  </h1>
                  <p className="max-w-xl text-muted-foreground md:text-xl">
                    ArbiLearn offers a comprehensive platform to help you understand Arbitrum and Web3 concepts. Explore
                    our interactive tutorials, quizzes, and glossary to become a Web3 expert.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Explore Features
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Web3 Potential</h2>
                <p className="max-w-3xl text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                  ArbiLearn offers a comprehensive platform to help you understand Arbitrum and Web3 concepts. Explore
                  our interactive tutorials, quizzes, and glossary to become a Web3 expert.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Interactive Tutorials</h3>
                      <p className="text-muted-foreground">
                        Learn Arbitrum and Web3 concepts through engaging, hands-on tutorials.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Quizzes and Assessments</h3>
                      <p className="text-muted-foreground">
                        Test your knowledge with our interactive quizzes and assessments.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Comprehensive Glossary</h3>
                      <p className="text-muted-foreground">Explore a detailed glossary of Web3 terms and concepts.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src={learner3}
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square" />
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Learners Say</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                Hear from our satisfied learners about their experience with ArbiLearn.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-muted p-4 text-left">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary-foreground p-2 text-primary">🧑‍💻</div>
                    <div>
                      <h4 className="text-lg font-bold">John Doe</h4>
                      <p className="text-sm text-muted-foreground">Web3 Developer</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "ArbiLearn has been an invaluable resource for me to deepen my understanding of Arbitrum and Web3.
                    The interactive tutorials and quizzes are fantastic."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted p-4 text-left">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary-foreground p-2 text-primary">🧑‍🎓</div>
                    <div>
                      <h4 className="text-lg font-bold">Jane Smith</h4>
                      <p className="text-sm text-muted-foreground">Web3 Enthusiast</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "As a newcomer to Web3, ArbiLearn has been an amazing resource for me to learn the fundamentals and
                    get hands-on experience. Highly recommended!"
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted p-4 text-left">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary-foreground p-2 text-primary">🧑‍🏫</div>
                    <div>
                      <h4 className="text-lg font-bold">Alex Johnson</h4>
                      <p className="text-sm text-muted-foreground">Blockchain Educator</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "I've been using ArbiLearn to teach my students about Arbitrum and Web3. The platform's resources are
                    top-notch and easy to follow."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="newsletter" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Updated</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                Subscribe to our newsletter to get the latest updates and news from ArbiLearn.
              </p>
            </div>
            <form className="flex w-full flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <Input type="email" placeholder="Enter your email" className="w-full flex-1" />
              <Button type="submit" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div></>
  );
}

function Check(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}