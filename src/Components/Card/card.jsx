import React, { Fragment } from 'react'
import Card from 'react-bootstrap/Card';
import './card.css'
export default function CardDetail({Title,Description}) {
  return (
    <Card className='card' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>
          {Description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
