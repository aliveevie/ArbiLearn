"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { UserCircle, BookOpen, MessageCircle, Share2, Copy, Check, ExternalLink, X, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { submitProfile, generateReferralLink } from "@/server-comps/points"
import styles from "@/styles/EarnPoints.module.css"

interface UserProfile {
  name: string
  email: string
  xHandle: string
  discord: string
  telegram: string
  bio: string
}

interface EarnOption {
  icon: React.ReactNode
  title: string
  points: number
  description: string
  action: () => void
}

export default function EarnPoints() {
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showReferralModal, setShowReferralModal] = useState(false)
  const [showCommunityModal, setShowCommunityModal] = useState(false)
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [referralLink, setReferralLink] = useState("")
  const [earnedPoints, setEarnedPoints] = useState(0)

  useEffect(() => {
    // Fetch user profile and referral link on component mount
    // This is a placeholder and should be replaced with actual API calls
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile)
      setProfile(parsedProfile)
      setIsProfileComplete(true)
      setEarnedPoints(100)
    }
    generateReferralLink().then(setReferralLink)
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
      setShowProfileForm(false)
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

  const socialLinks = {
    discord: "https://discord.gg/4ZZKRYVE",
    x: "https://x.com/ArbiLearn",
    telegram: "https://t.me/+Ygy97nUwmpRjNTk0",
  }

  const earnOptions: EarnOption[] = [
    {
      icon: <UserCircle className="h-6 w-6" />,
      title: isProfileComplete ? "View Profile" : "Complete Your Profile",
      points: 100,
      description: isProfileComplete
        ? `Your profile is complete. You've earned ${earnedPoints} points!`
        : "Fill out all sections of your profile to earn points and help us personalize your experience.",
      action: () => setShowProfileForm(true),
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Enroll in Programs",
      points: 1000,
      description: "Sign up for educational programs to earn points and expand your knowledge.",
      action: () => setShowEnrollModal(true),
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Join Our Community",
      points: 50,
      description: "Connect with fellow learners and earn points by joining our vibrant communities.",
      action: () => setShowCommunityModal(true),
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Refer Friends",
      points: 500,
      description: "Share ArbiLearn with friends and earn rewards when they join.",
      action: () => setShowReferralModal(true),
    },
  ]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Earn Points</h1>
        <p className={styles.subtitle}>Complete actions to earn points and unlock valuable tokens and NFTs</p>
      </header>

      <Dialog open={showProfileForm} onOpenChange={setShowProfileForm}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>{isProfileComplete ? "View/Edit Profile" : "Complete Your Profile"}</DialogTitle>
            <DialogDescription>
              {isProfileComplete
                ? "Review or update your profile information."
                : "Fill out your profile to earn 100 points!"}
            </DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>

      <Dialog open={showReferralModal} onOpenChange={setShowReferralModal}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Share ArbiLearn</DialogTitle>
            <DialogDescription>
              Share your unique referral link and earn 500 points for each friend who joins!
            </DialogDescription>
          </DialogHeader>
          <div className={styles.referralContent}>
            <div className={styles.referralLinkContainer}>
              <Input value={referralLink} readOnly className={styles.referralInput} />
              <Button onClick={handleCopyReferral} size="icon" className={styles.copyButton}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className={styles.shareButtons}>
              <Button
                onClick={() => window.open(`https://x.com/intent/tweet?text=Join me on ArbiLearn!&url=${referralLink}`)}
              >
                Share on X
              </Button>
              <Button
                onClick={() => window.open(`https://t.me/share/url?url=${referralLink}&text=Join me on ArbiLearn!`)}
              >
                Share on Telegram
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCommunityModal} onOpenChange={setShowCommunityModal}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Join Our Communities</DialogTitle>
            <DialogDescription>
              Connect with fellow learners and earn 50 points for each platform you join!
            </DialogDescription>
          </DialogHeader>
          <div className={styles.communityLinks}>
            {Object.entries(socialLinks).map(([platform, link]) => (
              <Button key={platform} asChild variant="outline" className={styles.communityLink}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <span>Join {platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
        <DialogContent className={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Enroll in Programs</DialogTitle>
            <DialogDescription>Visit the courses section to enroll in programs and earn points.</DialogDescription>
          </DialogHeader>
          <div className={styles.enrollContent}>
            <p>To enroll in programs and earn points, please visit our courses section.</p>
            <Button onClick={() => setShowEnrollModal(false)} className={styles.returnButton}>
              Return to Earn Points
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className={styles.earnOptionsGrid}>
        {earnOptions.map((option, index) => (
          <Card key={index} className={styles.earnOptionCard} onClick={option.action}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                {option.icon}
                <span>{option.title}</span>
                {isProfileComplete && option.title.includes("Profile") && (
                  <Button size="sm" className={styles.editButton}>
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
    </div>
  )
}

