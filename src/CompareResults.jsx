import React from "react";

const ComparisonComponent = ({parentTab, parentTabIndex, compareResult, onShowDiff}) => {
  const hasDifferences = (compareResult.differences[parentTabIndex].length > 0);
  return (
    <div>
      <h4>
        Tab {parentTabIndex + 1} {`'${parentTab.heading}'`} is different from the following tabs
      </h4>
      {hasDifferences && (
        <ul>
          {compareResult.differences[parentTabIndex].map((childTabIndex, i) => (
            <li key={childTabIndex}>
              Tab {childTabIndex + 1} :
              <button style={{ marginLeft: "0.3em" }} onClick={() => onShowDiff(parentTabIndex, childTabIndex)}>
                Show diff
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
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
          <ComparisonComponent parentTab={tab} parentTabIndex={i} compareResult={compareResult} onShowDiff={onShowDiff} />
        </div>
      ))}
    </div>
  );
}
