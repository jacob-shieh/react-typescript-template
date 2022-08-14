import { Peer } from 'peerjs'
import React, { useState } from 'react'

import PeerContext from './PeerContext'

function PeerProvider({ children }: any) {
  const [peer, setPeer] = useState<Peer>()
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    state: { peer },
    actions: { setPeer },
  }

  return <PeerContext.Provider value={value}>{children}</PeerContext.Provider>
}

export default PeerProvider
