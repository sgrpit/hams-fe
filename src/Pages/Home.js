import { Container, Paper } from '@material-ui/core'
import React from 'react'
import Login from './Login'

export default function Home() {
  return (
    <Paper>
      <Container>
        <Login />
      </Container>
    </Paper>
  )
}
