'use client'

import { useState } from 'react'
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import '../../../styles/token-sale.css'

export default function ALEARNTokenSale() {
  const [metisAmount, setMetisAmount] = useState('')
  const [alearnAmount, setAlearnAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleMetisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMetisAmount(value)
    setAlearnAmount(value ? (parseFloat(value) * 1000).toString() : '')
    setError(parseFloat(value) < 0.1 ? 'Minimum purchase is 0.1 METIS' : '')
    setSuccess(false)
  }

  const handleAlearnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAlearnAmount(value)
    const metisValue = value ? (parseFloat(value) / 1000).toString() : ''
    setMetisAmount(metisValue)
    setError(parseFloat(metisValue) < 0.1 ? 'Minimum purchase is 0.1 METIS' : '')
    setSuccess(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (parseFloat(metisAmount) < 0.1) {
      setError('Minimum purchase is 0.1 METIS')
      return
    }
    // Here you would typically integrate with a wallet or payment system
    setSuccess(true)
    setError('')
  }

  return (
    <div className="token-sale-container">
      <div className="token-sale-header">
        <h1 className="token-sale-title">ALEARN Token Sale</h1>
        <p className="token-sale-subtitle">Purchase tokens to support ArbiLearn on their mission</p>
        <div className="exchange-rate">
          <p>Exchange Rate: 100 ALEARN = 0.1 METIS</p>
        </div>
      </div>
      <div className="token-sale-form">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <label htmlFor="metis" className="input-label">
                METIS Amount
              </label>
              <input
                type="number"
                id="metis"
                value={metisAmount}
                onChange={handleMetisChange}
                className={`input-field ${error ? 'error' : ''}`}
                placeholder="Enter METIS amount (min 0.1)"
                step="0.1"
                min="0.1"
                required
              />
            </div>
            <ArrowRight className="arrow-icon" size={24} />
            <div className="input-wrapper">
              <label htmlFor="alearn" className="input-label">
                ALEARN Amount
              </label>
              <input
                type="number"
                id="alearn"
                value={alearnAmount}
                onChange={handleAlearnChange}
                className={`input-field ${error ? 'error' : ''}`}
                placeholder="Enter ALEARN amount (min 100)"
                step="100"
                min="100"
                required
              />
            </div>
          </div>
          {error && (
            <div className="error-message">
              <AlertCircle size={16} className="icon" />
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="success-message">
              <CheckCircle size={16} className="icon" />
              <p>Purchase successful! {alearnAmount} ALEARN tokens acquired for {metisAmount} METIS.</p>
            </div>
          )}
          <button
            type="submit"
            className="submit-button"
            disabled={!!error}
          >
            Purchase Tokens
          </button>
        </form>
        <div className="info-section">
          <h2 className="info-title">Don't have enough METIS?</h2>
          <p className="info-text">
            You can earn ALEARN token NFTs by completing courses and submitting a form for verification. 
            This is an excellent opportunity to support ArbiLearn while gaining valuable knowledge and skills.
          </p>
          <a 
            href="#" 
            className="info-link"
          >
            Learn more about earning ALEARN NFTs →
          </a>
        </div>
      </div>
    </div>
  )
}

