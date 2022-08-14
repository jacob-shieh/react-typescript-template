import React from 'react'

type ClipboardButtonProps = {
  copyText: string
}

function ClipboardButton({ copyText }: ClipboardButtonProps) {
  function handleClick() {
    navigator.clipboard.writeText(copyText)
  }

  return (
    <button type="button" onClick={handleClick}>
      {copyText}
    </button>
  )
}

export default ClipboardButton
