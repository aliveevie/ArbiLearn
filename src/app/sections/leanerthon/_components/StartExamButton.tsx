import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StartExamButtonProps {
  onStart: () => void
  attempts: number
  maxAttempts: number
}

const StartExamButton = ({ onStart, attempts, maxAttempts }: StartExamButtonProps) => {
  return (
    <div className="text-center">
      <Button
        onClick={onStart}
        disabled={attempts >= maxAttempts}
        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Play className="mr-2 h-5 w-5" />
        Start Exam
      </Button>
      <p className="mt-2 text-sm">Attempts left: {maxAttempts - attempts}</p>
    </div>
  )
}

export default StartExamButton