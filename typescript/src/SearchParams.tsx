import { useState, useEffect, useContext, FunctionComponent } from "react";
// import { RouteComponentProps } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { Animal, Pet, PetAPIResponse } from "../../typescript/src/APIResponseTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [animal, updateAnimal] = useState("" as Animal);
  const [location, updateLocation] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = (await res.json()) as PetAPIResponse;

    setPets(json.pets);
  }

  return (
    <div
      className="my-0 mx-auto w-11/12"
    >
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y dicvide-gray-900"
        onSubmit={(e) => {
          e.preventDefault();
          void requestPets();
        }}
      >
        <label htmlFor="location"  className="search-label">
          Location
          <input
            className="search-control"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal"  className="search-label">
          Animal
          <select
            className="search-control"
            id="animal"
            value={animal}
            onChange={(e) => updateAnimal(e.target.value as Animal)}
            onBlur={(e) => updateAnimal(e.target.value as Animal)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed" className="search-label">
          Breed
          <select
            className="search-control disabled:opacity-50"
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => updateBreed(e.target.value)}
            onBlur={(e) => updateBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme"  className="search-label">
          Theme
          <select
            className="search-control"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        <button 
          style={{ backgroundColor: theme }} 
          className="rounded px--6 py-2 text-white hover:opacity-50 border-none"
        >Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;