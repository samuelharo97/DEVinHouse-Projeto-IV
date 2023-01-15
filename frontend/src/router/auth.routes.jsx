import { Routes, Route } from 'react-router-dom'

import { NotFound, SignIn, SignUp } from '@pages'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
