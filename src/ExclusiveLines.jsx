import React from 'react';

function ExclusiveLines({ tabs, indexA, indexB }) {
  // Safety checks
  if (
    !Array.isArray(tabs) ||
    tabs.length <= Math.max(indexA, indexB) ||
    indexA < 0 ||
    indexB < 0
  ) {
    return <div>Invalid indexes or tabs array.</div>;
  }

  const textA = tabs[indexA].text || '';
  const textB = tabs[indexB].text || '';

  // Split and trim lines
  const linesA = textA.split('\n').map(line => line.trim());
  const linesB = textB.split('\n').map(line => line.trim());

  // Find lines only in A (not in B), ignore empty lines
  const diffLines = linesA.filter(
    line => line.length > 0 && !linesB.includes(line)
  );

  return (
    <div>
      <h4>Lines present in tab {tabs[indexA].heading} but not in tab {tabs[indexB].heading}:</h4>
      {diffLines.length === 0 ? (
        <div>No unique lines in tab {indexA}.</div>
      ) : (
        <ul>
          {diffLines.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExclusiveLines;
