import React from "react";
import DiffViewer from "react-diff-viewer";

export default function TabDiffView({ tabA, tabB, onClose }) {
  if (!tabA || !tabB) return null;
  return (
    <div style={{marginBottom: "2em", border: "2px solid #aaa", background: "#fff", padding: "1em", borderRadius: "0.7em", color: "black"}}>
      <h4>
        Diff between <span style={{color: "black"}}>{tabA.heading ? tabA.heading : "Tab A"}</span> and <span style={{color: "black"}}>{tabB.heading ? tabB.heading : "Tab B"}</span>
        <button style={{ float: "right" }} onClick={onClose}>
          Close
        </button>
      </h4>
      <DiffViewer
        oldValue={tabA.text}
        newValue={tabB.text}
        splitView={true}
        styles={{
          diffContainer: { color: "black" },
          added: { background: "#dbffdb", color: "black" },
          removed: { background: "#ffd6d6", color: "black" },
        }}
      />
    </div>
  );
}
