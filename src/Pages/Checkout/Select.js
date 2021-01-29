import React from "react";

function CharacterDropDown() {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("R2-D2");

  React.useEffect(() => {
    let unmounted = false;
    async function getCharacters() {
      const response = await fetch("https://swapi.dev/api/people");

      const body = await response.json();

      console.log(body);
      if (!unmounted) {
        setItems(
          body.results.map(({ name }) => ({ label: name, value: name }))
        );
        setLoading(false);
      }
    }
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <select
      disabled={loading}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      {items.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default function App() {
  return (
    <div className="App">
      <CharacterDropDown />
    </div>
  );
}

// count: 82
// next: "https://swapi.dev/api/people/?page=2"
// previous: null
// results: Array(10)
// 0: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
// 1: {name: "C-3PO", height: "167", mass: "75", hair_color: "n/a", skin_color: "gold", …}
// 2: {name: "R2-D2", height: "96", mass: "32", hair_color: "n/a", skin_color: "white, blue", …}
// 3: {name: "Darth Vader", height: "202", mass: "136", hair_color: "none", skin_color: "white", …}
// 4: {name: "Leia Organa", height: "150", mass: "49", hair_color: "brown", skin_color: "light", …}
// 5: {name: "Owen Lars", height: "178", mass: "120", hair_color: "brown, grey", skin_color: "light", …}
// 6: {name: "Beru Whitesun lars", height: "165", mass: "75", hair_color: "brown", skin_color: "light", …}
// 7: {name: "R5-D4", height: "97", mass: "32", hair_color: "n/a", skin_color: "white, red", …}
// 8: {name: "Biggs Darklighter", height: "183", mass: "84", hair_color: "black", skin_color: "light", …}
// 9: {name: "Obi-Wan Kenobi", height: "182", mass: "77", hair_color: "auburn, white", skin_color: "fair", …}
// length: 10
// __proto__: Array(0)


// fee: "7.00"
// id: "1"
// location: "Community 1"
// unique_id: "5f97102cd9ba86.00000001"