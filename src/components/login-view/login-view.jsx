import { useState } from 'react'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const loginData = {
      Username: username,
      Password: password,
    }

    try {
      const response = await fetch('https://niccage.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const responseData = await response.json()

      if (responseData.user) {
        localStorage.setItem('user', JSON.stringify(responseData.user))
        localStorage.setItem('token', responseData.token)
        onLoggedIn(responseData.user, responseData.token)
      } else {
        throw new Error('User not found')
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Form.Label>Username:</Form.Label>
              <FormControl
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Password:</Form.Label>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
