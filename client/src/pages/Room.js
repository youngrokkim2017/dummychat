import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const Room = () => {
  const params = useParams()
  const { socket } = useOutletContext()

  useEffect(() => {
    // console.log(params)
    if (!socket) return
    socket.emit('join-room', { roomId : params.roomId })
  }, [socket])

  return (
    <div>Room</div>
  )
}

export default Room