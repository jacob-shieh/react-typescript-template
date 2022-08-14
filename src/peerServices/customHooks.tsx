import { useContext } from 'react'

import PeerContext from './PeerContext'

const usePeer = () => {
  return useContext(PeerContext)
}

export default usePeer
