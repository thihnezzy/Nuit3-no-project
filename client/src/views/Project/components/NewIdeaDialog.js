import { Button, Dialog } from 'components/ui'
import React from 'react'
import NewIdeaForm from './NewIdeaForm'
const NewIdeaModal = ({opened, onClose}) => {

  return (
    <Dialog
      isOpen={opened}
      onClose={onClose}
      title='Create new idea'
      className='w-full max-w-[600px]'
    >
      <h4>Add new idea</h4>
      <div className='mt-4 max-h-[600px] overflow-y-auto'>
        <NewIdeaForm />
      </div>
    </Dialog>
  )
}

export default NewIdeaModal
