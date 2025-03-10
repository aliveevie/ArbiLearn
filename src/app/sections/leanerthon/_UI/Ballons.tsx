"use client"

import { motion } from "framer-motion"

const Balloons = () => {
  const balloonColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          //@ts-expect-error
          className={`absolute w-8 h-10 rounded-full ${balloonColors[i % balloonColors.length]}`}
          initial={{ y: "100vh", x: `${Math.random() * 100}vw` }}
          animate={{
            y: "-100vh",
            x: `${Math.random() * 100}vw`,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            ease: "easeOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default Balloons