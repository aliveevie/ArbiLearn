'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, Code2, DollarSign, Layers, ChevronRight, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from '@/styles/BlochainGame.module.css'

export default function BlockchainGame() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const items = [
    {
      icon: User,
      title: 'View Profile',
      href: '#profile'
    },
    {
      icon: Link2,
      title: 'Metis Blockchain Fundamentals',
      href: '#fundamentals'
    },
    {
      icon: Code2,
      title: 'Smart Contract Development',
      href: '#smart-contract'
    },
    {
      icon: DollarSign,
      title: 'Get Metis',
      href: '#get-metis'
    },
    {
      icon: Layers,
      title: 'Layer 2 Scaling Solutions',
      href: '#layer2'
    }
  ]

  return (
    <div>
      <div>
        <div className={styles.statusBar}>
          <div className={styles.statusBarLeft}></div>
          <div className={styles.statusBarRight}>
            <div className={cn(styles.statusDot, styles.redDot)}></div>
            <div className={cn(styles.statusDot, styles.yellowDot)}></div>
            <div className={cn(styles.statusDot, styles.greenDot)}></div>
          </div>
        </div>
        
        <h1 className={styles.title}>Choose Your Path</h1>
        
        <div className={styles.itemsContainer}>
          {items.map((item, index) => (
            <motion.button
              key={index}
              //@ts-expect-error
              className={cn(styles.itemButton, selectedIndex === index && styles.selected)}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconContainer}>
                {item.icon && <item.icon className={styles.icon} />}
              </div>
              <span className={styles.itemText}>{item.title}</span>
              <ChevronRight className={styles.chevronIcon} />
            </motion.button>
          ))}
        </div>

        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            //@ts-expect-error
            className={styles.continueContainer}
          >
            <a
              href={items[selectedIndex].href}
              className={styles.continueButton}
            >
              Continue
            </a>
          </motion.div>
        )}

        <div className={styles.homeButton}>
          <div className={styles.homeIndicator}></div>
        </div>
      </div>
    </div>
  )
}