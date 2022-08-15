import { Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'

type ClipboardButtonProps = {
  copyText: string | undefined
}

function ClipboardButton({ copyText }: ClipboardButtonProps) {
  const [open, setOpen] = useState<boolean>(false)
  const handleClick = () => {
    navigator.clipboard.writeText(copyText || '')
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleClick}>{copyText}</Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Copied to clipboard"
      />
    </div>
  )
}

export default ClipboardButton
