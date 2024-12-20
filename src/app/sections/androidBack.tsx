'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, Code2, DollarSign, Layers, ChevronRight, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from '@/styles/BlochainGame.module.css'

export default function AndroidBackgrond() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <div className={styles.container}>
      <div className={styles.phoneFrame}>
        <div className={styles.statusBar}>
          <div className={styles.statusBarLeft}></div>
          <div className={styles.statusBarRight}>
            <div className={cn(styles.statusDot, styles.redDot)}></div>
            <div className={cn(styles.statusDot, styles.yellowDot)}></div>
            <div className={cn(styles.statusDot, styles.greenDot)}></div>
          </div>
        </div>
        <div className={styles.homeButton}>
          <div className={styles.homeIndicator}></div>
        </div>
      </div>
    </div>
  )
}