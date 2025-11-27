import React, { useEffect, useState } from "react";
import TabInputList from "./TabInputList";
import CompareResults from "./CompareResults";
import DiffSelector from "./DiffSelector";
import TabDiffView from "./TabDiffView";
import { compareTabs } from "./utils";
import AppVersion from "./AppVersion";
import ExclusiveLines from "./ExclusiveLines";

export default function App() {
  const USERTABS = "userTabs";
  const [tabs, setTabs] = useState(() => {
    const objString = localStorage.getItem(USERTABS);
    if (objString !== null && objString !== "") {
      // Try to safely parse storage
      try {
        return JSON.parse(objString);
      } catch (e) {
        console.warn("Corrupted data in localStorage for userTabs. Resetting to default.", e);
        // Optionally clear the corrupted entry:
        localStorage.removeItem(USERTABS);
      }
    } else {
      console.log("No data in browser, initializing default tabs");
    }
    return [{ heading: "", text: "" }];
  });

  const [sortBeforeCompare, setSortBeforeCompare] = useState(false);
  const [compareResult, setCompareResult] = useState(null);
  const [diffPair, setDiffPair] = useState(null);
  const [tabAIndex, setTabAIndex] = useState(null);
  const [tabBIndex, setTabBIndex] = useState(null);
  const [showLineDiff, setShowLineDiff] = useState(false);
  const [showSetdiff, setShowSetdiff] = useState(false);

  // Tooltip content for each mode
  const tooltips = {
    line: "Show line-by-line differences between the inputs.",
    set: "Show only the lines present in one input and not the other (set difference)."
  };



  // Tab content change handler
  const handleTabChange = (i, field, value) => {
    const newTabs = tabs.map((tab, idx) =>
      idx === i ? { ...tab, [field]: value } : tab
    );
    setTabs(newTabs);
    setCompareResult(null);
  };

  useEffect(() => {
    console.log("Updating browser storage")
    localStorage.setItem(USERTABS, JSON.stringify(tabs));
  }, [tabs])

  // Add a new tab
  const addTab = () => {
    setTabs([...tabs, { heading: "", text: "" }]);
    setCompareResult(null);
  };

  // Compare all tabs
  const handleCompare = () => {
    setCompareResult(compareTabs(tabs, sortBeforeCompare));
  };

  // Show detailed diff for the matrix compare
  const handleShowDiff = (i, j) => setDiffPair([i, j]);
  const closeDiff = () => setDiffPair(null);

  // Reset dropdown diff if tabs are missing
  React.useEffect(() => {
    if (tabAIndex != null && tabAIndex >= tabs.length) setTabAIndex(null);
    if (tabBIndex != null && tabBIndex >= tabs.length) setTabBIndex(null);
  }, [tabs.length]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", color: "white" }}>
      <AppVersion />
      <h2>Multi Diff by Sanchay Joshi (BeardedOwl1357) </h2>

      <button onClick={() => {
        localStorage.removeItem(USERTABS)
        setTabs([{ heading: "", text: "" }])
      }}>Clear existing data</button>

      <hr></hr>


      <TabInputList
        tabs={tabs}
        onTabChange={handleTabChange}
        onAddTab={addTab}
        compareResult={compareResult}
        sortBeforeCompare={sortBeforeCompare}
      />

      {/* Place SORT checkbox here, directly managed by App
      <label style={{ marginRight: "1rem" }}>
        <input
          type="checkbox"
          checked={sortBeforeCompare}
          onChange={e => setSortBeforeCompare(e.target.checked)}
        />{" "}
        Sort input before compare
      </label> */}

      <button onClick={handleCompare} style={{ marginTop: "2rem" }}>
        Compare
      </button>

      <CompareResults
        tabs={tabs}
        compareResult={compareResult}
        sortBeforeCompare={sortBeforeCompare}
        onShowDiff={handleShowDiff}
      />

      {diffPair && (
        <TabDiffView
          tabA={tabs[diffPair[0]]}
          tabB={tabs[diffPair[1]]}
          onClose={closeDiff}
        />
      )}

      <DiffSelector
        tabs={tabs}
        tabAIndex={tabAIndex}
        setTabAIndex={setTabAIndex}
        tabBIndex={tabBIndex}
        setTabBIndex={setTabBIndex}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={showSetdiff}
            onChange={() => setShowSetdiff(!showSetdiff)}
          />
          Show Set Diff : {tooltips.set}
        </label>
        
        <br></br>

        <label>
          <input
            type="checkbox"
            checked={showLineDiff}
            onChange={() => setShowLineDiff(!showLineDiff)}
          />
          Show Line Diff : {tooltips.line}
        </label>
      </div>

      {tabAIndex !== null &&
        tabBIndex !== null &&
        tabAIndex !== tabBIndex && (
          <>
            {showSetdiff && (
              <ExclusiveLines tabs={tabs} indexA={tabAIndex} indexB={tabBIndex} />
            )}
            {showLineDiff && (
              <TabDiffView
                tabA={tabs[tabAIndex]}
                tabB={tabs[tabBIndex]}
                onClose={() => {
                  setTabAIndex(null);
                  setTabBIndex(null);
                }}
              />
            )}
          </>
        )
      }

    </div>
  );
}
