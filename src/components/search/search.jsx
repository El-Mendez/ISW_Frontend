import React, { useState, useRef } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import img from '../../assets/search.svg';
import * as Options from '../utils/search';

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
  });
  const animatedComponents = makeAnimated();
  const selectInputRef = useRef();

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
      padding: 9,
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
      placeholder: 'Seleccione un hobbie',
      options: hobbies,
    });
    selectInputRef.current.select.clearValue();
  };

  const coursesSearchButton = () => {
    setSelected({
      hobbies: false,
      cursos: true,
    });
    setSearch({
      placeholder: 'Seleccione un curso',
      options: cursos,
    });
    selectInputRef.current.select.clearValue();
  };

  const handleClick = () => {
    selectInputRef.current.select.clearValue();
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-1">
        <div className="rounded-3 search-container row justify-content-center">
          <div className="row w-75 mt-2 mb-5">
            <h2 className="col-lg-6 text-center align-self-center quote-font">
              Un nuevo amigo
              <br />
              A tan solo un Click
            </h2>
            <img src={img} alt="Friends" className="col-lg-6 w-40" />
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
                // value={result.find((obj) => obj.value === user.carreraId)}
                // onChange={handleChange}
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
      </div>
    </>
  );
}
