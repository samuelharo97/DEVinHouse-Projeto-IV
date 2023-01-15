import { Button, ButtonText, Form } from '@components'
import { Container } from './styles'

export const SignUp = () => {
  return (
    <>
      <Container>
        <Form title='Cadastrar'>
          <Button color={'primary'} title={'CADASTRAR'} type={'submit'} />
          <ButtonText routeTo={'/'} title={'Login'} />
        </Form>
      </Container>
    </>
  )
}
