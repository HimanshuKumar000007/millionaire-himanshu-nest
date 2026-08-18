"use client";

import React, { useState } from "react";

export function ReproductiveHealthDiagram() {
  const [activeTab, setActiveTab] = useState<
    "contraceptives" | "amniocentesis" | "mtp" | "stis" | "art"
  >("contraceptives");

  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-2xl p-4 md:p-6 text-slate-100 shadow-2xl my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700/80 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Chapter 3 (Class XII)
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Unit VI • Reproductive Health
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
            Reproductive Health &amp; Assisted Reproductive Technologies
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab("contraceptives")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "contraceptives"
                ? "bg-rose-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🛡️ Contraceptives &amp; IUDs
          </button>
          <button
            onClick={() => setActiveTab("amniocentesis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "amniocentesis"
                ? "bg-cyan-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🧬 Amniocentesis &amp; PCPNDT
          </button>
          <button
            onClick={() => setActiveTab("mtp")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "mtp"
                ? "bg-amber-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            💊 MTP &amp; RU-486 Mechanism
          </button>
          <button
            onClick={() => setActiveTab("stis")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "stis"
                ? "bg-purple-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🦠 STIs &amp; Curability Matrix
          </button>
          <button
            onClick={() => setActiveTab("art")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "art"
                ? "bg-indigo-600 text-white shadow"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            🔬 Infertility &amp; ART Protocols
          </button>
        </div>
      </div>

      {/* Tab 1: Contraceptives & IUDs */}
      {activeTab === "contraceptives" && (
        <div className="space-y-6 animate-fadeIn">
          {/* IUD Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Non-Medicated IUDs
              </span>
              <h4 className="text-sm font-bold text-white">Lippes Loop</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Double-S shaped plastic device. Attracts macrophages and induces local sterile foreign-body inflammation, increasing sperm phagocytosis within the uterus.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300">
                Copper-Releasing IUDs
              </span>
              <h4 className="text-sm font-bold text-rose-300">CuT, Cu7, Multiload 375</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Releases free Cu²⁺ ions. Suppresses sperm motility, viability, and acrosomal enzymes (hyaluronidase/acrosin), drastically reducing fertilizing capacity.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30 space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300">
                Hormone-Releasing IUDs
              </span>
              <h4 className="text-sm font-bold text-purple-300">Progestasert, LNG-20</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Releases levonorgestrel. Renders endometrium atrophic and hostile to implantation, thickens cervical mucus to create a physical plug against sperm penetration.
              </p>
            </div>
          </div>

          {/* Oral Contraceptives & Saheli */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-indigo-300">💊 Daily Combined Steroidal Pills (21 + 7)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contains synthetic Progestogen + Estrogen combinations (e.g., Mala-D, Mala-N). Exerts negative feedback on anterior pituitary to suppress LH/FSH secretion, completely blocking ovulation.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">✨ Saheli (Centchroman / Ormeloxifene)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Developed by CDRI Lucknow. A non-steroidal Selective Estrogen Receptor Modulator (SERM). Taken <strong>once-a-week</strong>; alters endometrial receptivity and prevents implantation with minimal systemic side effects.
              </p>
            </div>
          </div>

          {/* Surgical Sterilization Comparison */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-slate-200 mb-3">✂️ Surgical Sterilization (Terminal Methods)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400">Vasectomy (Male)</span>
                <p className="text-slate-400">Vas deferens cut &amp; ligated via scrotal incision. Testosterone &amp; semen volume remain normal; ejaculate is azoospermic.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-rose-400">Tubectomy (Female)</span>
                <p className="text-slate-400">Fallopian tubes cut &amp; ligated via abdominal/vaginal incision. Ovulation and menstrual cycle continue normally; sperm cannot reach ovum.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Amniocentesis & PCPNDT */}
      {activeTab === "amniocentesis" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Procedure Timeline Flow */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center justify-between">
              <span>💉 Amniocentesis Protocol (14–16 Weeks Gestation)</span>
              <span className="text-[10px] text-slate-400 font-mono">Invasive Transabdominal Needle</span>
            </h4>
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-200 border border-slate-800 overflow-x-auto">
              Ultrasound Guide ➔ Amniotic Fluid (10–20 mL) ➔ Centrifugation ➔ Fetal Skin/Epithelial Cells ➔ Cell Culture ➔ Karyotyping &amp; Enzymatic Assays
            </div>
          </div>

          {/* Diagnostic Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-indigo-300">🧬 Chromosomal Aneuploidies Detected</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Down Syndrome</strong>: Trisomy 21 (47, XX/XY, +21)</li>
                <li><strong>Klinefelter Syndrome</strong>: 47, XXY</li>
                <li><strong>Turner Syndrome</strong>: 45, X0</li>
                <li><strong>Edward Syndrome</strong>: Trisomy 18</li>
              </ul>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-emerald-300">🧪 Inborn Metabolic Errors &amp; Hemoglobinopathies</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>Phenylketonuria (PKU)</strong>: Phenylalanine hydroxylase deficiency</li>
                <li><strong>Sickle Cell Anemia</strong>: β-globin gene mutation (HbS)</li>
                <li><strong>Hemophilia</strong>: Factor VIII / IX deficiency</li>
                <li><strong>Albinism &amp; Tay-Sachs Disease</strong>: Hexosaminidase A defect</li>
              </ul>
            </div>
          </div>

          {/* Statutory Ban & PCPNDT */}
          <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-500/40 text-xs text-rose-200 space-y-1.5">
            <span className="font-black uppercase tracking-wider text-rose-300">⚖️ PCPNDT Act (1994) — Legal Prohibition</span>
            <p className="leading-relaxed">
              Pre-Conception and Pre-Natal Diagnostic Techniques Act strictly bans the use of prenatal diagnostic procedures (Amniocentesis, CVS, Ultrasonography) for fetal sex determination to eliminate female foeticide. Violators face imprisonment and permanent cancellation of medical licenses.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: MTP & RU-486 */}
      {activeTab === "mtp" && (
        <div className="space-y-6 animate-fadeIn">
          {/* MTP Legal Frame */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
            <h4 className="text-sm font-bold text-amber-300">📜 MTP Act Amendments &amp; Gestational Thresholds</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400">Up to 12 Weeks (1st Trimester)</span>
                <p className="text-slate-400">Safest period for MTP. Requires the opinion of <strong>ONE Registered Medical Practitioner (RMP)</strong>.</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400">12 to 24 Weeks (2nd Trimester)</span>
                <p className="text-slate-400">High surgical risk. Requires the opinion of <strong>TWO Registered Medical Practitioners (RMPs)</strong>.</p>
              </div>
            </div>
          </div>

          {/* Mifepristone & Misoprostol Dual Mechanism */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">🧪 Non-Surgical Medical Abortion Dual Regimen</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-indigo-500/30 space-y-1.5">
                <span className="font-bold text-indigo-300">Step 1: Mifepristone (RU-486)</span>
                <p className="text-slate-400">
                  Potent competitive <strong>Progesterone Receptor Antagonist</strong>. Blocks progesterone action, causing decidual necrosis, endometrial detachment, and embryonic death.
                </p>
              </div>
              <div className="p-3.5 bg-slate-900 rounded-lg border border-rose-500/30 space-y-1.5">
                <span className="font-bold text-rose-300">Step 2: Misoprostol (PGE₁ Analog, 48h later)</span>
                <p className="text-slate-400">
                  Synthetic prostaglandin analog. Softens the cervix and triggers powerful myometrial contractions to expel the detached conceptus.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: STIs & Curability */}
      {activeTab === "stis" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pathogen Classification */}
          <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30">
            <h4 className="text-sm font-bold text-purple-300 mb-3">🦠 Sexually Transmitted Infections Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="text-[11px] uppercase bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Disease</th>
                    <th className="py-2 px-3">Etiological Agent</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Curability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Syphilis</td>
                    <td className="py-2 px-3 italic text-slate-400">Treponema pallidum</td>
                    <td className="py-2 px-3">Spirochete Bacteria</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">CURABLE (Penicillin)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Gonorrhea</td>
                    <td className="py-2 px-3 italic text-slate-400">Neisseria gonorrhoeae</td>
                    <td className="py-2 px-3">Gram- Diplococcus</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">CURABLE (Ceftriaxone)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Chlamydiasis</td>
                    <td className="py-2 px-3 italic text-slate-400">Chlamydia trachomatis</td>
                    <td className="py-2 px-3">Intracellular Bacteria</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">CURABLE (Azithromycin)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Trichomoniasis</td>
                    <td className="py-2 px-3 italic text-slate-400">Trichomonas vaginalis</td>
                    <td className="py-2 px-3">Flagellated Protozoan</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">CURABLE (Metronidazole)</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="py-2 px-3 font-bold text-rose-300">AIDS</td>
                    <td className="py-2 px-3 italic text-slate-400">Human Immunodeficiency Virus (HIV)</td>
                    <td className="py-2 px-3">ssRNA Retrovirus</td>
                    <td className="py-2 px-3 text-rose-400 font-black">INCURABLE (Managed by ART)</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="py-2 px-3 font-bold text-rose-300">Hepatitis B</td>
                    <td className="py-2 px-3 italic text-slate-400">Hepatitis B Virus (HBV)</td>
                    <td className="py-2 px-3">dsDNA Virus</td>
                    <td className="py-2 px-3 text-rose-400 font-black">INCURABLE (HBV Vaccine)</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="py-2 px-3 font-bold text-rose-300">Genital Herpes</td>
                    <td className="py-2 px-3 italic text-slate-400">Herpes Simplex Virus 2 (HSV-2)</td>
                    <td className="py-2 px-3">dsDNA Virus</td>
                    <td className="py-2 px-3 text-rose-400 font-black">INCURABLE (Acyclovir suppress)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: ART Protocols */}
      {activeTab === "art" && (
        <div className="space-y-6 animate-fadeIn">
          {/* In-Vitro vs In-Vivo Tree */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300">
                IN-VITRO FERTILIZATION (IVF)
              </span>
              <h4 className="text-sm font-bold text-white">Fertilization in Culture Dish</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-indigo-300">ZIFT (Zygote Intra-Fallopian Transfer)</strong>: Embryo up to <strong>≤8 blastomeres</strong> transferred into Fallopian Tube.
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-indigo-300">IUT (Intra-Uterine Transfer)</strong>: Embryo with <strong>&gt;8 blastomeres</strong> (16–32 cells) transferred into Uterine Cavity.
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-indigo-300">ICSI (Intra-Cytoplasmic Sperm Injection)</strong>: Single sperm micro-injected into ovum cytoplasm for severe male oligospermia.
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                IN-VIVO FERTILIZATION
              </span>
              <h4 className="text-sm font-bold text-white">Fertilization Inside Female Body</h4>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-emerald-300">GIFT (Gamete Intra-Fallopian Transfer)</strong>: Unfertilized ovum + sperm placed in Fallopian tube; natural in-vivo fertilization occurs.
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-emerald-300">IUI (Intra-Uterine Insemination) / AI</strong>: Concentrated processed semen injected into uterus during fertile window.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
