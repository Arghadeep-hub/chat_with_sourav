import React, { useState, useCallback, useEffect } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    )
    setText('')
  }


  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex justify-content-center">
      
      </div>
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
                <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`px-2 py-1 ${message.fromMe ? 'bg-success text-white' : 'border'}`} style={{borderRadius: message.fromMe ? '30px 30px 0 30px': '30px 30px 30px 0'}}>
                  {message.text} 
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="input"
              required
              placeholder="Type a message here..."
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: 'auto', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
