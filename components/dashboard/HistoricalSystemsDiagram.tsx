"use client";

import React from "react";
import { ReusableBranchingTreeDiagram } from "./ReusableBranchingTreeDiagram";

export const HistoricalSystemsDiagram: React.FC = () => {
  return (
    <ReusableBranchingTreeDiagram
      badgeText="CHAPTER 2: CLASSIFICATION SYSTEMS"
      title="HISTORICAL SYSTEMS OF CLASSIFICATION"
      subtitle="Evolution from empirical two-kingdom groupings to 16S/18S rRNA phylogenetic molecular clocks"
      takeawayText="NEST Concept: Linnaeus (2 Kingdoms) → Haeckel (3) → Copeland (4) → Whittaker (5) → Woese (3 Domains / 6 Kingdoms)"
      branches={[
        {
          title: "TWO-KINGDOM SYSTEM",
          subtitle: "Carl Linnaeus (1758)",
          badge: "Linnaean",
          badgeVariant: "indigo",
          iconName: "TreePine",
          accentColor: "indigo",
          items: [
            { text: "• Kingdom Plantae" },
            { text: "• Kingdom Animalia" },
          ],
          note: "Deficiency: Grouped fungi with plants, prokaryotes (bacteria) with complex eukaryotes, and unicellular with multicellular organisms.",
          footer: "Basic Anatomical Habit & Locomotion",
        },
        {
          title: "FIVE-KINGDOM SYSTEM",
          subtitle: "R. H. Whittaker (1969)",
          badge: "Standard NCERT",
          badgeVariant: "purple",
          iconName: "Layers",
          accentColor: "purple",
          items: [
            { text: "1. Monera (Prokaryotes)", badge: "Cellular" },
            { text: "2. Protista (Unicell Eukaryotes)", badge: "Cellular" },
            { text: "3. Fungi (Absorptive Heterotroph)", badge: "Mycelial" },
            { text: "4. Plantae (Photosynthetic)", badge: "Tissue/Organ" },
            { text: "5. Animalia (Ingestive)", badge: "Organ System" },
          ],
          footer: "5 Criteria: Cell, Body, Nutrition, Reproduction, Phylogeny",
        },
        {
          title: "THREE-DOMAIN SYSTEM",
          subtitle: "Carl Woese et al. (1990)",
          badge: "Molecular Clock",
          badgeVariant: "emerald",
          iconName: "Dna",
          accentColor: "emerald",
          items: [
            { text: "• Domain Bacteria (Eubacteria)" },
            { text: "• Domain Archaea (Extremophiles)" },
            { text: "• Domain Eukarya (4 Eukaryotic Kingdoms)" },
          ],
          note: "Based on 16S/18S rRNA small subunit gene sequencing. Split Monera into 2 separate domains.",
          footer: "Molecular Phylogeny & 16S/18S rRNA Clock",
        },
      ]}
    />
  );
};
