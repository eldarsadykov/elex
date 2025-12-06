import chapters from "./chapters-nodes-links.json";
import ForceGraph from "./ForceGraph.js"; // If you move your function into a separate file

const chart = ForceGraph(chapters, {
  nodeId: d => d.id,
  nodeGroup: d => d.group,
  nodeTitle: d => `${d.id}\n${d.group}`,
  linkStrokeWidth: l => Math.sqrt(l.value),
  width: "100lvw",
  height: "100lvh",
});

document.body.append(chart);

