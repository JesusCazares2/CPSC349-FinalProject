import Edit from "./containers/Edit/Edit";
import Weather from "./containers/Weather/Weather";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Calendar</h1>
      <Edit />
      <Weather />
      
    </div>
  );
}