import { ContactProvider } from "./context/ContactContext";

import Header from "./components/Header.jsx";
import Contacts from "./components/Contacts.jsx";

function App() {
  return (
    <>
      <Header />
      <ContactProvider>
        <Contacts />
      </ContactProvider>
    </>
  );
}

export default App;
