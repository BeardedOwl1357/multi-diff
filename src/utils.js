// Utilities for processing and comparing tab content

export function getProcessedText(text, sort) {
  if (!sort) return text;
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .sort((a, b) => a.localeCompare(b))
    .join('\n');
}

export function compareTabs(tabs, sortBeforeCompare) {
  const processedTabs = tabs.map(tab =>
    getProcessedText(tab.text, sortBeforeCompare)
  );
  const differences = {};
  for (let i = 0; i < tabs.length; i++) {
    differences[i] = [];
    for (let j = 0; j < tabs.length; j++) {
      if (i !== j && processedTabs[i] !== processedTabs[j]) {
        differences[i].push(j);
      }
    }
  }
  return { differences, processedTabs };
}
