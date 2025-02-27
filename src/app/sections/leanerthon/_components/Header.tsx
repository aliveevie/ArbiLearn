import { User, Star } from "lucide-react"

interface HeaderProps {
  username: string
  points: number
}

const Header = ({ username, points }: HeaderProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center bg-blue-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4 sm:mb-0">
        <User className="mr-2 h-6 w-6" />
        <h1 className="text-xl font-bold">{username}</h1>
      </div>
      <div className="flex items-center">
        <Star className="mr-2 h-6 w-6 text-yellow-400" />
        <span className="text-xl font-bold">{points} Points</span>
      </div>
    </div>
  )
}

export default Header