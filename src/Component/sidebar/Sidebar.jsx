import React from "react";

const Sidebar = ({
  notes,
  filter,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  let SortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Todo Apps</h1>
        <button onClick={onAddNote}>Create New</button>
      </div>
      <hr />
      <div className="filter-section">
        <div>
          <label className="filter-level" htmlFor="week">
            Week
          </label>
          <select
            onChange={(event) => filter(event, "date")}
            className="dropdown-input"
            id="week"
            name="week"
          >
            <option value="">All</option>
            <option value="1">Saturday</option>
            <option value="2">Sunday</option>
            <option value="3">Monday</option>
            <option value="4">Tuesday</option>
            <option value="5">Wednesday</option>
            <option value="6">Thursday</option>
            <option value="7">Friday</option>
          </select>
        </div>
        <div>
          <label className="filter-level" htmlFor="month">
            Month
          </label>
          <select
            onChange={(event) => filter(event, "month")}
            className="dropdown-input"
            id="month"
            name="month"
          >
            <option value="">All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div>
          <label className="filter-level" htmlFor="year">
            Year
          </label>
          <select
            onChange={(event) => filter(event, "year")}
            className="dropdown-input"
            id="year"
            name="year"
          >
            <option value="">All</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
      </div>
      <div className="app-sidebar-notes">
        {SortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>Delete</button>
            </div>

            <p>{body && body.substr(0, 50) + "...."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
