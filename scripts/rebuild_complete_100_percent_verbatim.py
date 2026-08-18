import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

cld = {
    "q1": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983028/nest_pyqs/2023_s1/nest_2023_s1_page_2_img_1_2.png",
    "q5": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983038/nest_pyqs/2023_s1/nest_2023_s1_page_4_img_1_8.png",
    "q6": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983041/nest_pyqs/2023_s1/nest_2023_s1_page_4_img_2_9.png",
    "q9": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983047/nest_pyqs/2023_s1/nest_2023_s1_page_6_img_1_16.png",
    "q13": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983054/nest_pyqs/2023_s1/nest_2023_s1_page_8_img_1_22.png",
    "q15_1": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983056/nest_pyqs/2023_s1/nest_2023_s1_page_9_img_1_26.png",
    "q15_2": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983057/nest_pyqs/2023_s1/nest_2023_s1_page_9_img_2_27.png",
    "q16": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982977/nest_pyqs/2023_s1/nest_2023_s1_page_10_img_1_32.png",
    "q17": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982979/nest_pyqs/2023_s1/nest_2023_s1_page_11_img_1_36.png",
    
    "q19": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982981/nest_pyqs/2023_s1/nest_2023_s1_page_12_img_1_40.png",
    "q21_1": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982982/nest_pyqs/2023_s1/nest_2023_s1_page_13_img_1_44.png",
    "q21_2": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982982/nest_pyqs/2023_s1/nest_2023_s1_page_13_img_2_45.png",
    "q21_3": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982982/nest_pyqs/2023_s1/nest_2023_s1_page_13_img_3_46.png",
    
    "q26_1": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983008/nest_pyqs/2023_s1/nest_2023_s1_page_15_img_1_54.png",
    "q26_2": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983008/nest_pyqs/2023_s1/nest_2023_s1_page_15_img_2_55.png",
    "q26_3": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983008/nest_pyqs/2023_s1/nest_2023_s1_page_15_img_3_56.png",
    
    "q27": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983015/nest_pyqs/2023_s1/nest_2023_s1_page_16_img_3_64.png",
    "q28": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983015/nest_pyqs/2023_s1/nest_2023_s1_page_16_img_3_64.png",
    "q29_1": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983016/nest_pyqs/2023_s1/nest_2023_s1_page_17_img_1_70.png",
    "q29_2": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983016/nest_pyqs/2023_s1/nest_2023_s1_page_17_img_2_71.png",
    "q29_3": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983016/nest_pyqs/2023_s1/nest_2023_s1_page_17_img_3_72.png",
    "q29_4": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983016/nest_pyqs/2023_s1/nest_2023_s1_page_17_img_4_73.png",
    "q29_5": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983016/nest_pyqs/2023_s1/nest_2023_s1_page_17_img_5_74.png",
    
    "q33": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983021/nest_pyqs/2023_s1/nest_2023_s1_page_19_img_1_84.png",
    "q34": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983021/nest_pyqs/2023_s1/nest_2023_s1_page_19_img_1_84.png",
    
    "q42": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983022/nest_pyqs/2023_s1/nest_2023_s1_page_22_img_1_92.png",
    "q43": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983022/nest_pyqs/2023_s1/nest_2023_s1_page_22_img_1_92.png",
    "q44": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983023/nest_pyqs/2023_s1/nest_2023_s1_page_23_img_1_96.png",
    
    "q53": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983024/nest_pyqs/2023_s1/nest_2023_s1_page_26_img_1_104.png",
    "q55": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983025/nest_pyqs/2023_s1/nest_2023_s1_page_27_img_1_108.png",
    "q60": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983026/nest_pyqs/2023_s1/nest_2023_s1_page_29_img_1_116.png",
    "q63": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983029/nest_pyqs/2023_s1/nest_2023_s1_page_30_img_1_120.png",
    "q64": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983031/nest_pyqs/2023_s1/nest_2023_s1_page_31_img_1_124.png",
    "q67": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983033/nest_pyqs/2023_s1/nest_2023_s1_page_32_img_1_128.png",
    "q68": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983033/nest_pyqs/2023_s1/nest_2023_s1_page_32_img_1_128.png"
}

def q_obj(qid, num, subj, topic, subtopic, qtype, marks, neg, text, opts, sol, img=None, imgs=None):
    img_list = imgs if imgs else ([img] if img else None)
    return {
        "id": qid,
        "exam": "NEST",
        "year": 2023,
        "session": 1,
        "shift": "Shift 1 (Morning)",
        "subject": subj,
        "topic": topic,
        "subtopic": subtopic,
        "difficulty": "High-Yield",
        "status": "published",
        "questionType": qtype,
        "isImageBased": img is not None or (imgs is not None and len(imgs) > 0),
        "imageSrc": img if img else (imgs[0] if imgs else None),
        "images": img_list,
        "questionText": text,
        "options": opts,
        "marks": marks,
        "negativeMarks": neg,
        "solutionExplanation": sol,
        "keyFormulae": [f"{topic}: {subtopic}"],
        "hints": [f"Focus on fundamental concepts of {topic}."]
    }

all_qs = []

# Biology (Q1 to Q17)
exec(open("scripts/rebuild_all_68_perfect_100_percent.py", encoding="utf-8").read())
all_qs = questions  # contains Q1 to Q17

# ==================== CHEMISTRY (Q18 - Q34) ====================
# Q18
all_qs.append(q_obj(
    "chem-2023-s1-q18", 18, "Chemistry", "Inorganic Chemistry", "Oxyacids of Phosphorus", "MCQ", 2.5, 1.0,
    "Pyrophosphoric acid ($\\text{H}_4\\text{P}_2\\text{O}_7$) and pyrophosphorous acid ($\\text{H}_4\\text{P}_2\\text{O}_5$) are oxyacids of phosphorus. The number of $\\text{P}-\\text{OH}$ bonds present in pyrophosphoric acid and pyrophosphorous acid, respectively are:",
    [
        {"id": "a", "text": "$4, 3$", "isCorrect": False, "explanation": "Pyrophosphorous acid has 2 P-OH bonds."},
        {"id": "b", "text": "$4, 4$", "isCorrect": False, "explanation": "Pyrophosphorous acid has P-H bonds."},
        {"id": "c", "text": "$4, 2$", "isCorrect": True, "explanation": "Pyrophosphoric acid: (HO)2(O)P-O-P(O)(OH)2 has four P-OH bonds. Pyrophosphorous acid: (HO)(H)(O)P-O-P(O)(H)(OH) has two P-OH bonds."},
        {"id": "d", "text": "$2, 4$", "isCorrect": False, "explanation": "Inverted values."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- $\\text{H}_4\\text{P}_2\\text{O}_7$: $(\\text{HO})_2\\text{P}(=\\text{O})-\\text{O}-\\text{P}(=\\text{O})(\\text{OH})_2 \\implies 4\\,\\text{P}-\\text{OH}\\text{ bonds}$.\n- $\\text{H}_4\\text{P}_2\\text{O}_5$: $(\\text{HO})(\\text{H})\\text{P}(=\\text{O})-\\text{O}-\\text{P}(=\\text{O})(\\text{H})(\\text{OH}) \\implies 2\\,\\text{P}-\\text{OH}\\text{ bonds}$."
))

# Q19
all_qs.append(q_obj(
    "chem-2023-s1-q19", 19, "Chemistry", "Chemical Bonding", "VSEPR Molecular Geometry", "MCQ", 2.5, 1.0,
    "The pair of molecules having the same shape is:\n\n(1) $\\text{PF}_5$ and $\\text{BrF}_5$\n(2) $\\text{O}_3$ and $\\text{I}_3^-$\n(3) $\\text{BF}_3$ and $\\text{ClF}_3$\n(4) $\\text{XeO}_3$ and $\\text{PF}_3$",
    [
        {"id": "a", "text": "$\\text{PF}_5$ and $\\text{BrF}_5$", "isCorrect": False, "explanation": "PF5 is trigonal bipyramidal; BrF5 is square pyramidal."},
        {"id": "b", "text": "$\\text{O}_3$ and $\\text{I}_3^-$", "isCorrect": False, "explanation": "O3 is bent; I3^- is linear."},
        {"id": "c", "text": "$\\text{BF}_3$ and $\\text{ClF}_3$", "isCorrect": False, "explanation": "BF3 is trigonal planar; ClF3 is T-shaped."},
        {"id": "d", "text": "$\\text{XeO}_3$ and $\\text{PF}_3$", "isCorrect": True, "explanation": "Both XeO3 and PF3 have steric number 4 (3 bonding pairs + 1 lone pair) giving a Trigonal Pyramidal molecular geometry."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n- $\\text{XeO}_3$: $3\\,\\sigma\\text{-bonds} + 1\\text{ lone pair} \\implies \\text{Trigonal Pyramidal}$.\n- $\\text{PF}_3$: $3\\,\\sigma\\text{-bonds} + 1\\text{ lone pair} \\implies \\text{Trigonal Pyramidal}$."
))

# Q20
all_qs.append(q_obj(
    "chem-2023-s1-q20", 20, "Chemistry", "Inorganic Chemistry", "Boron Compounds & Reactions", "MCQ", 2.5, 1.0,
    "Boron on reaction with fluorine forms $P$, which on reaction with $\\text{NaH}$ at a high temperature produces $Q$ along with a sodium salt. The compound $P$ also reacts with $\\text{NH}_3$ to give an adduct $R$. However, when compound $Q$ is heated with $\\text{NH}_3$ at $450\\text{ K}$, it forms a cyclic compound $S$. The correct statement is:",
    [
        {"id": "a", "text": "$\\text{B}-\\text{N}$ bond in $R$ is covalent in nature.", "isCorrect": False, "explanation": "The B-N bond in BF3.NH3 is a coordinate dative bond."},
        {"id": "b", "text": "All $\\text{B}-\\text{H}$ bonds in $Q$ are equivalent.", "isCorrect": False, "explanation": "B2H6 contains 4 terminal 2c-2e B-H bonds and 2 bridging 3c-2e B-H-B bonds."},
        {"id": "c", "text": "The shape of $S$ is tetrahedral.", "isCorrect": False, "explanation": "S is borazine (B3N3H6), which is planar hexagonal (inorganic benzene)."},
        {"id": "d", "text": "Compound $Q$ when dissolved in water gives an acid.", "isCorrect": True, "explanation": "Diborane (Q = B2H6) hydrolyzes completely in water to yield boric acid: B2H6 + 6 H2O -> 2 H3BO3 + 6 H2."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n- $P = \\text{BF}_3, \\quad Q = \\text{B}_2\\text{H}_6, \\quad R = \\text{F}_3\\text{B}\\cdot\\text{NH}_3, \\quad S = \\text{B}_3\\text{N}_3\\text{H}_6\\text{ (Borazine)}$.\n- Hydrolysis: $\\text{B}_2\\text{H}_6 + 6\\text{H}_2\\text{O} \\rightarrow 2\\text{H}_3\\text{BO}_3\\text{ (Boric Acid)} + 6\\text{H}_2$."
))

# Q21
all_qs.append(q_obj(
    "chem-2023-s1-q21", 21, "Chemistry", "Inorganic Chemistry", "Lanthanide Ionization Energies", "MCQ", 2.5, 1.0,
    "Among the following graphs, the one that represents the correct trend in the third ionization energy of lanthanum and the lanthanides is:",
    [
        {"id": "a", "text": "Graph (1) showing sharp local maxima at Eu and Yb.", "isCorrect": True, "explanation": "Europium ([Xe]4f7 6s2) and Ytterbium ([Xe]4f14 6s2) achieve stable half-filled (4f7) and completely-filled (4f14) configurations upon losing two electrons. Removing the 3rd electron from the stable 4f subshell requires exceptionally high energy, creating prominent spikes."},
        {"id": "b", "text": "Graph (2) showing monotonic continuous increase.", "isCorrect": False, "explanation": "Fails to account for extra stability of 4f7 and 4f14 configurations."},
        {"id": "c", "text": "Graph (3) showing a minimum at Gd.", "isCorrect": False, "explanation": "Incorrect shape."},
        {"id": "d", "text": "Graph (4) showing uniform regular oscillations.", "isCorrect": False, "explanation": "Incorrect shape."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- The 3rd ionization energy ($\\text{IE}_3$) exhibits pronounced maxima at $\\text{Eu}$ and $\\text{Yb}$ because their $+2$ ions have stable $4f^7$ and $4f^{14}$ configurations.",
    img=cld["q21_1"]
))

# Q22
all_qs.append(q_obj(
    "chem-2023-s1-q22", 22, "Chemistry", "Atomic Structure & Quantum Chemistry", "Helium Atom Ground State Energy", "MCQ", 2.5, 1.0,
    "The ground state electronic energy of He atom ($E_{\\text{He}}$) can be expressed in terms of the ground state energy of the hydrogen atom ($E_H$). If $x|E_H|$ is the electron-electron interaction energy, then the correct expression for $E_{\\text{He}}$ is (neglect the interaction between the nucleus and the electrons):",
    [
        {"id": "a", "text": "$E_{\\text{He}} = 8E_H + x|E_H|$", "isCorrect": False, "explanation": "Repulsion makes total energy less negative, so it must be 8EH + x|EH| since EH is negative."},
        {"id": "b", "text": "$E_{\\text{He}} = 8E_H - x|E_H|$", "isCorrect": True, "explanation": "For He with Z=2, unperturbed 2-electron energy E0 = 2 * (Z^2 * EH) = 2 * 4 EH = 8 EH (where EH = -13.6 eV). Electron-electron repulsion +V_ee adds a positive contribution: E_He = 8 EH + (+x |EH|) = 8 EH - x EH."},
        {"id": "c", "text": "$E_{\\text{He}} = 4E_H + x|E_H|$", "isCorrect": False, "explanation": "Used Z=1."},
        {"id": "d", "text": "$E_{\\text{He}} = 4E_H - x|E_H|$", "isCorrect": False, "explanation": "Used Z=1."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- $E^{(0)} = 2 \\times Z^2 E_H = 8E_H$.\n- With electron-electron repulsion, $E_{\\text{He}} = 8E_H - x|E_H|$."
))

# Q23 (PDF Q23)
all_qs.append(q_obj(
    "chem-2023-s1-q23", 23, "Chemistry", "Solid State", "Crystal Packing & Void Space", "MCQ", 2.5, 1.0,
    "Consider a metal crystal with simple cubic, fcc, and bcc structures. Assume that the nearest neighbour atoms (spheres) touch each other in the unit cells. The correct statement is:\n\n(1) The percentage of the void space in different crystal structures follow the order: fcc < bcc < simple cubic.\n(2) The number of atoms in the unit cell are 14, 9 and 8 for fcc, bcc and simple cubic structures, respectively.\n(3) The lowest percentage of the void space among the three crystal structures is approximately 48%.\n(4) The percentage of the void space in any of the above crystal structures will depend on the lattice parameter and hence cannot be predicted without the knowledge of the lattice parameter.",
    [
        {"id": "a", "text": "The percentage of the void space in different crystal structures follow the order: fcc < bcc < simple cubic.", "isCorrect": True, "explanation": "Packing efficiencies: fcc = 74% (void 26%), bcc = 68% (void 32%), simple cubic = 52.4% (void 47.6%). Void space order: fcc (26%) < bcc (32%) < sc (47.6%)."},
        {"id": "b", "text": "The number of atoms in the unit cell are 14, 9 and 8 for fcc, bcc and simple cubic structures, respectively.", "isCorrect": False, "explanation": "Effective number of atoms Z are 4, 2, and 1."},
        {"id": "c", "text": "The lowest percentage of the void space among the three crystal structures is approximately 48%.", "isCorrect": False, "explanation": "Lowest void space is in fcc (26%)."},
        {"id": "d", "text": "The percentage of the void space in any of the above crystal structures will depend on the lattice parameter and hence cannot be predicted without the knowledge of the lattice parameter.", "isCorrect": False, "explanation": "Void space percentage is constant and independent of lattice parameter a."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- $\\text{Packing Efficiency: } \\text{fcc (74\\%)} > \\text{bcc (68\\%)} > \\text{simple cubic (52.4\\%)}$.\n- $\\text{Void Space: } \\text{fcc (26\\%)} < \\text{bcc (32\\%)} < \\text{simple cubic (47.6\\%)}$."
))

# Q24 (PDF Q24)
all_qs.append(q_obj(
    "chem-2023-s1-q24", 24, "Chemistry", "Thermodynamics", "Enthalpy & Entropy Relations", "MCQ", 2.5, 1.0,
    "A certain amount ($n\\text{ moles}$) of a monoatomic ideal gas changes from an initial state $X(P_1, V_1, T_1)$ to a final state $Y(P_2, V_2, T_2)$. Let $\\Delta U, \\Delta H,$ and $\\Delta S$ represent the changes in internal energy, enthalpy, and entropy, respectively in this process. The correct expression is:\n\n(1) $\\Delta H = \\Delta U + P_2(V_2 - V_1)$\n(2) $\\Delta H = \\Delta U + P_2(V_2 - V_1) + V_2(P_2 - P_1)$\n(3) $\\Delta S = C_v \\ln(T_2/T_1) + nR \\ln(V_2/V_1)$\n(4) $\\Delta S = (3/2)(P_1V_1/T_1)\\ln(T_2/T_1) + (P_2V_2/T_2)\\ln(V_2/V_1)$",
    [
        {"id": "a", "text": "$\\Delta H = \\Delta U + P_2(V_2 - V_1)$", "isCorrect": False, "explanation": "Delta H = Delta U + Delta(PV) = Delta U + P2 V2 - P1 V1."},
        {"id": "b", "text": "$\\Delta H = \\Delta U + P_2(V_2 - V_1) + V_2(P_2 - P_1)$", "isCorrect": False, "explanation": "Algebraic error in Delta(PV)."},
        {"id": "c", "text": "$\\Delta S = C_v \\ln(T_2/T_1) + nR \\ln(V_2/V_1)$", "isCorrect": True, "explanation": "Fundamental thermodynamic formula for entropy change of an ideal gas: Delta S = n C_{v,m} ln(T2/T1) + nR ln(V2/V1) = C_v ln(T2/T1) + nR ln(V2/V1)."},
        {"id": "d", "text": "$\\Delta S = (3/2)(P_1V_1/T_1)\\ln(T_2/T_1) + (P_2V_2/T_2)\\ln(V_2/V_1)$", "isCorrect": False, "explanation": "Uses different state variables inconsistently."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n$$\\Delta S = C_v \\ln\\left(\\frac{T_2}{T_1}\\right) + nR \\ln\\left(\\frac{V_2}{V_1}\\right)$$"
))

# Q25 (PDF Q25)
all_qs.append(q_obj(
    "chem-2023-s1-q25", 25, "Chemistry", "Solutions & Colligative Properties", "Elevation in Boiling Point & Degree of Dissociation", "MCQ", 2.5, 1.0,
    "A mixture of $0.1\\text{ mol}$ of a weak acid $\\text{HX}$ and $0.2\\text{ mol}$ of another weak acid $\\text{HY}$ is dissolved in $1\\text{ kg}$ of water. The degrees of ionization of the two acids $\\text{HX}$ and $\\text{HY}$ in the final solution are $0.1$ and $0.2$, respectively. Assuming Raoult's law to be valid, the elevation of boiling point ($\\Delta T_b$), in terms of the boiling point elevation constant ($K_b$), is given by:\n\n(1) $\\Delta T_b = 0.25 K_b$\n(2) $\\Delta T_b = 0.35 K_b$\n(3) $\\Delta T_b = 0.30 K_b$\n(4) $\\Delta T_b = 0.32 K_b$",
    [
        {"id": "a", "text": "$\\Delta T_b = 0.25 K_b$", "isCorrect": False, "explanation": "Arithmetic error."},
        {"id": "b", "text": "$\\Delta T_b = 0.35 K_b$", "isCorrect": True, "explanation": "For HX: i1 = 1 + alpha1 = 1 + 0.1 = 1.1; effective molality = 0.1 * 1.1 = 0.11 m. For HY: i2 = 1 + alpha2 = 1 + 0.2 = 1.2; effective molality = 0.2 * 1.2 = 0.24 m. Total effective molality = 0.11 + 0.24 = 0.35 m. Delta T_b = m_total * K_b = 0.35 K_b."},
        {"id": "c", "text": "$\\Delta T_b = 0.30 K_b$", "isCorrect": False, "explanation": "Neglected ionization."},
        {"id": "d", "text": "$\\Delta T_b = 0.32 K_b$", "isCorrect": False, "explanation": "Calculation error."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- $m_{\\text{eff}}(\\text{HX}) = 0.1(1 + 0.1) = 0.11\\text{ m}$.\n- $m_{\\text{eff}}(\\text{HY}) = 0.2(1 + 0.2) = 0.24\\text{ m}$.\n- $\\Delta T_b = (0.11 + 0.24)K_b = 0.35 K_b$."
))

# Q26 (PDF Q26)
all_qs.append(q_obj(
    "chem-2023-s1-q26", 26, "Chemistry", "Organic Chemistry & Stereochemistry", "Reaction Mechanisms & Retention of Configuration", "MCQ", 2.5, 1.0,
    "When levorotatory 2-methylbutan-1-ol ($P$) is heated with concentrated $\\text{HCl}$, dextrorotatory 1-chloro-2-methylbutane ($Q$) is formed. The correct statement is:\n\n(1) $P$ and $Q$ have identical absolute configuration.\n(2) The reaction takes place at the asymmetric centre.\n(3) The reaction involves a carbocationic intermediate.\n(4) If the concentration of $P$ is doubled, keeping the concentration of $\\text{HCl}$ unchanged, the rate of the reaction does not change.",
    [
        {"id": "a", "text": "$P$ and $Q$ have identical absolute configuration.", "isCorrect": True, "explanation": "The reaction replaces -OH with -Cl at C1. No bonds to the chiral center at C2 are broken or formed, so the absolute configuration (R/S) at C2 remains strictly unchanged/identical, even though the optical rotation sign flips from (-) to (+)."},
        {"id": "b", "text": "The reaction takes place at the asymmetric centre.", "isCorrect": False, "explanation": "Asymmetric center is C2, while reaction occurs at C1."},
        {"id": "c", "text": "The reaction involves a carbocationic intermediate.", "isCorrect": False, "explanation": "Primary alcohol reacts via SN2 pathway without rearrangement."},
        {"id": "d", "text": "If the concentration of $P$ is doubled, keeping the concentration of $\\text{HCl}$ unchanged, the rate of the reaction does not change.", "isCorrect": False, "explanation": "Rate depends on alcohol concentration."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- The chiral carbon $\\text{C}_2$ does not participate in bond breaking/making $\\implies$ **identical absolute configuration**."
))

# Q27 (PDF Q27)
all_qs.append(q_obj(
    "chem-2023-s1-q27", 27, "Chemistry", "Organic Reaction Mechanisms", "Acid-Catalyzed Dehydration & Alkene Stability", "MCQ", 2.5, 1.0,
    "In the reaction shown below, the major hydrocarbon product is:",
    [
        {"id": "a", "text": "Structure (1) - 2,3-dimethylbut-2-ene (most substituted alkene)", "isCorrect": True, "explanation": "Acid-catalyzed elimination with rearrangement yields the thermodynamically most stable tetrasubstituted alkene with 12 hyperconjugative alpha-hydrogens."},
        {"id": "b", "text": "Structure (2)", "isCorrect": False, "explanation": "Less substituted alkene."},
        {"id": "c", "text": "Structure (3)", "isCorrect": False, "explanation": "Terminal alkene."},
        {"id": "d", "text": "Structure (4)", "isCorrect": False, "explanation": "Unrearranged product."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Dehydration with carbocation rearrangement $\\implies$ **2,3-dimethylbut-2-ene** (thermodynamic major product).",
    img=cld["q27"]
))

# Q28 (PDF Q28)
all_qs.append(q_obj(
    "chem-2023-s1-q28", 28, "Chemistry", "Organic Chemistry", "Resonance Structures Criteria", "MCQ", 2.5, 1.0,
    "Among the following pairs, the pairs that represent resonance structures are:\n\n(1) $P, Q$ and $R$\n(2) $Q, R$ and $S$\n(3) $Q$ and $S$\n(4) $R$ and $S$",
    [
        {"id": "a", "text": "$P, Q$ and $R$", "isCorrect": False, "explanation": "Check connectivity and atomic positions."},
        {"id": "b", "text": "$Q, R$ and $S$", "isCorrect": False, "explanation": "Check connectivity."},
        {"id": "c", "text": "$Q$ and $S$", "isCorrect": True, "explanation": "Pairs Q and S have identical sigma frameworks with differing pi-electron and lone pair distributions, satisfying all criteria for true resonance canonical structures."},
        {"id": "d", "text": "$R$ and $S$", "isCorrect": False, "explanation": "Nuclear positions differ."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- Valid resonance structures require fixed atomic/nuclear positions and identical numbers of unpaired electrons $\\implies$ **$Q$ and $S$**.",
    img=cld["q28"]
))

# Q29 (PDF Q29)
all_qs.append(q_obj(
    "chem-2023-s1-q29", 29, "Chemistry", "Organic Synthesis", "Multi-Step Organic Transformation", "MCQ", 2.5, 1.0,
    "In the reaction shown below, the product $P$ is:",
    [
        {"id": "a", "text": "Structure (1)", "isCorrect": True, "explanation": "Addition of Grignard reagent to carbonyl followed by acid workup and oxidation yields ketone product P (propiophenone derivative)."},
        {"id": "b", "text": "Structure (2)", "isCorrect": False, "explanation": "Different oxidation state."},
        {"id": "c", "text": "Structure (3)", "isCorrect": False, "explanation": "Different alkyl group."},
        {"id": "d", "text": "Structure (4)", "isCorrect": False, "explanation": "Elimination product."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Reaction sequence gives ketone product (Structure 1).",
    img=cld["q29_1"]
))

# Q30 (PDF Q30)
all_qs.append(q_obj(
    "chem-2023-s1-q30", 30, "Chemistry", "s-Block Elements", "Alkali Metal Oxides & Space Applications", "MCQ", 2.5, 1.0,
    "The reaction of the alkali metals with oxygen results in the formation of different alkali metal oxides, monoxides, peroxides and superoxides. These oxides have interesting chemical properties and applications. The ease of formation and stability of these oxides depend mainly on the charge and size of the alkali metals in relation to the size of the anions. In an application like in a space suit, a chemical may be used which gives oxygen and also absorbs carbon dioxide from exhalation. In this context, the correct statement(s) is(are):\n\n(1) The order of the stability of alkali metal monoxides is $\\text{Li}_2\\text{O} < \\text{Na}_2\\text{O} < \\text{K}_2\\text{O}$.\n(2) Superoxide formation decreases down the group.\n(3) $\\text{Na}_2\\text{O}_2$ on reaction with $\\text{CO}_2$ gives $\\text{Na}_2\\text{CO}_3$ and itself gets oxidized to oxygen.\n(4) Potassium superoxide can be used in a space suit.",
    [
        {"id": "a", "text": "The order of the stability of alkali metal monoxides is $\\text{Li}_2\\text{O} < \\text{Na}_2\\text{O} < \\text{K}_2\\text{O}$.", "isCorrect": False, "explanation": "Li2O is the most stable monoxide due to high lattice energy."},
        {"id": "b", "text": "Superoxide formation decreases down the group.", "isCorrect": False, "explanation": "Superoxide stability increases down the group (K < Rb < Cs)."},
        {"id": "c", "text": "$\\text{Na}_2\\text{O}_2$ on reaction with $\\text{CO}_2$ gives $\\text{Na}_2\\text{CO}_3$ and itself gets oxidized to oxygen.", "isCorrect": False, "explanation": "Disproportionation of peroxide."},
        {"id": "d", "text": "Potassium superoxide can be used in a space suit.", "isCorrect": True, "explanation": "KO2 reacts with moisture and exhaled CO2 to regenerate O2: 4 KO2 + 2 CO2 -> 2 K2CO3 + 3 O2, making it standard for space suits and submarines."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n- Potassium superoxide ($\\text{KO}_2$) is used in portable breathing apparatus and space suits to absorb $\\text{CO}_2$ and release $\\text{O}_2$."
))

# Q31 (PDF Q31) - MSQ
all_qs.append(q_obj(
    "chem-2023-s1-q31", 31, "Chemistry", "Coordination Chemistry (MSQ)", "Crystal Field Theory & High/Low Spin Complexes", "MSQ", 4.0, 0.0,
    "Negatively charged monodentate strong field ligand ($X^-$) and weak field ligand ($Y^-$) form complexes $[\\text{Mn}X_6]^{4-}$ and $[\\text{Mn}Y_6]^{4-}$, respectively. The correct statement(s) is(are): *(Select all correct options)*\n\n(1) The magnetic moment of $[\\text{Mn}X_6]^{4-}$ is less than that of $[\\text{Mn}Y_6]^{4-}$.\n(2) $[\\text{Mn}Y_6]^{4-}$ is more stabilized than $[\\text{Mn}X_6]^{4-}$.\n(3) The $t_{2g}$ orbitals in $[\\text{Mn}X_6]^{4-}$ are stabilized by $2\\Delta_0$ as compared to degenerate $d$ orbitals.\n(4) $[\\text{Mn}Y_6]^{4-}$ is intense in colour as compared to $[\\text{Mn}X_6]^{4-}$.",
    [
        {"id": "a", "text": "The magnetic moment of $[\\text{Mn}X_6]^{4-}$ is less than that of $[\\text{Mn}Y_6]^{4-}$.", "isCorrect": True, "explanation": "Mn2+ is d5. Strong field X- gives low-spin t2g^5 (1 unpaired e-, mu = 1.73 BM). Weak field Y- gives high-spin t2g^3 eg^2 (5 unpaired e-, mu = 5.92 BM). Thus mu(low-spin) < mu(high-spin)."},
        {"id": "b", "text": "$[\\text{Mn}Y_6]^{4-}$ is more stabilized than $[\\text{Mn}X_6]^{4-}$.", "isCorrect": False, "explanation": "Strong field complex has higher crystal field stabilization energy (CFSE)."},
        {"id": "c", "text": "The $t_{2g}$ orbitals in $[\\text{Mn}X_6]^{4-}$ are stabilized by $2\\Delta_0$ as compared to degenerate $d$ orbitals.", "isCorrect": True, "explanation": "In octahedral field, t2g is stabilized by -0.4 Delta_0 per electron. For 5 electrons: CFSE = 5 * (-0.4 Delta_0) = -2.0 Delta_0."},
        {"id": "d", "text": "$[\\text{Mn}Y_6]^{4-}$ is intense in colour as compared to $[\\text{Mn}X_6]^{4-}$.", "isCorrect": False, "explanation": "Both are centrosymmetric octahedral complexes; d-d transitions are Laporte forbidden."}
    ],
    "**Correct Answers: Options (1) and (3) / (A) and (C)**\n\n- $\\text{Mn}^{2+} (d^5)$:\n  - Low spin $[\\text{Mn}X_6]^{4-}: t_{2g}^5 e_g^0 \\implies n = 1\\text{ unpaired } e^- \\implies \\mu = 1.73\\text{ BM}$; $\\text{CFSE} = 5(-0.4\\Delta_0) = -2\\Delta_0$.\n  - High spin $[\\text{Mn}Y_6]^{4-}: t_{2g}^3 e_g^2 \\implies n = 5\\text{ unpaired } e^- \\implies \\mu = 5.92\\text{ BM}$; $\\text{CFSE} = 0$."
))

# Q32 (PDF Q32) - MSQ
all_qs.append(q_obj(
    "chem-2023-s1-q32", 32, "Chemistry", "Chemical Bonding & Molecular Orbitals (MSQ)", "Heteronuclear Diatomic MO Theory", "MSQ", 4.0, 0.0,
    "The bonding in the species $\\text{HeH}$ can be studied in a way similar to that of $\\text{H}_2$. The correct statement(s) is(are): *(Select all correct options)*\n\n(1) The dipole moment of $\\text{HeH}$ is larger than that of $\\text{H}_2^+$.\n(2) Among $\\text{HeH}, \\text{HeH}^+,$ and $\\text{HeH}_2^{2+}$, the species that is most stable is $\\text{HeH}_2^{2+}$.\n(3) Among $\\text{HeH}, \\text{HeH}^-,$ and $\\text{HeH}^+$, the system with the smallest bond length is $\\text{HeH}^+$.\n(4) $\\text{HeH}^+$ has a symmetrical distribution of electrons about the bond axis.",
    [
        {"id": "a", "text": "The dipole moment of $\\text{HeH}$ is larger than that of $\\text{H}_2^+$.", "isCorrect": True, "explanation": "H2+ is homonuclear with zero permanent dipole moment. Heteronuclear HeH has high permanent dipole moment due to electronegativity difference between He and H."},
        {"id": "b", "text": "Among $\\text{HeH}, \\text{HeH}^+,$ and $\\text{HeH}_2^{2+}$, the species that is most stable is $\\text{HeH}_2^{2+}$.", "isCorrect": False, "explanation": "HeH+ is the most stable 2-electron isoelectronic analogue of H2."},
        {"id": "c", "text": "Among $\\text{HeH}, \\text{HeH}^-,$ and $\\text{HeH}^+$, the system with the smallest bond length is $\\text{HeH}^+$.", "isCorrect": True, "explanation": "HeH+ has bond order 1.0 (sigma_1s^2). HeH has bond order 0.5 (sigma_1s^2 sigma*_1s^1). HeH- has bond order 0 (sigma_1s^2 sigma*_1s^2). Highest bond order => shortest bond length."},
        {"id": "d", "text": "$\\text{HeH}^+$ has a symmetrical distribution of electrons about the bond axis.", "isCorrect": True, "explanation": "Sigma molecular orbitals are cylindrically symmetric about the internuclear bond axis."}
    ],
    "**Correct Answers: Options (1), (3), and (4) / (A), (C), and (D)**\n\n- $\\text{HeH}^+$ has $2\\,e^-$ in $\\sigma_{1s}$ (bond order $= 1$, shortest bond length).\n- $\\sigma$-bonding is cylindrically symmetric about the internuclear axis."
))

# Q33 (PDF Q33) - MSQ
all_qs.append(q_obj(
    "chem-2023-s1-q33", 33, "Chemistry", "Chemical Kinetics (MSQ)", "Sucrose Inversion Polarimetry Kinetics", "MSQ", 4.0, 0.0,
    "The hydrolysis of sucrose in excess acid solution follows first-order kinetics and results in D-glucose and D-fructose. Since, sucrose, D-glucose, and D-fructose are optically active compounds, the progress of the reaction can be monitored by measuring the angle of rotation of the polarized light in a polarimeter at different times. In a certain experiment, $1\\text{ L}$ of $0.1\\text{ M}$ sucrose solution is hydrolyzed and the angle of rotation ($R_t$) is measured at different times ($t$). Let $R_0 = 25^\\circ, R_\\infty = -15^\\circ,$ and $R_{30} = 5^\\circ$ be the angles of rotation at times $t = 0\\text{ min}, t = \\infty,$ and $t = 30\\text{ min}$ respectively. The concentration of sucrose at time $t$ is proportional to the change in the angle of rotation ($R_t - R_\\infty$). Molecular mass of sucrose is $342.3\\text{ g/mol}$. The correct statement(s) is(are): *(Select all correct options)*\n\n(1) The half-life of the reaction is $15\\text{ min}$.\n(2) The rate constant ($k$) is $3.85 \\times 10^{-4}\\text{ s}^{-1}$.\n(3) The mass of sucrose hydrolyzed in $60\\text{ min}$ is $25.6\\text{ g}$.\n(4) The rate of the reaction at $30\\text{ min}$ is $1.925 \\times 10^{-5}\\text{ M s}^{-1}$.",
    [
        {"id": "a", "text": "The half-life of the reaction is $15\\text{ min}$.", "isCorrect": False, "explanation": "Half-life is 30 min, because at 30 min (Rt - R_inf)/(R0 - R_inf) = (5 - (-15))/(25 - (-15)) = 20/40 = 0.5."},
        {"id": "b", "text": "The rate constant ($k$) is $3.85 \\times 10^{-4}\\text{ s}^{-1}$.", "isCorrect": True, "explanation": "k = (ln 2)/t_1/2 = 0.69315 / (30 * 60 s) = 0.69315 / 1800 s = 3.85 * 10^-4 s^-1."},
        {"id": "c", "text": "The mass of sucrose hydrolyzed in $60\\text{ min}$ is $25.6\\text{ g}$.", "isCorrect": True, "explanation": "At 60 min (2 half-lives), 75% of sucrose is hydrolyzed: 0.75 * 0.1 mol * 342.3 g/mol = 0.075 * 342.3 = 25.67 g."},
        {"id": "d", "text": "The rate of the reaction at $30\\text{ min}$ is $1.925 \\times 10^{-5}\\text{ M s}^{-1}$.", "isCorrect": True, "explanation": "Rate at 30 min = k * [A]_30 = (3.85 * 10^-4 s^-1) * (0.05 M) = 1.925 * 10^-5 M s^-1."}
    ],
    "**Correct Answers: Options (2), (3), and (4) / (B), (C), and (D)**\n\n- $t_{1/2} = 30\\text{ min} = 1800\\text{ s} \\implies k = \\frac{\\ln 2}{1800} = 3.85 \\times 10^{-4}\\text{ s}^{-1}$.\n- At $t = 60\\text{ min}$ ($2\\,t_{1/2}$): $\\text{Hydrolyzed} = 75\\% \\times 0.1\\text{ mol} \\times 342.3\\text{ g/mol} = 25.67\\text{ g}$.\n- $\\text{Rate}_{30} = k [\\text{Sucrose}]_{30} = 3.85 \\times 10^{-4} \\times 0.05 = 1.925 \\times 10^{-5}\\text{ M/s}$."
))

# Q34 (PDF Q34) - MSQ
all_qs.append(q_obj(
    "chem-2023-s1-q34", 34, "Chemistry", "Organic Chemistry (MSQ)", "Cannizzaro Reaction Mechanism", "MSQ", 4.0, 0.0,
    "Consider the following mechanism of a reaction (Cannizzaro disproportionation of non-enolizable aldehyde $P$). The correct statement(s) is(are): *(Select all correct options)*\n\n(1) The same mechanism will operate, if compound $P$ does not have one of the methyl groups.\n(2) The reaction involves both oxidation and reduction of $P$.\n(3) The equilibrium is favoured towards products $T$ and $W$ because $T$ and $W$ are weaker conjugate base and acid as compared to $R$ and $S$ respectively.\n(4) Hydride is a nucleophile in the reaction of $Q$ with $P$.",
    [
        {"id": "a", "text": "The same mechanism will operate, if compound $P$ does not have one of the methyl groups.", "isCorrect": False, "explanation": "If an alpha-hydrogen is present, aldol condensation occurs instead of Cannizzaro."},
        {"id": "b", "text": "The reaction involves both oxidation and reduction of $P$.", "isCorrect": True, "explanation": "Cannizzaro reaction is a redox disproportionation: one molecule of aldehyde is oxidized to carboxylate and another is reduced to primary alcohol."},
        {"id": "c", "text": "The equilibrium is favoured towards products $T$ and $W$ because $T$ and $W$ are weaker conjugate base and acid as compared to $R$ and $S$ respectively.", "isCorrect": True, "explanation": "Proton transfer from carboxylic acid to alkoxide strongly drives the equilibrium forward irreversibly."},
        {"id": "d", "text": "Hydride is a nucleophile in the reaction of $Q$ with $P$.", "isCorrect": True, "explanation": "Hydride shift from the tetrahedral intermediate Q attacks the electrophilic carbonyl carbon of P."}
    ],
    "**Correct Answers: Options (2), (3), and (4) / (B), (C), and (D)**\n\n- The Cannizzaro reaction is an intermolecular redox disproportionation driven forward by the hydride transfer step and terminal proton exchange to form stable carboxylate."
))

# ==================== MATHEMATICS (Q35 - Q51) ====================
# Q35
all_qs.append(q_obj(
    "math-2023-s1-q35", 35, "Mathematics", "Calculus", "Differentiable Function Properties", "MCQ", 2.5, 1.0,
    "Let $g : \\mathbb{R} \\rightarrow \\mathbb{R}$ be a differentiable function such that $g(x)g'(x) > 0$ for all $x \\in \\mathbb{R}$. Then:\n\n(1) $g$ is increasing.\n(2) $g$ is decreasing.\n(3) $|g|$ is increasing.\n(4) $|g|$ is decreasing.",
    [
        {"id": "a", "text": "$g$ is increasing.", "isCorrect": False, "explanation": "If g(x) < 0, then g'(x) < 0, making g decreasing."},
        {"id": "b", "text": "$g$ is decreasing.", "isCorrect": False, "explanation": "If g(x) > 0, then g'(x) > 0, making g increasing."},
        {"id": "c", "text": "$|g|$ is increasing.", "isCorrect": True, "explanation": "d/dx [g(x)^2] = 2 g(x) g'(x) > 0 for all x. Since g(x)^2 = |g(x)|^2 is strictly increasing on R, |g(x)| is strictly increasing on R."},
        {"id": "d", "text": "$|g|$ is decreasing.", "isCorrect": False, "explanation": "Derivative of |g|^2 is strictly positive."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n$$\\frac{d}{dx}|g(x)|^2 = \\frac{d}{dx}[g(x)^2] = 2g(x)g'(x) > 0 \\implies |g(x)|\\text{ is strictly increasing}$$"
))

# Q36
all_qs.append(q_obj(
    "math-2023-s1-q36", 36, "Mathematics", "Algebra", "Real Roots of Polynomial", "MCQ", 2.5, 1.0,
    "The number of real roots of $f(x) = x^6 + x^3 - 1$ is:\n\n(1) $0$\n(2) $2$\n(3) $4$\n(4) $6$",
    [
        {"id": "a", "text": "$0$", "isCorrect": False, "explanation": "There are real roots."},
        {"id": "b", "text": "$2$", "isCorrect": True, "explanation": "Let y = x^3. Then y^2 + y - 1 = 0. Discriminant Delta = 1 - 4(1)(-1) = 5 > 0. The two real roots are y1 = (-1 + sqrt(5))/2 > 0 and y2 = (-1 - sqrt(5))/2 < 0. For each real y, x = y^(1/3) gives exactly 1 real solution. Total real roots = 2."},
        {"id": "c", "text": "$4$", "isCorrect": False, "explanation": "Only 2 real roots."},
        {"id": "d", "text": "$6$", "isCorrect": False, "explanation": "4 roots are complex conjugates."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- Substitute $y = x^3 \\implies y^2 + y - 1 = 0$. Two distinct real roots $y_1, y_2 \\implies$ **$2\\text{ real roots}$**."
))

# Q37
all_qs.append(q_obj(
    "math-2023-s1-q37", 37, "Mathematics", "Probability", "Biased Die Sum of Outcomes", "MCQ", 2.5, 1.0,
    "In a throw of a (biased single) dice, the probability of the outcome being a number $n$ is $\\frac{1}{4}$ if $n$ is even, and $\\frac{1}{12}$ if $n$ is odd. If the dice is thrown twice, then the probability that the sum of the two outcomes is an even number is:\n\n(1) $\\frac{3}{8}$\n(2) $\\frac{1}{2}$\n(3) $\\frac{5}{8}$\n(4) $\\frac{3}{4}$",
    [
        {"id": "a", "text": "$\\frac{3}{8}$", "isCorrect": False, "explanation": "P(Sum odd) = 3/8."},
        {"id": "b", "text": "$\\frac{1}{2}$", "isCorrect": False, "explanation": "Applies to fair die."},
        {"id": "c", "text": "$\\frac{5}{8}$", "isCorrect": True, "explanation": "P(Even) = P(2) + P(4) + P(6) = 3 * (1/4) = 3/4. P(Odd) = P(1) + P(3) + P(5) = 3 * (1/12) = 1/4. Sum is even iff both are even or both are odd: P(Sum Even) = P(Even, Even) + P(Odd, Odd) = (3/4)*(3/4) + (1/4)*(1/4) = 9/16 + 1/16 = 10/16 = 5/8."},
        {"id": "d", "text": "$\\frac{3}{4}$", "isCorrect": False, "explanation": "Arithmetic error."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n$$P(\\text{Sum Even}) = P(E)P(E) + P(O)P(O) = \\left(\\frac{3}{4}\\right)^2 + \\left(\\frac{1}{4}\\right)^2 = \\frac{10}{16} = \\frac{5}{8}$$"
))

# Q38
all_qs.append(q_obj(
    "math-2023-s1-q38", 38, "Mathematics", "Calculus & Limits", "Continuity of Composite Signum Functions", "MCQ", 2.5, 1.0,
    "Let $\\text{sgn}(x)$ be the function defined as:\n$$\\text{sgn}(x) = \\begin{cases} 1, & \\text{if } x > 0, \\\\ -1, & \\text{if } x < 0, \\\\ 0, & \\text{if } x = 0. \\end{cases}$$\nLet $f : \\mathbb{R} \\rightarrow \\mathbb{R}$ be the function defined by $f(x) = (x - \\sqrt{5})\\,\\text{sgn}(x^2 - 5)$. Then the number of discontinuities of $f$ is:\n\n(1) $0$\n(2) $1$\n(3) $2$\n(4) $3$",
    [
        {"id": "a", "text": "$0$", "isCorrect": False, "explanation": "Discontinuous at -sqrt(5)."},
        {"id": "b", "text": "$1$", "isCorrect": True, "explanation": "sgn(x^2 - 5) changes sign at x = sqrt(5) and x = -sqrt(5). At x = sqrt(5): lim_{x->sqrt(5)} (x - sqrt(5))*sgn(x^2-5) = 0 * (+-1) = 0 = f(sqrt(5)), so f is CONTINUOUS at x = sqrt(5). At x = -sqrt(5): left limit = (-2 sqrt(5))*(+1) = -2 sqrt(5), while right limit = (-2 sqrt(5))*(-1) = +2 sqrt(5), so f is DISCONTINUOUS at x = -sqrt(5). Total discontinuities = 1."},
        {"id": "c", "text": "$2$", "isCorrect": False, "explanation": "Continuous at +sqrt(5) due to the factor (x - sqrt(5))."},
        {"id": "d", "text": "$3$", "isCorrect": False, "explanation": "Overcounted."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- At $x = \\sqrt{5}$, $\\lim_{x \\to \\sqrt{5}} (x - \\sqrt{5})\\text{sgn}(x^2-5) = 0 = f(\\sqrt{5})$ (Continuous).\n- At $x = -\\sqrt{5}$, the left and right limits are $-2\\sqrt{5} \\neq 2\\sqrt{5}$ (Discontinuous) $\\implies$ **$1\\text{ discontinuity}$**."
))

# Q39
all_qs.append(q_obj(
    "math-2023-s1-q39", 39, "Mathematics", "Combinatorics", "3-Digit Numbers Digit Sum Constraint", "MCQ", 2.5, 1.0,
    "Let $S$ be the set of all natural numbers $x$ such that\n(i) $100 \\le x \\le 999$,\n(ii) $0$ appears at least once as a digit in the decimal expansion of $x$, and\n(iii) the sum of the digits of $x$ is $10$.\n\nThe number of elements in $S$ is:\n(1) $18$\n(2) $20$\n(3) $27$\n(4) $30$",
    [
        {"id": "a", "text": "$18$", "isCorrect": True, "explanation": "Number is abc with a in {1..9}, b, c in {0..9}, and a+b+c=10. Case 1: c=0 => a+b=10. Since a in {1..9}, b in {1..9}, there are 9 solutions: (1,9), (2,8), ..., (9,1). Case 2: b=0, c != 0 => a+c=10. Since a in {1..9}, c in {1..9}, there are 9 solutions: (1,9), ..., (9,1). Total elements = 9 + 9 = 18."},
        {"id": "b", "text": "$20$", "isCorrect": False, "explanation": "Overcounted."},
        {"id": "c", "text": "$27$", "isCorrect": False, "explanation": "Included cases without zero."},
        {"id": "d", "text": "$30$", "isCorrect": False, "explanation": "Overcounted."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Units digit $0 \\implies a + b = 10 \\implies 9\\text{ numbers}$.\n- Tens digit $0 \\implies a + c = 10 \\implies 9\\text{ numbers}$.\n- Total $|S| = 9 + 9 = 18$."
))

# Q40
all_qs.append(q_obj(
    "math-2023-s1-q40", 40, "Mathematics", "Coordinate Geometry", "Parabola Chord Length & Parameter", "MCQ", 2.5, 1.0,
    "The horizontal line $y = k$ intersects the parabola $y = 2(x - 4)(x - 6)$ at points $A$ and $B$. If the length of $AB$ is $8$, then the value of $k$ is:\n\n(1) $30$\n(2) $10$\n(3) $20$\n(4) $8$",
    [
        {"id": "a", "text": "$30$", "isCorrect": True, "explanation": "The axis of symmetry of y = 2(x - 4)(x - 6) = 2(x^2 - 10x + 24) is x = 5. A chord of length 8 centered on x = 5 has endpoints at x = 5 +- 4, i.e., x1 = 1 and x2 = 9. Substituting x = 1 gives k = 2(1 - 4)(1 - 6) = 2(-3)(-5) = 30."},
        {"id": "b", "text": "$10$", "isCorrect": False, "explanation": "Calculation error."},
        {"id": "c", "text": "$20$", "isCorrect": False, "explanation": "Calculation error."},
        {"id": "d", "text": "$8$", "isCorrect": False, "explanation": "Calculation error."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Symmetry axis is $x = 5$. Points are $x = 5 \\pm 4 \\implies x = 1, 9$.\n- $k = 2(1 - 4)(1 - 6) = 30$."
))

# Q41
all_qs.append(q_obj(
    "math-2023-s1-q41", 41, "Mathematics", "Calculus & Limits", "Limit of Riemann Sum", "MCQ", 2.5, 1.0,
    "Let $S(n) = \\frac{1}{n^4} \\sum_{l=1}^{n} (l + 2)(l + 4)(l + 6)$. The value of $\\lim_{n \\rightarrow \\infty} S(n)$ is:\n\n(1) $\\frac{1}{6}$\n(2) $\\frac{1}{2}$\n(3) $\\frac{1}{4}$\n(4) $1$",
    [
        {"id": "a", "text": "$\\frac{1}{6}$", "isCorrect": False, "explanation": "Limit for sum of squares."},
        {"id": "b", "text": "$\\frac{1}{2}$", "isCorrect": False, "explanation": "Limit for sum of linear terms."},
        {"id": "c", "text": "$\\frac{1}{4}$", "isCorrect": True, "explanation": "(l+2)(l+4)(l+6) = l^3 + 12 l^2 + 44 l + 48. Lim_{n->inf} (1/n^4) sum l^3 = int_0^1 x^3 dx = [x^4 / 4]_0^1 = 1/4. Lower degree terms (l^2, l, 1) divided by n^4 vanish in the limit as n -> infty."},
        {"id": "d", "text": "$1$", "isCorrect": False, "explanation": "Incorrect limit."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n$$\\lim_{n \\to \\infty} S(n) = \\int_0^1 x^3\\,dx = \\left[ \\frac{x^4}{4} \\right]_0^1 = \\frac{1}{4}$$"
))

# Q42
all_qs.append(q_obj(
    "math-2023-s1-q42", 42, "Mathematics", "Matrices & Determinants", "Matrix Geometric Series & Roots of Unity", "MCQ", 2.5, 1.0,
    "Let $\\alpha$ be a complex number such that $\\alpha \\neq 1$ and $\\alpha^5 = 1$. Let $A = \\begin{pmatrix} 0 & 0 & \\alpha \\\\ 0 & \\alpha & 0 \\\\ \\alpha & 0 & 0 \\end{pmatrix}$ and $I$ denote the identity matrix. Then the value of $I + A + A^2 + A^3 + A^4$ is:",
    [
        {"id": "a", "text": "$(1 + \\alpha^2 + \\alpha^4) \\begin{pmatrix} 1 & 0 & -1 \\\\ 0 & 0 & 0 \\\\ -1 & 0 & 1 \\end{pmatrix}$", "isCorrect": True, "explanation": "A = alpha * P where P = [0 0 1; 0 1 0; 1 0 0]. Since P^2 = I, P is an involution. Summing the geometric series with alpha^5 = 1 yields (1 + alpha^2 + alpha^4) [1 0 -1; 0 0 0; -1 0 1]."},
        {"id": "b", "text": "$\\alpha(1 + \\alpha^2) \\begin{pmatrix} 1 & 0 & -1 \\\\ 0 & 0 & 0 \\\\ -1 & 0 & 1 \\end{pmatrix}$", "isCorrect": False, "explanation": "Missing alpha^4 term."},
        {"id": "c", "text": "$(1 + \\alpha^2 + \\alpha^4) \\begin{pmatrix} -1 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 1 & 0 & -1 \\end{pmatrix}$", "isCorrect": False, "explanation": "Opposite sign."},
        {"id": "d", "text": "$(1 + \\alpha^2 + \\alpha^4) \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$", "isCorrect": False, "explanation": "Non-diagonal elements remain."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Notice $A^2 = \\alpha^2 I_3$ for odd powers and anti-diagonal structure, summing to $(1 + \\alpha^2 + \\alpha^4) \\begin{pmatrix} 1 & 0 & -1 \\\\ 0 & 0 & 0 \\\\ -1 & 0 & 1 \\end{pmatrix}$."
))

# Q43
all_qs.append(q_obj(
    "math-2023-s1-q43", 43, "Mathematics", "Coordinate Geometry", "Parabola Vertices & Intersection Slope", "MCQ", 2.5, 1.0,
    "Let $P$ and $Q$ be the vertices of the parabolas $y = x^2 + bx + c$ and $y = -x^2 + dx + e$, respectively. If $P$ and $Q$ are the points of intersection of the parabolas, then the slope of the line through $P$ and $Q$ is:\n\n(1) $\\frac{c + e}{2}$\n(2) $\\frac{c + d}{2}$\n(3) $\\frac{b + d}{2}$\n(4) $\\frac{b + e}{2}$",
    [
        {"id": "a", "text": "$\\frac{c + e}{2}$", "isCorrect": False, "explanation": "Incorrect coefficients."},
        {"id": "b", "text": "$\\frac{c + d}{2}$", "isCorrect": False, "explanation": "Incorrect coefficients."},
        {"id": "c", "text": "$\\frac{b + d}{2}$", "isCorrect": True, "explanation": "Vertex of y = x^2 + bx + c is at x1 = -b/2. Vertex of y = -x^2 + dx + e is at x2 = d/2. Intersection condition 2x^2 + (b-d)x + (c-e) = 0 has roots x1, x2. Equating y-coordinates at the vertices gives slope m = (y2 - y1)/(x2 - x1) = (b + d)/2."},
        {"id": "d", "text": "$\\frac{b + e}{2}$", "isCorrect": False, "explanation": "Incorrect coefficients."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- The line passing through the two vertices has slope $m = \\frac{b + d}{2}$.",
    img=cld["q43"]
))

# Q44
all_qs.append(q_obj(
    "math-2023-s1-q44", 44, "Mathematics", "Geometry", "Triangle Cevian Length", "MCQ", 2.5, 1.0,
    "Let $ABC$ be a triangle with $AC = 2048, AB = 512,$ and $BC = 2000$. Let $P$ be a point on the segment $AB$ such that $AP = 1$, and $Q$ be a point on the segment $AC$ such that $AQ = 1024$. Let $R$ be the midpoint of $PQ$. Let $Z$ be the point of intersection of $AR$ and $BC$. Then the length of $ZC$ is:\n\n(1) $\\frac{2000}{256}$\n(2) $\\frac{2000}{257}$\n(3) $\\frac{1000}{256}$\n(4) $\\frac{1000}{257}$",
    [
        {"id": "a", "text": "$\\frac{2000}{256}$", "isCorrect": False, "explanation": "Ratio calculation error."},
        {"id": "b", "text": "$\\frac{2000}{257}$", "isCorrect": True, "explanation": "Using barycentric coordinates with respect to A, B, C: P lies on AB with AP/AB = 1/512 => P = (1 - 1/512) A + (1/512) B. Q lies on AC with AQ/AC = 1024/2048 = 1/2 => Q = (1/2) A + (1/2) C. Midpoint R = (P + Q)/2 has B-weight (1/1024) and C-weight (1/4) = (256/1024). The ray AR meets BC at Z with ratio BZ/ZC = (C-weight)/(B-weight) = 256/1 = 256. Thus BZ = 256 * ZC => BC = BZ + ZC = 257 * ZC => ZC = BC / 257 = 2000 / 257."},
        {"id": "c", "text": "$\\frac{1000}{256}$", "isCorrect": False, "explanation": "Incorrect ratio."},
        {"id": "d", "text": "$\\frac{1000}{257}$", "isCorrect": False, "explanation": "Incorrect ratio."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- Position vector analysis on $\\triangle ABC$ gives $\\frac{BZ}{ZC} = 256 \\implies ZC = \\frac{BC}{257} = \\frac{2000}{257}$.",
    img=cld["q44"]
))

# Q45
all_qs.append(q_obj(
    "math-2023-s1-q45", 45, "Mathematics", "Calculus & Analysis", "Lipschitz Differentiability & Derivative Evaluation", "MCQ", 2.5, 1.0,
    "Let $f : \\mathbb{R} \\rightarrow \\mathbb{R}$ be a continuous function such that $f(0) = 1$ and $|f(x) - f(y)| \\le |\\sin((x - y)^2)|$ for all $x, y \\in \\mathbb{R}$, and let $g$ be the function defined by $g(x) = x^2 f(x^2)$ for all $x \\in \\mathbb{R}$. Then the value of $g'(2)$ is:\n\n(1) $2$\n(2) $4$\n(3) $6$\n(4) $0$",
    [
        {"id": "a", "text": "$2$", "isCorrect": False, "explanation": "Arithmetic error."},
        {"id": "b", "text": "$4$", "isCorrect": True, "explanation": "|f'(x)| = lim_{h->0} |f(x+h) - f(x)|/|h| <= lim_{h->0} |sin(h^2)|/|h| = lim |h| = 0 => f'(x) = 0 for all x => f(x) = f(0) = 1 is a constant function! Thus g(x) = x^2 * 1 = x^2 => g'(x) = 2x => g'(2) = 2(2) = 4."},
        {"id": "c", "text": "$6$", "isCorrect": False, "explanation": "Calculation error."},
        {"id": "d", "text": "$0$", "isCorrect": False, "explanation": "g'(2) is non-zero."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- $|f'(x)| \\le \\lim_{h \\to 0} \\frac{h^2}{|h|} = 0 \\implies f(x) = 1\\text{ (constant)}$.\n- $g(x) = x^2 \\implies g'(x) = 2x \\implies g'(2) = 4$."
))

# Q46
all_qs.append(q_obj(
    "math-2023-s1-q46", 46, "Mathematics", "Combinatorics & Geometry", "Obtuse Triangles in Regular 2n-gon", "MCQ", 2.5, 1.0,
    "Let $n \\ge 3$ be an integer. Let $P_1, P_2, \\dots, P_{2n}$ be points in the plane, which are the vertices of a regular $2n$-gon. The number of obtuse-angled triangles with vertices contained in the set $\\{P_1, P_2, \\dots, P_{2n}\\}$ is:\n\n(1) $n(n - 1)(n - 2)$\n(2) $\\frac{n^2(n - 1)(n - 2)}{3}$\n(3) $\\frac{n(n - 1)^2}{2}$\n(4) $2n(2n - 1)(2n - 2)$",
    [
        {"id": "a", "text": "$n(n - 1)(n - 2)$", "isCorrect": True, "explanation": "A triangle is obtuse iff all 3 vertices lie strictly within an open semicircle of length < pi. For a regular 2n-gon, there are 2n choices for the initial vertex. The remaining 2 vertices must be chosen from the n-1 strictly subsequent vertices in the semicircle in C(n-1, 2) ways. Total = 2n * [(n-1)(n-2)/2] = n(n-1)(n-2)."},
        {"id": "b", "text": "$\\frac{n^2(n - 1)(n - 2)}{3}$", "isCorrect": False, "explanation": "Incorrect formula."},
        {"id": "c", "text": "$\\frac{n(n - 1)^2}{2}$", "isCorrect": False, "explanation": "Incorrect formula."},
        {"id": "d", "text": "$2n(2n - 1)(2n - 2)$", "isCorrect": False, "explanation": "Overcounted."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n$$N = 2n \\binom{n - 1}{2} = 2n \\frac{(n - 1)(n - 2)}{2} = n(n - 1)(n - 2)$$"
))

# Q47 (PDF Q47) - MSQ
all_qs.append(q_obj(
    "math-2023-s1-q47", 47, "Mathematics", "Linear Algebra (MSQ)", "Matrix Properties & Determinants", "MSQ", 4.0, 0.0,
    "If $A, B, C$ are $3 \\times 3$ matrices with entries in $\\mathbb{R}$, satisfying the condition $AB = AC$, then:\n\n(1) the determinant of $AB$ is $0$.\n(2) either $A$ is the zero matrix or $B = C$.\n(3) either $B = C$ or $A$ is not an invertible matrix.\n(4) either $A$ is the zero matrix or the determinant of $B - C$ is $0$.",
    [
        {"id": "a", "text": "the determinant of $AB$ is $0$.", "isCorrect": False, "explanation": "If A, B are invertible and B=C, det(AB) != 0."},
        {"id": "b", "text": "either $A$ is the zero matrix or $B = C$.", "isCorrect": False, "explanation": "Non-zero singular matrix A can satisfy A(B-C) = 0."},
        {"id": "c", "text": "either $B = C$ or $A$ is not an invertible matrix.", "isCorrect": True, "explanation": "A(B - C) = 0. If A is invertible, A^-1 exists => B - C = 0 => B = C. Thus, if B != C, A cannot be invertible (det(A) = 0)."},
        {"id": "d", "text": "either $A$ is the zero matrix or the determinant of $B - C$ is $0$.", "isCorrect": True, "explanation": "If B - C is invertible, then A = A(B - C)(B - C)^-1 = 0. Thus, if A is non-zero, B - C must be singular (det(B - C) = 0)."}
    ],
    "**Correct Answers: Options (3) and (4) / (C) and (D)**\n\n- $A(B - C) = 0$:\n  - If $A$ is invertible $\\implies B = C$.\n  - If $B - C$ is invertible $\\implies A = 0$."
))

# Q48 (PDF Q48) - MSQ
all_qs.append(q_obj(
    "math-2023-s1-q48", 48, "Mathematics", "Set Theory & Functions (MSQ)", "Composition of Functions", "MSQ", 4.0, 0.0,
    "Let $X, Y, Z$ be sets and $f : X \\rightarrow Y$ and $g : Y \\rightarrow Z$ be functions. Then:\n\n(1) $g \\circ f$ being injective implies $f$ injective.\n(2) $g \\circ f$ being surjective implies $g$ surjective.\n(3) $g \\circ f$ being injective implies $g$ injective.\n(4) $g$ being surjective implies $g \\circ f$ surjective.",
    [
        {"id": "a", "text": "$g \\circ f$ being injective implies $f$ injective.", "isCorrect": True, "explanation": "If f(x1) = f(x2) => g(f(x1)) = g(f(x2)) => x1 = x2 by injectivity of g o f."},
        {"id": "b", "text": "$g \\circ f$ being surjective implies $g$ surjective.", "isCorrect": True, "explanation": "For any z in Z, there is x in X such that g(f(x)) = z => y = f(x) in Y satisfies g(y) = z."},
        {"id": "c", "text": "$g \\circ f$ being injective implies $g$ injective.", "isCorrect": False, "explanation": "Counterexample: g can map elements outside range(f) to identical values."},
        {"id": "d", "text": "$g$ being surjective implies $g \\circ f$ surjective.", "isCorrect": False, "explanation": "f might not cover the full domain of g."}
    ],
    "**Correct Answers: Options (1) and (2) / (A) and (B)**\n\n- Fundamental set mapping theorems: $(g \\circ f)\\text{ injective} \\implies f\\text{ injective}$, and $(g \\circ f)\\text{ surjective} \\implies g\\text{ surjective}$."
))

# Q49 (PDF Q49) - MSQ
all_qs.append(q_obj(
    "math-2023-s1-q49", 49, "Mathematics", "Calculus (MSQ)", "Derivative on Disconnected Domain", "MSQ", 4.0, 0.0,
    "Let $f : (0, 3) \\cup (6, 9) \\rightarrow \\mathbb{R}$ be a differentiable function such that $f'(x) = \\frac{1}{2}$ for all $x \\in (0, 3) \\cup (6, 9)$. Then:\n\n(1) $f$ is an increasing function.\n(2) $f$ is a one-to-one function.\n(3) $f(8) - f(7) = f(2) - f(1)$.\n(4) There exists a number $c \\in \\mathbb{R}$ such that $f(x + 6) = f(x) + c$ for all $x \\in (0, 3)$.",
    [
        {"id": "a", "text": "$f$ is an increasing function.", "isCorrect": False, "explanation": "Since the domain is disconnected, we can choose f(x) = x/2 + 100 on (0,3) and f(x) = x/2 on (6,9), which is NOT monotonically increasing across the union."},
        {"id": "b", "text": "$f$ is a one-to-one function.", "isCorrect": False, "explanation": "Independent constants can make the ranges overlap, violating injectivity."},
        {"id": "c", "text": "$f(8) - f(7) = f(2) - f(1)$.", "isCorrect": True, "explanation": "On (6,9): f(8) - f(7) = 1/2(8 - 7) = 1/2. On (0,3): f(2) - f(1) = 1/2(2 - 1) = 1/2. Both equal 1/2."},
        {"id": "d", "text": "There exists a number $c \\in \\mathbb{R}$ such that $f(x + 6) = f(x) + c$ for all $x \\in (0, 3)$.", "isCorrect": True, "explanation": "f(x) = x/2 + c1 for x in (0,3) and f(y) = y/2 + c2 for y in (6,9). For x in (0,3), x+6 in (6,9), so f(x+6) = (x+6)/2 + c2 = x/2 + 3 + c2 = (f(x) - c1) + 3 + c2 = f(x) + c where c = 3 + c2 - c1 is constant."}
    ],
    "**Correct Answers: Options (3) and (4) / (C) and (D)**\n\n- Independent intervals satisfy $f(8)-f(7) = 1/2 = f(2)-f(1)$, and $f(x+6) = f(x) + (3 + c_2 - c_1)$."
))

# Q50 (PDF Q50) - MSQ
all_qs.append(q_obj(
    "math-2023-s1-q50", 50, "Mathematics", "Coordinate Geometry (MSQ)", "Parabola Triangles & Geometry", "MSQ", 4.0, 0.0,
    "Let $A$ and $B$ be two points on the parabola $y - 2x^2 = 0$ and $O$ be the origin $(0, 0)$. If:\n\n(1) $OAB$ is an isosceles triangle, then the $y$-coordinates of $A$ and $B$ are equal.\n(2) $OAB$ is an equilateral triangle, then the length of each side is $\\sqrt{3}$.\n(3) $OAB$ is an isosceles triangle and the two equal sides are of length $\\sqrt{3}$, then $OAB$ is an equilateral triangle.\n(4) $OAB$ is an equilateral triangle, then its altitude is $\\sqrt{3}$.",
    [
        {"id": "a", "text": "$OAB$ is an isosceles triangle, then the $y$-coordinates of $A$ and $B$ are equal.", "isCorrect": True, "explanation": "If OA = OB, then x1^2 + y1^2 = x2^2 + y2^2. Since y = 2x^2, y1/2 + y1^2 = y2/2 + y2^2. Because g(y) = y/2 + y^2 is strictly monotonic for y >= 0, y1 = y2."},
        {"id": "b", "text": "$OAB$ is an equilateral triangle, then the length of each side is $\\sqrt{3}$.", "isCorrect": True, "explanation": "In an equilateral triangle with vertex at origin, slope of OA is tan(60) = sqrt(3) => y1/x1 = 2x1 = sqrt(3) => x1 = sqrt(3)/2. Side length = 2 * x1 = sqrt(3)."},
        {"id": "c", "text": "$OAB$ is an isosceles triangle and the two equal sides are of length $\\sqrt{3}$, then $OAB$ is an equilateral triangle.", "isCorrect": False, "explanation": "Isosceles sides do not enforce 60 degree angle."},
        {"id": "d", "text": "$OAB$ is an equilateral triangle, then its altitude is $\\sqrt{3}$.", "isCorrect": False, "explanation": "Altitude is y = 2(sqrt(3)/2)^2 = 3/2, not sqrt(3)."}
    ],
    "**Correct Answers: Options (1) and (2) / (A) and (B)**\n\n- Monotonicity of $y/2 + y^2$ enforces $y_A = y_B$ for $OA = OB$.\n- Equilateral triangle geometry yields side length $s = \\sqrt{3}$."
))

# Q51 (PDF Q51) - MSQ
all_qs.append(q_obj(
    "math-2023-s1-q51", 51, "Mathematics", "Real Analysis (MSQ)", "Connectedness & Polynomial Pre-images", "MSQ", 4.0, 0.0,
    "Let $f : [0, 1] \\rightarrow \\mathbb{R}$ be a continuous function and $P$ be a polynomial of degree $4$ with coefficients in $\\mathbb{R}$. If $P(f(x)) = 0$ for all $x \\in [0, 1]$, then:\n\n(1) $f(x) = 0$ for all $x \\in \\mathbb{R}$.\n(2) $f$ is a constant function.\n(3) for all continuous functions $g$, there exists $x \\in [0, 1]$ such that $P(g(x)) = 0$.\n(4) $P$ has at most two roots which do not belong to $\\mathbb{R}$.",
    [
        {"id": "a", "text": "$f(x) = 0$ for all $x \\in \\mathbb{R}$.", "isCorrect": False, "explanation": "f can be constant at any real root r of P, not necessarily 0."},
        {"id": "b", "text": "$f$ is a constant function.", "isCorrect": True, "explanation": "The image f([0, 1]) is a connected subset of R because [0, 1] is connected and f is continuous. But f([0, 1]) is contained in the finite set of roots of P(x). The only connected subsets of a finite set are singletons. Hence f([0, 1]) = {c}, so f is constant."},
        {"id": "c", "text": "for all continuous functions $g$, there exists $x \\in [0, 1]$ such that $P(g(x)) = 0$.", "isCorrect": False, "explanation": "A continuous function g whose range avoids roots of P has P(g(x)) != 0 everywhere."},
        {"id": "d", "text": "$P$ has at most two roots which do not belong to $\\mathbb{R}$.", "isCorrect": False, "explanation": "A degree 4 polynomial can have 4 non-real roots."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- The continuous image of a connected interval $[0,1]$ in a discrete finite root set must be a **singleton** $\\implies f(x) = c$ (constant)."
))

# ==================== PHYSICS (Q52 - Q68) ====================
# Q52
all_qs.append(q_obj(
    "phy-2023-s1-q52", 52, "Physics", "Mechanics & Rotational Motion", "Angular Momentum & Draining Liquid", "MCQ", 2.5, 1.0,
    "A thin spherical copper shell of radius $R$, completely filled with a viscous fluid, is rotating about the vertical axis with a constant angular speed $\\omega_0$. Due to a leak at the bottom of the shell, the fluid starts dripping steadily and vertically from the shell. The net change in angular speed ($\\delta\\omega$) when the shell gets empty is:\n\n(1) proportional to $R^2$.\n(2) proportional to $R$.\n(3) proportional to $R^3$.\n(4) independent of $R$.",
    [
        {"id": "a", "text": "proportional to $R^2$.", "isCorrect": False, "explanation": "delta omega = 0."},
        {"id": "b", "text": "proportional to $R$.", "isCorrect": False, "explanation": "delta omega = 0."},
        {"id": "c", "text": "proportional to $R^3$.", "isCorrect": False, "explanation": "delta omega = 0."},
        {"id": "d", "text": "independent of $R$.", "isCorrect": True, "explanation": "The leak is at the bottom of the shell on the axis of rotation (r=0). Fluid dripped along the axis carries away zero angular momentum (dL/dt = 0). The angular speed of the shell remains constant at omega_0 throughout, so delta omega = 0, which is independent of R."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n- Fluid draining on the rotation axis ($r = 0$) exerts zero external torque $\\implies \\delta\\omega = 0$ (independent of $R$)."
))

# Q53
all_qs.append(q_obj(
    "phy-2023-s1-q53", 53, "Physics", "Gravitation", "Tidal Forces & Roche Disruption Distance", "MCQ", 2.5, 1.0,
    "A spherical comet having mass $M_s$ and radius $r$ is moving towards a planet of mass $M_p$ as shown in the figure. At a separation distance $d$, equal gravitational force is experienced by the two identical test masses $m$ which are placed at diametrically opposite ends ($A$ and $B$) of the comet. Assuming $d \\gg r$, the correct choice about the separation distance $d$ is:\n\n(1) $d$ is proportional to $M_p^{1/3}$.\n(2) $d$ is proportional to $M_s^{2/3}$.\n(3) $d$ is independent of $r$.\n(4) $d$ is inversely proportional to $M_s^{2/3}$.",
    [
        {"id": "a", "text": "$d$ is proportional to $M_p^{1/3}$.", "isCorrect": True, "explanation": "Tidal force gradient of planet = 2 G Mp r / d^3. Comet self-gravitational force = G Ms / r^2. Equating gives 2 Mp r / d^3 = Ms / r^2 => d^3 = 2 r^3 (Mp / Ms) => d = r (2 Mp / Ms)^(1/3) proportional to Mp^(1/3)."},
        {"id": "b", "text": "$d$ is proportional to $M_s^{2/3}$.", "isCorrect": False, "explanation": "d is proportional to Ms^(-1/3)."},
        {"id": "c", "text": "$d$ is independent of $r$.", "isCorrect": False, "explanation": "d is proportional to r."},
        {"id": "d", "text": "$d$ is inversely proportional to $M_s^{2/3}$.", "isCorrect": False, "explanation": "Exponent is 1/3."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n$$d = r \\left(\\frac{2M_p}{M_s}\\right)^{1/3} \\implies d \\propto M_p^{1/3}$$",
    img=cld["q53"]
))

# Q54
all_qs.append(q_obj(
    "phy-2023-s1-q54", 54, "Physics", "Thermal Physics & Radiation", "Stefan-Boltzmann Law & Wien's Displacement", "MCQ", 2.5, 1.0,
    "A metal rod, connected between two high voltage electrodes, attains steady-state temperature through a balance between radiated power loss and Joule heating. The temperature of the surrounding is negligible compared to that of the rod and the resistance of the rod is independent of its temperature. Assuming the current through the rod to be $I$, the dominant wavelength of radiation ($\\lambda$) is given by $\\lambda \\propto I^\\alpha$. Then, the value of $\\alpha$ is:\n\n(1) $1.0$\n(2) $-0.5$\n(3) $2.0$\n(4) $-1.0$",
    [
        {"id": "a", "text": "$1.0$", "isCorrect": False, "explanation": "Incorrect sign/exponent."},
        {"id": "b", "text": "$-0.5$", "isCorrect": True, "explanation": "Joule heat = I^2 R. Radiated power = e sigma A T^4. At steady state: I^2 R = e sigma A T^4 => T proportional to I^(1/2). By Wien's Displacement Law: lambda_max * T = b => lambda_max proportional to T^(-1) proportional to (I^(1/2))^(-1) = I^(-0.5). Thus alpha = -0.5."},
        {"id": "c", "text": "$2.0$", "isCorrect": False, "explanation": "Incorrect exponent."},
        {"id": "d", "text": "$-1.0$", "isCorrect": False, "explanation": "Incorrect exponent."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- $I^2 R = \\epsilon \\sigma A T^4 \\implies T \\propto I^{1/2}$.\n- By Wien's Law: $\\lambda \\propto T^{-1} \\propto I^{-1/2} = I^{-0.5} \\implies \\alpha = -0.5$."
))

# Q55
all_qs.append(q_obj(
    "phy-2023-s1-q55", 55, "Physics", "Thermodynamics", "Thermodynamic State Processes", "MCQ", 2.5, 1.0,
    "Thermodynamic processes ($P_1, P_2, P_3, P_4$) in which an ideal gas passes through states $1, 2,$ and $3$ are shown in the figure where $P, V, T$ are pressure, volume, and temperature, respectively. The process(processes) that could be identical to the process $P_1$ is (are):\n\n(1) $P_2$ only.\n(2) $P_2$ and $P_3$ only.\n(3) $P_3$ and $P_4$ only.\n(4) $P_2$ and $P_4$ only.",
    [
        {"id": "a", "text": "$P_2$ only.", "isCorrect": True, "explanation": "Process P1 on P-V: 1->2 is isobaric expansion (V increases at constant P => T increases linearly with V, straight line through origin on V-T). 2->3 is isochoric cooling (V constant, P and T decrease). 3->1 is isothermal compression (T constant, V decreases, P increases). Process P2 on V-T exactly mirrors all three state changes."},
        {"id": "b", "text": "$P_2$ and $P_3$ only.", "isCorrect": False, "explanation": "P3 does not match."},
        {"id": "c", "text": "$P_3$ and $P_4$ only.", "isCorrect": False, "explanation": "P3 and P4 do not match."},
        {"id": "d", "text": "$P_2$ and $P_4$ only.", "isCorrect": False, "explanation": "P4 cycle is inverted."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- The thermodynamic cycle $P_1$ is identically matched by $P_2$ on the $V-T$ diagram.",
    img=cld["q55"]
))

# Q56
all_qs.append(q_obj(
    "phy-2023-s1-q56", 56, "Physics", "Modern Physics", "De Broglie Wavelength of Charged Ions", "MCQ", 2.5, 1.0,
    "A proton accelerated from rest by a potential difference of $V\\text{ volts}$ has a de Broglie wavelength of $0.20\\text{ \\AA}$ ($1.0\\text{ \\AA} = 10^{-10}\\text{ m}$). A fully ionized Helium atom is similarly accelerated by a potential difference of $2V\\text{ volts}$. Its de Broglie wavelength (in $\\text{\\AA}$) is closest to:\n\n(1) $0.05$\n(2) $0.07$\n(3) $0.10$\n(4) $0.20$",
    [
        {"id": "a", "text": "$0.05$", "isCorrect": True, "explanation": "lambda = h / sqrt(2 m q V_acc). For proton: m_p, q_p = e, V_1 = V. For alpha particle: m_alpha = 4 m_p, q_alpha = 2e, V_2 = 2V. Ratio lambda_alpha / lambda_p = sqrt[ (m_p * e * V) / (4 m_p * 2e * 2V) ] = sqrt(1/16) = 1/4. lambda_alpha = 0.20 / 4 = 0.05 Angstrom."},
        {"id": "b", "text": "$0.07$", "isCorrect": False, "explanation": "Used factor sqrt(8)."},
        {"id": "c", "text": "$0.10$", "isCorrect": False, "explanation": "Used factor 2."},
        {"id": "d", "text": "$0.20$", "isCorrect": False, "explanation": "Unchanged."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n$$\\lambda_\\alpha = \\frac{\\lambda_p}{\\sqrt{4 \\times 2 \\times 2}} = \\frac{0.20\\text{ \\AA}}{4} = 0.05\\text{ \\AA}$$"
))

# Q57
all_qs.append(q_obj(
    "phy-2023-s1-q57", 57, "Physics", "Atomic Physics", "Bohr Radius & Reduced Mass Dependence", "MCQ", 2.5, 1.0,
    "Consider the Bohr model of the hydrogen atom with Bohr radius $a_B$. If the mass of the electron and that of the proton become twice the present values, then the new Bohr radius will:\n\n(1) remain unchanged.\n(2) change to $2a_B$.\n(3) change to $\\frac{a_B}{2}$.\n(4) change to $4a_B$.",
    [
        {"id": "a", "text": "remain unchanged.", "isCorrect": False, "explanation": "Reduced mass changes."},
        {"id": "b", "text": "change to $2a_B$.", "isCorrect": False, "explanation": "Bohr radius is inversely proportional to mass."},
        {"id": "c", "text": "change to $\\frac{a_B}{2}$.", "isCorrect": True, "explanation": "Bohr radius a_B = 4 pi eps0 hbar^2 / (mu e^2), where reduced mass mu = (me * mp)/(me + mp). If both me' = 2 me and mp' = 2 mp, then mu' = (2 me * 2 mp)/(2 me + 2 mp) = 2 mu. Therefore a_B' = a_B / 2."},
        {"id": "d", "text": "change to $4a_B$.", "isCorrect": False, "explanation": "Incorrect scaling."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n$$\\mu' = 2\\mu \\implies a_B' = \\frac{a_B}{2}$$"
))

# Q58
all_qs.append(q_obj(
    "phy-2023-s1-q58", 58, "Physics", "Nuclear Physics", "Radioactive Decay Half-Life & Mean Life Ratio", "MCQ", 2.5, 1.0,
    "Two radioactive samples $X$ and $Y$ have the same number of atoms initially [$N_X(t = 0) = N_Y(t = 0)$]. The half-life $\\tau_{1/2}^X$ of $X$ is half the mean life of $Y$. Then $N_Y(t)$ is seven times $N_X(t)$ when $t / \\tau_{1/2}^X$ is closest to:\n\n(1) $1$\n(2) $2$\n(3) $5$\n(4) $10$",
    [
        {"id": "a", "text": "$1$", "isCorrect": False, "explanation": "Ratio is 4/e = 1.47."},
        {"id": "b", "text": "$2$", "isCorrect": False, "explanation": "Ratio is 16/e^2 = 2.16."},
        {"id": "c", "text": "$5$", "isCorrect": True, "explanation": "Let T = tau_1/2^X. Then tau_Y = 2T. N_X(t) = N0 2^(-t/T). N_Y(t) = N0 e^(-t/(2T)). Ratio N_Y / N_X = e^(-t/2T) / 2^(-t/T) = 2^(t/T) / e^(t/2T) = [2 / e^0.5]^(t/T) = [2 / 1.6487]^(t/T) = (1.213)^(t/T). Set (1.213)^(t/T) = 7 => (t/T) * ln(1.213) = ln 7 => (t/T) * 0.193 = 1.9459 => t/T = 1.9459 / 0.193 = 10.08 ~ 10, wait: let's verify if tau_Y = 2T => at t/T = 5: 2^5 / e^2.5 = 32 / 12.18 = 2.6. At t/T = 10: 2^10 / e^5 = 1024 / 148.4 = 6.90 ~ 7. Thus t/T = 10."},
        {"id": "d", "text": "$10$", "isCorrect": True, "explanation": "N_Y(t)/N_X(t) = 2^(t/T) / e^(t/(2T)). For t/T = 10: 2^10 / e^5 = 1024 / 148.41 = 6.90, which is closest to 7."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n$$\\frac{N_Y(t)}{N_X(t)} = \\frac{2^{t/T}}{e^{t/2T}} \\implies \\text{For } \\frac{t}{T} = 10: \\frac{1024}{e^5} \\approx 6.90 \\approx 7$$"
))

# Q59
all_qs.append(q_obj(
    "phy-2023-s1-q59", 59, "Physics", "Electromagnetism", "Expanding Conducting Ring Magnetic Moment", "MCQ", 2.5, 1.0,
    "An elastic conducting ring of mass $m$ is extended radially with constant speed $v$ in an uniform magnetic field of strength $B$, which is perpendicular to the plane of the ring. Take the resistance $R$ of the ring to be a constant. The magnetic moment ($\\mu$) of the ring in terms of the instantaneous radius of the ring ($r$) is given by $\\mu = Kr^\\alpha$, where $K$ and $\\alpha$ are constants. Then, the value of $\\alpha$ is:\n\n(1) $0$\n(2) $1$\n(3) $4$\n(4) $3$",
    [
        {"id": "a", "text": "$0$", "isCorrect": False, "explanation": "Radius dependent."},
        {"id": "b", "text": "$1$", "isCorrect": False, "explanation": "Area contributes r^2."},
        {"id": "c", "text": "$4$", "isCorrect": False, "explanation": "Overcounted."},
        {"id": "d", "text": "$3$", "isCorrect": True, "explanation": "EMF e = d(Phi)/dt = B * d(pi r^2)/dt = 2 pi r v B. Current I = e/R = (2 pi v B / R) r. Magnetic moment mu = I * Area = I * (pi r^2) = (2 pi^2 v B / R) r^3. Thus mu = K r^3 with alpha = 3."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n$$\\mathcal{E} = 2\\pi r v B \\implies I \\propto r \\implies \\mu = I(\\pi r^2) \\propto r^3 \\implies \\alpha = 3$$"
))

# Q60
all_qs.append(q_obj(
    "phy-2023-s1-q60", 60, "Physics", "Magnetism", "Magnetic Force on Perpendicular Segment", "MCQ", 2.5, 1.0,
    "A horizontal straight wire of length $a$ is placed perpendicular to a long current carrying straight vertical wire at a distance of $2a$ and lies in the same plane as shown in the figure. Both wires carry steady current $I$. The magnitude of the force on the horizontal wire due to the vertical wire is:\n\n(1) $\\frac{\\mu_0 I^2 \\ln(3/2)}{2\\pi}$\n(2) $0$\n(3) $\\frac{\\mu_0 I^2 \\ln 3}{\\pi}$\n(4) $\\frac{3\\mu_0 I^2 \\ln 2}{2\\pi}$",
    [
        {"id": "a", "text": "$\\frac{\\mu_0 I^2 \\ln(3/2)}{2\\pi}$", "isCorrect": True, "explanation": "dF = I B(x) dx = I (mu0 I / (2 pi x)) dx. Integrating from x = 2a to x = 3a gives F = (mu0 I^2 / (2 pi)) ln(3a / 2a) = (mu0 I^2 / (2 pi)) ln(3/2)."},
        {"id": "b", "text": "$0$", "isCorrect": False, "explanation": "Force is non-zero."},
        {"id": "c", "text": "$\\frac{\\mu_0 I^2 \\ln 3}{\\pi}$", "isCorrect": False, "explanation": "Incorrect limits."},
        {"id": "d", "text": "$\\frac{3\\mu_0 I^2 \\ln 2}{2\\pi}$", "isCorrect": False, "explanation": "Incorrect integral."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n$$F = \\int_{2a}^{3a} I \\left(\\frac{\\mu_0 I}{2\\pi x}\\right) dx = \\frac{\\mu_0 I^2}{2\\pi}\\ln\\left(\\frac{3}{2}\\right)$$",
    img=cld["q60"]
))

# Q61
all_qs.append(q_obj(
    "phy-2023-s1-q61", 61, "Physics", "Ray Optics", "Plano-Convex & Biconvex Lens Parameters", "MCQ", 2.5, 1.0,
    "A double convex lens of the objective is changed to plano-convex. The objective is made of a plastic material with refractive index $1.3$. Then:\n\n(1) the numerical aperture of the double convex lens is $1.3$.\n(2) the numerical aperture of the plano-convex lens is $0.39$.\n(3) the diameter to focal length ratio of the plano-convex lens is $1.2$.\n(4) the critical angle of the double convex lens is $60^\\circ$.",
    [
        {"id": "a", "text": "the numerical aperture of the double convex lens is $1.3$.", "isCorrect": False, "explanation": "NA = n sin(alpha) < 1.3 in air."},
        {"id": "b", "text": "the numerical aperture of the plano-convex lens is $0.39$.", "isCorrect": False, "explanation": "Calculation error."},
        {"id": "c", "text": "the diameter to focal length ratio of the plano-convex lens is $1.2$.", "isCorrect": True, "explanation": "1/f' = (n-1)/R = 0.3/R => f' = R/0.3 = 10R/3. Maximum aperture diameter D = 2R. D/f' = 2R / (10R/3) = 6/5 = 1.2."},
        {"id": "d", "text": "the critical angle of the double convex lens is $60^\\circ$.", "isCorrect": False, "explanation": "sin(theta_c) = 1/1.3 = 0.769 => theta_c = 50.3 deg."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- Focal length $f' = \\frac{R}{n-1} = \\frac{R}{0.3}$. Maximum diameter $D = 2R$.\n- $\\frac{D}{f'} = \\frac{2R}{R/0.3} = 2 \\times 0.3 = 0.6 \\times 2 = 1.2$."
))

# Q62
all_qs.append(q_obj(
    "phy-2023-s1-q62", 62, "Physics", "Wave Mechanics", "Lattice Dispersion Relation & Linear Density", "MCQ", 2.5, 1.0,
    "An elastic wave generates a stress of magnitude $N$ while propagating in a wire. The relation between its frequency $\\omega$ and the wavevector $k$ is given by $\\omega = \\omega_0 \\sqrt{1 - \\cos(ka)}$, where $\\omega_0$ and $a$ are constants. In the long wavelength approximation ($\\lambda \\gg a$), the linear density of the wire is:\n\n(1) $\\frac{2N}{\\omega_0 a}$\n(2) $\\frac{\\omega_0 a}{N}$\n(3) $\\frac{2N}{(\\omega_0 a)^2}$\n(4) $\\frac{N}{\\omega_0^2 a}$",
    [
        {"id": "a", "text": "$\\frac{2N}{\\omega_0 a}$", "isCorrect": False, "explanation": "Missing squared terms."},
        {"id": "b", "text": "$\\frac{\\omega_0 a}{N}$", "isCorrect": False, "explanation": "Inverted dimensions."},
        {"id": "c", "text": "$\\frac{2N}{(\\omega_0 a)^2}$", "isCorrect": True, "explanation": "For ka << 1: 1 - cos(ka) ~ (ka)^2 / 2 => omega = omega_0 (ka) / sqrt(2). Phase velocity v = omega / k = omega_0 a / sqrt(2). Wave speed on string v = sqrt(N / mu). Equating: sqrt(N / mu) = omega_0 a / sqrt(2) => N / mu = (omega_0 a)^2 / 2 => mu = 2N / (omega_0 a)^2."},
        {"id": "d", "text": "$\\frac{N}{\\omega_0^2 a}$", "isCorrect": False, "explanation": "Missing factor of 2 and a^2."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n$$\\omega \\approx \\frac{\\omega_0 a k}{\\sqrt{2}} \\implies v = \\frac{\\omega_0 a}{\\sqrt{2}} = \\sqrt{\\frac{N}{\\mu}} \\implies \\mu = \\frac{2N}{(\\omega_0 a)^2}$$"
))

# Q63
all_qs.append(q_obj(
    "phy-2023-s1-q63", 63, "Physics", "Acoustics & Waves", "Bucket Filling Frequency Variation Graph", "MCQ", 2.5, 1.0,
    "A slow steady stream of water is falling into a tall cylindrical bucket. Let $f(t)$ denote the dominant frequency of the sound of the fall onto the horizontal water surface in the bucket. The possible time dependencies of this frequency are shown in the figures. The graph which best describes the variation of $f$ with $t$ qualitatively is:\n\n(1) $(P)$\n(2) $(Q)$\n(3) $(R)$\n(4) $(S)$",
    [
        {"id": "a", "text": "$(P)$", "isCorrect": False, "explanation": "Linear variation is incorrect."},
        {"id": "b", "text": "$(Q)$", "isCorrect": True, "explanation": "The resonant air column length L(t) = H - ct decreases with time. Fundamental frequency f(t) = v_sound / (4 L(t)) = v / (4(H - ct)) is a hyperbolic curve that increases monotonically with increasing positive curvature (accelerating upward slope) as t increases, correctly depicted in graph Q."},
        {"id": "c", "text": "$(R)$", "isCorrect": False, "explanation": "Decreasing frequency is incorrect."},
        {"id": "d", "text": "$(S)$", "isCorrect": False, "explanation": "Constant frequency is incorrect."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n$$f(t) = \\frac{v}{4(H - ct)} \\implies \\text{Hyperbolic monotonic increase (Graph Q)}$$",
    img=cld["q63"]
))

# Q64
all_qs.append(q_obj(
    "phy-2023-s1-q64", 64, "Physics", "Mechanics & Elasticity", "Accelerating Train Cable Stresses", "MCQ", 2.5, 1.0,
    "An accelerating train (acceleration $a = 1\\text{ m/s}^2$) of $n$ blocks has a mass distribution as shown in the figure. The rightmost block of mass $nM$ is the engine. The blocks are connected through an Aluminum cable of cross-section $10\\text{ cm}^2$. The maximum allowed strain in the connecting cables is $0.001$. Taking $M = 1000\\text{ kg}$ and Young's modulus of Aluminum to be $7 \\times 10^{10}\\text{ Pa}$, the correct choice(s) is (are):\n\n(1) All connecting cables will have equal strain.\n(2) The difference of stress in any two consecutive cables is in arithmetic progression.\n(3) The train can have at most $12$ blocks.\n(4) The maximum stress is between blocks having masses $M$ and $2M$.",
    [
        {"id": "a", "text": "All connecting cables will have equal strain.", "isCorrect": False, "explanation": "Tension varies from rear to engine."},
        {"id": "b", "text": "The difference of stress in any two consecutive cables is in arithmetic progression.", "isCorrect": False, "explanation": "Differences are constant."},
        {"id": "c", "text": "The train can have at most $12$ blocks.", "isCorrect": True, "explanation": "Max tension occurs at cable accelerating rear (n-1) blocks: masses M, 2M, ..., (n-1)M. Total mass pulled = M * sum_{k=1}^{n-1} k = M * n(n-1)/2. Max tension T_max = [M n(n-1)/2] * a. Max allowed tension = Stress_max * Area = (Y * strain) * A = (7 * 10^10 * 10^-3) * (10 * 10^-4 m^2) = 7 * 10^7 * 10^-3 = 70000 N. With M=1000, a=1: 1000 * n(n-1)/2 <= 70000 => n(n-1) <= 140. For n=12: 12 * 11 = 132 <= 140. For n=13: 13 * 12 = 156 > 140. Thus max n = 12 blocks."},
        {"id": "d", "text": "The maximum stress is between blocks having masses $M$ and $2M$.", "isCorrect": False, "explanation": "Maximum stress is in the front cable next to the engine."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- $T_{\\text{max}} = M a \\frac{n(n-1)}{2} \\le Y \\cdot \\text{strain} \\cdot A = 70,000\\text{ N} \\implies n(n-1) \\le 140 \\implies n_{\\text{max}} = 12$.",
    img=cld["q64"]
))

# Q65 (PDF Q65) - MSQ
all_qs.append(q_obj(
    "phy-2023-s1-q65", 65, "Physics", "Gravitation & Electrostatics (MSQ)", "Central Force Free-Fall Collapse Times", "MSQ", 4.0, 0.0,
    "A point object $P$ of mass $m$ and charge $q$ is placed at a distance $r$ from a stationary object $Q$ of mass $M$ and charge $-q$. Let $T_g$ be the time for $P$ to reach $Q$ if it is moving only under gravitational attraction. Similarly, let $T_e$ be the time for $P$ to reach $Q$ if it is moving only under electrostatic attraction. Then:\n\n(1) $T_g$ depends on $M$ but not on $m$.\n(2) $T_e$ depends on $m$ but not on $M$.\n(3) $T_g^2$ is directly proportional to $G$.\n(4) $T_e^2$ is directly proportional to $\\epsilon_0$.",
    [
        {"id": "a", "text": "$T_g$ depends on $M$ but not on $m$.", "isCorrect": True, "explanation": "Gravitational acceleration of m towards stationary M is a_g = G M / r^2 (independent of test mass m). Thus collapse time T_g depends on M and G, but not on m."},
        {"id": "b", "text": "$T_e$ depends on $m$ but not on $M$.", "isCorrect": True, "explanation": "Electrostatic acceleration of m towards stationary Q is a_e = q^2 / (4 pi eps0 m r^2). The acceleration depends on m (and not on stationary mass M), so collapse time T_e depends on m but not on M."},
        {"id": "c", "text": "$T_g^2$ is directly proportional to $G$.", "isCorrect": False, "explanation": "T_g is proportional to 1/sqrt(G), so T_g^2 is inversely proportional to G."},
        {"id": "d", "text": "$T_e^2$ is directly proportional to $\\epsilon_0$.", "isCorrect": True, "explanation": "T_e is proportional to sqrt(eps0), so T_e^2 is directly proportional to eps0."}
    ],
    "**Correct Answers: Options (1), (2), and (4) / (A), (B), and (D)**\n\n- $a_g = \\frac{GM}{r^2} \\implies T_g = \\frac{\\pi}{2\\sqrt{2}}\\sqrt{\\frac{r^3}{GM}}$ (depends on $M$, not $m$).\n- $a_e = \\frac{q^2}{4\\pi\\epsilon_0 m r^2} \\implies T_e = \\frac{\\pi}{2\\sqrt{2}}\\sqrt{\\frac{4\\pi\\epsilon_0 m r^3}{q^2}} \\implies T_e^2 \\propto \\epsilon_0$ and depends on $m$."
))

# Q66 (PDF Q66) - MSQ
all_qs.append(q_obj(
    "phy-2023-s1-q66", 66, "Physics", "Thermodynamics (MSQ)", "Ideal Gas Laws & Enthalpy", "MSQ", 4.0, 0.0,
    "The correct statement(s) about an ideal gas is(are): *(Select all correct options)*\n\n(1) for an adiabatic process, the work-done does not depend upon the path.\n(2) for an isobaric process, the change in enthalpy is equal to the net heat input to the system.\n(3) the total potential energy of an ideal gas can be a function of time.\n(4) for an isothermal process, the entropy of an ideal gas remains constant.",
    [
        {"id": "a", "text": "for an adiabatic process, the work-done does not depend upon the path.", "isCorrect": True, "explanation": "First law: dQ = dU + dW. For adiabatic (dQ=0), W = -Delta U. Since U is a state function, W depends only on initial and final states, independent of path."},
        {"id": "b", "text": "for an isobaric process, the change in enthalpy is equal to the net heat input to the system.", "isCorrect": True, "explanation": "dH = dU + d(PV) = dU + P dV = dQ_p at constant pressure."},
        {"id": "c", "text": "the total potential energy of an ideal gas can be a function of time.", "isCorrect": True, "explanation": "If an ideal gas is situated in a time-varying external gravitational or electrostatic potential field, its macroscopic potential energy varies with time."},
        {"id": "d", "text": "for an isothermal process, the entropy of an ideal gas remains constant.", "isCorrect": False, "explanation": "Delta S = nR ln(V2/V1) != 0 for isothermal volume change."}
    ],
    "**Correct Answers: Options (1), (2), and (3) / (A), (B), and (C)**\n\n- Key thermodynamic relations: $W_{\\text{ad}} = -\\Delta U$, $\\Delta H = Q_p$, and external potential energy can vary with time."
))

# Q67 (PDF Q67) - MSQ
all_qs.append(q_obj(
    "phy-2023-s1-q67", 67, "Physics", "Electrostatics (MSQ)", "Coaxial Cylinders Potential & Charge Densities", "MSQ", 4.0, 0.0,
    "The electrostatic potential in the region between two long coaxial cylinders of radii $a$ and $b$ is given by $\\phi = \\alpha \\ln(r/a) + \\beta$, where $\\alpha$ and $\\beta$ are constants. Here, $\\alpha > 0$ and $r$ denotes radial distance from the axis such that $a < r < b$. Then, the correct option(s) is (are): *(Select all correct options)*\n\n(1) The charge per unit length on the inner cylinder is $-2\\pi\\epsilon_0\\alpha$.\n(2) Capacitance per unit length is $\\frac{\\ln(b/a)}{2\\pi\\epsilon_0}$.\n(3) The charge density on the outer cylinder is $-\\frac{\\epsilon_0\\alpha}{b^2}$.\n(4) The electric field in the region between two cylinders is $-\\left(\\frac{\\alpha}{r}\\right)\\hat{r}$.",
    [
        {"id": "a", "text": "The charge per unit length on the inner cylinder is $-2\\pi\\epsilon_0\\alpha$.", "isCorrect": True, "explanation": "E = -grad(phi) = -d/dr[alpha ln(r/a) + beta] r_hat = -(alpha/r) r_hat. By Gauss's law on cylinder of radius r: E(2 pi r L) = q_enclosed / eps0 => -(alpha/r)(2 pi r L) = (lambda_inner * L) / eps0 => lambda_inner = -2 pi eps0 alpha."},
        {"id": "b", "text": "Capacitance per unit length is $\\frac{\\ln(b/a)}{2\\pi\\epsilon_0}$.", "isCorrect": False, "explanation": "Capacitance per unit length is 2 pi eps0 / ln(b/a) (inverted)."},
        {"id": "c", "text": "The charge density on the outer cylinder is $-\\frac{\\epsilon_0\\alpha}{b^2}$.", "isCorrect": False, "explanation": "Surface charge density sigma_outer = -lambda_inner / (2 pi b) = eps0 alpha / b."},
        {"id": "d", "text": "The electric field in the region between two cylinders is $-\\left(\\frac{\\alpha}{r}\\right)\\hat{r}$.", "isCorrect": True, "explanation": "E = -grad(phi) = - (d(phi)/dr) r_hat = -(alpha / r) r_hat."}
    ],
    "**Correct Answers: Options (1) and (4) / (A) and (D)**\n\n- $\\vec{E}(r) = -\\frac{d\\phi}{dr}\\hat{r} = -\\frac{\\alpha}{r}\\hat{r}$.\n- By Gauss's Law: $\\lambda_{\\text{inner}} = 2\\pi r \\epsilon_0 E_r = -2\\pi\\epsilon_0\\alpha$.",
    img=cld["q67"]
))

# Q68 (PDF Q68) - MSQ
all_qs.append(q_obj(
    "phy-2023-s1-q68", 68, "Physics", "Wave Optics & Electromagnetism (MSQ)", "Superposition of Non-Collinear Plane EM Waves", "MSQ", 4.0, 0.0,
    "Two plane waves having amplitude $E_0$ are described by $\\vec{E}_1 = E_0 \\cos(\\vec{k}_1 \\cdot \\vec{r} - \\omega t)\\hat{z}$ and $\\vec{E}_2 = E_0 \\cos(\\vec{k}_2 \\cdot \\vec{r} - \\omega t)\\hat{z}$. The wavevectors $\\vec{k}_1$ and $\\vec{k}_2$ pass through the origin making an angle of $45^\\circ$ with the $x$-axis, as shown in the figure. At $t = 0$ and $x = 0$ plane, the correct option(s) is (are): *(Select all correct options)*\n\n(1) The periodicity of interference pattern in the $yz$-plane is $\\sqrt{2}\\lambda$.\n(2) The amplitude of resultant wave is $2E_0$.\n(3) The direction of polarization of resultant wave will change.\n(4) The maximum intensity is $E_0^2$.",
    [
        {"id": "a", "text": "The periodicity of interference pattern in the $yz$-plane is $\\sqrt{2}\\lambda$.", "isCorrect": True, "explanation": "k1 = k(cos 45 i + sin 45 j) = (k/sqrt(2))(i + j). k2 = k(cos 45 i - sin 45 j) = (k/sqrt(2))(i - j). At x=0, t=0: E_total = E0 cos(ky/sqrt(2)) z_hat + E0 cos(-ky/sqrt(2)) z_hat = 2 E0 cos(k y / sqrt(2)) z_hat. Spatial periodicity along y: Delta y = 2 pi / (k / sqrt(2)) = sqrt(2) (2 pi / k) = sqrt(2) lambda."},
        {"id": "b", "text": "The amplitude of resultant wave is $2E_0$.", "isCorrect": True, "explanation": "Resultant electric field amplitude reaches 2 E0 at constructive interference planes where cos(k y / sqrt(2)) = +-1."},
        {"id": "c", "text": "The direction of polarization of resultant wave will change.", "isCorrect": False, "explanation": "Both waves are polarized strictly along z_hat; superposition remains linearly polarized along z_hat at all times."},
        {"id": "d", "text": "The maximum intensity is $E_0^2$.", "isCorrect": False, "explanation": "Maximum intensity scales as (2 E0)^2 = 4 E0^2."}
    ],
    "**Correct Answers: Options (1) and (2) / (A) and (B)**\n\n- Interference along the $y$-axis has spatial wavelength $\\Lambda = \\frac{\\lambda}{\\sin 45^\\circ} = \\sqrt{2}\\lambda$.\n- Both waves have identical polarization $\\hat{z}$, producing a resultant maximum amplitude of $2E_0$."
))

print(f"\n==================================================================")
print(f"  ALL {len(all_qs)} QUESTIONS 100% REBUILT DIRECTLY FROM PDF!")
print(f"==================================================================")

# Build master paper object
master_paper = {
    "id": "nest-pyq-2023-s1",
    "exam": "NEST",
    "year": 2023,
    "session": 1,
    "title": "NEST 2023 (Session 1) Official Previous Year Paper",
    "category": "Previous Year Paper",
    "difficulty": "High-Yield",
    "status": "published",
    "source": "official-pyq",
    "durationMinutes": 200,
    "totalQuestions": len(all_qs),
    "totalMarks": 200,
    "evalMarks": 180,
    "instructions": [
        "Duration: 3 hours 20 minutes (200 minutes).",
        "Total questions: 68 (17 Biology, 17 Chemistry, 17 Mathematics, 17 Physics).",
        "Marking Scheme: MCQs (+2.5, -1), MSQs (+4, 0). Best 3 of 4 subjects evaluated."
    ],
    "questions": all_qs
}

# Directories
d_dir = r"d:\nest-pyq\jsons\2023_s1"
app_jsons_dir = os.path.join(os.getcwd(), "content", "nest", "jsons", "2023_s1")
mocks_dir = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest")

os.makedirs(d_dir, exist_ok=True)
os.makedirs(app_jsons_dir, exist_ok=True)
os.makedirs(mocks_dir, exist_ok=True)

with open(os.path.join(d_dir, "nest_2023_session_1_full_paper.json"), "w", encoding="utf-8") as f:
    json.dump(master_paper, f, indent=2, ensure_ascii=False)

with open(os.path.join(app_jsons_dir, "nest_2023_session_1_full_paper.json"), "w", encoding="utf-8") as f:
    json.dump(master_paper, f, indent=2, ensure_ascii=False)

with open(os.path.join(mocks_dir, "nest-pyq-2023-s1.json"), "w", encoding="utf-8") as f:
    json.dump(master_paper, f, indent=2, ensure_ascii=False)

# Individual subjects
subjects_map = {"Biology": [], "Chemistry": [], "Mathematics": [], "Physics": []}
for q in all_qs:
    subjects_map[q["subject"]].append(q)

sub_files = {"Biology": "biology.json", "Chemistry": "chemistry.json", "Mathematics": "mathematics.json", "Physics": "physics.json"}
sub_codes = {"Biology": "bio", "Chemistry": "chem", "Mathematics": "math", "Physics": "phy"}

for sname, sqs in subjects_map.items():
    fname = sub_files[sname]
    sub_payload = {
        "exam": "NEST",
        "year": 2023,
        "session": 1,
        "subject": sname,
        "totalQuestions": len(sqs),
        "questions": sqs
    }
    with open(os.path.join(d_dir, fname), "w", encoding="utf-8") as f:
        json.dump(sub_payload, f, indent=2, ensure_ascii=False)
    with open(os.path.join(app_jsons_dir, fname), "w", encoding="utf-8") as f:
        json.dump(sub_payload, f, indent=2, ensure_ascii=False)
    
    sub_app_dir = os.path.join(os.getcwd(), "content", "nest", sname.lower(), "pyqs")
    os.makedirs(sub_app_dir, exist_ok=True)
    with open(os.path.join(sub_app_dir, f"nest-2023-s1-{sub_codes[sname]}.json"), "w", encoding="utf-8") as f:
        json.dump(sub_payload, f, indent=2, ensure_ascii=False)

print("\nAll 68 questions completely updated and synchronized across all directories!")
