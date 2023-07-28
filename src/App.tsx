import "./App.css";
import SpinButton from "./components/SpinButton";

const people = ["성인", "소아", "유아"];

function App() {
  return (
    <main className="App">
      {people.map((peopleType) => (
        <SpinButton people={peopleType} />
      ))}
    </main>
  );
}

export default App;
