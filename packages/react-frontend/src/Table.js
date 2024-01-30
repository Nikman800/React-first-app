import React from "react";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th> {/* Add column title for ID */}
        <th>Name</th>
        <th>Job</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  if (!props.characterData) {
    return null; // or return a loading spinner
  }

  const rows = props.characterData.map((row, index) => {
    if (!row) {
      return null; // Skip this iteration if row is undefined
    }

    return (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button onClick={() => props.removeCharacter(row.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}

export default Table;