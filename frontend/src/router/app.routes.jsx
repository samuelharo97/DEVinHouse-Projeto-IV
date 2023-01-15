import { Routes, Route } from 'react-router-dom';

import { Home, MyProfile, ProfileEdit, Devices, Details, NotFound, Password } from '@pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/change-password" element={<Password />} />
      <Route path="/edit" element={<ProfileEdit />} />
      <Route path="/devices/" element={<Devices />} />
      <Route path="details/:id" element={<Details />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
