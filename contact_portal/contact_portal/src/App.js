import './App.css';
import Layout from './components/Layout';
import Contacts from './components/Contacts/Contacts';
import AddContact from "./components/AddContact/AddContact";
import EditContact from "./components/UpdateContact/EditContact";

import { Route, Routes, Navigate } from 'react-router-dom';


function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<Navigate replace to="/contacts" />} />
        <Route path='/new-contact' element={<AddContact />} />
        <Route path='/edit-contact' element={<EditContact />} />
      </Routes>
    </Layout >
  );
}

export default App;
