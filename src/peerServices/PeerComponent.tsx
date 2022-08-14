import { Button, Paper, TextField } from '@mui/material'
import Peer from 'peerjs'
import React, { useState } from 'react'

import ClipboardButton from '../components/ClipboardButton'
import usePeer from './customHooks'

function PeerComponent() {
  const [peerId, setPeerId] = useState<string>('')
  const [connectionIsStarting, setConnectionIsStarting] =
    useState<boolean>(false)
  const {
    state: { peer },
    actions: { setPeer },
  } = usePeer()

  const handleStartConnection = () => {
    setConnectionIsStarting(true)
    const newPeer = new Peer()
    setPeer(newPeer)
    newPeer.on('open', (id) => {
      setPeerId(id)
      setConnectionIsStarting(false)
    })
  }

  const handleEndConnection = () => {
    peer?.destroy()
    setPeer(undefined)
    setPeerId('')
  }

  return (
    <Paper elevation={3}>
      <Button
        variant="contained"
        onClick={() => {
          handleStartConnection()
        }}
        disabled={peerId !== '' || connectionIsStarting}
      >
        Start connection
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          handleEndConnection()
        }}
        disabled={peerId === ''}
      >
        End connection
      </Button>
      <div>
        Peer Id:
        {peerId === '' ? null : <ClipboardButton copyText={peerId} />}
      </div>
      <TextField id="standard-basic" label="Peer" variant="standard" />
    </Paper>
  )
}

export default PeerComponent
