import Peer, { DataConnection } from 'peerjs'
import { createContext } from 'react'

type PeerContextType = {
  state: {
    peer: Peer | undefined
    peerId: string | undefined
    dataConnection: DataConnection | undefined
  }
  actions: { setPeer: any; setPeerId: any; setDataConnection: any }
}

const PeerContext = createContext<PeerContextType>({
  state: { peer: undefined, peerId: undefined, dataConnection: undefined },
  actions: {
    setPeer: undefined,
    setPeerId: undefined,
    setDataConnection: undefined,
  },
})

export default PeerContext
