import React from "react";

import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Application />
      <div className="footer">
        <p>Empresa Todos los Derechos reservados 2020</p>
      </div>
    </UserProvider>

  );
}

export default App;
