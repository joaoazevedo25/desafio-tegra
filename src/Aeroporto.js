import React from 'react'

export default function Aeroporto({ aeroporto }) {

  return (
    <select>
      {aeroporto.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>

  )
  
}