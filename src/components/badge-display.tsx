import { Award } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export function BadgeDisplay() {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <Award className="w-16 h-16 text-purple-500" />
        <p className="text-gray-600 text-center">
          Collect more badges by completing challenges!
        </p>
      </CardContent>
    </Card>
  )
}

