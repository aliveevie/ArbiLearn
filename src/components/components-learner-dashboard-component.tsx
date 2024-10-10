'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Award, DollarSign, Github, Linkedin, Twitter, MessageSquare, Bell, Search, User, Settings, LogOut, Eye, PlayCircle, CheckCircle2, ChevronLeft } from 'lucide-react'

interface Lesson {
  id: number
  title: string
  content: string
  completed: boolean
}

interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

interface Course {
  id: number
  title: string
  description: string
  image: string
  content: string
  modules: Module[]
}

interface Program {
  id: number
  title: string
  description: string
  image: string
  content: string
  modules: Module[]
}

interface EnrolledCourse extends Course {
  progress: number
  started: boolean
}

interface EnrolledProgram extends Program {
  progress: number
  started: boolean
}

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Blockchain",
    description: "Learn the basics of blockchain technology and its applications.",
    image: "/placeholder.svg?height=100&width=200",
    content: "This course covers the fundamental concepts of blockchain technology, including decentralized networks, consensus mechanisms, and cryptographic principles. You'll learn about the history of blockchain, its potential applications beyond cryptocurrencies, and the impact it's having on various industries.",
    modules: [
      {
        id: 1,
        title: "Blockchain Fundamentals",
        lessons: [
          { id: 1, title: "What is Blockchain?", content: "Blockchain is a decentralized, distributed ledger technology that records transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks and the consensus of the network.", completed: false },
          { id: 2, title: "Decentralized Networks", content: "Decentralized networks distribute information and control across multiple nodes, reducing single points of failure and creating a more resilient system.", completed: false },
          { id: 3, title: "Consensus Mechanisms", content: "Consensus mechanisms are protocols that ensure all nodes in a blockchain network agree on the validity of transactions, maintaining the integrity and security of the blockchain.", completed: false },
        ]
      },
      {
        id: 2,
        title: "Cryptography in Blockchain",
        lessons: [
          { id: 1, title: "Basic Cryptographic Principles", content: "Cryptography is the practice and study of techniques for secure communication in the presence of third parties. In blockchain, it's used to ensure the security and integrity of transactions.", completed: false },
          { id: 2, title: "Public Key Cryptography", content: "Public key cryptography, or asymmetric cryptography, uses pairs of keys: public keys (which may be disseminated widely) and private keys (which are known only to the owner). This system is fundamental to blockchain technology.", completed: false },
          { id: 3, title: "Hash Functions", content: "Hash functions are mathematical algorithms that transform data of arbitrary size into a fixed-size output. They play a crucial role in blockchain for creating digital signatures and maintaining the integrity of the blockchain.", completed: false },
        ]
      },
    ]
  },
  {
    id: 2,
    title: "Smart Contract Development",
    description: "Learn to create and deploy smart contracts on blockchain platforms.",
    image: "/placeholder.svg?height=100&width=200",
    content: "This course will teach you how to develop, test, and deploy smart contracts on various blockchain platforms. You'll learn Solidity programming and best practices for creating secure and efficient smart contracts.",
    modules: [
      {
        id: 1,
        title: "Introduction to Smart Contracts",
        lessons: [
          { id: 1, title: "What are Smart Contracts?", content: "Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automatically enforce and execute the terms of an agreement when predetermined conditions are met.", completed: false },
          { id: 2, title: "Solidity Basics", content: "Solidity is an object-oriented programming language for writing smart contracts. It is used for implementing smart contracts on various blockchain platforms, particularly Ethereum.", completed: false },
        ]
      },
    ]
  },
]

const programs: Program[] = [
  {
    id: 1,
    title: "Blockchain Developer Bootcamp",
    description: "Comprehensive program to become a blockchain developer",
    image: "/placeholder.svg?height=100&width=200",
    content: "This bootcamp covers everything from blockchain basics to advanced smart contract development. You'll learn about various blockchain platforms, decentralized application (DApp) development, and best practices in the industry.",
    modules: [
      {
        id: 1,
        title: "Blockchain Fundamentals",
        lessons: [
          { id: 1, title: "Introduction to Blockchain", content: "Learn the basics of blockchain technology, its history, and its potential applications.", completed: false },
          { id: 2, title: "Cryptography Basics", content: "Understand the cryptographic principles that underpin blockchain technology.", completed: false },
        ]
      },
      {
        id: 2,
        title: "Smart Contract Development",
        lessons: [
          { id: 1, title: "Solidity Programming", content: "Learn Solidity, the primary language for writing smart contracts on Ethereum.", completed: false },
          { id: 2, title: "Smart Contract Security", content: "Understand common vulnerabilities and best practices for securing smart contracts.", completed: false },
        ]
      },
    ]
  },
  {
    id: 2,
    title: "DeFi Specialist Certification",
    description: "Become an expert in Decentralized Finance (DeFi)",
    image: "/placeholder.svg?height=100&width=200",
    content: "This program will give you a deep understanding of Decentralized Finance (DeFi) protocols, mechanisms, and applications. You'll learn about lending platforms, decentralized exchanges, yield farming, and more.",
    modules: [
      {
        id: 1,
        title: "DeFi Fundamentals",
        lessons: [
          { id: 1, title: "What is DeFi?", content: "Understand the basics of Decentralized Finance and how it differs from traditional finance.", completed: false },
          { id: 2, title: "DeFi Protocols Overview", content: "Get an overview of major DeFi protocols and their functions.", completed: false },
        ]
      },
    ]
  },
]

export function LearnerDashboardComponent() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState('/placeholder.svg?height=32&width=32')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [completedCourses, setCompletedCourses] = useState(0)
  const [profileCompleteness, setProfileCompleteness] = useState(0)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showViewProfile, setShowViewProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCourses, setShowCourses] = useState(false)
  const [showPrograms, setShowPrograms] = useState(false)
  const [showCourseDetails, setShowCourseDetails] = useState(false)
  const [showProgramDetails, setShowProgramDetails] = useState(false)
  const [showLearningSandbox, setShowLearningSandbox] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<EnrolledProgram | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [enrolledPrograms, setEnrolledPrograms] = useState<EnrolledProgram[]>([])
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProfileComplete(true)
    setProfileCompleteness(100)
    setShowEditProfile(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    router.push('/')
  }

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course as EnrolledCourse)
    setShowCourseDetails(true)
  }

  const handleViewProgram = (program: Program) => {
    setSelectedProgram(program as EnrolledProgram)
    setShowProgramDetails(true)
  }

  const handleEnroll = (course: Course) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, { ...course, progress: 0, started: false }])
    }
    setShowCourses(false)
  }

  const handleEnrollProgram = (program: Program) => {
    if (!enrolledPrograms.find(p => p.id === program.id)) {
      setEnrolledPrograms([...enrolledPrograms, { ...program, progress: 0, started: false }])
    }
    setShowPrograms(false)
  }

  const handleStartCourse = (courseId: number) => {
    const course = enrolledCourses.find(c => c.id === courseId)
    if (course) {
      setSelectedCourse(course)
      setSelectedModule(course.modules[0])
      setSelectedLesson(course.modules[0].lessons[0])
      setShowLearningSandbox(true)
    }
  }

  const handleStartProgram = (programId: number) => {
    const program = enrolledPrograms.find(p => p.id === programId)
    if (program) {
      setSelectedProgram(program)
      setSelectedModule(program.modules[0])
      setSelectedLesson(program.modules[0].lessons[0])
      setShowLearningSandbox(true)
    }
  }

  const handleContinueCourse = (courseId: number) => {
    const course = enrolledCourses.find(c => c.id === courseId)
    if (course) {
      setSelectedCourse(course)
      setSelectedModule(course.modules[0])
      setSelectedLesson(course.modules[0].lessons[0])
      setShowLearningSandbox(true)
    }
  }

  const handleContinueProgram = (programId: number) => {
    const program = enrolledPrograms.find(p => p.id === programId)
    if (program) {
      setSelectedProgram(program)
      setSelectedModule(program.modules[0])
      setSelectedLesson(program.modules[0].lessons[0])
      setShowLearningSandbox(true)
    }
  }

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module)
    setSelectedLesson(module.lessons[0])
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson)
  }

  const handleCompleteLessonAndUpdateProgress = () => {
    if (selectedCourse && selectedModule && selectedLesson) {
      setEnrolledCourses(prevCourses => 
        prevCourses.map(course => {
          if (course.id === selectedCourse.id) {
            const updatedModules = course.modules.map(module => {
              if (module.id === selectedModule.id) {
                const updatedLessons = module.lessons.map(lesson => 
                  lesson.id === selectedLesson.id ? { ...lesson, completed: true } : lesson
                )
                return { ...module, lessons: updatedLessons }
              }
              return module
            })
            const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0)
            const completedLessons = updatedModules.reduce((sum, module) => 
              sum + module.lessons.filter(lesson => lesson.completed).length, 0
            )
            const newProgress = Math.round((completedLessons / totalLessons) * 100)
            return { ...course, modules: updatedModules, progress: newProgress, started: true }
          }
          return course
        })
      )
      setSelectedLesson({ ...selectedLesson, completed: true })
    } else if (selectedProgram && selectedModule && selectedLesson) {
      setEnrolledPrograms(prevPrograms => 
        prevPrograms.map(program => {
          if (program.id === selectedProgram.id) {
            const updatedModules = program.modules.map(module => {
              if (module.id === selectedModule.id) {
                const updatedLessons = module.lessons.map(lesson => 
                  lesson.id === selectedLesson.id ? { ...lesson, completed: true } : lesson
                )
                return { ...module, lessons: updatedLessons }
              }
              return module
            })
            const totalLessons = program.modules.reduce((sum, module) => sum + module.lessons.length, 0)
            const completedLessons = updatedModules.reduce((sum, module) => 
              sum + module.lessons.filter(lesson => lesson.completed).length, 0
            )
            const newProgress = Math.round((completedLessons / totalLessons) * 100)
            return { ...program, modules: updatedModules, progress: newProgress, started: true }
          }
          return program
        })
      )
      setSelectedLesson({ ...selectedLesson, completed: true })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white  shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">ArbiLearn</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search courses"
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={profileImage} alt={name} />
                  <AvatarFallback>{name ? name.charAt(0).toUpperCase() : <User />}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setShowViewProfile(true)}>
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setShowEditProfile(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setShowSettings(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isProfileComplete ? (
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <Input id="profile-image" type="file" onChange={handleImageUpload} accept="image/*" />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                </div>
                <div>
                  <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub</label>
                  <Input id="github" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="Your GitHub username" />
                </div>
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
                  <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="Your LinkedIn profile URL" />
                </div>
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
                  <Input id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Your Twitter handle" />
                </div>
                <Button type="submit" className="w-full">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Programs in Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrolledPrograms.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedCourses}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completed</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profileCompleteness}%</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="courses" className="space-y-4">
              <TabsList>
                <TabsTrigger value="courses">My Courses</TabsTrigger>
                <TabsTrigger value="programs">My Programs</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>
              <TabsContent value="courses">
                <Card>
                  <CardContent className="p-6">
                    {enrolledCourses.length > 0 ? (
                      <div className="space-y-4">
                        {enrolledCourses.map((course) => (
                          <Card key={course.id}>
                            <CardHeader>
                              <CardTitle>{course.title}</CardTitle>
                              <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Progress value={course.progress} className="w-full" />
                              <p className="mt-2 text-sm text-gray-600">{course.progress}% complete</p>
                            </CardContent>
                            <CardFooter>
                              {course.started ? (
                                <Button onClick={() => handleContinueCourse(course.id)}>Continue</Button>
                              ) : (
                                <Button onClick={() => handleStartCourse(course.id)}>Start</Button>
                              )}
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-600">You haven't enrolled in any courses yet. Browse our catalog to begin your learning journey!</p>
                    )}
                    <Button className="w-full mt-4" onClick={() => setShowCourses(true)}>Browse Courses</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="programs">
                <Card>
                  <CardContent className="p-6">
                    {enrolledPrograms.length > 0 ? (
                      <div className="space-y-4">
                        {enrolledPrograms.map((program) => (
                          <Card key={program.id}>
                            <CardHeader>
                              <CardTitle>{program.title}</CardTitle>
                              <CardDescription>{program.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Progress value={program.progress} className="w-full" />
                              <p className="mt-2 text-sm text-gray-600">{program.progress}% complete</p>
                            </CardContent>
                            <CardFooter>
                              {program.started ? (
                                <Button onClick={() => handleContinueProgram(program.id)}>Continue</Button>
                              ) : (
                                <Button onClick={() => handleStartProgram(program.id)}>Start</Button>
                              )}
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-600">You haven't enrolled in any programs yet. Browse our catalog to begin your learning journey!</p>
                    )}
                    <Button className="w-full mt-4" onClick={() => setShowPrograms(true)}>Browse Programs</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-600">Complete courses and programs to earn achievements and showcase your skills!</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="earnings">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Earn More ARB</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Join our Discord</span>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Join
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Follow on Twitter</span>
                        <Button variant="outline" size="sm">
                          <Twitter className="mr-2 h-4 w-4" />
                          Follow
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Join Telegram Group</span>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label htmlFor="edit-profile-image" className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <Input id="edit-profile-image" type="file" onChange={handleImageUpload} accept="image/*" />
            </div>
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div>
              <label htmlFor="edit-github" className="block text-sm font-medium text-gray-700">GitHub</label>
              <Input id="edit-github" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="Your GitHub username" />
            </div>
            <div>
              <label htmlFor="edit-linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <Input id="edit-linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="Your LinkedIn profile URL" />
            </div>
            <div>
              <label htmlFor="edit-twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
              <Input id="edit-twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Your Twitter handle" />
            </div>
            <Button type="submit" className="w-full">Update Profile</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showViewProfile} onOpenChange={setShowViewProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profileImage} alt={name} />
                <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">Learner</p>
              </div>
            </div>
            <div>
              <p className="text-sm"><strong>GitHub:</strong> {github}</p>
              <p className="text-sm"><strong>LinkedIn:</strong> {linkedin}</p>
              <p className="text-sm"><strong>Twitter:</strong> {twitter}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Email Notifications</Label>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <Switch id="darkMode" />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <select id="language" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <Button className="w-full">Save Settings</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCourses} onOpenChange={setShowCourses}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Browse Courses</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded-t-lg" />
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleViewCourse(course)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" onClick={() => handleEnroll(course)}>Enroll</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showPrograms} onOpenChange={setShowPrograms}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Browse Programs</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <img src={program.image} alt={program.title} className="w-full h-32 object-cover rounded-t-lg" />
                    <CardTitle>{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleViewProgram(program)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" onClick={() => handleEnrollProgram(program)}>Enroll</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedCourse?.image} alt={selectedCourse?.title} className="w-full h-48 object-cover rounded-lg" />
            <p>{selectedCourse?.description}</p>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Course Content:</h4>
              <p>{selectedCourse?.content}</p>
            </div>
            <Button className="w-full" onClick={() => {
              if (selectedCourse) handleEnroll(selectedCourse)
              setShowCourseDetails(false)
            }}>
              Enroll in This Course
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProgramDetails} onOpenChange={setShowProgramDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <img src={selectedProgram?.image} alt={selectedProgram?.title} className="w-full h-48 object-cover rounded-lg" />
            <p>{selectedProgram?.description}</p>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Program Content:</h4>
              <p>{selectedProgram?.content}</p>
            </div>
            <Button className="w-full" onClick={() => {
              if (selectedProgram) handleEnrollProgram(selectedProgram)
              setShowProgramDetails(false)
            }}>
              Enroll in This Program
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLearningSandbox} onOpenChange={setShowLearningSandbox}>
        <DialogContent className="max-w-6xl h-[90vh]">
          <DialogHeader className="flex flex-row items-center justify-between">
            <Button variant="ghost" onClick={() => setShowLearningSandbox(false)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <DialogTitle>{selectedCourse?.title || selectedProgram?.title}</DialogTitle>
            <div className="w-[100px]"></div>
          </DialogHeader>
          <div className="flex h-full mt-4">
            <div className="w-1/4 pr-4 border-r">
              <h3 className="text-lg font-semibold mb-4">Modules</h3>
              <ScrollArea className="h-[calc(90vh-180px)]">
                <Accordion type="single" collapsible className="w-full">
                  {(selectedCourse?.modules || selectedProgram?.modules)?.map((module) => (
                    <AccordionItem value={`module-${module.id}`} key={module.id}>
                      <AccordionTrigger onClick={() => handleSelectModule(module)}>{module.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className={`flex items-center justify-between cursor-pointer p-2 rounded ${selectedLesson?.id === lesson.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                              onClick={() => handleSelectLesson(lesson)}
                            >
                              <span>{lesson.title}</span>
                              {lesson.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </div>
            <div className="w-3/4 pl-4">
              <div className="bg-white rounded-lg p-6 h-[calc(90vh-180px)] overflow-y-auto">
                {selectedLesson ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4">{selectedLesson.title}</h2>
                    <div className="prose max-w-none">
                      <p>{selectedLesson.content}</p>
                      <img src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(selectedLesson.title)}`} alt={selectedLesson.title} className="my-4 rounded-lg" />
                      <p>This is where you would add more detailed content for the lesson, including text, images, videos, and interactive elements.</p>
                    </div>
                    <div className="mt-8">
                      {!selectedLesson.completed && (
                        <Button onClick={handleCompleteLessonAndUpdateProgress}>
                          Mark as Completed
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-600">Select a lesson from the modules to start learning.</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}