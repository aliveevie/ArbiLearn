"use client"

import { useState, useEffect } from "react"
import { UserCircle, BookOpen, MessageCircle, Share2, Edit, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import styles from "@/styles/EarnPoints.module.css"
import { generateReferralLink } from "@/server-comps/userActions"
import { submitProfile } from "@/server-comps/userActions"

interface UserProfile {
  name: string
  email: string
  xHandle: string
  discord: string
  telegram: string
  bio: string
}

export default function EarnPoints() {
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [referralLink, setReferralLink] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile)
      setProfile(parsedProfile)
      setIsProfileComplete(true)
      setEarnedPoints(100)
    }
    // Use the imported generateReferralLink function
    generateReferralLink().then(link => setReferralLink(link))
    console.log("Referral link generated:", referralLink)
  }, [])

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const profileData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      xHandle: formData.get("xHandle") as string,
      discord: formData.get("discord") as string,
      telegram: formData.get("telegram") as string,
      bio: formData.get("bio") as string,
    }

    try {
      await submitProfile(profileData)
      setProfile(profileData)
      setIsProfileComplete(true)
      setActiveSection(null)
      setEarnedPoints(100)
      localStorage.setItem("userProfile", JSON.stringify(profileData))
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated. You've earned 100 points!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCopyReferral = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    })
  }

  const earnOptions = [
    {
      icon: <UserCircle className="h-6 w-6" />,
      title: isProfileComplete ? "View Profile" : "Complete Your Profile",
      points: 100,
      description: isProfileComplete
        ? `Your profile is complete. You've earned ${earnedPoints} points!`
        : "Fill out all sections of your profile to earn points and help us personalize your experience.",
      action: () => setActiveSection("profile"),
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Enroll in Programs",
      points: 1000,
      description: "Sign up for educational programs to earn points and expand your knowledge.",
      action: () => setActiveSection("enroll"),
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Join Our Community",
      points: 50,
      description: "Connect with fellow learners and earn points by joining our vibrant communities.",
      action: () => setActiveSection("community"),
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Refer Friends",
      points: 500,
      description: "Share ArbiLearn with friends and earn rewards when they join.",
      action: () => setActiveSection("refer"),
    },
  ]

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <header className={styles.header}>
          <h1 className={styles.title}>Earn Points</h1>
          <p className={styles.subtitle}>Complete actions to earn points and unlock valuable tokens and NFTs</p>
          {isProfileComplete && <p className={styles.welcomeMessage}>Welcome, {profile?.name}!</p>}
        </header>

        {activeSection === "profile" && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>{isProfileComplete ? "Edit Profile" : "Complete Your Profile"}</h2>
            <form onSubmit={handleProfileSubmit} className={styles.form}>
              <div className={styles.formField}>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={profile?.name || ""} required />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={profile?.email || ""} required />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="xHandle">X Handle</Label>
                <Input id="xHandle" name="xHandle" defaultValue={profile?.xHandle || ""} required />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="discord">Discord Username</Label>
                <Input id="discord" name="discord" defaultValue={profile?.discord || ""} required />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="telegram">Telegram Username</Label>
                <Input id="telegram" name="telegram" defaultValue={profile?.telegram || ""} required />
              </div>
              <div className={styles.formField}>
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" name="bio" defaultValue={profile?.bio || ""} required />
              </div>
              <Button type="submit" className={styles.submitButton}>
                {isProfileComplete ? "Update Profile" : "Complete Profile"}
              </Button>
            </form>
          </div>
        )}

        {activeSection === "enroll" && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Enroll in Programs</h2>
            <p>Please check the courses section and enroll to earn points and expand your knowledge.</p>
            <Button onClick={() => setActiveSection(null)} className={styles.backButton}>
              Back to Earn Points
            </Button>
          </div>
        )}

        {activeSection === "community" && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Join Our Community</h2>
            <p>Connect with fellow learners in our vibrant communities!</p>
            <div className={styles.socialLinks}>
              <Button 
                onClick={() => window.open("https://t.me/+Ygy97nUwmpRjNTk0")}
                className={styles.socialButton}
              >
                Join Telegram
              </Button>
              <Button 
                onClick={() => window.open("https://discord.gg/4ZZKRYVE")}
                className={styles.socialButton}
              >
                Join Discord
              </Button>
              <Button 
                onClick={() => window.open("https://x.com/ArbiLearn")}
                className={styles.socialButton}
              >
                Follow on X
              </Button>
            </div>
            <Button onClick={() => setActiveSection(null)} className={styles.backButton}>
              Back to Earn Points
            </Button>
          </div>
        )}

        {activeSection === "refer" && (
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Refer Friends</h2>
            <p>Share your unique referral link and earn 500 points for each friend who joins!</p>
            <div className={styles.referralBox}>
              <Input value={referralLink} readOnly />
              <Button onClick={handleCopyReferral} size="icon">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className={styles.shareButtons}>
              <Button
                onClick={() =>
                  window.open(`https://twitter.com/intent/tweet?text=Join me on ArbiLearn!&url=${referralLink}`)
                }
              >
                Share on Twitter
              </Button>
              <Button
                onClick={() => window.open(`https://t.me/share/url?url=${referralLink}&text=Join me on ArbiLearn!`)}
              >
                Share on Telegram
              </Button>
              <Button onClick={() => window.open(`https://wa.me/?text=Join me on ArbiLearn! ${referralLink}`)}>
                Share on WhatsApp
              </Button>
            </div>
            <Button onClick={() => setActiveSection(null)} className={styles.backButton}>
              Back to Earn Points
            </Button>
          </div>
        )}

        {activeSection === null && (
          <div className={styles.earnOptionsGrid}>
            {earnOptions.map((option, index) => (
              <Card key={index} className={styles.earnOptionCard} onClick={option.action}>
                <CardHeader>
                  <CardTitle className={styles.cardTitle}>
                    {option.icon}
                    <span>{option.title}</span>
                    {isProfileComplete && option.title.includes("Profile") && (
                      <Button
                        size="sm"
                        className={styles.editButton}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveSection("profile")
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={styles.pointsText}>{option.points} Points</p>
                  <CardDescription>{option.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
