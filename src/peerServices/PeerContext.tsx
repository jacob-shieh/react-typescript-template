import Peer from 'peerjs'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type PeerContextType = {
  state: { peer: Peer | undefined }
  actions: { setPeer: any }
}

// const [_, setPeer] = useState<Peer>()

const PeerContext = createContext<PeerContextType>({
  state: { peer: undefined },
  actions: { setPeer: undefined },
})

export default PeerContext
