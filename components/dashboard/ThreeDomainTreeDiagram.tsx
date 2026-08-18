"use client";

import React from "react";
import { ReusableBranchingTreeDiagram } from "./ReusableBranchingTreeDiagram";

export const ThreeDomainTreeDiagram: React.FC = () => {
  return (
    <ReusableBranchingTreeDiagram
      badgeText="CARL WOESE (1990) MOLECULAR PHYLOGENY"
      title="UNIVERSAL ANCESTOR (LUCA)"
      subtitle="Last Universal Common Ancestor of All Cellular Life"
      takeawayText="NEST Insight: Archaea and Eukarya are sister domains derived from a common ancestor after splitting from Bacteria!"
      branches={[
        {
          title: "Domain BACTERIA",
          subtitle: "Prokaryotic Lineage",
          badgeVariant: "indigo",
          iconName: "Dna",
          accentColor: "indigo",
          items: [
            { text: "• Cell wall: Peptidoglycan (β-1,4)" },
            { text: "• Lipids: Ester-linked unbranched" },
            { text: "• Initiator tRNA: Formylmethionine" },
          ],
          footer: "Sensitivity: Antibiotic Inhibited",
        },
        {
          title: "Domain ARCHAEA",
          subtitle: "Sister Domain to Eukarya",
          badgeVariant: "purple",
          iconName: "GitBranch",
          accentColor: "purple",
          items: [
            { text: "• Cell wall: Pseudopeptidoglycan (β-1,3)" },
            { text: "• Lipids: Ether-linked phytanyl" },
            { text: "• Histones & Complex RNAP present" },
          ],
          footer: "Extremophile Monolayer Adapters",
        },
        {
          title: "Domain EUKARYA",
          subtitle: "Enclosed Nucleus & Organelles",
          badgeVariant: "emerald",
          iconName: "ShieldCheck",
          accentColor: "emerald",
          items: [
            { text: "• Cell wall: Cellulose/Chitin or Absent" },
            { text: "• Ribosomes: 80S Cytoplasmic" },
            { text: "• Ubiquitous Introns & RNAP I, II, III" },
          ],
          footer: "Sister Domain to Archaea",
        },
      ]}
    />
  );
};
