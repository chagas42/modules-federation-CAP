import "./App.css";

import ProviderButton from "federation_provider/button";

const App = () => {
  return (
    <div className="content">
      <h1>Consumer</h1>
      <div>
        <ProviderButton />
      </div>
    </div>
  );
};

export default App;
