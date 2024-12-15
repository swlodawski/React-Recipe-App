import { useEffect, useState } from 'react'
import './App.css';
import Recipe from './components/Recipe';

const App = () => {
const APP_ID = '4e19b92e';
const APP_KEY = '1c6c781c6a738bd6e2bb46daa484a88d';
const [recipes, setRecipes] = useState ([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState("chicken");

useEffect(() => {
  getRecipes();
}, [query])
const getRecipes = async () => {
  const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDeault();
  setQuery(search);
  setSearch('');
}

  return (
    <div className='App'>
      <form className='search-form' onSubmit={getSearch}>
        <input className='search-bar' type="text" value={search} onChange={updateSearch}/>
        <button className='search-button' type='submit'>Search</button>
      </form>

      <div className='recipes'>
        {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
        ))}
      </div>
    
    </div>
  );
}

export default App
