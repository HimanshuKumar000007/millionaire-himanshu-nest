"use client";

import React, { useState } from "react";

export function PrinciplesOfInheritanceDiagram() {
  const [activeTab, setActiveTab] = useState<
    "mendelian" | "non_mendelian" | "linkage" | "sex_determination" | "disorders_pedigree"
  >("mendelian");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Chapter 4 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VII • Genetics and Evolution
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Principles of Inheritance &amp; Variation
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("mendelian")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "mendelian"
                ? "bg-emerald-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🌿 Mendel&apos;s Laws &amp; Crosses
          </button>
          <button
            onClick={() => setActiveTab("non_mendelian")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "non_mendelian"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🩸 Non-Mendelian Extensions &amp; ABO
          </button>
          <button
            onClick={() => setActiveTab("linkage")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "linkage"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🪰 Linkage &amp; Gene Mapping
          </button>
          <button
            onClick={() => setActiveTab("sex_determination")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "sex_determination"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🐝 Sex Determination &amp; Honeybees
          </button>
          <button
            onClick={() => setActiveTab("disorders_pedigree")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "disorders_pedigree"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧬 Pedigrees &amp; Genetic Disorders
          </button>
        </div>
      </div>

      {/* Tab 1: Mendelian Laws & Crosses */}
      {activeTab === "mendelian" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Mendel's 3 Laws */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                1. Law of Dominance
              </span>
              <h4 className="text-sm font-bold text-white">Discrete Factors (Genes)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Characters are controlled by discrete units called factors (alleles). In a heterozygous pair, one allele dominates completely over the recessive allele.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                2. Law of Segregation
              </span>
              <h4 className="text-sm font-bold text-emerald-300">Purity of Gametes (UNIVERSAL)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alleles do not blend; during meiotic gamete formation, the two alleles of a gene pair segregate cleanly so that each gamete receives only ONE allele. <strong>No exceptions!</strong>
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300">
                3. Independent Assortment
              </span>
              <h4 className="text-sm font-bold text-indigo-300">Dihybrid Segregation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair. <em>(Valid strictly for UNLINKED genes!)</em>
              </p>
            </div>
          </div>

          {/* Test Cross Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-300">🎯 Monohybrid vs Dihybrid Standard Ratios</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Monohybrid F₂ Phenotypic Ratio:</span>
                  <span className="font-mono font-bold text-emerald-400">3 : 1</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Monohybrid F₂ Genotypic Ratio:</span>
                  <span className="font-mono font-bold text-emerald-400">1 : 2 : 1 (TT : Tt : tt)</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Dihybrid F₂ Phenotypic Ratio:</span>
                  <span className="font-mono font-bold text-indigo-400">9 : 3 : 3 : 1</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Dihybrid F₂ Genotypic Classes:</span>
                  <span className="font-mono font-bold text-indigo-400">1:2:1:2:4:2:1:2:1 (9 Genotypes)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300">🔬 Test Cross Diagnostic Rules</h4>
              <p className="text-xs text-slate-400">
                Cross an unknown dominant individual (T_) with a homozygous recessive parent (tt):
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-white block">If TT × tt</strong>
                  <span className="text-emerald-400 font-bold">100% Dominant (Tall)</span>
                  <p className="text-[10px] text-slate-400 mt-1">Confirms Homozygous</p>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-white block">If Tt × tt</strong>
                  <span className="text-cyan-400 font-bold">1 : 1 Ratio (50% Tall : 50% Dwarf)</span>
                  <p className="text-[10px] text-slate-400 mt-1">Confirms Heterozygous</p>
                </div>
              </div>
              <div className="p-2 bg-slate-900 rounded text-[11px] text-slate-300 border border-slate-800 font-mono">
                Dihybrid Test Cross (RrYy × rryy) ➔ 1 : 1 : 1 : 1
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Non-Mendelian Extensions & ABO */}
      {activeTab === "non_mendelian" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Incomplete vs Co-dominance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300">
                Incomplete Dominance (Snapdragon)
              </span>
              <h4 className="text-sm font-bold text-white">Antirrhinum majus / Mirabilis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cross between Red (RR) and White (rr) flowers yields Pink F₁ (Rr). Phenotypic ratio matches genotypic ratio: <strong>1 Red : 2 Pink : 1 White (1:2:1)</strong>.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300">
                Co-Dominance (ABO Blood Group)
              </span>
              <h4 className="text-sm font-bold text-white">Both Alleles Express in F₁ (Iᴬ Iᴮ)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Heterozygote expresses both Antigen A and Antigen B on RBC membrane. Number of genotypes for n=3 alleles: n(n+1)/2 = <strong>6 Genotypes, 4 Phenotypes</strong>.
              </p>
            </div>
          </div>

          {/* Pleiotropy vs Polygenic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">🧬 Pleiotropy (One Gene ➔ Multiple Traits)</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Phenylketonuria (PKU)</strong>: Single PAH enzyme gene mutation causes mental retardation, hair loss, and hypopigmentation.</li>
                <li><strong>Pea Starch Branching (Bb)</strong>: BB = Large starch/Round; bb = Small starch/Wrinkled; Bb = Intermediate starch size (incomplete dominance for size, complete dominance for round shape).</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">📊 Polygenic Inheritance (Multiple Additive Genes)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quantitative traits controlled by 3 additive gene pairs (A, B, C) producing continuous variation (Gaussian curve):
              </p>
              <div className="p-2 bg-slate-900 rounded text-[11px] font-mono text-emerald-400 border border-slate-800">
                Skin Color F₂: 1 : 6 : 15 : 20 : 15 : 6 : 1 (Total = 64)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Linkage & Gene Mapping */}
      {activeTab === "linkage" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Morgan's Drosophila Crosses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300">
                Cross I: Tight Linkage (y &amp; w)
              </span>
              <h4 className="text-sm font-bold text-white">Yellow Body (y) &amp; White Eye (w)</h4>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400">Parental Types</span>
                  <strong className="text-emerald-400 text-base">98.7%</strong>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400">Recombinants</span>
                  <strong className="text-rose-400 text-base">1.3%</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Genes y and w are situated extremely close together on the X-chromosome.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300">
                Cross II: Loose Linkage (w &amp; m)
              </span>
              <h4 className="text-sm font-bold text-white">White Eye (w) &amp; Miniature Wing (m)</h4>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400">Parental Types</span>
                  <strong className="text-emerald-400 text-base">62.8%</strong>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[10px] text-slate-400">Recombinants</span>
                  <strong className="text-cyan-400 text-base">37.2%</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Genes w and m are situated far apart on the X-chromosome.</p>
            </div>
          </div>

          {/* Sturtevant's Genetic Mapping Formula */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">📏 Sturtevant&apos;s Genetic Mapping Metric</h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800">
              1% Recombination Frequency (RF) = 1 Map Unit (m.u.) = 1 centimorgan (cM)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Max observable recombination frequency between two linked genes on a single chromosome is <strong>50%</strong> (at which point linkage becomes indistinguishable from independent assortment).
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Sex Determination & Honeybees */}
      {activeTab === "sex_determination" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sex Determination Systems */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-400">XX - XY System</span>
              <p className="text-slate-400">Male Heterogametic (XY); Female (XX). Humans, Drosophila.</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400">XX - XO System</span>
              <p className="text-slate-400">Male Heterogametic (XO; Henking X-body); Female (XX). Grasshoppers.</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-rose-400">ZZ - ZW System</span>
              <p className="text-slate-400">Female Heterogametic (ZW); Male (ZZ). Birds, Butterflies.</p>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400">Haplodiploidy</span>
              <p className="text-slate-400">Females (2n=32); Males/Drones (n=16 via parthenogenesis). Honeybees.</p>
            </div>
          </div>

          {/* Honeybee Haplodiploidy Mechanism */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">🐝 Honeybee Haplodiploid Cascade</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <strong className="text-amber-400">Queen (2n = 32) Meiosis ➔ Unfertilized Egg (n = 16)</strong>
                <p className="text-slate-400">Develops by Parthenogenesis into <strong>Haploid Drone (n = 16)</strong>.</p>
                <p className="text-[10px] text-amber-300 font-semibold">Drones produce sperm by MITOSIS (100% genetic transmission to daughters)!</p>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <strong className="text-emerald-400">Egg (n = 16) + Sperm (n = 16) ➔ Diploid Zygote (2n = 32)</strong>
                <p className="text-slate-400">Develops into <strong>Queen (fed Royal Jelly)</strong> or <strong>Worker (fed Bee Bread)</strong>.</p>
                <p className="text-[10px] text-emerald-300 font-semibold">Drones have no father and cannot have sons, but have a grandfather and grandsons!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Disorders & Pedigree Analysis */}
      {activeTab === "disorders_pedigree" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pedigree Recognition Rules */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-indigo-300">📋 Pedigree Pattern Recognition Rules</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-white block">Autosomal Dominant</strong>
                <span className="text-slate-400">Does NOT skip generations; affected child MUST have affected parent (Myotonic Dystrophy).</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-white block">Autosomal Recessive</strong>
                <span className="text-slate-400">Skips generations; unaffected carrier parents (Aa × Aa) yield affected children (Sickle-Cell, PKU).</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                <strong className="text-white block">X-Linked Recessive</strong>
                <span className="text-slate-400">Preponderance in males (XᵈY); criss-cross inheritance (carrier mother to 50% sons; Hemophilia, Color blindness).</span>
              </div>
            </div>
          </div>

          {/* Monogenic vs Aneuploidy Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <h4 className="text-sm font-bold text-rose-300">🩸 Sickle-Cell Point Mutation</h4>
              <p className="text-xs text-slate-300">
                Transversion point mutation (A ➔ T) at 6th codon of β-globin: <strong>GAG (Glutamic acid) ➔ GUG (Valine)</strong>.
              </p>
              <p className="text-[11px] text-slate-400">
                HbS polymerizes under low O₂, sickling RBCs. Heterozygotes (HbᴬHbˢ) exhibit malaria resistance.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <h4 className="text-sm font-bold text-purple-300">🧬 Aneuploidy Formulas &amp; Barr Bodies</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li><strong>Down Syndrome</strong>: 47, XX/XY, +21 (Trisomy 21; Simian crease, furrowed tongue).</li>
                <li><strong>Turner Syndrome</strong>: 45, X0 (Streak ovaries, sterile female, <strong>0 Barr Bodies</strong>).</li>
                <li><strong>Klinefelter Syndrome</strong>: 47, XXY (Sterile male, gynecomastia, <strong>1 Barr Body</strong>).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
