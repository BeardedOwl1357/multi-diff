import React from "react";

export default function CompareResults({ tabs, compareResult, sortBeforeCompare, onShowDiff }) {
  if (!compareResult) return null;

  return (
    <div
      style={{
        marginTop: "2rem",
        border: sortBeforeCompare ? "2px solid #5065a8" : "none",
        background: sortBeforeCompare ? "#f5f7ff" : "none",
        padding: "1em",
        borderRadius: sortBeforeCompare ? "0.7em" : "none",
        color: "white"
      }}
    >
      {sortBeforeCompare && (
        <div style={{
          background: "#e0e7ff",
          color: "white",
          padding: "0.6em",
          borderRadius: "0.5em",
          marginBottom: "1em",
          fontWeight: "bold"
        }}>
          Inputs were <span style={{ textDecoration: "underline" }}>sorted by lines</span> before comparison.
        </div>
      )}
      <h3>Comparison Result:</h3>
      {tabs.map((tab, i) => (
        <div key={i}>
          <b>Tab {i + 1}{tab.heading ? `: ${tab.heading}` : ""}</b> is different from:{" "}
          {compareResult.differences[i].length > 0
            ? compareResult.differences[i].map(j => (
                <span key={j}>
                  Tab {j + 1}
                  <button style={{marginLeft: "0.3em"}} onClick={() => onShowDiff(i, j)}>
                    Show Diff
                  </button>
                  {" "}
                </span>
              ))
            : "None"}
        </div>
      ))}
    </div>
  );
}
