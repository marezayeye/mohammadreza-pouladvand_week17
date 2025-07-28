import Header from "./components/Header.jsx"
import Contacts from "./components/Contacts.jsx"
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <Header />
      <Contacts />
    </ContactProvider>
  )
}

export default App
