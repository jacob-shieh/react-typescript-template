import { Button, ButtonGroup, Paper, TextField } from '@mui/material'
import Peer, { DataConnection } from 'peerjs'
import React, { useState } from 'react'

import ClipboardButton from '../components/ClipboardButton'
import usePeer from './customHooks'

function PeerComponent() {
  const [isConnectedToServer, setIsConnected] = useState<boolean>(false)
  const [connectionIsStarting, setConnectionIsStarting] =
    useState<boolean>(false)
  const [remotePeerId, setRemotePeerId] = useState<string>('')
  const {
    state: { peer, peerId, dataConnection },
    actions: { setPeer, setPeerId, setDataConnection },
  } = usePeer()

  const handleStartConnection = () => {
    setConnectionIsStarting(true)
    const newPeer = new Peer({ debug: 3 })
    setPeer(newPeer)
    newPeer.on('open', (id) => {
      setPeerId(id)
      setConnectionIsStarting(false)
      setIsConnected(true)
    })
  }

  const handleEndConnection = () => {
    peer?.destroy()
    setPeer(undefined)
    setPeerId('')
    setIsConnected(false)
  }

  const handleConnectToRemotePeer = () => {
    const connection = peer?.connect(remotePeerId)
    connection?.on('open', () => {
      setDataConnection(connection)
    })
  }

  const handleDisconnectToPeer = () => {
    dataConnection?.close
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemotePeerId(event.target.value)
  }

  return (
    <Paper elevation={3}>
      <ButtonGroup variant="contained">
        <Button
          variant="contained"
          onClick={handleStartConnection}
          disabled={isConnectedToServer || connectionIsStarting}
        >
          Start connection
        </Button>
        <Button
          variant="contained"
          onClick={handleEndConnection}
          disabled={peerId === ''}
        >
          End connection
        </Button>
      </ButtonGroup>
      <div>
        Peer Id:
        {peerId === '' ? null : <ClipboardButton copyText={peerId} />}
      </div>
      <TextField
        id="peer-id-field"
        label="Remote Peer Id"
        variant="standard"
        onChange={handleOnChange}
      />

      <ButtonGroup variant="contained">
        <Button
          variant="contained"
          onClick={handleConnectToRemotePeer}
          disabled={!isConnectedToServer}
        >
          Connect
        </Button>
        <Button
          variant="contained"
          onClick={handleDisconnectToPeer}
          disabled={!isConnectedToServer}
        >
          Disconnect
        </Button>
      </ButtonGroup>
    </Paper>
  )
}

export default PeerComponent
