import React, { useState, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useRouteMatch } from 'react-router-dom';
import img from '../../assets/search.svg';
import * as Options from '../utils/search';
import Card from '../utils/card';

export default function Search() {
  const [selected, setSelected] = useState({
    hobbies: true,
    cursos: false,
  });
  const hobbies = Options.searchHobbies();
  const cursos = Options.searchCourses();
  const [search, setSearch] = useState({
    placeholder: 'Seleccione un hobbie',
    options: hobbies,
    selected: [],
    selected_label: [],
  });
  const [result, setResult] = useState([]);
  const animatedComponents = makeAnimated();
  const selectInputRef = useRef();
  const { url } = useRouteMatch();

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
      padding: 8,
      border: 0,
      boxShadow: 'none',
    }),
  };

  const hobbiesSearchButton = () => {
    setSelected({
      hobbies: true,
      cursos: false,
    });
    setSearch({
      ...search,
      placeholder: 'Seleccione un hobbie',
      options: hobbies,
      selected: [],
    });
    selectInputRef.current.select.clearValue();
  };

  const coursesSearchButton = () => {
    setSelected({
      hobbies: false,
      cursos: true,
    });
    setSearch({
      ...search,
      placeholder: 'Seleccione un curso',
      options: cursos,
      selected: [],
    });
    selectInputRef.current.select.clearValue();
  };

  const onSearchChange = (selectedHobbies) => {
    selectedHobbies.map((item) => (
      setSearch({
        ...search,
        selected: [...search.selected, item.value],
        selected_label: [...search.selected_label, item.label],
      })
    ));
  };

  const handleClick = () => {
    let users = [];
    if (!selected.hobbies) {
      users = Options.searchUserCourses(search.selected);
    } else {
      users = Options.searchUserHobbies(search.selected);
    }
    setTimeout(() => { setResult(users); }, 300);
    // selectInputRef.current.select.clearValue();
    setSearch({
      ...search,
      selected: [],
    });
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-1" id="search-container">
        <div className="rounded-3 search-container row justify-content-center">
          <div className="row w-75 mt-2 mb-5">
            <h3 className="col-lg-6 text-center align-self-center quote-font mb-4">
              Un nuevo amigo
              <br />
              A tan solo un Click
            </h3>
            <img src={img} alt="Friends" className="col-lg-6 d-none d-lg-block w-40" />
          </div>
        </div>
        <div className="w-80">
          <button
            className={`hobbies-search-btn px-2 py-1 ms-3 is-select ${selected.hobbies ? 'is-selected' : ' '}`}
            type="button"
            onClick={hobbiesSearchButton}
          >
            Hobbies
          </button>
          <button
            className={`hobbies-search-btn px-2 py-1 ms-1 ${selected.cursos ? 'is-selected' : ' '}`}
            type="button"
            onClick={coursesSearchButton}
          >
            Cursos
          </button>
          <div className="bg-white rounded-3 search-item">
            <span className="material-icons search-icon">
              search
            </span>
            <div className="w-90">
              <Select
                ref={selectInputRef}
                isMulti
                className="basic-single"
                classNamePrefix="select"
                isClearable
                isSearchable
                components={animatedComponents}
                closeMenuOnSelect={false}
                value={search.options.find((obj) => obj.value === search.selected)}
                onChange={onSearchChange}
                name="carreraId"
                options={search.options}
                placeholder={search.placeholder}
                styles={colourStyles}
              />
            </div>
            <button className="search-btn" type="button" onClick={handleClick}>
              Buscar
            </button>
          </div>
        </div>
        <h2 className="w-100 mt-3">
          {' '}
          Resultado de la búsqueda por
          {selected.hobbies
            ? ' hobbies '
            : ' cursos'}
        </h2>
        <div className="card-container w-100 mt-2">
          {result.map((user) => (
            <Card
              key={user.carne}
              name={user.nombre}
              email={user.correo}
              carne={user.carne}
              carrera={user.carrera}
              viewProfile={`${url}/profile/${user.carne}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
