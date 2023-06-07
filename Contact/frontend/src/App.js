import './App.css';
import Layout from './components/Layout';
import Contacts from './components/Contacts/Contacts';
import AddContact from "./components/AddContact/AddContact";
import NotFound from "./components/UI/NotFound";

import { Route, Routes, Navigate } from 'react-router-dom';
import EditContactForm from './components/UpdateContact/EditContactForm';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<Navigate replace to="/contacts" />} />
        <Route path='/new-contact' element={<AddContact />} />
        <Route path='/edit-contact' element={<EditContactForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout >
  );
}

export default App;
