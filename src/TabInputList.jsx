import React from "react";

export default function TabInputList({ tabs, onTabChange, onAddTab, compareResult, sortBeforeCompare }) {
  return (
    <div>
      <button onClick={onAddTab}>+ Add Tab</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
        {tabs.map((tab, i) => (
          <div key={i} style={{ border: "1px solid #aaa", padding: "1rem", width: "280px", color: "white" }}>
            <label>
              Heading:{" "}
              <input
                type="text"
                value={tab.heading}
                onChange={e => onTabChange(i, "heading", e.target.value)}
                style={{ width: "90%" }}
              />
            </label>
            <br />
            <label>
              Text: <br />
              <textarea
                rows={5}
                value={tab.text}
                onChange={e => onTabChange(i, "text", e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
            {compareResult && sortBeforeCompare && (
              <div style={{
                background: "#f5f7ff",
                color: "white",
                fontSize: "0.85em",
                marginTop: "0.5em",
                padding: "0.5em",
                borderRadius: "0.4em"
              }}>
                <div><b>Sorted preview:</b></div>
                <pre style={{
                  background: "#f0f2fa",
                  color: "white",
                  padding: "0.3em",
                  borderRadius: "0.3em"
                }}>{compareResult.processedTabs[i]}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
