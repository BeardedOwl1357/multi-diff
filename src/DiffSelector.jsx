import React from "react";

export default function DiffSelector({
  tabs, tabAIndex, setTabAIndex, tabBIndex, setTabBIndex
}) {
  return (
    <div>
      <h3>Compare Any Two Tabs</h3>
      <div style={{ display: "flex", gap: "1em", alignItems: "center", marginBottom: "1em" }}>
        <label>
          Tab A:
          <select value={tabAIndex ?? ""} onChange={e => setTabAIndex(e.target.value === "" ? null : Number(e.target.value))}>
            <option value="">Select Tab</option>
            {tabs.map((tab, i) => (
              <option key={i} value={i}>
                {tab.heading ? tab.heading : `Tab ${i + 1}`}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tab B:
          <select value={tabBIndex ?? ""} onChange={e => setTabBIndex(e.target.value === "" ? null : Number(e.target.value))}>
            <option value="">Select Tab</option>
            {tabs.map((tab, i) => (
              <option key={i} value={i}>
                {tab.heading ? tab.heading : `Tab ${i + 1}`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
