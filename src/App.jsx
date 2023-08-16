import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import { MdDarkMode } from 'react-icons/md';
import { BsLightbulb } from 'react-icons/bs';

function getLocalStateData() {
  const data = localStorage.getItem('list');
  if (data != null) return JSON.parse(data);
  return [];
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStateData());
  const [isEditable, setIsEditable] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const [theme, setTheme] = useState('light');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Please enter a value');
    } else if (name && isEditable) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      reset();
      showAlert(true, 'success', 'item updated successfully');
    } else {
      showAlert(true, 'success', 'Item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    reset();
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item remove');
    if (isEditable && id === editID) {
      reset();
    }
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditable(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const reset = () => {
    setName('');
    setEditID(null);
    setIsEditable(false);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  return (
    <React.Fragment>
      <section className={`section-center`}>
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} list={list} showAlert={showAlert} />}

          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditable ? 'edit' : 'Submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className='"grocery-container'>
            <List
              items={list}
              editItem={editItem}
              editID={editID}
              isEditable={isEditable}
              removeItem={removeItem}
            />
            <button className="clear-btn" onClick={clearList}>
              Clear Items
            </button>
          </div>
        )}
      </section>
      <button className="theme" type="button" onClick={toggleTheme}>
        {theme === 'light' ? <BsLightbulb /> : <MdDarkMode />}
      </button>
    </React.Fragment>
  );
}

export default App;
