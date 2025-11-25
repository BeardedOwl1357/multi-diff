import React, { useState } from "react";
import TabInputList from "./TabInputList";
import CompareResults from "./CompareResults";
import DiffSelector from "./DiffSelector";
import TabDiffView from "./TabDiffView";
import { compareTabs } from "./utils";
import AppVersion from "./AppVersion";

export default function App() {
  const [tabs, setTabs] = useState([{ heading: "", text: "" }]);
  const [sortBeforeCompare, setSortBeforeCompare] = useState(false);
  const [compareResult, setCompareResult] = useState(null);
  const [diffPair, setDiffPair] = useState(null);
  const [tabAIndex, setTabAIndex] = useState(null);
  const [tabBIndex, setTabBIndex] = useState(null);

  // Tab content change handler
  const handleTabChange = (i, field, value) => {
    const newTabs = tabs.map((tab, idx) =>
      idx === i ? { ...tab, [field]: value } : tab
    );
    setTabs(newTabs);
    setCompareResult(null);
  };

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
      <AppVersion/>
      <h2>Tab Comparator</h2>

      <TabInputList
        tabs={tabs}
        onTabChange={handleTabChange}
        onAddTab={addTab}
        compareResult={compareResult}
        sortBeforeCompare={sortBeforeCompare}
      />

      {/* Place SORT checkbox here, directly managed by App */}
      <label style={{ marginRight: "1rem" }}>
        <input
          type="checkbox"
          checked={sortBeforeCompare}
          onChange={e => setSortBeforeCompare(e.target.checked)}
        />{" "}
        Sort input before compare
      </label>

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

      {tabAIndex !== null && tabBIndex !== null && tabAIndex !== tabBIndex && (
        <TabDiffView
          tabA={tabs[tabAIndex]}
          tabB={tabs[tabBIndex]}
          onClose={() => {
            setTabAIndex(null);
            setTabBIndex(null);
          }}
        />
      )}
    </div>
  );
}
