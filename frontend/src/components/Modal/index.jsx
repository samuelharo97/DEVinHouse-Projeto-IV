import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import PropTypes from 'prop-types';
import {
  Background,
  CloseModalButton,
  HiddenInput,
  InputContainer,
  InputWrapper,
  ModalContent,
  ModalWrapper
} from './styles';
import { AbsoluteLoading, Button } from '@components';
import { useAxios, useLoader } from '@hooks';

const validationObject = {
  required: true
};

export const Modal = ({ showModal, setShowModal, device, locations }) => {
  const modalRef = useRef();

  const { axiosUserAddDevice } = useAxios();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const { register, handleSubmit } = useForm();
  const { loadsFor, isLoading } = useLoader();
  const submit = (data) => {
    loadsFor(3000);
    axiosUserAddDevice(data);
  };

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalContent>
              {isLoading && <AbsoluteLoading />}
              <h3>{device.name}</h3>
              <form onSubmit={handleSubmit(submit)}>
                <InputContainer>
                  <InputWrapper>
                    <label htmlFor="local">Local*</label>
                    <select
                      name="local"
                      id="local"
                      placeholder="Selecione o local"
                      {...register('local', validationObject)}
                    >
                      {locations.map((location, index) => {
                        return (
                          <option key={index} value={`${location.description}`}>
                            {location.description}
                          </option>
                        );
                      })}
                    </select>
                  </InputWrapper>
                </InputContainer>
                <InputContainer>
                  <InputWrapper>
                    <label htmlFor="room">Cômodo*</label>
                    <input
                      type="text"
                      name="room"
                      id="room"
                      placeholder="Digite o nome do cômodo"
                      {...register('room', validationObject)}
                    />
                  </InputWrapper>
                </InputContainer>
                <HiddenInput>
                  <input
                    type="text"
                    name="deviceId"
                    id="deviceId"
                    value={device._id}
                    {...register('deviceId', validationObject)}
                  />
                </HiddenInput>
              </form>
              <div>
                <Button
                  title={'CONFIRMAR'}
                  func={handleSubmit(submit)}
                  disable={isLoading}
                  color={'primary'}
                  type={'submit'}
                />
                <Button
                  disable={isLoading}
                  title={'CANCELAR'}
                  func={setShowModal}
                  color={'secondary'}
                />
              </div>
            </ModalContent>
            <CloseModalButton
              aria-label="Close modal"
              onClick={() => setShowModal((prev) => !prev)}
            />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  locations: PropTypes.array,
  device: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired
  })
};
