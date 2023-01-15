import { Button, WhiteLayer, Modal } from '@components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Card, Container } from './styles'

export const AddDeviceCard = ({ device, locations }) => {
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => {
    setOpenModal((prev) => !prev)
  }

  return (
    <Container>
      <WhiteLayer>
        <Card>
          <img src={device.photoUrl} alt="" />
          <h4>{device.name}</h4>
          <Button title={'ADICIONAR'} color="primary" func={toggleModal} />
          <Modal
            setShowModal={toggleModal}
            device={device}
            showModal={openModal}
            locations={locations}
          />
        </Card>
      </WhiteLayer>
    </Container>
  )
}

AddDeviceCard.propTypes = {
  device: PropTypes.shape({
    photoUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  handleAdd: PropTypes.func,
  locations: PropTypes.array
}
