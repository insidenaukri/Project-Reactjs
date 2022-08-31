import ReactModal from 'react-modal'

const defaultStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const appElementId = 'root'
ReactModal.setAppElement(`#${appElementId}`)

export default function Modal({ isOpen, setIsOpen, styles, children }) {
  function onAfterOpen() {}

  function close() {
    setIsOpen(false)
  }

  function open() {
    setIsOpen(true)
  }

  return (
    <div>
      <ReactModal
        contentLabel="Example Modal"
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={close}
        shouldCloseOnOverlayClick={true}
        style={styles ?? defaultStyles}
      >
        {children}
      </ReactModal>
    </div>
  )
}
