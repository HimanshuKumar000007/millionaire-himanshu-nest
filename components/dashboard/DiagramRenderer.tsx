"use client";

import React from "react";
import { CustomCodeBlock } from "@/components/dashboard/CustomMarkdownRenderer";
import { PropertiesOfLifeDiagram } from "@/components/dashboard/PropertiesOfLifeDiagram";
import { BiodiversityScaleDiagram } from "@/components/dashboard/BiodiversityScaleDiagram";
import { ThreeDomainTreeDiagram } from "@/components/dashboard/ThreeDomainTreeDiagram";
import { MembraneLipidDiagram } from "@/components/dashboard/MembraneLipidDiagram";
import { ReproductiveIsolationDiagram } from "@/components/dashboard/ReproductiveIsolationDiagram";
import { RingSpeciesDiagram } from "@/components/dashboard/RingSpeciesDiagram";
import { TaxonomicHierarchyDiagram } from "@/components/dashboard/TaxonomicHierarchyDiagram";
import { TautonymValidityDiagram } from "@/components/dashboard/TautonymValidityDiagram";
import { NomenclaturalTypesDiagram } from "@/components/dashboard/NomenclaturalTypesDiagram";
import { TaxonomicalAidsDiagram } from "@/components/dashboard/TaxonomicalAidsDiagram";
import { TaxonomicKeysDiagram } from "@/components/dashboard/TaxonomicKeysDiagram";
import { TaxonomicLiteratureDiagram } from "@/components/dashboard/TaxonomicLiteratureDiagram";
import { HistoricalSystemsDiagram } from "@/components/dashboard/HistoricalSystemsDiagram";
import { WhittakerCriteriaDiagram } from "@/components/dashboard/WhittakerCriteriaDiagram";
import { UniversalTreeDiagram, UniversalTreeData, parseAsciiToTree } from "@/components/dashboard/UniversalTreeDiagram";
import { UniversalFlowDiagram, UniversalFlowData, parseAsciiToFlow } from "@/components/dashboard/UniversalFlowDiagram";
import { UniversalAnatomyDiagram, UniversalAnatomyData, parseAsciiToAnatomy } from "@/components/dashboard/UniversalAnatomyDiagram";
import { CyanobacteriaDiagram } from "@/components/dashboard/CyanobacteriaDiagram";
import { GramStainingFlowDiagram } from "@/components/dashboard/GramStainingFlowDiagram";
import { BacterialEnvelopeDiagram } from "@/components/dashboard/BacterialEnvelopeDiagram";
import { PlasmodiumLifeCycleDiagram } from "@/components/dashboard/PlasmodiumLifeCycleDiagram";
import { BacterialConjugationDiagram } from "@/components/dashboard/BacterialConjugationDiagram";
import { FungalSexualCycleDiagram } from "@/components/dashboard/FungalSexualCycleDiagram";
import { ClampConnectionDiagram } from "@/components/dashboard/ClampConnectionDiagram";
import { AscomyceteSporeDiagram } from "@/components/dashboard/AscomyceteSporeDiagram";
import { PucciniaStagesDiagram } from "@/components/dashboard/PucciniaStagesDiagram";
import { VirusDiscoveryMilestonesDiagram } from "@/components/dashboard/VirusDiscoveryMilestonesDiagram";
import { ViralCyclesDiagram } from "@/components/dashboard/ViralCyclesDiagram";
import { BacteriophageStructureDiagram } from "@/components/dashboard/BacteriophageStructureDiagram";
import { LichenReproductiveUnitsDiagram } from "@/components/dashboard/LichenReproductiveUnitsDiagram";
import { DoliporeSeptumDiagram } from "@/components/dashboard/DoliporeSeptumDiagram";
import { PlantGrowthAndDevelopmentDiagram } from "@/components/dashboard/PlantGrowthAndDevelopmentDiagram";
import { BreathingAndExchangeOfGasesDiagram } from "@/components/dashboard/BreathingAndExchangeOfGasesDiagram";
import { BodyFluidsAndCirculationDiagram } from "@/components/dashboard/BodyFluidsAndCirculationDiagram";
import { DigestionAndAbsorptionDiagram } from "@/components/dashboard/DigestionAndAbsorptionDiagram";
import { ExcretoryProductsDiagram } from "@/components/dashboard/ExcretoryProductsDiagram";
import { LocomotionAndMovementDiagram } from "@/components/dashboard/LocomotionAndMovementDiagram";
import { NeuralControlAndCoordinationDiagram } from "@/components/dashboard/NeuralControlAndCoordinationDiagram";
import { ChemicalCoordinationDiagram } from "@/components/dashboard/ChemicalCoordinationDiagram";
import { SexualReproductionInFloweringPlantsDiagram } from "@/components/dashboard/SexualReproductionInFloweringPlantsDiagram";
import { HumanReproductionDiagram } from "@/components/dashboard/HumanReproductionDiagram";
import { ReproductiveHealthDiagram } from "@/components/dashboard/ReproductiveHealthDiagram";
import { PrinciplesOfInheritanceDiagram } from "@/components/dashboard/PrinciplesOfInheritanceDiagram";
import { MolecularBasisOfInheritanceDiagram } from "@/components/dashboard/MolecularBasisOfInheritanceDiagram";
import { EvolutionDiagram } from "@/components/dashboard/EvolutionDiagram";
import { HumanHealthAndDiseasesDiagram } from "@/components/dashboard/HumanHealthAndDiseasesDiagram";
import { MicrobesInHumanWelfareDiagram } from "@/components/dashboard/MicrobesInHumanWelfareDiagram";
import { BiotechnologyPrinciplesDiagram } from "@/components/dashboard/BiotechnologyPrinciplesDiagram";
import { BiotechnologyApplicationsDiagram } from "@/components/dashboard/BiotechnologyApplicationsDiagram";
import { OrganismsAndPopulationsDiagram } from "@/components/dashboard/OrganismsAndPopulationsDiagram";
import { EcosystemDiagram } from "@/components/dashboard/EcosystemDiagram";
import { BiodiversityDiagram } from "@/components/dashboard/BiodiversityDiagram";
import { BasicConceptsOfChemistryDiagram } from "@/components/dashboard/BasicConceptsOfChemistryDiagram";
import { AtomicStructureDiagram } from "@/components/dashboard/AtomicStructureDiagram";
import { PeriodicClassificationDiagram } from "@/components/dashboard/PeriodicClassificationDiagram";
import { ChemicalBondingDiagram } from "@/components/dashboard/ChemicalBondingDiagram";
import { ChemicalThermodynamicsDiagram } from "@/components/dashboard/ChemicalThermodynamicsDiagram";
import { EquilibriumDiagram } from "@/components/dashboard/EquilibriumDiagram";
import { RedoxReactionsDiagram } from "@/components/dashboard/RedoxReactionsDiagram";
import { OrganicChemistryPrinciplesDiagram } from "@/components/dashboard/OrganicChemistryPrinciplesDiagram";
import { HydrocarbonsDiagram } from "@/components/dashboard/HydrocarbonsDiagram";
import { SolutionsDiagram } from "@/components/dashboard/SolutionsDiagram";
import { ElectrochemistryDiagram } from "@/components/dashboard/ElectrochemistryDiagram";
import { ChemicalKineticsDiagram } from "@/components/dashboard/ChemicalKineticsDiagram";
import { DAndFBlockDiagram } from "@/components/dashboard/DAndFBlockDiagram";
import { CoordinationCompoundsDiagram } from "@/components/dashboard/CoordinationCompoundsDiagram";
import { HaloalkanesAndHaloarenesDiagram } from "@/components/dashboard/HaloalkanesAndHaloarenesDiagram";
import { AlcoholsPhenolsEthersDiagram } from "@/components/dashboard/AlcoholsPhenolsEthersDiagram";
import { AldehydesKetonesCarboxylicDiagram } from "@/components/dashboard/AldehydesKetonesCarboxylicDiagram";
import { AminesDiagram } from "@/components/dashboard/AminesDiagram";
import { BiomoleculesDiagram } from "@/components/dashboard/BiomoleculesDiagram";

export interface DiagramRendererProps {
  diagramType?: string;
  diagramData?: UniversalTreeData | UniversalFlowData | any;
  treeData?: UniversalTreeData;
  flowData?: UniversalFlowData;
  codeSnippet?: string;
  asciiDiagram?: string;
}

export function DiagramRenderer({
  diagramType,
  diagramData,
  treeData,
  flowData,
  codeSnippet,
  asciiDiagram,
}: DiagramRendererProps) {
  // Explicit structured data takes precedence
  if (treeData) {
    return <UniversalTreeDiagram data={treeData} />;
  }

  if (flowData) {
    return <UniversalFlowDiagram data={flowData} />;
  }

  if (diagramType === "branching-tree" && diagramData) {
    return <UniversalTreeDiagram data={diagramData} />;
  }

  if (diagramType === "process-flow" && diagramData) {
    return <UniversalFlowDiagram data={diagramData} />;
  }

  const raw = (asciiDiagram || codeSnippet || "").trim();
  const type = (diagramType || "").toLowerCase();

  // 1. Explicit diagramType matches
  if (type === "properties-of-life" || type === "properties_of_life") {
    return <PropertiesOfLifeDiagram />;
  }
  if (type === "biodiversity-scale" || type === "biodiversity_scale") {
    return <BiodiversityScaleDiagram />;
  }
  if (type === "three-domain" || type === "three_domain" || type === "three-domain-tree") {
    return <ThreeDomainTreeDiagram />;
  }
  if (type === "membrane-lipid" || type === "membrane_lipid" || type === "membrane-lipid-biochemistry") {
    return <MembraneLipidDiagram />;
  }
  if (type === "reproductive-isolation" || type === "reproductive_isolation") {
    return <ReproductiveIsolationDiagram />;
  }
  if (type === "ring-species" || type === "ring_species") {
    return <RingSpeciesDiagram />;
  }
  if (type === "taxonomic-hierarchy" || type === "taxonomic_hierarchy") {
    return <TaxonomicHierarchyDiagram />;
  }
  if (type === "tautonym-validity" || type === "tautonym_validity") {
    return <TautonymValidityDiagram />;
  }
  if (type === "nomenclatural-types" || type === "nomenclatural_types") {
    return <NomenclaturalTypesDiagram />;
  }
  if (type === "taxonomical-aids" || type === "taxonomical_aids") {
    return <TaxonomicalAidsDiagram />;
  }
  if (type === "taxonomic-keys" || type === "taxonomic_keys") {
    return <TaxonomicKeysDiagram />;
  }
  if (type === "taxonomic-literature" || type === "taxonomic_literature") {
    return <TaxonomicLiteratureDiagram />;
  }
  if (type === "historical-systems" || type === "historical_systems") {
    return <HistoricalSystemsDiagram />;
  }
  if (type === "whittaker-criteria" || type === "whittaker_criteria") {
    return <WhittakerCriteriaDiagram />;
  }
  if (type === "cyanobacteria-ultrastructure" || type === "cyanobacteria" || type === "heterocyst") {
    return <CyanobacteriaDiagram />;
  }
  if (type === "gram-staining" || type === "gram_staining" || type === "gram-staining-mechanism") {
    return <GramStainingFlowDiagram />;
  }
  if (type === "bacterial-envelope" || type === "bacterial_envelope" || type === "gram-envelope") {
    return <BacterialEnvelopeDiagram />;
  }
  if (type === "plasmodium-life-cycle" || type === "plasmodium") {
    return <PlasmodiumLifeCycleDiagram />;
  }
  if (type === "conjugation" || type === "bacterial-conjugation") {
    return <BacterialConjugationDiagram />;
  }
  if (type === "fungal-sexual-cycle" || type === "fungal_cycle") {
    return <FungalSexualCycleDiagram />;
  }
  if (type === "clamp-connection" || type === "clamp_connection") {
    return <ClampConnectionDiagram />;
  }
  if (type === "ascomycete-spore" || type === "ascomycete_spore") {
    return <AscomyceteSporeDiagram />;
  }
  if (type === "puccinia-stages" || type === "puccinia_stages") {
    return <PucciniaStagesDiagram />;
  }
  if (type === "virus-discovery" || type === "virus_milestones") {
    return <VirusDiscoveryMilestonesDiagram />;
  }
  if (type === "viral-cycles" || type === "lytic-lysogenic") {
    return <ViralCyclesDiagram />;
  }
  if (type === "bacteriophage-structure" || type === "bacteriophage") {
    return <BacteriophageStructureDiagram />;
  }
  if (
    type === "plant-growth" ||
    type === "plant_growth" ||
    type === "plant-growth-and-development" ||
    type === "phytohormones" ||
    type === "photoperiodism"
  ) {
    return <PlantGrowthAndDevelopmentDiagram />;
  }
  if (
    type === "breathing" ||
    type === "breathing-and-exchange-of-gases" ||
    type === "respiration-in-humans" ||
    type === "spirometry" ||
    type === "bohr-effect" ||
    type === "chloride-shift"
  ) {
    return <BreathingAndExchangeOfGasesDiagram />;
  }
  if (
    type === "body-fluids" ||
    type === "body-fluids-and-circulation" ||
    type === "circulation" ||
    type === "blood-coagulation" ||
    type === "cardiac-cycle" ||
    type === "ecg" ||
    type === "abo-blood-group"
  ) {
    return <BodyFluidsAndCirculationDiagram />;
  }
  if (
    type === "digestion" ||
    type === "digestion-and-absorption" ||
    type === "alimentary-canal" ||
    type === "dentition" ||
    type === "gastric-glands" ||
    type === "pancreatic-zymogens" ||
    type === "chylomicron" ||
    type === "marasmus-kwashiorkor" ||
    type === "gi-hormones"
  ) {
    return <DigestionAndAbsorptionDiagram />;
  }
  if (
    type === "excretion" ||
    type === "excretory-products" ||
    type === "excretory-products-and-their-elimination" ||
    type === "nephron" ||
    type === "countercurrent" ||
    type === "raas" ||
    type === "hemodialysis" ||
    type === "ultrafiltration"
  ) {
    return <ExcretoryProductsDiagram />;
  }
  if (
    type === "locomotion" ||
    type === "locomotion-and-movement" ||
    type === "muscle" ||
    type === "sarcomere" ||
    type === "sliding-filament" ||
    type === "skeleton" ||
    type === "joints" ||
    type === "myasthenia"
  ) {
    return <LocomotionAndMovementDiagram />;
  }
  if (
    type === "neural" ||
    type === "neural-control-and-coordination" ||
    type === "neuron" ||
    type === "action-potential" ||
    type === "synapse" ||
    type === "brain" ||
    type === "cns" ||
    type === "ans"
  ) {
    return <NeuralControlAndCoordinationDiagram />;
  }
  if (
    type === "endocrine" ||
    type === "chemical-coordination" ||
    type === "chemical-coordination-and-integration" ||
    type === "hormone" ||
    type === "pituitary" ||
    type === "thyroid" ||
    type === "adrenal" ||
    type === "diabetes"
  ) {
    return <ChemicalCoordinationDiagram />;
  }
  if (
    type === "sexual-reproduction-in-flowering-plants" ||
    type === "flowering-plants" ||
    type === "angiosperm-reproduction" ||
    type === "microsporogenesis" ||
    type === "megasporogenesis" ||
    type === "embryo-sac" ||
    type === "pollination" ||
    type === "double-fertilization" ||
    type === "apomixis" ||
    type === "plant-reproduction"
  ) {
    return <SexualReproductionInFloweringPlantsDiagram />;
  }
  if (
    type === "human-reproduction" ||
    type === "spermatogenesis" ||
    type === "oogenesis" ||
    type === "menstrual-cycle" ||
    type === "fertilization" ||
    type === "blastocyst" ||
    type === "placenta" ||
    type === "parturition" ||
    type === "lactation" ||
    type === "embryogenesis"
  ) {
    return <HumanReproductionDiagram />;
  }
  if (
    type === "reproductive-health" ||
    type === "reproductive_health" ||
    type === "contraceptives" ||
    type === "contraceptive-methods" ||
    type === "iud" ||
    type === "iuds" ||
    type === "amniocentesis" ||
    type === "pcpndt" ||
    type === "mtp" ||
    type === "stis" ||
    type === "stds" ||
    type === "art" ||
    type === "assisted-reproductive-technologies" ||
    type === "ivf" ||
    type === "zift" ||
    type === "gift" ||
    type === "icsi" ||
    type === "iui"
  ) {
    return <ReproductiveHealthDiagram />;
  }
  if (
    type === "principles-of-inheritance-and-variation" ||
    type === "principles-of-inheritance" ||
    type === "inheritance-and-variation" ||
    type === "genetics" ||
    type === "mendel" ||
    type === "mendelian-genetics" ||
    type === "monohybrid-cross" ||
    type === "dihybrid-cross" ||
    type === "test-cross" ||
    type === "incomplete-dominance" ||
    type === "co-dominance" ||
    type === "multiple-alleles" ||
    type === "abo-blood" ||
    type === "pleiotropy" ||
    type === "polygenic-inheritance" ||
    type === "chromosome-theory" ||
    type === "linkage" ||
    type === "recombination" ||
    type === "gene-mapping" ||
    type === "sex-determination" ||
    type === "haplodiploidy" ||
    type === "pedigree-analysis" ||
    type === "pedigree" ||
    type === "sickle-cell" ||
    type === "aneuploidy" ||
    type === "down-syndrome" ||
    type === "turner-syndrome" ||
    type === "klinefelter-syndrome"
  ) {
    return <PrinciplesOfInheritanceDiagram />;
  }
  if (
    type === "molecular-basis-of-inheritance" ||
    type === "molecular-basis" ||
    type === "molecular-genetics" ||
    type === "dna-replication" ||
    type === "replication-fork" ||
    type === "transcription" ||
    type === "translation" ||
    type === "genetic-code" ||
    type === "lac-operon" ||
    type === "hgp" ||
    type === "dna-fingerprinting" ||
    type === "nucleosome" ||
    type === "trna" ||
    type === "hershey-chase" ||
    type === "meselson-stahl"
  ) {
    return <MolecularBasisOfInheritanceDiagram />;
  }
  if (
    type === "evolution" ||
    type === "origin-of-life" ||
    type === "origin_of_life" ||
    type === "miller-urey" ||
    type === "homology" ||
    type === "analogy" ||
    type === "adaptive-radiation" ||
    type === "darwin" ||
    type === "lamarck" ||
    type === "hardy-weinberg" ||
    type === "natural-selection" ||
    type === "genetic-drift" ||
    type === "founder-effect" ||
    type === "bottleneck-effect" ||
    type === "human-evolution" ||
    type === "hominid-evolution" ||
    type === "archaeopteryx"
  ) {
    return <EvolutionDiagram />;
  }
  if (
    type === "human-health-and-diseases" ||
    type === "human-health" ||
    type === "human-diseases" ||
    type === "pathogens" ||
    type === "plasmodium" ||
    type === "malaria" ||
    type === "immunity" ||
    type === "antibodies" ||
    type === "immunoglobulin" ||
    type === "allergy" ||
    type === "autoimmunity" ||
    type === "cancer" ||
    type === "hiv" ||
    type === "aids" ||
    type === "drugs" ||
    type === "opioids" ||
    type === "cannabinoids" ||
    type === "cocaine"
  ) {
    return <HumanHealthAndDiseasesDiagram />;
  }
  if (
    type === "microbes-in-human-welfare" ||
    type === "microbes" ||
    type === "microbiology" ||
    type === "fermentation" ||
    type === "sewage-treatment" ||
    type === "stp" ||
    type === "bod" ||
    type === "biogas" ||
    type === "biocontrol" ||
    type === "biofertilizer" ||
    type === "statins" ||
    type === "cyclosporin" ||
    type === "streptokinase" ||
    type === "baculovirus" ||
    type === "mycorrhiza" ||
    type === "glomus"
  ) {
    return <MicrobesInHumanWelfareDiagram />;
  }
  if (
    type === "biotechnology-principles-and-processes" ||
    type === "biotechnology-principles" ||
    type === "biotechnology" ||
    type === "genetic-engineering" ||
    type === "rdna" ||
    type === "recombinant-dna" ||
    type === "restriction-enzymes" ||
    type === "restriction-endonucleases" ||
    type === "pbr322" ||
    type === "cloning-vectors" ||
    type === "blue-white-screening" ||
    type === "insertional-inactivation" ||
    type === "gel-electrophoresis" ||
    type === "pcr" ||
    type === "polymerase-chain-reaction" ||
    type === "bioreactors" ||
    type === "downstream-processing" ||
    type === "dsp"
  ) {
    return <BiotechnologyPrinciplesDiagram />;
  }
  if (
    type === "biotechnology-and-its-applications" ||
    type === "biotechnology-applications" ||
    type === "bt-crops" ||
    type === "bt-cotton" ||
    type === "cry-toxin" ||
    type === "rnai" ||
    type === "rna-interference" ||
    type === "tissue-culture" ||
    type === "totipotency" ||
    type === "micropropagation" ||
    type === "meristem-culture" ||
    type === "somatic-hybridization" ||
    type === "protoplast" ||
    type === "pomato" ||
    type === "humulin" ||
    type === "insulin" ||
    type === "gene-therapy" ||
    type === "ada-deficiency" ||
    type === "scid" ||
    type === "transgenic-animals" ||
    type === "rosie-cow" ||
    type === "geac" ||
    type === "biopiracy"
  ) {
    return <BiotechnologyApplicationsDiagram />;
  }
  if (
    type === "organisms-and-populations" ||
    type === "organisms-populations" ||
    type === "population-ecology" ||
    type === "population-attributes" ||
    type === "age-pyramids" ||
    type === "population-growth" ||
    type === "exponential-growth" ||
    type === "logistic-growth" ||
    type === "r-selection" ||
    type === "k-selection" ||
    type === "population-interactions" ||
    type === "mutualism" ||
    type === "pseudocopulation" ||
    type === "ophrys" ||
    type === "competition" ||
    type === "gauses-principle" ||
    type === "competitive-release" ||
    type === "resource-partitioning" ||
    type === "predation" ||
    type === "parasitism" ||
    type === "brood-parasitism" ||
    type === "commensalism" ||
    type === "amensalism"
  ) {
    return <OrganismsAndPopulationsDiagram />;
  }
  if (
    type === "ecosystem" ||
    type === "ecosystems" ||
    type === "stratification" ||
    type === "productivity" ||
    type === "gpp" ||
    type === "npp" ||
    type === "decomposition" ||
    type === "humification" ||
    type === "mineralization" ||
    type === "energy-flow" ||
    type === "lindeman-law" ||
    type === "10-percent-law" ||
    type === "food-chain" ||
    type === "grazing-food-chain" ||
    type === "detritus-food-chain" ||
    type === "gfc" ||
    type === "dfc" ||
    type === "standing-crop" ||
    type === "standing-state" ||
    type === "ecological-pyramids" ||
    type === "pyramid-of-numbers" ||
    type === "pyramid-of-biomass" ||
    type === "pyramid-of-energy" ||
    type === "inverted-pyramid"
  ) {
    return <EcosystemDiagram />;
  }
  if (
    type === "biodiversity" ||
    type === "biodiversity-conservation" ||
    type === "species-area" ||
    type === "species-area-relationship" ||
    type === "evil-quartet" ||
    type === "in-situ" ||
    type === "in-situ-conservation" ||
    type === "ex-situ" ||
    type === "ex-situ-conservation" ||
    type === "hotspots" ||
    type === "biodiversity-hotspots" ||
    type === "sacred-groves" ||
    type === "biosphere-reserves" ||
    type === "cryopreservation" ||
    type === "red-list" ||
    type === "iucn-red-list" ||
    type === "rivet-popper" ||
    type === "tilman-experiment"
  ) {
    return <BiodiversityDiagram />;
  }
  if (
    type === "basic-concepts-of-chemistry" ||
    type === "basic_concepts_of_chemistry" ||
    type === "some-basic-concepts-of-chemistry" ||
    type === "laws-of-chemical-combination" ||
    type === "mole-concept" ||
    type === "mole_concept" ||
    type === "avogadro" ||
    type === "atomic-mass" ||
    type === "molar-mass" ||
    type === "stoichiometry-chemistry" ||
    type === "limiting-reagent" ||
    type === "eudiometry" ||
    type === "vapour-density" ||
    type === "vapor-density" ||
    type === "dulong-petit" ||
    type === "concentration-terms" ||
    type === "molarity-molality" ||
    type === "empirical-molecular-formula" ||
    type === "combustion-analysis" ||
    type === "chemistry-chapter-1"
  ) {
    return <BasicConceptsOfChemistryDiagram />;
  }
  if (
    type === "atomic-structure" ||
    type === "atomic_structure" ||
    type === "structure-of-atom" ||
    type === "structure_of_atom" ||
    type === "bohr-model" ||
    type === "bohrs-model" ||
    type === "photoelectric-effect" ||
    type === "quantum-numbers" ||
    type === "schrodinger-equation" ||
    type === "heisenberg-uncertainty" ||
    type === "de-broglie" ||
    type === "rydberg-formula" ||
    type === "aufbau-principle" ||
    type === "hunds-rule" ||
    type === "pauli-exclusion" ||
    type === "exchange-energy" ||
    type === "radial-probability" ||
    type === "orbital-nodes" ||
    type === "subatomic-particles" ||
    type === "rutherford-scattering" ||
    type === "chemistry-chapter-2"
  ) {
    return <AtomicStructureDiagram />;
  }
  if (
    type === "periodic-classification" ||
    type === "periodic_classification" ||
    type === "classification-of-elements" ||
    type === "classification_of_elements" ||
    type === "periodic-properties" ||
    type === "periodicity-in-properties" ||
    type === "slater-rules" ||
    type === "effective-nuclear-charge" ||
    type === "lanthanide-contraction" ||
    type === "inert-pair-effect" ||
    type === "electronegativity-scales" ||
    type === "ionization-enthalpy" ||
    type === "electron-gain-enthalpy" ||
    type === "moseleys-law" ||
    type === "chemistry-chapter-3"
  ) {
    return <PeriodicClassificationDiagram />;
  }
  if (
    type === "chemical-bonding" ||
    type === "chemical_bonding" ||
    type === "chemical-bonding-and-molecular-structure" ||
    type === "chemical_bonding_and_molecular_structure" ||
    type === "born-haber-cycle" ||
    type === "fajans-rules" ||
    type === "vsepr-theory" ||
    type === "bents-rule" ||
    type === "molecular-orbital-theory" ||
    type === "mot-diagram" ||
    type === "hydrogen-bonding" ||
    type === "dipole-moments" ||
    type === "valence-bond-theory" ||
    type === "chemistry-chapter-4"
  ) {
    return <ChemicalBondingDiagram />;
  }
  if (
    type === "chemical-thermodynamics" ||
    type === "chemical_thermodynamics" ||
    type === "thermodynamics" ||
    type === "gaseous-state" ||
    type === "first-law-thermodynamics" ||
    type === "second-law-thermodynamics" ||
    type === "third-law-thermodynamics" ||
    type === "gibbs-free-energy" ||
    type === "entropy" ||
    type === "hess-law" ||
    type === "van-der-waals" ||
    type === "chemistry-chapter-5"
  ) {
    return <ChemicalThermodynamicsDiagram />;
  }
  if (
    type === "equilibrium" ||
    type === "chemical-equilibrium" ||
    type === "ionic-equilibrium" ||
    type === "le-chatelier" ||
    type === "ostwald-dilution" ||
    type === "buffer-solutions" ||
    type === "salt-hydrolysis" ||
    type === "solubility-product" ||
    type === "ksp" ||
    type === "chemistry-chapter-6"
  ) {
    return <EquilibriumDiagram />;
  }
  if (
    type === "redox-reactions" ||
    type === "redox_reactions" ||
    type === "redox" ||
    type === "oxidation-reduction" ||
    type === "oxidation-number" ||
    type === "balancing-redox" ||
    type === "ion-electron-method" ||
    type === "disproportionation" ||
    type === "comproportionation" ||
    type === "n-factor" ||
    type === "equivalent-mass" ||
    type === "permanganometry" ||
    type === "dichrometry" ||
    type === "iodometry" ||
    type === "iodimetry" ||
    type === "chemistry-chapter-7"
  ) {
    return <RedoxReactionsDiagram />;
  }
  if (
    type === "organic-chemistry-principles" ||
    type === "organic_chemistry_principles" ||
    type === "iupac-nomenclature" ||
    type === "iupac" ||
    type === "purification-techniques" ||
    type === "distillation" ||
    type === "steam-distillation" ||
    type === "vacuum-distillation" ||
    type === "lassaigne-test" ||
    type === "dumas-method" ||
    type === "kjeldahl-method" ||
    type === "carius-method" ||
    type === "electronic-displacements" ||
    type === "inductive-effect" ||
    type === "resonance-effect" ||
    type === "hyperconjugation" ||
    type === "heat-of-hydrogenation" ||
    type === "carbocations" ||
    type === "carbanions" ||
    type === "free-radicals" ||
    type === "electrophiles-nucleophiles" ||
    type === "chemistry-chapter-8"
  ) {
    return <OrganicChemistryPrinciplesDiagram />;
  }
  if (
    type === "hydrocarbons" ||
    type === "alkanes" ||
    type === "alkenes" ||
    type === "alkynes" ||
    type === "arenes" ||
    type === "aromatic-hydrocarbons" ||
    type === "conformations-of-ethane" ||
    type === "radical-halogenation" ||
    type === "wurtz-reaction" ||
    type === "kolbe-electrolysis" ||
    type === "corey-house" ||
    type === "markovnikov-addition" ||
    type === "anti-markovnikov" ||
    type === "kharasch-effect" ||
    type === "omdm" ||
    type === "hydroboration-oxidation" ||
    type === "ozonolysis" ||
    type === "terminal-alkynes" ||
    type === "kucherov-hydration" ||
    type === "huckel-rule" ||
    type === "aromaticity" ||
    type === "sear" ||
    type === "friedel-crafts" ||
    type === "chemistry-chapter-9"
  ) {
    return <HydrocarbonsDiagram />;
  }
  if (
    type === "solutions" ||
    type === "henrys-law" ||
    type === "raoults-law" ||
    type === "ideal-solutions" ||
    type === "non-ideal-solutions" ||
    type === "azeotropes" ||
    type === "colligative-properties" ||
    type === "rlvp" ||
    type === "ebullioscopy" ||
    type === "boiling-point-elevation" ||
    type === "cryoscopy" ||
    type === "freezing-point-depression" ||
    type === "osmosis" ||
    type === "osmotic-pressure" ||
    type === "reverse-osmosis" ||
    type === "vant-hoff-factor" ||
    type === "abnormal-molar-mass" ||
    type === "chemistry-chapter-10" ||
    type === "chemistry-class-12-chapter-1"
  ) {
    return <SolutionsDiagram />;
  }
  if (
    type === "electrochemistry" ||
    type === "galvanic-cells" ||
    type === "electrochemical-cells" ||
    type === "daniell-cell" ||
    type === "nernst-equation" ||
    type === "concentration-cells" ||
    type === "electrolytic-conductance" ||
    type === "molar-conductivity" ||
    type === "kohlrausch-law" ||
    type === "debye-huckel-onsager" ||
    type === "electrolysis" ||
    type === "faradays-laws" ||
    type === "batteries" ||
    type === "fuel-cells" ||
    type === "corrosion" ||
    type === "rusting-of-iron" ||
    type === "chemistry-chapter-11" ||
    type === "chemistry-class-12-chapter-2"
  ) {
    return <ElectrochemistryDiagram />;
  }
  if (
    type === "chemical-kinetics" ||
    type === "reaction-rates" ||
    type === "order-of-reaction" ||
    type === "molecularity" ||
    type === "zero-order-kinetics" ||
    type === "first-order-kinetics" ||
    type === "pseudo-first-order" ||
    type === "arrhenius-equation" ||
    type === "activation-energy" ||
    type === "catalysis-kinetics" ||
    type === "collision-theory" ||
    type === "chemistry-chapter-12" ||
    type === "chemistry-class-12-chapter-3"
  ) {
    return <ChemicalKineticsDiagram />;
  }
  if (
    type === "d-and-f-block-elements" ||
    type === "d_and_f_block_elements" ||
    type === "d-block-elements" ||
    type === "f-block-elements" ||
    type === "transition-elements" ||
    type === "lanthanides" ||
    type === "actinides" ||
    type === "potassium-permanganate" ||
    type === "potassium-dichromate" ||
    type === "kmno4" ||
    type === "k2cr2o7" ||
    type === "lanthanide-contraction" ||
    type === "actinide-contraction" ||
    type === "spin-only-magnetic-moment" ||
    type === "chemistry-chapter-13" ||
    type === "chemistry-class-12-chapter-4"
  ) {
    return <DAndFBlockDiagram />;
  }
  if (
    type === "coordination-compounds" ||
    type === "coordination_compounds" ||
    type === "coordination-chemistry" ||
    type === "werners-theory" ||
    type === "iupac-coordination" ||
    type === "crystal-field-theory" ||
    type === "valence-bond-theory" ||
    type === "cft" ||
    type === "vbt" ||
    type === "cfse" ||
    type === "spectrochemical-series" ||
    type === "geometrical-isomerism-coordination" ||
    type === "optical-isomerism-coordination" ||
    type === "fac-mer-isomerism" ||
    type === "cisplatin" ||
    type === "chemistry-chapter-14" ||
    type === "chemistry-class-12-chapter-5"
  ) {
    return <CoordinationCompoundsDiagram />;
  }
  if (
    type === "haloalkanes-and-haloarenes" ||
    type === "haloalkanes_and_haloarenes" ||
    type === "haloalkanes" ||
    type === "haloarenes" ||
    type === "alkyl-halides" ||
    type === "aryl-halides" ||
    type === "sn1-sn2" ||
    type === "sn1" ||
    type === "sn2" ||
    type === "snar" ||
    type === "benzyne" ||
    type === "iodoform-test" ||
    type === "freons" ||
    type === "ddt" ||
    type === "chemistry-chapter-15" ||
    type === "chemistry-class-12-chapter-6"
  ) {
    return <HaloalkanesAndHaloarenesDiagram />;
  }
  if (
    type === "alcohols-phenols-ethers" ||
    type === "alcohols_phenols_ethers" ||
    type === "alcohols" ||
    type === "phenols" ||
    type === "ethers" ||
    type === "lucas-test" ||
    type === "victor-meyer-test" ||
    type === "cumene-process" ||
    type === "kolbe-reaction" ||
    type === "reimer-tiemann" ||
    type === "williamson-ether-synthesis" ||
    type === "picric-acid" ||
    type === "salicylic-acid" ||
    type === "salicylaldehyde" ||
    type === "anisole" ||
    type === "chemistry-chapter-16" ||
    type === "chemistry-class-12-chapter-7"
  ) {
    return <AlcoholsPhenolsEthersDiagram />;
  }
  if (
    type === "aldehydes-ketones-carboxylic-acids" ||
    type === "aldehydes_ketones_carboxylic_acids" ||
    type === "aldehydes" ||
    type === "ketones" ||
    type === "carboxylic-acids" ||
    type === "aldol-condensation" ||
    type === "cannizzaro-reaction" ||
    type === "clemmensen-reduction" ||
    type === "wolff-kishner" ||
    type === "tollens-test" ||
    type === "fehling-test" ||
    type === "hvz-reaction" ||
    type === "hell-volhard-zelinsky" ||
    type === "rosenmund-reduction" ||
    type === "dibal-h" ||
    type === "etard-reaction" ||
    type === "gattermann-koch" ||
    type === "chemistry-chapter-17" ||
    type === "chemistry-class-12-chapter-8"
  ) {
    return <AldehydesKetonesCarboxylicDiagram />;
  }
  if (
    type === "amines" ||
    type === "amines-and-diazonium-salts" ||
    type === "amines_and_diazonium_salts" ||
    type === "diazonium-salts" ||
    type === "aniline" ||
    type === "gabriel-phthalimide" ||
    type === "hofmann-bromamide" ||
    type === "hinsberg-test" ||
    type === "carbylamine-test" ||
    type === "sandmeyer-reaction" ||
    type === "gattermann-reaction" ||
    type === "balz-schiemann" ||
    type === "azo-coupling" ||
    type === "sulfanilic-acid" ||
    type === "chemistry-chapter-18" ||
    type === "chemistry-class-12-chapter-9"
  ) {
    return <AminesDiagram />;
  }
  if (
    type === "biomolecules" ||
    type === "biomolecules-chemistry" ||
    type === "biomolecules_chemistry" ||
    type === "carbohydrates" ||
    type === "glucose" ||
    type === "fructose" ||
    type === "sucrose" ||
    type === "maltose" ||
    type === "lactose" ||
    type === "starch" ||
    type === "cellulose" ||
    type === "glycogen" ||
    type === "amino-acids" ||
    type === "proteins" ||
    type === "protein-structure" ||
    type === "vitamins" ||
    type === "nucleic-acids" ||
    type === "dna" ||
    type === "rna" ||
    type === "chemistry-chapter-19" ||
    type === "chemistry-class-12-chapter-10"
  ) {
    return <BiomoleculesDiagram />;
  }

  // 2. Pattern-based signature matching on content / ASCII

  if (
    raw.includes("LAWS OF CHEMICAL COMBINATION") ||
    raw.includes("THE MOLE CONVERSION TRIAD") ||
    raw.includes("STP CONDITIONS & MOLAR VOLUMES") ||
    raw.includes("FORMULA DETERMINATION CASCADE") ||
    raw.includes("CONCENTRATION EXPRESSIONS") ||
    raw.includes("STOICHIOMETRIC CONVERSION BRIDGE") ||
    raw.includes("LIMITING REAGENT SELECTION PROTOCOL") ||
    raw.includes("EUDIOMETRY SELECTIVE ABSORBERS") ||
    raw.includes("COMBUSTION ABSORPTION TRAIN") ||
    raw.includes("DULONG-PETIT") ||
    raw.includes("ISOTOPIC WEIGHTED AVERAGE")
  ) {
    return <BasicConceptsOfChemistryDiagram />;
  }

  if (
    raw.includes("SUBATOMIC PARTICLES MATRIX") ||
    raw.includes("RUTHERFORD SCATTERING DYNAMICS") ||
    raw.includes("PHOTOELECTRIC EFFECT ENERGY BALANCE") ||
    raw.includes("KINETIC ENERGY vs FREQUENCY PLOT") ||
    raw.includes("BOHR'S POSTULATES") ||
    raw.includes("HYDROGEN ATOMIC TRANSITIONS") ||
    raw.includes("BOHR ORBIT STANDING WAVE CONDITION") ||
    raw.includes("RADIAL PROBABILITY DISTRIBUTIONS") ||
    raw.includes("QUANTUM NUMBERS SPECTRUM") ||
    raw.includes("NODAL CLASSIFICATION SUMMARY") ||
    raw.includes("ELECTRON FILLING RULES") ||
    raw.includes("EXCHANGE ENERGY COMPARISON")
  ) {
    return <AtomicStructureDiagram />;
  }

  if (
    raw.includes("HISTORICAL PERIODIC TABLE MILESTONES") ||
    raw.includes("MOSELEY'S X-RAY FREQUENCY LAW") ||
    raw.includes("SLATER'S RULES SHIELDING GROUPS") ||
    raw.includes("SLATER Z_eff CALCULATION FOR 4s IN ZINC") ||
    raw.includes("ATOMIC RADII TYPES") ||
    raw.includes("PERIOD 2 IONIZATION ENTHALPY ANOMALIES") ||
    raw.includes("ELECTRONEGATIVITY SCALES") ||
    raw.includes("GROUP 1 HYDRATION vs MOBILITY") ||
    raw.includes("CAUSES OF ANOMALOUS FIRST-ROW BEHAVIOR") ||
    raw.includes("INERT PAIR EFFECT MECHANISM") ||
    raw.includes("STABILITY SPECTRUM (Heavy p-Block)")
  ) {
    return <PeriodicClassificationDiagram />;
  }

  if (
    raw.includes("BORN-HABER THERMODYNAMIC CYCLE") ||
    raw.includes("FAJANS' POLARIZATION MECHANISM") ||
    raw.includes("FAJANS' RULES") ||
    raw.includes("DIPOLE MOMENT VECTOR") ||
    raw.includes("NH₃ vs NF₃ DIPOLE MOMENT COMPARISON") ||
    raw.includes("ORBITAL OVERLAP TYPES") ||
    raw.includes("RESONANCE IN CARBONATE ION") ||
    raw.includes("STERIC NUMBER (SN) FORMULA") ||
    raw.includes("BENT'S RULE IN TBP GEOMETRY") ||
    raw.includes("PCl₃F₂ GEOMETRIC ISOMERISM") ||
    raw.includes("HYBRID ORBITAL PARTICIPATION MATRIX") ||
    raw.includes("LCAO INTERFERENCE MECHANISM") ||
    raw.includes("MO ENERGY LEVEL ORDERING COMPARISON") ||
    raw.includes("HYDROGEN BOND TYPES") ||
    raw.includes("o-NITROPHENOL vs p-NITROPHENOL")
  ) {
    return <ChemicalBondingDiagram />;
  }

  if (
    raw.includes("THERMODYNAMIC SYSTEM TYPES") ||
    raw.includes("PROPERTY CLASSIFICATION") ||
    raw.includes("PRESSURE-VOLUME (P-V) WORK SIGN CONVENTIONS") ||
    raw.includes("REVERSIBLE vs IRREVERSIBLE WORK") ||
    raw.includes("REVERSIBLE vs IRREVERSIBLE EXPANSION WORK") ||
    raw.includes("DEGREE OF FREEDOM & HEAT CAPACITIES") ||
    raw.includes("THERMOCHEMICAL ENTHALPIES") ||
    raw.includes("HESS'S LAW APPLICATIONS") ||
    raw.includes("ENTROPY FORMULA SPECTRUM") ||
    raw.includes("SPONTANEITY CRITERIA AT CONSTANT T, P") ||
    raw.includes("MAXWELL-BOLTZMANN SPEED DISTRIBUTION") ||
    raw.includes("COMPRESSIBILITY FACTOR (Z)") ||
    raw.includes("COMPRESSIBILITY FACTOR (Z) PLOT") ||
    raw.includes("CRITICAL CONSTANTS")
  ) {
    return <ChemicalThermodynamicsDiagram />;
  }

  if (
    raw.includes("DYNAMIC CHEMICAL EQUILIBRIUM") ||
    raw.includes("LE CHATELIER'S PERTURBATION RESPONSES") ||
    raw.includes("SALT HYDROLYSIS & pH FORMULAS") ||
    raw.includes("SOLUBILITY PRODUCT RELATIONSHIPS") ||
    raw.includes("HENDERSON-HASSELBALCH") ||
    raw.includes("OSTWALD'S DILUTION LAW") ||
    raw.includes("K_p = K_c (RT)^Δn_g") ||
    raw.includes("ACIDIC BUFFER (CH₃COOH + CH₃COONa)")
  ) {
    return <EquilibriumDiagram />;
  }

  if (
    raw.includes("REDOX DEFINITIONAL SPECTRUM") ||
    raw.includes("OXIDANT vs REDUCTANT ROLES") ||
    raw.includes("CHROMIUM PEROXIDE (CrO₅) BUTTERFLY STRUCTURE") ||
    raw.includes("CARO'S ACID (H₂SO₅) & MARSHALL'S ACID (H₂S₂O₈)") ||
    raw.includes("REDOX REACTION TYPES") ||
    raw.includes("DISPROPORTIONATION vs COMPROPORTIONATION") ||
    raw.includes("HALF-REACTION BALANCING PROTOCOL") ||
    raw.includes("KMnO₄ REDOX BEHAVIOR vs pH REGIME") ||
    raw.includes("n-FACTOR FOR MULTI-ELEMENTAL OXIDATION") ||
    raw.includes("REDOX TITRATION TYPES") ||
    raw.includes("IODIMETRY vs IODOMETRY SCHEMATIC") ||
    raw.includes("INDUSTRIAL REDOX APPLICATIONS")
  ) {
    return <RedoxReactionsDiagram />;
  }

  if (
    raw.includes("IUPAC NAME ARCHITECTURE") ||
    raw.includes("FUNCTIONAL GROUP PRIORITY ORDER") ||
    raw.includes("PURIFICATION SELECTION MAP") ||
    raw.includes("LASSAIGNE'S EXTRACT QUALITATIVE TESTS") ||
    raw.includes("QUANTITATIVE ESTIMATION METHODS") ||
    raw.includes("QUANTITATIVE ESTIMATION FORMULAS MATRIX") ||
    raw.includes("ELECTRONIC DISPLACEMENT EFFECTS") ||
    raw.includes("ELECTRONIC DISPLACEMENT ORDERS") ||
    raw.includes("HYPERCONJUGATIVE OVERLAP SCHEMATIC") ||
    raw.includes("HYPERCONJUGATION & ALKENE STABILITY") ||
    raw.includes("BOND FISSION MODES") ||
    raw.includes("REACTIVE INTERMEDIATES COMPARISON") ||
    raw.includes("CARBOCATION REARRANGEMENT MECHANISM") ||
    raw.includes("CARBOCATION 1,2-METHYL SHIFT") ||
    raw.includes("REAGENT TAXONOMY") ||
    raw.includes("ORGANIC REACTION TYPES")
  ) {
    return <OrganicChemistryPrinciplesDiagram />;
  }

  if (
    raw.includes("ETHANE CONFORMATIONAL SPECTRUM") ||
    raw.includes("NEWMAN & SAWHORSE PROJECTIONS") ||
    raw.includes("FREE RADICAL HALOGENATION CHAIN") ||
    raw.includes("ABSTRACTION SELECTIVITY RATIOS") ||
    raw.includes("ALKANE SYNTHETIC ROUTES") ||
    raw.includes("GEOMETRICAL ISOMERISM (E/Z)") ||
    raw.includes("ELIMINATION REGIOSELECTIVITY RULES") ||
    raw.includes("A_E MECHANISM & MARKOVNIKOV'S RULE") ||
    raw.includes("ALKENE HYDRATION MATRIX") ||
    raw.includes("KHARASCH PEROXIDE MECHANISM") ||
    raw.includes("ALKENE OXIDATION PATHWAYS") ||
    raw.includes("REDUCTIVE OZONOLYSIS MECHANISM") ||
    raw.includes("TERMINAL ALKYNE ACIDITY MECHANISM") ||
    raw.includes("TERMINAL ALKYNE DIAGNOSTIC TESTS") ||
    raw.includes("KUCHEROV ALKYNE HYDRATION") ||
    raw.includes("AROMATICITY CRITERIA") ||
    raw.includes("AROMATICITY COMPARISON MATRIX") ||
    raw.includes("S_EAr THREE-STEP MECHANISM") ||
    raw.includes("ARENIUM ION RESONANCE HYBRID") ||
    raw.includes("THE HALOGEN ANOMALY")
  ) {
    return <HydrocarbonsDiagram />;
  }

  if (
    raw.includes("SOLUTION CLASSIFICATIONS") ||
    raw.includes("CONCENTRATION EXPRESSIONS") ||
    raw.includes("HENRY'S LAW THERMODYNAMICS") ||
    raw.includes("HENRY'S LAW APPLICATIONS") ||
    raw.includes("RAOULT'S LAW VAPOUR PRESSURE DIAGRAM") ||
    raw.includes("RAOULT'S LAW VAPOUR PRESSURE EQUATION") ||
    raw.includes("NON-IDEAL SOLUTIONS") ||
    raw.includes("AZEOTROPIC MIXTURES") ||
    raw.includes("FOUR COLLIGATIVE PROPERTIES") ||
    raw.includes("BOILING POINT ELEVATION PHASE DIAGRAM") ||
    raw.includes("FREEZING POINT DEPRESSION PHASE DIAGRAM") ||
    raw.includes("OSMOTIC PRESSURE SETUP") ||
    raw.includes("CELLULAR OSMOTIC STATES") ||
    raw.includes("REVERSE OSMOSIS DESALINATION") ||
    raw.includes("VAN 'T HOFF FACTOR ($i$) DEFINITION") ||
    raw.includes("VAN 'T HOFF FACTOR ($i$) REGIMES") ||
    raw.includes("BENZOIC ACID DIMERIZATION IN BENZENE")
  ) {
    return <SolutionsDiagram />;
  }

  if (
    raw.includes("ELECTROCHEMICAL CELL CLASSES") ||
    raw.includes("DANIELL CELL ANATOMY") ||
    raw.includes("ELECTROCHEMICAL SERIES HIGHLIGHTS") ||
    raw.includes("NERNST CELL POTENTIAL vs LOG Q PLOT") ||
    raw.includes("CONCENTRATION CELL NOTATION") ||
    raw.includes("ELECTROLYTIC CONDUCTANCE EQUATIONS") ||
    raw.includes("MOLAR & EQUIVALENT CONDUCTIVITY FORMULAS") ||
    raw.includes("DEBYE-HÜCKEL-ONSAGER PLOT") ||
    raw.includes("KOHLRAUSCH'S LAW APPLICATIONS") ||
    raw.includes("PREFERENTIAL DISCHARGE THEORY") ||
    raw.includes("ELECTROLYSIS OF AQUEOUS") ||
    raw.includes("FARADAY'S QUANTITATIVE LAWS") ||
    raw.includes("COMMERCIAL BATTERIES") ||
    raw.includes("MERCURY CELL CHEMISTRY") ||
    raw.includes("LEAD STORAGE BATTERY DISCHARGING") ||
    raw.includes("H₂-O₂ FUEL CELL SCHEMATIC") ||
    raw.includes("RUSTING ELECTROCHEMICAL CELL") ||
    raw.includes("RUSTING ELECTROCHEMICAL MECHANISM")
  ) {
    return <ElectrochemistryDiagram />;
  }

  if (
    raw.includes("REACTION RATE CONCEPTS") ||
    raw.includes("STOICHIOMETRIC RATE NORMALIZATION") ||
    raw.includes("STOICHIOMETRIC RATE EQUIVALENCES") ||
    raw.includes("ORDER vs MOLECULARITY") ||
    raw.includes("RATE CONSTANT UNITS BY ORDER") ||
    raw.includes("ZERO-ORDER INTEGRATED KINETICS") ||
    raw.includes("ZERO-ORDER GRAPHICAL PLOTS") ||
    raw.includes("FIRST-ORDER INTEGRATED KINETICS") ||
    raw.includes("FIRST-ORDER GRAPHICAL PLOTS") ||
    raw.includes("FIRST-ORDER FRACTIONAL TIMELINES") ||
    raw.includes("GAS-PHASE FIRST-ORDER DERIVATION") ||
    raw.includes("PSEUDO-FIRST-ORDER KINETICS") ||
    raw.includes("TEMPERATURE COEFFICIENT") ||
    raw.includes("THE ARRHENIUS EQUATION") ||
    raw.includes("ARRHENIUS LINEAR PLOTS") ||
    raw.includes("ARRHENIUS GRAPHICAL PLOT") ||
    raw.includes("POTENTIAL ENERGY REACTION PROFILES") ||
    raw.includes("CATALYZED VS UNCATALYZED PATHWAY") ||
    raw.includes("COLLISION THEORY CRITERIA") ||
    raw.includes("GENERAL n-TH ORDER HALF-LIFE")
  ) {
    return <ChemicalKineticsDiagram />;
  }

  if (
    raw.includes("d-BLOCK TAXONOMY & EXCLUSIONS") ||
    raw.includes("3d SERIES ENTHALPY OF ATOMIZATION TREND") ||
    raw.includes("3d SERIES ATOMIC RADII TREND") ||
    raw.includes("SUCCESSIVE IONIZATION ANOMALIES") ||
    raw.includes("3d SERIES OXIDATION STATES") ||
    raw.includes("REDOX STABILITY ANALYSIS") ||
    raw.includes("DISPROPORTIONATION OF Cu") ||
    raw.includes("SPIN-ONLY MAGNETIC MOMENTS") ||
    raw.includes("ORIGIN OF COLOR IN d-BLOCK") ||
    raw.includes("POTASSIUM DICHROMATE INDUSTRIAL SYNTHESIS") ||
    raw.includes("CHROMATE vs DICHROMATE STRUCTURES") ||
    raw.includes("CHROMATE-DICHROMATE pH EQUILIBRIUM") ||
    raw.includes("OXIDIZING ACTION OF K₂Cr₂O₇") ||
    raw.includes("POTASSIUM PERMANGANATE SYNTHESIS") ||
    raw.includes("MANGANATE vs PERMANGANATE") ||
    raw.includes("OXIDIZING BEHAVIOR ACROSS pH REGIMES") ||
    raw.includes("LANTHANIDE CONFIGURATION") ||
    raw.includes("ANOMALOUS LANTHANIDE OXIDATION STATES") ||
    raw.includes("LANTHANIDE CONTRACTION CURVE") ||
    raw.includes("ACTINIDES (5f SERIES) OVERVIEW") ||
    raw.includes("COMPARATIVE MATRIX: LANTHANIDES")
  ) {
    return <DAndFBlockDiagram />;
  }

  if (
    raw.includes("WERNER'S DUAL VALENCY THEORY") ||
    raw.includes("DOUBLE SALTS vs COORDINATION COMPLEXES") ||
    raw.includes("LIGAND DENTICITY CLASSES") ||
    raw.includes("AMBIDENTATE BINDING MODES") ||
    raw.includes("MONONUCLEAR COMPLEX IUPAC NAMING") ||
    raw.includes("STRUCTURAL ISOMERISM CLASSES") ||
    raw.includes("DIAGNOSTIC ISOMER TESTS") ||
    raw.includes("STEREOISOMERISM CLASSES") ||
    raw.includes("FACIAL (fac) vs MERIDIONAL (mer) ISOMERISM") ||
    raw.includes("OPTICAL RESOLUTION IN OCTAHEDRAL SYSTEMS") ||
    raw.includes("VBT HYBRIDIZATION & GEOMETRY") ||
    raw.includes("INNER ORBITAL vs OUTER ORBITAL COMPLEXES") ||
    raw.includes("VBT COMPLEX PROFILES MATRIX") ||
    raw.includes("OCTAHEDRAL CRYSTAL FIELD SPLITTING") ||
    raw.includes("TETRAHEDRAL CRYSTAL FIELD SPLITTING") ||
    raw.includes("SPECTROCHEMICAL SERIES OF LIGANDS") ||
    raw.includes("CFSE FOR $d^4$ OCTAHEDRAL SYSTEMS") ||
    raw.includes("COMPLEMENTARY COLOR WHEEL") ||
    raw.includes("LANDMARK APPLICATIONS SUMMARY")
  ) {
    return <CoordinationCompoundsDiagram />;
  }

  if (
    raw.includes("C–X BOND COMPARISON") ||
    raw.includes("C-X BOND COMPARISON") ||
    raw.includes("UNREACTIVITY CAUSES OF HALOARENES") ||
    raw.includes("CHLOROBENZENE RESONANCE CANONICALS") ||
    raw.includes("S_N1 vs S_N2 REACTION PROFILES") ||
    raw.includes("$S_N1$ vs $S_N2$ REACTION PROFILES") ||
    raw.includes("S_N2 WALDEN INVERSION TRANSITION STATE") ||
    raw.includes("$S_N2$ WALDEN INVERSION TRANSITION STATE") ||
    raw.includes("S_N1 vs S_N2 COMPARISON MATRIX") ||
    raw.includes("STEREOCHEMICAL TERMINOLOGY") ||
    raw.includes("STEREOCHEMICAL OUTCOMES") ||
    raw.includes("S_N\\text{Ar} MEISENHEIMER COMPLEX STABILIZATION") ||
    raw.includes("ACTIVATION TRAJECTORY FOR CHLOROBENZENE") ||
    raw.includes("BENZYNE ELIMINATION-ADDITION") ||
    raw.includes("BENZYNE TRIPLE BOND STRUCTURE") ||
    raw.includes("ELECTROPHILIC SUBSTITUTION ON CHLOROBENZENE") ||
    raw.includes("SAFE STORAGE OF CHLOROFORM") ||
    raw.includes("IODOFORM REACTION SCHEME") ||
    raw.includes("POSITIVE vs NEGATIVE IODOFORM SUBSTRATES") ||
    raw.includes("ENVIRONMENTAL TOXICANTS") ||
    raw.includes("CATALYTIC OZONE DESTRUCTION CYCLE") ||
    raw.includes("DDT CHEMICAL STRUCTURE")
  ) {
    return <HaloalkanesAndHaloarenesDiagram />;
  }

  if (
    raw.includes("ALCOHOL CLASSIFICATIONS") ||
    raw.includes("ALKENE HYDRATION PATHWAYS") ||
    raw.includes("DIAGNOSTIC TEST SUMMARY") ||
    raw.includes("VICTOR MEYER TEST REACTION FLOW") ||
    raw.includes("VICTOR MEYER COLOR MATRIX") ||
    raw.includes("DEHYDROGENATION / DEHYDRATION OVER HOT COPPER") ||
    raw.includes("OXIDATION SUMMARY FOR ALCOHOLS") ||
    raw.includes("ACID-CATALYZED DEHYDRATION MECHANISM") ||
    raw.includes("METHANOL SYNTHESIS & ENZYMATIC TOXICITY") ||
    raw.includes("DENATURED ALCOHOL COMPOSITION") ||
    raw.includes("ACIDITY COMPARISON ($\\text{p}K_a$)") ||
    raw.includes("ACIDITY COMPARISON (pK_a)") ||
    raw.includes("PHENOXIDE ANION RESONANCE CANONICALS") ||
    raw.includes("NITROPHENOL ACIDITY SPECTRUM") ||
    raw.includes("PHENOL SYNTHETIC ROUTES") ||
    raw.includes("CUMENE HYDROPEROXIDE PROCESS") ||
    raw.includes("PHENOL ELECTROPHILIC REACTIONS") ||
    raw.includes("PHENOL BROMINATION & QUALITATIVE TESTS") ||
    raw.includes("ETHER PREPARATIONS") ||
    raw.includes("WILLIAMSON SUBSTRATE CONSTRAINT") ||
    raw.includes("ETHER CLEAVAGE BY HI") ||
    raw.includes("ETHER CLEAVAGE REACTION EXAMPLES")
  ) {
    return <AlcoholsPhenolsEthersDiagram />;
  }

  if (
    raw.includes("CARBONYL POLARITY & APPROACH") ||
    raw.includes("CARBONYL REACTIVITY FACTORS") ||
    raw.includes("CARBONYL REACTIVITY HIERARCHY") ||
    raw.includes("NUCLEOPHILIC ADDITION MECHANISM") ||
    raw.includes("NUCLEOPHILIC ADDITION PRODUCTS") ||
    raw.includes("NUCLEOPHILIC ADDITION STEPWISE CASCADE") ||
    raw.includes("CYCLIC ACETAL PROTECTION") ||
    raw.includes("AMMONIA DERIVATIVES MATRIX") ||
    raw.includes("SEMICARBAZIDE NUCLEOPHILICITY SELECTION") ||
    raw.includes("ENOLATE ANION RESONANCE") ||
    raw.includes("alpha-HYDROGEN REACTIVITY SPECTRUM") ||
    raw.includes("$\\alpha$-HYDROGEN REACTIVITY SPECTRUM") ||
    raw.includes("ALDOL CONDENSATION MECHANISM") ||
    raw.includes("CANNIZZARO & IODOFORM REACTIONS") ||
    raw.includes("DEOXYGENATION REDUCTION MODES") ||
    raw.includes("DEOXYGENATION REDUCTIONS") ||
    raw.includes("ALDEHYDE OXIDATION DIAGNOSTICS") ||
    raw.includes("POPOFF'S RULE") ||
    raw.includes("CARBOXYLATE ANION RESONANCE") ||
    raw.includes("ACIDITY MODULATION BY SUBSTITUENTS") ||
    raw.includes("INDUCTIVE ACIDITY TREND") ||
    raw.includes("BENZOIC ACID ORTHO-EFFECT") ||
    raw.includes("CARBOXYLIC ACID SYNTHESES") ||
    raw.includes("ACID DERIVATIVE REACTIVITY HIERARCHY") ||
    raw.includes("DECARBOXYLATION PATHWAYS") ||
    raw.includes("HELL-VOLHARD-ZELINSKY (HVZ) REACTION") ||
    raw.includes("HVZ MECHANISM ARCHITECTURE")
  ) {
    return <AldehydesKetonesCarboxylicDiagram />;
  }

  if (
    raw.includes("PYRAMIDAL INVERSION (UMBRELLA INVERSION)") ||
    raw.includes("PYRAMIDAL INVERSION") ||
    raw.includes("UMBRELLA INVERSION") ||
    raw.includes("EXCEPTIONS TO INVERSION RACEMIZATION") ||
    raw.includes("FACTORS GOVERNING AQUEOUS BASICITY") ||
    raw.includes("GAS PHASE BASICITY") ||
    raw.includes("AQUEOUS PHASE BASICITY") ||
    raw.includes("ANILINE RESONANCE DELOCALIZATION") ||
    raw.includes("AMINE PREPARATIVE ROUTES") ||
    raw.includes("GABRIEL PHTHALIMIDE MECHANISM") ||
    raw.includes("HOFMANN BROMAMIDE MECHANISTIC CASCADE") ||
    raw.includes("AMINE IDENTIFICATION TESTS") ||
    raw.includes("ANILINE PROTECTION & REGIOSELECTIVITY") ||
    raw.includes("THE ANILINIUM META-NITRATION MECHANISM") ||
    raw.includes("DIAZONIUM REACTION PATHWAYS") ||
    raw.includes("SANDMEYER vs GATTERMANN COMPARISON") ||
    raw.includes("DIAZONIUM DISPLACEMENT MATRIX") ||
    raw.includes("AZO DYE COUPLING REACTIONS")
  ) {
    return <AminesDiagram />;
  }

  if (
    raw.includes("CARBOHYDRATE CLASSIFICATION") ||
    raw.includes("FISCHER PROJECTION D/L CONFIGURATIONS") ||
    raw.includes("GLUCOSE CHEMICAL REACTIONS") ||
    raw.includes("GLUCOSE ANOMERS") ||
    raw.includes("HAWORTH PYRANOSE RING STRUCTURES") ||
    raw.includes("LOBRY DE BRUYN-EKENSTEIN ENOLIZATION") ||
    raw.includes("LOBRY DE BRUYN-EKENSTEIN") ||
    raw.includes("DISACCHARIDE COMPARISON") ||
    raw.includes("INVERSION OF SUGAR MECHANICS") ||
    raw.includes("INVERSION OF CANE SUGAR") ||
    raw.includes("POLYSACCHARIDE TYPES") ||
    raw.includes("ZWITTERIONIC DISSOCIATION") ||
    raw.includes("PEPTIDE BOND PLANARITY") ||
    raw.includes("PROTEIN STRUCTURAL HIERARCHY") ||
    raw.includes("DENATURATION EFFECTS") ||
    raw.includes("VITAMIN CLASSIFICATIONS") ||
    raw.includes("HORMONE CHEMICAL CLASSES") ||
    raw.includes("NITROGENOUS BASE CHEMICAL TAXONOMY") ||
    raw.includes("DNA vs RNA STRUCTURAL COMPARISON")
  ) {
    return <BiomoleculesDiagram />;
  }

  if (
    raw.includes("THREE HIERARCHICAL LEVELS") ||
    raw.includes("GLOBAL TAXONOMIC PROPORTIONS") ||
    raw.includes("INDIAN BIODIVERSITY METRICS") ||
    raw.includes("PATTERNS OF BIODIVERSITY") ||
    raw.includes("SPECIES-AREA RECTANGULAR HYPERBOLA") ||
    raw.includes("ECOSYSTEM STABILITY MODELS") ||
    raw.includes("RECENT EXTINCTION TAXA") ||
    raw.includes("THE \"EVIL QUARTET\"") ||
    raw.includes("ALIEN INVASIVE SPECIES EXAMPLES") ||
    raw.includes("BIODIVERSITY CONSERVATION RATIONALES") ||
    raw.includes("IN-SITU CONSERVATION MODALITIES") ||
    raw.includes("BIOSPHERE RESERVE ZONATION") ||
    raw.includes("EX-SITU CONSERVATION MODALITIES") ||
    raw.includes("INTERNATIONAL CONSERVATION CONVENTIONS") ||
    raw.includes("IUCN RED LIST HIERARCHY")
  ) {
    return <BiodiversityDiagram />;
  }
  if (
    raw.includes("ECOSYSTEM STRUCTURAL MATRIX") ||
    raw.includes("VERTICAL STRATIFICATION (FOREST)") ||
    raw.includes("PRODUCTIVITY CATEGORIES") ||
    raw.includes("GROSS vs NET PRIMARY PRODUCTIVITY") ||
    raw.includes("GLOBAL NPP DISTRIBUTION") ||
    raw.includes("THE FIVE DECOMPOSITION STEPS") ||
    raw.includes("DECOMPOSITION RATE REGULATION") ||
    raw.includes("SOLAR RADIATION CAPTURE") ||
    raw.includes("10% TROPHIC ENERGY PYRAMID") ||
    raw.includes("TROPHIC LEVEL ARCHITECTURE") ||
    raw.includes("GRAZING vs DETRITUS FOOD CHAINS") ||
    raw.includes("ECOLOGICAL PYRAMIDS") ||
    raw.includes("INVERTED PYRAMIDS EXAMPLES") ||
    raw.includes("LIMITATIONS OF ECOLOGICAL MODELS")
  ) {
    return <EcosystemDiagram />;
  }
  if (
    raw.includes("POPULATION ATTRIBUTES") ||
    raw.includes("AGE PYRAMID MORPHOLOGIES") ||
    raw.includes("AGE PYRAMID DIAGRAM SCHEMATIC") ||
    raw.includes("POPULATION DYNAMICS MATRIX") ||
    raw.includes("EXPONENTIAL (J) vs LOGISTIC (S) CURVE") ||
    raw.includes("LIFE HISTORY STRATEGIES") ||
    raw.includes("POPULATION INTERACTION SPECTRUM") ||
    raw.includes("MUTUALISTIC EXAMPLES") ||
    raw.includes("COMPETITIVE MECHANISMS") ||
    raw.includes("CONNELL'S COMPETITIVE RELEASE FIELD TRIAL") ||
    raw.includes("ECOLOGICAL ROLES OF PREDATORS") ||
    raw.includes("PREY DEFENSE MECHANISMS") ||
    raw.includes("PARASITISM ADAPTATIONS") ||
    raw.includes("COMMENSALISM vs AMENSALISM")
  ) {
    return <OrganismsAndPopulationsDiagram />;
  }
  if (
    raw.includes("AGRICULTURAL EVOLUTIONARY STAGES") ||
    raw.includes("ADVANTAGES OF GM CROPS") ||
    raw.includes("Bt CRY TOXIN MIDGUT SOLUBILIZATION CASCADE") ||
    raw.includes("Bt CRY GENE TARGET SPECIFICITY") ||
    raw.includes("RNAi TRANSGENIC TOBACCO PROTECTION") ||
    raw.includes("RNA INTERFERENCE (RNAi) CASCADE") ||
    raw.includes("TISSUE CULTURE PRINCIPLES") ||
    raw.includes("PRO-INSULIN vs MATURE INSULIN") ||
    raw.includes("ELI LILLY HUMULIN RECOMBINANT PROTOCOL") ||
    raw.includes("ADA DEFICIENCY & SCID PATHOLOGY") ||
    raw.includes("CLINICAL GENE THERAPY PROTOCOL") ||
    raw.includes("MOLECULAR DIAGNOSTIC TOOLS") ||
    raw.includes("TRANSGENIC ANIMAL APPLICATIONS") ||
    raw.includes("FAMOUS BIOPIRACY DISPUTES")
  ) {
    return <BiotechnologyApplicationsDiagram />;
  }
  if (
    raw.includes("CORE PILLARS OF MODERN BIOTECHNOLOGY") ||
    raw.includes("RESTRICTION ENDONUCLEASES") ||
    raw.includes("ECO RI PALINDROMIC CLEAVAGE") ||
    raw.includes("BLUNT END CLEAVAGE") ||
    raw.includes("ESSENTIAL VECTOR FEATURES") ||
    raw.includes("pBR322 RESTRICTION MAP") ||
    raw.includes("BLUE-WHITE SCREENING MECHANISM") ||
    raw.includes("HOST TRANSFORMATION METHODS") ||
    raw.includes("rDNA PROCESS WORKFLOW") ||
    raw.includes("AGAROSE GEL ELECTROPHORESIS") ||
    raw.includes("PCR 3-STEP THERMAL CYCLE") ||
    raw.includes("PCR THERMAL CYCLE SCHEMATIC") ||
    raw.includes("BIOREACTOR TYPES") ||
    raw.includes("SPARGED STIRRED-TANK BIOREACTOR") ||
    raw.includes("DSP WORKFLOW STAGES")
  ) {
    return <BiotechnologyPrinciplesDiagram />;
  }
  if (
    raw.includes("HOUSEHOLD MICROBIAL APPLICATIONS") ||
    raw.includes("INDUSTRIAL MICROBIAL PRODUCTS") ||
    raw.includes("ANTIBIOTIC DISCOVERY MILESTONES") ||
    raw.includes("MICROBIAL ORGANIC ACID PRODUCERS") ||
    raw.includes("INDUSTRIAL ENZYMES & BIOACTIVE MOLECULES") ||
    raw.includes("SEWAGE TREATMENT FLOWCHART") ||
    raw.includes("PRIMARY vs SECONDARY SEWAGE TREATMENT") ||
    raw.includes("BIOGAS COMPOSITION SPECTRUM") ||
    raw.includes("BIOGAS PLANT ARCHITECTURE") ||
    raw.includes("BIOCONTROL AGENT TAXONOMY") ||
    raw.includes("BIO-FERTILIZER CLASSES") ||
    raw.includes("NITROGEN-FIXING MICROBES") ||
    raw.includes("MYCORRHIZAL SYMBIOSIS")
  ) {
    return <MicrobesInHumanWelfareDiagram />;
  }
  if (
    raw.includes("HUMAN PATHOGEN CLASSES") ||
    raw.includes("PLASMODIUM DUAL-HOST LIFE CYCLE") ||
    raw.includes("PLASMODIUM HUMAN HOST STEPS") ||
    raw.includes("INNATE IMMUNITY BARRIERS") ||
    raw.includes("ACQUIRED IMMUNITY BRANCHES") ||
    raw.includes("ANTIBODY MOLECULAR STRUCTURE") ||
    raw.includes("IMMUNITY TYPES") ||
    raw.includes("ALLERGIC HYPERSENSITIVITY CASCADE") ||
    raw.includes("KEY AUTOIMMUNE DISEASES") ||
    raw.includes("CANCER HALLMARKS") ||
    raw.includes("HIV VIRION STRUCTURE") ||
    raw.includes("HIV REPLICATION & PATHOGENESIS") ||
    raw.includes("CLASSES OF ABUSED DRUGS")
  ) {
    return <HumanHealthAndDiseasesDiagram />;
  }
  if (
    raw.includes("PRIMORDIAL EARTH CONDITIONS") ||
    raw.includes("MILLER-UREY EXPERIMENTAL APPARATUS") ||
    raw.includes("EVIDENCES FOR EVOLUTION") ||
    raw.includes("EVOLUTIONARY PATTERNS COMPARISON") ||
    raw.includes("ADAPTIVE RADIATION EXAMPLES") ||
    raw.includes("CONVERGENT MARSUPIAL-PLACENTAL ANALOGUES") ||
    raw.includes("EVOLUTIONARY THEORIES") ||
    raw.includes("TYPES OF NATURAL SELECTION") ||
    raw.includes("NATURAL SELECTION POPULATION CURVES") ||
    raw.includes("HARDY-WEINBERG MATHEMATICAL EQUATIONS") ||
    raw.includes("FACTORS DISTURBING HW EQUILIBRIUM") ||
    raw.includes("GENETIC DRIFT MODES") ||
    raw.includes("FOUNDER EFFECT SCHEMATIC") ||
    raw.includes("GEOLOGICAL TIME SCALE") ||
    raw.includes("HUMAN EVOLUTION LINEAGE")
  ) {
    return <EvolutionDiagram />;
  }
  if (
    raw.includes("SEARCH FOR GENETIC MATERIAL") ||
    raw.includes("GRIFFITH'S EXPERIMENTAL PROTOCOL") ||
    raw.includes("HERSHEY-CHASE EXPERIMENTAL SETUP") ||
    raw.includes("HERSHEY-CHASE PROTOCOL & RESULTS") ||
    raw.includes("THE RNA WORLD HYPOTHESIS") ||
    raw.includes("RNA CLASSES") ||
    raw.includes("tRNA CLOVERLEAF vs L-SHAPE") ||
    raw.includes("B-DNA DOUBLE HELIX PARAMETERS") ||
    raw.includes("NUCLEOSOME CORE PARTICLE ARCHITECTURE") ||
    raw.includes("EUKARYOTIC CHROMATIN PACKAGING") ||
    raw.includes("MESELSON & STAHL EXPERIMENT") ||
    raw.includes("REPLICATION FORK ARCHITECTURE") ||
    raw.includes("THE CENTRAL DOGMA") ||
    raw.includes("TRANSCRIPTION UNIT ARCHITECTURE") ||
    raw.includes("PROKARYOTIC TRANSCRIPTION INITIATION") ||
    raw.includes("EUKARYOTIC RNA POLYMERASE TYPES") ||
    raw.includes("hnRNA PROCESSING CASCADE") ||
    raw.includes("SPLICING & hnRNA PROCESSING") ||
    raw.includes("GENETIC CODE PROPERTIES") ||
    raw.includes("WOBBLE PAIRING AT 3rd CODON BASE") ||
    raw.includes("TRANSLATION CASCADE STAGES") ||
    raw.includes("RIBOSOMAL SITES & PEPTIDE BOND") ||
    raw.includes("LAC OPERON GENE MAP") ||
    raw.includes("NEGATIVE CONTROL (INDUCER EFFECT)") ||
    raw.includes("POSITIVE CONTROL (CATABOLITE REPRESSION)") ||
    raw.includes("HGP SALIENT FINDINGS") ||
    raw.includes("DNA FINGERPRINTING WORKFLOW")
  ) {
    return <MolecularBasisOfInheritanceDiagram />;
  }
  if (
    raw.includes("MENDEL'S EXPERIMENTAL ADVANTAGES") ||
    raw.includes("MENDEL'S THREE LAWS") ||
    raw.includes("TEST CROSS ARCHITECTURE") ||
    raw.includes("EXTENSIONS TO MENDELISM") ||
    raw.includes("ABO GENETICS MATRIX") ||
    raw.includes("PLEIOTROPY vs POLYGENIC INHERITANCE") ||
    raw.includes("POLYGENIC PHENOTYPIC DISTRIBUTION") ||
    raw.includes("GENE vs CHROMOSOME BEHAVIOR PARALLELISM") ||
    raw.includes("DROSOPHILA EXPERIMENTAL ADVANTAGES") ||
    raw.includes("LINKAGE vs RECOMBINATION") ||
    raw.includes("MORGAN'S LINKAGE CROSS COMPARISON") ||
    raw.includes("GENE MAPPING EXAMPLE") ||
    raw.includes("SEX DETERMINATION SYSTEMS") ||
    raw.includes("HONEYBEE HAPLODIPLOPIDY") ||
    raw.includes("PEDIGREE SYMBOLS") ||
    raw.includes("PEDIGREE PATTERN RECOGNITION RULES") ||
    raw.includes("MENDELIAN DISORDERS") ||
    raw.includes("SICKLE-CELL ANEMIA POINT MUTATION") ||
    raw.includes("CHROMOSOMAL ANEUPLOIDIES")
  ) {
    return <PrinciplesOfInheritanceDiagram />;
  }
  if (
    raw.includes("NATIONAL REPRODUCTIVE HEALTH TIMELINE") ||
    raw.includes("AMNIOCENTESIS PROCEDURE FLOW") ||
    raw.includes("AMNIOCENTESIS DIAGNOSTIC USES") ||
    raw.includes("POPULATION EXPLOSION DRIVERS") ||
    raw.includes("CONTRACEPTIVE MODALITIES") ||
    raw.includes("IUD CATEGORIES") ||
    raw.includes("MECHANISM OF COPPER-RELEASING IUDs") ||
    raw.includes("STERILIZATION METHOD COMPARISON") ||
    raw.includes("MTP ACT LEGAL AMENDMENTS") ||
    raw.includes("MIFEREPRISTONE (RU-486) ABORTION MECHANISM") ||
    raw.includes("MIFEPRISTONE (RU-486) ABORTION MECHANISM") ||
    raw.includes("PATHOGENIC CLASSES OF STIs") ||
    raw.includes("ASSISTED REPRODUCTIVE TECHNOLOGIES (ART)") ||
    raw.includes("IVF-ET PROTOCOL STAGES") ||
    raw.includes("IN-VIVO ART MODALITIES MATRIX")
  ) {
    return <ReproductiveHealthDiagram />;
  }
  if (
    raw.includes("MALE REPRODUCTIVE TRACT PATHWAY") ||
    raw.includes("SEMINIFEROUS TUBULE CROSS-SECTION") ||
    raw.includes("SPERMATOGENESIS FLOW CHART") ||
    raw.includes("SPERMIOGENESIS METAMORPHOSIS") ||
    raw.includes("FEMALE REPRODUCTIVE TRACT LAYOUT") ||
    raw.includes("FOLLICULOGENESIS SPECTRUM") ||
    raw.includes("TERTIARY & GRAAFIAN FOLLICLE LAYERS") ||
    raw.includes("GAMETOGENESIS TIMELINE COMPARISON") ||
    raw.includes("MENSTRUCTUAL CYCLE PHASES") ||
    raw.includes("MENSTRUAL CYCLE HORMONAL OVERLAY") ||
    raw.includes("FERTILIZATION CASCADE") ||
    raw.includes("BLOCKS TO POLYSPERMY") ||
    raw.includes("EARLY EMBRYONIC CLEAVAGE") ||
    raw.includes("BLASTOCYST ANATOMICAL DIVISIONS") ||
    raw.includes("BLASTOCYST DIAGRAM") ||
    raw.includes("PLACENTAL ARCHITECTURE") ||
    raw.includes("PLACENTAL HORMONES") ||
    raw.includes("FETAL EJECTION REFLEX NEUROENDOCRINE CASCADE") ||
    raw.includes("LACTATION HORMONAL DUALITY") ||
    raw.includes("COLOSTRUM IMMUNOLOGICAL VALUE")
  ) {
    return <HumanReproductionDiagram />;
  }
  if (
    raw.includes("FLORAL WHORL ORGANIZATION") ||
    raw.includes("ANTHER WALL HISTOLOGY") ||
    raw.includes("MICROSPOROGENESIS REACTION PATHWAY") ||
    raw.includes("POLLEN GRAIN WALL LAYERS") ||
    raw.includes("MALE GAMETOPHYTE DEVELOPMENT") ||
    raw.includes("OVULE ANATOMICAL PARTS") ||
    raw.includes("OVULE STRUCTURAL TYPES") ||
    raw.includes("MEGASPOROGENESIS CASCADE") ||
    raw.includes("POLYGONUM-TYPE EMBRYO SAC") ||
    raw.includes("EMBRYO SAC ARCHITECTURE") ||
    raw.includes("POLLINATION CATEGORIES") ||
    raw.includes("POLLINATION AGENCIES") ||
    raw.includes("OUTBREEDING DEVICES") ||
    raw.includes("GAMETOPHYTIC vs SPOROPHYTIC SI") ||
    raw.includes("POLLEN TUBE ENTRY ROUTES") ||
    raw.includes("DOUBLE FERTILIZATION") ||
    raw.includes("ENDOSPERM TYPES") ||
    raw.includes("COCONUT ENDOSPERM ANATOMY") ||
    raw.includes("EMBRYO DEVELOPMENTAL STAGES") ||
    raw.includes("DICOT vs MONOCOT EMBRYO ANATOMY") ||
    raw.includes("FLORAL TO SEED/FRUIT MAPPING") ||
    raw.includes("SPECIAL REPRODUCTIVE MODES")
  ) {
    return <SexualReproductionInFloweringPlantsDiagram />;
  }
  if (
    raw.includes("CHEMICAL CLASSES OF HORMONES") ||
    raw.includes("HORMONE RECEPTOR MECHANISMS") ||
    raw.includes("GPCR-cAMP SIGNAL TRANSDUCTION") ||
    raw.includes("PLC-IP₃ / DAG SIGNAL TRANSDUCTION") ||
    raw.includes("INTRACELLULAR / NUCLEAR RECEPTOR CASCADE") ||
    raw.includes("HYPOTHALAMIC-PITUITARY AXIS") ||
    raw.includes("PITUITARY GLAND (Hypophysis)") ||
    raw.includes("THYROID GLAND ANATOMY") ||
    raw.includes("SERUM CALCIUM REGULATION CASCADES") ||
    raw.includes("ADRENAL GLAND ZONATION") ||
    raw.includes("CATECHOLAMINE EMERGENCY EFFECTS") ||
    raw.includes("PANCREATIC ISLET CELL TYPES") ||
    raw.includes("BLOOD GLUCOSE REGULATORY CASCADES") ||
    raw.includes("DIABETES MELLITUS TYPE COMPARISON") ||
    raw.includes("ENDOCRINE PATHOLOGY SPECTRUM")
  ) {
    return <ChemicalCoordinationDiagram />;
  }
  if (
    raw.includes("NEURON ANATOMICAL DIVISIONS") ||
    raw.includes("NEURON STRUCTURAL TYPES") ||
    raw.includes("NEUROGLIAL CELL TYPES") ||
    raw.includes("RESTING MEMBRANE IONIC GRADIENTS") ||
    raw.includes("MAINTENANCE OF RESTING POTENTIAL") ||
    raw.includes("ACTION POTENTIAL PHASES") ||
    raw.includes("VOLTAGE-GATED ION CHANNEL STATES") ||
    raw.includes("SALTATORY CONDUCTION SCHEMATIC") ||
    raw.includes("SYNAPSE TAXONOMY") ||
    raw.includes("CHEMICAL SYNAPTIC CASCADE") ||
    raw.includes("POSTSYNAPTIC POTENTIALS") ||
    raw.includes("MENINGEAL LAYERS") ||
    raw.includes("VENTRICULAR CSF FLOW PATHWAY") ||
    raw.includes("HUMAN BRAIN DIVISIONS") ||
    raw.includes("CEREBRAL LOBE FUNCTIONAL MAP") ||
    raw.includes("BRAINSTEM COMPONENTS") ||
    raw.includes("PERIPHERAL NERVE DISTRIBUTION") ||
    raw.includes("AUTONOMIC NERVOUS SYSTEM")
  ) {
    return <NeuralControlAndCoordinationDiagram />;
  }
  if (
    raw.includes("TYPES OF ANIMAL MOVEMENTS") ||
    raw.includes("MUSCLE TISSUE TYPES") ||
    raw.includes("SKELETAL MUSCLE HIERARCHY") ||
    raw.includes("SARCOMERE ULTRASTRUCTURE") ||
    raw.includes("MYOFILAMENT PROTEINS") ||
    raw.includes("THIN FILAMENT ARCHITECTURE") ||
    raw.includes("NEUROMUSCULAR EXCITATION CASCADE") ||
    raw.includes("CROSS-BRIDGE POWER STROKE CYCLE") ||
    raw.includes("STRUCTURAL CHANGES DURING CONTRACTION") ||
    raw.includes("MUSCLE ATP SOURCES") ||
    raw.includes("HUMAN SKELETON (206 Bones)") ||
    raw.includes("AXIAL SKELETON BREAKDOWN") ||
    raw.includes("APPENDICULAR SKELETON BREAKDOWN") ||
    raw.includes("JOINT CLASSIFICATIONS") ||
    raw.includes("SYNOVIAL JOINT SUBTYPES") ||
    raw.includes("MUSCULOSKELETAL PATHOLOGIES")
  ) {
    return <LocomotionAndMovementDiagram />;
  }
  if (
    raw.includes("MODES OF NITROGENOUS EXCRETION") ||
    raw.includes("HUMAN KIDNEY ANATOMICAL REGIONS") ||
    raw.includes("CORTICAL vs JUXTAMEDULLARY NEPHRONS") ||
    raw.includes("MALPIGHIAN BODY FILTRATION BARRIER") ||
    raw.includes("NET FILTRATION PRESSURE") ||
    raw.includes("NEPHRON TUBULAR FUNCTION MAP") ||
    raw.includes("COUNTER-CURRENT SYSTEM COMPONENTS") ||
    raw.includes("MEDULLARY OSMOLAR GRADIENT ARCHITECTURE") ||
    raw.includes("VASA RECTA COUNTER-CURRENT EXCHANGE") ||
    raw.includes("RENAL REGULATORY HORMONAL TRIAD") ||
    raw.includes("RAAS HORMONAL CASCADE") ||
    raw.includes("ADH vs ANF HORMONAL ANTAGONISM") ||
    raw.includes("MICTURITION REFLEX CASCADE") ||
    raw.includes("RENAL DISORDER CLASSES") ||
    raw.includes("HEMODIALYSIS CIRCUIT")
  ) {
    return <ExcretoryProductsDiagram />;
  }
  if (
    raw.includes("GUT WALL CONCENTRIC HISTOLOGY") ||
    raw.includes("NEURAL PLEXUSES OF THE GUT") ||
    raw.includes("HUMAN DENTITION TRAITS") ||
    raw.includes("SALIVARY GLAND DUCTS") ||
    raw.includes("GASTRIC GLAND CELL TYPES") ||
    raw.includes("BILIARY TRACT DUCT SYSTEM") ||
    raw.includes("PANCREATIC ZYMOGEN ACTIVATION CASCADE") ||
    raw.includes("GASTROINTESTINAL HORMONES MATRIX") ||
    raw.includes("SUMMARY OF ENZYMATIC CLEAVAGE") ||
    raw.includes("FAT ABSORPTION & LACTEAL PATHWAY") ||
    raw.includes("PEM DISORDER DIFFERENTIAL") ||
    raw.includes("CALORIFIC VALUE COMPARISON")
  ) {
    return <DigestionAndAbsorptionDiagram />;
  }
  if (
    raw.includes("COMPOSITION OF BLOOD") ||
    raw.includes("LEUCOCYTE (WBC) TAXONOMY") ||
    raw.includes("ABO GENETICS & COMPATIBILITY") ||
    raw.includes("ERYTHROBLASTOSIS FETALIS CASCADE") ||
    raw.includes("BLOOD COAGULATION CASCADE") ||
    raw.includes("INTERSTITIAL FLUID vs LYMPH") ||
    raw.includes("HUMAN HEART CHAMBER ANATOMY") ||
    raw.includes("NODAL CONDUCTION PATHWAY") ||
    raw.includes("CARDIAC CYCLE TIMELINE") ||
    raw.includes("CARDIAC CYCLE MECHANICAL PHASES") ||
    raw.includes("STANDARD ECG WAVEFORM") ||
    raw.includes("DOUBLE CIRCULATION LOOPS") ||
    raw.includes("NEURO-ENDOCRINE CARDIA CONTROL")
  ) {
    return <BodyFluidsAndCirculationDiagram />;
  }
  if (
    raw.includes("ANIMAL RESPIRATORY STRUCTURES") ||
    raw.includes("HUMAN RESPIRATORY TRACT ANATOMY") ||
    raw.includes("DIFFUSION MEMBRANE LAYERS") ||
    raw.includes("MECHANISM OF VENTILATION") ||
    raw.includes("SPIROMETRIC LUNG VOLUMES") ||
    raw.includes("PARTIAL PRESSURE GRADIENTS") ||
    raw.includes("OXYGEN-HEMOGLOBIN DISSOCIATION CURVE") ||
    raw.includes("THE CHLORIDE SHIFT") ||
    raw.includes("CHEMORECEPTOR FEEDBACK LOOPS") ||
    raw.includes("RESPIRATORY PATHOPHYSIOLOGY")
  ) {
    return <BreathingAndExchangeOfGasesDiagram />;
  }
  if (
    raw.includes("SEED GERMINATION PHASES") ||
    raw.includes("EPIGEAL vs HYPOGEAL") ||
    raw.includes("POLAR AUXIN TRANSPORT") ||
    raw.includes("GIBBERELLIN ALEURONE CASCADE") ||
    raw.includes("AUXIN : CYTOKININ RATIO") ||
    raw.includes("ETHYLENE TRIPLE RESPONSE") ||
    raw.includes("ABA-MEDIATED STOMATAL CLOSURE") ||
    raw.includes("PHYTOCHROME REVERSIBILITY") ||
    raw.includes("DEVELOPMENTAL CELLULAR STATES")
  ) {
    return <PlantGrowthAndDevelopmentDiagram />;
  }
  if (
    raw.includes("CYANOBACTERIA ULTRASTRUCTURE") ||
    raw.includes("HETEROCYST CELL") ||
    (raw.includes("Gelatinous Mucilage Sheath") && raw.includes("Thylakoid Membrane"))
  ) {
    return <CyanobacteriaDiagram />;
  }
  if (
    raw.includes("GRAM STAINING MECHANISM") ||
    (raw.includes("Crystal Violet") && raw.includes("Safranin Counterstain"))
  ) {
    return <GramStainingFlowDiagram />;
  }
  if (
    raw.includes("GRAM-POSITIVE ENVELOPE") ||
    raw.includes("GRAM-NEGATIVE ENVELOPE") ||
    (raw.includes("Thick Peptidoglycan") && raw.includes("Lipopolysaccharide"))
  ) {
    return <BacterialEnvelopeDiagram />;
  }
  if (
    raw.includes("PLASMODIUM LIFE CYCLE") ||
    (raw.includes("HUMAN HOST") && raw.includes("MOSQUITO") && raw.includes("SPOROZOITES"))
  ) {
    return <PlasmodiumLifeCycleDiagram />;
  }
  if (
    raw.includes("CONJUGATION MECHANISMS") ||
    (raw.includes("F⁺ × F⁻") && raw.includes("Hfr × F⁻")) ||
    (raw.includes("F+ x F-") && raw.includes("Hfr x F-"))
  ) {
    return <BacterialConjugationDiagram />;
  }
  if (
    raw.includes("STAGES OF FUNGAL SEXUAL CYCLE") ||
    raw.includes("STAGES OF THE FUNGAL SEXUAL CYCLE") ||
    (raw.includes("PLASMOGAMY") && raw.includes("DIKARYOPHASE") && raw.includes("KARYOGAMY"))
  ) {
    return <FungalSexualCycleDiagram />;
  }
  if (
    raw.includes("CLAMP CONNECTION DYNAMICS") ||
    raw.includes("Backward Loop Hook") ||
    (raw.includes("Nucleus A Divides into Clamp") && raw.includes("Nucleus B"))
  ) {
    return <ClampConnectionDiagram />;
  }
  if (
    raw.includes("ASCOMYCETE SPORE FORMATION") ||
    (raw.includes("Ascogenous Hypha") && raw.includes("8 Endogenous ASCOSPORES"))
  ) {
    return <AscomyceteSporeDiagram />;
  }
  if (
    raw.includes("THE FIVE SPORE STAGES OF PUCCINIA") ||
    raw.includes("SPORE STAGES OF PUCCINIA") ||
    (raw.includes("Pycniospores") && raw.includes("Urediniospores") && raw.includes("Teliospores"))
  ) {
    return <PucciniaStagesDiagram />;
  }
  if (
    raw.includes("VIRUS DISCOVERY MILESTONES") ||
    (raw.includes("Ivanowsky") && raw.includes("Beijerinck") && raw.includes("Stanley"))
  ) {
    return <VirusDiscoveryMilestonesDiagram />;
  }
  if (
    raw.includes("LYTIC vs. LYSOGENIC") ||
    raw.includes("LYTIC vs LYSOGENIC") ||
    (raw.includes("LYTIC PATHWAY") && raw.includes("LYSOGENIC PATHWAY"))
  ) {
    return <ViralCyclesDiagram />;
  }
  if (
    raw.includes("LICHEN REPRODUCTIVE UNITS") ||
    (raw.includes("SOREDIA") && raw.includes("ISIDIA"))
  ) {
    return <LichenReproductiveUnitsDiagram />;
  }
  if (
    raw.includes("DOLIPORE SEPTUM ARCHITECTURE") ||
    (raw.includes("Parenthosome Cap") && raw.includes("Hyphal"))
  ) {
    return <DoliporeSeptumDiagram />;
  }

  if (
    raw.includes("BACTERIOPHAGE STRUCTURAL ARCHITECTURE") ||
    raw.includes("BACTERIOPHAGE ULTRASTRUCTURE") ||
    (raw.includes("Icosahedral Head") && raw.includes("Contractile Sheath") && raw.includes("Tail Fibers"))
  ) {
    return <BacteriophageStructureDiagram />;
  }

  if (
    raw.includes("PROPERTIES OF LIFE") ||
    raw.includes("CHARACTERISTIC FEATURES") ||
    raw.includes("DEFINING PROPERTIES")
  ) {
    return <PropertiesOfLifeDiagram />;
  }
  if (
    raw.includes("LEVELS OF DIVERSITY MEASUREMENT") ||
    (raw.includes("ALPHA") && raw.includes("BETA") && raw.includes("GAMMA"))
  ) {
    return <BiodiversityScaleDiagram />;
  }
  if (
    raw.includes("HISTORICAL SYSTEMS OF CLASSIFICATION") ||
    raw.includes("TWO-KINGDOM SYSTEM") ||
    (raw.includes("Linnaeus") && raw.includes("THREE-DOMAIN"))
  ) {
    return <HistoricalSystemsDiagram />;
  }
  if (
    raw.includes("WHITTAKER'S FIVE CLASSIFICATION CRITERIA") ||
    raw.includes("WHITTAKER'S FIVE CRITERIA") ||
    (raw.includes("Cellular Complexity") && raw.includes("Nutritional Pattern"))
  ) {
    return <WhittakerCriteriaDiagram />;
  }
  if (
    raw.includes("UNIVERSAL ANCESTOR") ||
    raw.includes("LUCA") ||
    raw.includes("Domain BACTERIA")
  ) {
    return <ThreeDomainTreeDiagram />;
  }
  if (
    raw.includes("MEMBRANE LIPID BIOCHEMISTRY") ||
    raw.includes("D-Glycerol-3-Phosphate")
  ) {
    return <MembraneLipidDiagram />;
  }
  if (
    raw.includes("REPRODUCTIVE ISOLATION") ||
    raw.includes("PRE-ZYGOTIC ISOLATION") ||
    raw.includes("POST-ZYGOTIC ISOLATION")
  ) {
    return <ReproductiveIsolationDiagram />;
  }
  if (
    raw.includes("RING SPECIES MODEL") ||
    raw.includes("Terminal Pop X")
  ) {
    return <RingSpeciesDiagram />;
  }
  if (
    raw.includes("TAXONOMIC HIERARCHY") ||
    raw.includes("TRENDS MOVING DOWN")
  ) {
    return <TaxonomicHierarchyDiagram />;
  }
  if (
    raw.includes("TAUTONYM VALIDITY") ||
    raw.includes("ICZN") ||
    raw.includes("ICNafp")
  ) {
    return <TautonymValidityDiagram />;
  }
  if (
    raw.includes("NOMENCLATURAL TYPE SPECIMENS") ||
    raw.includes("HOLOTYPE") ||
    raw.includes("ISOTYPE")
  ) {
    return <NomenclaturalTypesDiagram />;
  }
  if (
    raw.includes("TAXONOMICAL AIDS") ||
    raw.includes("PRESERVED COLLECTIONS")
  ) {
    return <TaxonomicalAidsDiagram />;
  }
  if (
    raw.includes("TAXONOMIC IDENTIFICATION KEYS") ||
    raw.includes("DICHOTOMOUS KEY ARCHITECTURE") ||
    raw.includes("COUPLET")
  ) {
    return <TaxonomicKeysDiagram />;
  }
  if (
    raw.includes("TAXONOMIC LITERATURE") ||
    raw.includes("MONOGRAPH")
  ) {
    return <TaxonomicLiteratureDiagram />;
  }

  // 3. Universal Branching Tree fallback
  const parsedTree = parseAsciiToTree(raw);
  if (parsedTree && parsedTree.branches && parsedTree.branches.length >= 2) {
    return <UniversalTreeDiagram data={parsedTree} />;
  }

  // 4. Universal Process Flow fallback
  const parsedFlow = parseAsciiToFlow(raw);
  if (parsedFlow && parsedFlow.steps && parsedFlow.steps.length >= 2) {
    return <UniversalFlowDiagram data={parsedFlow} />;
  }

  // 5. Universal Stacked Anatomy / Cross-Section fallback
  const parsedAnatomy = parseAsciiToAnatomy(raw);
  if (parsedAnatomy && parsedAnatomy.layers && parsedAnatomy.layers.length >= 2) {
    return <UniversalAnatomyDiagram data={parsedAnatomy} />;
  }

  // 6. Fallback to standard styled code block
  if (raw) {
    return <CustomCodeBlock rawCode={raw} />;
  }

  return null;
}
