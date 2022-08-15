import {
  Button,
  ButtonGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import Peer from 'peerjs'
import React, { useState } from 'react'

import ClipboardButton from '../components/ClipboardButton'
import usePeer from './customHooks'

function PeerComponent() {
  const [isConnectedToServer, setIsConnected] = useState<boolean>(false)
  const [connectionIsStarting, setConnectionIsStarting] =
    useState<boolean>(false)
  const [remotePeerId, setRemotePeerId] = useState<string>('')
  const [data, setData] = useState()
  const [dataToSend, setSendData] = useState<string>()
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
    dataConnection?.close()
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemotePeerId(event.target.value)
  }

  dataConnection?.on('data', (recievedData: any) => {
    setData(recievedData)
  })

  const sendData = () => {
    dataConnection?.send(dataToSend)
  }
  const handleMessageOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSendData(event.target.value)
  }

  return (
    <Paper elevation={3}>
      <ButtonGroup variant="contained">
        <Button
          variant="contained"
          onClick={handleStartConnection}
          disabled={isConnectedToServer || connectionIsStarting}
        >
          Go online
        </Button>
        <Button
          variant="contained"
          onClick={handleEndConnection}
          disabled={peerId === ''}
        >
          Go offline
        </Button>
      </ButtonGroup>
      <Typography variant="body1">
        Peer Id:
        {peerId === '' ? null : <ClipboardButton copyText={peerId} />}
      </Typography>
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
          disabled={!!dataConnection || !remotePeerId}
        >
          Connect
        </Button>
        <Button
          variant="contained"
          onClick={handleDisconnectToPeer}
          disabled={!dataConnection}
        >
          Disconnect
        </Button>
      </ButtonGroup>
      <Typography variant="body1">
        {dataConnection !== undefined
          ? `Connected to: ${dataConnection.peer}`
          : ''}
      </Typography>
      <TextField
        id="message"
        variant="standard"
        onChange={handleMessageOnChange}
      />
      <Button variant="contained" onClick={sendData} />
      <Typography variant="body1">{data}</Typography>
    </Paper>
  )
}

export default PeerComponent
