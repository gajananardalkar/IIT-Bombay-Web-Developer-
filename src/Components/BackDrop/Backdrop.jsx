import React from 'react'

export default function Backdrop() {
  return (
    <div
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
        }}
    />
  )
}
