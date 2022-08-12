import React, { useState, useEffect } from 'react'
import { Peer } from 'peerjs'

function PeerConnectionProvider() {
  const [peer, setPeer] = useState<Peer>()

  const handleStartParty = () => {
    // do something
  }

  const handleEnd = () => {
    // do something
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handleStartParty()
        }}
      >
        Start party
      </button>
      <button
        type="button"
        onClick={() => {
          handleStartParty()
        }}
      >
        End
      </button>
    </div>
  )
}

export default PeerConnectionProvider
