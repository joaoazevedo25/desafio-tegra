import React from 'react'

export default function Aeroporto(props) {
  const {
    aeroporto,
    selectedAeroporto,
    onChangeAeroporto
  } = props
  return (
    <select value={selectedAeroporto} onChange={onChangeAeroporto}>
      {aeroporto.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>

  )
  
}