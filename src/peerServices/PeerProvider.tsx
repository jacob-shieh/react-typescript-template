import { DataConnection, Peer } from 'peerjs'
import React, { useState } from 'react'

import PeerContext from './PeerContext'

function PeerProvider({ children }: any) {
  const [peer, setPeer] = useState<Peer>()
  const [peerId, setPeerId] = useState<string>('')
  const [dataConnection, setDataConnection] = useState<DataConnection>()
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    state: { peer, peerId, dataConnection },
    actions: { setPeer, setPeerId, setDataConnection },
  }

  return <PeerContext.Provider value={value}>{children}</PeerContext.Provider>
}

export default PeerProvider
