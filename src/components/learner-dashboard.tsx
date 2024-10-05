'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BookOpen, Award, DollarSign, Github, Linkedin, Twitter, MessageSquare, Bell, Search, User, Settings, LogOut } from 'lucide-react'

export function LearnerDashboardComponent() {
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState('/placeholder.svg?height=32&width=32')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [coursesInProgress, setCoursesInProgress] = useState(0)
  const [completedCourses, setCompletedCourses] = useState(0)
  const [profileCompleteness, setProfileCompleteness] = useState(0)

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating profile update
    setIsProfileComplete(true)
    setProfileCompleteness(100)
    // You would typically send this data to your backend here
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
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
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{coursesInProgress}</div>
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
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>
              <TabsContent value="courses">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-600">You haven't started any courses yet. Browse our catalog to begin your learning journey!</p>
                    <Button className="w-full mt-4">Browse Courses</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-gray-600">Complete courses to earn achievements and showcase your skills!</p>
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
    </div>
  )
}