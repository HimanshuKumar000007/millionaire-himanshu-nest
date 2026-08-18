import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Cloudinary mapping
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
    
    "q42": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983022/nest_pyqs/2023_s1/nest_2023_s1_page_22_img_1_92.png",
    "q43": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983022/nest_pyqs/2023_s1/nest_2023_s1_page_22_img_1_92.png",
    "q44": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983023/nest_pyqs/2023_s1/nest_2023_s1_page_23_img_1_96.png",
    
    "q53": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983024/nest_pyqs/2023_s1/nest_2023_s1_page_26_img_1_104.png",
    "q55": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983025/nest_pyqs/2023_s1/nest_2023_s1_page_27_img_1_108.png",
    "q60": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983026/nest_pyqs/2023_s1/nest_2023_s1_page_29_img_1_116.png",
    "q63": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983029/nest_pyqs/2023_s1/nest_2023_s1_page_30_img_1_120.png",
    "q64": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983031/nest_pyqs/2023_s1/nest_2023_s1_page_31_img_1_124.png",
    "q67": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983033/nest_pyqs/2023_s1/nest_2023_s1_page_32_img_1_128.png"
}

def make_q(qid, num, subj, topic, subtopic, qtype, marks, neg, text, opts, sol, img=None, imgs=None):
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

questions = []

# ==================== BIOLOGY (Q1 - Q17) ====================
# Q1
questions.append(make_q(
    "bio-2023-s1-q01", 1, "Biology", "Evolution & Diversity", "Cladistics & Character Evolution", "MCQ", 2.5, 1.0,
    "A cladogram representing the evolution of some animals ($P, Q, R,$ and $S$) is shown. The features marked $\\text{I}$ to $\\text{IV}$ in the cladogram represent different features that have evolved. What is the correct statement with respect to the given cladogram?",
    [
        {"id": "a", "text": "If $Q$ is a bullfrog, $\\text{II}$ could be placenta.", "isCorrect": False, "explanation": "Placenta is specific to eutherian mammals."},
        {"id": "b", "text": "If features $\\text{III}$ and $\\text{IV}$ are mammary glands and hair, respectively, then $R$ represents kangaroo and $S$ represents humans.", "isCorrect": False, "explanation": "Both kangaroos and humans possess mammary glands and hair."},
        {"id": "c", "text": "If $Q, R,$ and $S$ represent bullfrog, koala, and human, respectively, then feature $\\text{II}$ could be two pairs of limbs.", "isCorrect": True, "explanation": "Tetrapod limbs (two pairs of limbs) unite amphibians, marsupials, and eutherians."},
        {"id": "d", "text": "If feature $\\text{I}$ is lungs, then $P$ and $Q$ are shark and bullfrog respectively.", "isCorrect": False, "explanation": "Feature I defines all subsequent descendants."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- Feature $\\text{II}$ is a synapomorphy uniting taxa $Q$ (bullfrog), $R$ (koala), and $S$ (human) $\\implies$ **two pairs of limbs (Tetrapoda)**.",
    img=cld["q1"]
))

# Q2
questions.append(make_q(
    "bio-2023-s1-q02", 2, "Biology", "Biochemistry & Molecular Biology", "DNA/RNA Melting Temperature", "MCQ", 2.5, 1.0,
    "A $1000\\text{ base pair}$ double-stranded DNA (B form) has a melting temperature ($T_m$) of $58^\\circ\\text{C}$. If a duplex RNA (A form) of the same length and sequence is constructed, then the $T_m$ of this new RNA duplex with respect to the DNA (B form) would be:",
    [
        {"id": "a", "text": "higher due to greater stability of A form of RNA duplex.", "isCorrect": True, "explanation": "A-form RNA duplex has superior base-stacking and C3'-endo ribose conformation, leading to higher Tm."},
        {"id": "b", "text": "lower due to lower stability of A form of RNA duplex.", "isCorrect": False, "explanation": "RNA duplex is more thermally stable than DNA duplex."},
        {"id": "c", "text": "lower because of unfavorable enthalpy of formation of RNA duplex.", "isCorrect": False, "explanation": "RNA duplex formation is enthalpy-driven and favorable."},
        {"id": "d", "text": "identical, as the number of hydrogen bonds remain the same.", "isCorrect": False, "explanation": "Base stacking contributes more to Tm than simple hydrogen bonding."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- RNA duplexes adopt the compact **A-form** geometry with enhanced base stacking overlap and extensive hydration networks, giving a higher $T_m$ than B-form DNA."
))

# Q3
questions.append(make_q(
    "bio-2023-s1-q03", 3, "Biology", "Biochemistry", "Ion Exchange Chromatography", "MCQ", 2.5, 1.0,
    "A biochemist wants to purify a protein $X$ (molecular weight $= 30.2\\text{ kDa}$ and $\\text{pI} = 7.5$) from a solution containing proteins $X$ and $Y$ (molecular weight $= 30.9\\text{ kDa}$ and $\\text{pI} = 3.5$) using ion exchange chromatography. In this technique, an anion exchange resin is positively charged and a cation exchange resin is negatively charged. The most appropriate resin where protein $X$, but not $Y$ will remain bound is:",
    [
        {"id": "a", "text": "cation exchanger at $\\text{pH} = 7.5$.", "isCorrect": False, "explanation": "At pH 7.5, X has zero net charge and won't bind."},
        {"id": "b", "text": "anion exchanger at $\\text{pH} = 2.5$.", "isCorrect": False, "explanation": "At pH 2.5, both proteins are positively charged."},
        {"id": "c", "text": "cation exchanger at $\\text{pH} = 5.0$.", "isCorrect": True, "explanation": "At pH 5.0: For X (pI 7.5), pH < pI => net positive charge (binds cation exchanger). For Y (pI 3.5), pH > pI => net negative charge (elutes)."},
        {"id": "d", "text": "anion exchanger at $\\text{pH} = 7.5$.", "isCorrect": False, "explanation": "At pH 7.5, Y binds and X is neutral."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- At $\\text{pH} = 5.0$, protein $X$ is positively charged ($\\text{pH} < \\text{pI}$) and binds to the cation exchanger, while protein $Y$ is negatively charged ($\\text{pH} > \\text{pI}$) and flows through."
))

# Q4
questions.append(make_q(
    "bio-2023-s1-q04", 4, "Biology", "Microbiology", "Bacterial Endospore Dormancy", "MCQ", 2.5, 1.0,
    "Bacterial endospores are highly resistant to environmental stresses such as heat, UV radiation, and oxidizing agents. They can remain dormant for a prolonged period. During the period of dormancy, they prevent the accumulation of potentially harmful mutations in their DNA. This is primarily due to:",
    [
        {"id": "a", "text": "decreased water content and reduced enzyme activity.", "isCorrect": True, "explanation": "Severe dehydration and dormancy prevent hydrolytic DNA damage and halt metabolic reactions."},
        {"id": "b", "text": "decreased salt concentration and enhanced enzyme activity.", "isCorrect": False, "explanation": "Enzyme activity is suppressed."},
        {"id": "c", "text": "decreased respiration and decreased DNA supercoiling.", "isCorrect": False, "explanation": "SASPs bind and protect DNA."},
        {"id": "d", "text": "increased enzyme activity and increased membrane permeability.", "isCorrect": False, "explanation": "Enzymatic reactions are minimal."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Endospores achieve dormancy through extreme core dehydration (10–30% water content) and SASP binding, preventing hydrolytic and oxidative DNA damage."
))

# Q5
questions.append(make_q(
    "bio-2023-s1-q05", 5, "Biology", "Plant Physiology", "Membrane Potential & ETC Cyanide Inhibition", "MCQ", 2.5, 1.0,
    "Pea seeds were allowed to germinate for $4\\text{ days}$, and segments of the epicotyl were treated with cyanide ($\\text{CN}^-$) at a concentration of $0.1\\text{ mM}$. The membrane potential was recorded before and after the addition and removal of cyanide. The graph of cell membrane potential ($\\text{mV}$) against time (minutes) is shown. Based on these experimental observations, the correct option is:",
    [
        {"id": "a", "text": "addition of cyanide will decrease the membrane potential because of the depletion of ATP.", "isCorrect": True, "explanation": "Cyanide blocks Complex IV, depleting ATP and shutting down electrogenic H+-ATPase pumps, causing membrane depolarization (decrease in potential magnitude)."},
        {"id": "b", "text": "addition of cyanide will decrease the pH of the intermembrane space.", "isCorrect": False, "explanation": "Inhibiting proton pumping raises intermembrane space pH."},
        {"id": "c", "text": "addition of excess oxygen will increase the membrane potential in the presence of cyanide.", "isCorrect": False, "explanation": "Cyanide non-competitively blocks Complex IV."},
        {"id": "d", "text": "addition of cyanide will cause a rapid but irreversible depolarization of membrane potential.", "isCorrect": False, "explanation": "The graph shows clear reversibility after cyanide washout."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Plasma membrane $\\text{H}^+\\text{-ATPase}$ requires $\\text{ATP}$ from mitochondrial respiration. Cyanide halts respiration, depleting ATP and collapsing the electrogenic proton gradient.",
    img=cld["q5"]
))

# Q6
questions.append(make_q(
    "bio-2023-s1-q06", 6, "Biology", "Genetics", "Pedigree Analysis", "MCQ", 2.5, 1.0,
    "In the given pedigree, circles represent females and squares represent males. Filled shapes indicate affected individuals while unfilled shapes indicate unaffected individuals. Based on the pedigree information provided, the correct inheritance pattern is:",
    [
        {"id": "a", "text": "autosomal dominant.", "isCorrect": False, "explanation": "Unaffected parents have affected children, ruling out dominant."},
        {"id": "b", "text": "autosomal recessive.", "isCorrect": True, "explanation": "Unaffected parents have affected male and female children; affected female has an unaffected father, confirming autosomal recessive."},
        {"id": "c", "text": "X-linked dominant.", "isCorrect": False, "explanation": "Cannot skip generations."},
        {"id": "d", "text": "X-linked recessive.", "isCorrect": False, "explanation": "Affected female must have affected father in X-linked recessive, which is not the case."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n- Generation skipping $\\implies$ recessive. Affected female has normal father $\\implies$ **autosomal recessive**.",
    img=cld["q6"]
))

# Q7
questions.append(make_q(
    "bio-2023-s1-q07", 7, "Biology", "Population Genetics", "Hardy-Weinberg Multi-Allele Equilibrium", "MCQ", 2.5, 1.0,
    "A population has a single locus with three alleles ($X_1, X_2, X_3$). The frequencies of these alleles are $p, q,$ and $r$, respectively, and if $p + q + r = 1$, then the correct statement is:",
    [
        {"id": "a", "text": "the population is in Hardy-Weinberg equilibrium.", "isCorrect": False, "explanation": "p+q+r=1 is a mathematical identity, not proof of equilibrium."},
        {"id": "b", "text": "the population is not in Hardy-Weinberg equilibrium because it has three alleles.", "isCorrect": False, "explanation": "HWE applies to multi-allelic loci."},
        {"id": "c", "text": "this information is insufficient to state whether the population is in Hardy-Weinberg equilibrium.", "isCorrect": True, "explanation": "Observed genotype frequencies must be compared with the expansion (p+q+r)^2 to determine HWE."},
        {"id": "d", "text": "the population will be in Hardy-Weinberg equilibrium if $r = 0$ and $p + q = 1$.", "isCorrect": False, "explanation": "Genotype frequencies still need to be verified."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n- $p+q+r=1$ is universally true for allele frequencies. Determining HWE requires observed diploid genotype frequencies."
))

# Q8
questions.append(make_q(
    "bio-2023-s1-q08", 8, "Biology", "Evolution", "Darwin-Wallace Theory & Mendelism", "MCQ", 2.5, 1.0,
    "Mendelian theory of inheritance was crucial for Darwin-Wallace’s theory of natural selection because it resolved the major problem of:",
    [
        {"id": "a", "text": "dilution and loss of favorable continuous variations through 'blending inheritance'.", "isCorrect": True, "explanation": "Particulate inheritance preserves distinct alleles undiluted across generations."},
        {"id": "b", "text": "the origin of life from prebiotic organic molecules.", "isCorrect": False, "explanation": "Mendelism explains genetic transmission, not abiogenesis."},
        {"id": "c", "text": "the inheritance of acquired characters proposed by Lamarck.", "isCorrect": False, "explanation": "Addressed by Weismann's germplasm theory."},
        {"id": "d", "text": "the exact rate of spontaneous gene mutations in eukaryotes.", "isCorrect": False, "explanation": "Discovered much later."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Particulate Mendelian inheritance solved Fleeming Jenkin's 'swamping argument' by showing that alleles are discrete units that do not blend."
))

# Q9 (VERBATIM FROM PDF)
questions.append(make_q(
    "bio-2023-s1-q09", 9, "Biology", "Ecology", "Community Interactions & Removal Experiments", "MCQ", 2.5, 1.0,
    "In a closed ecosystem, red algae, crabs, and green algae interact with each other. The following experimental treatments were set up:\n\ni. All crabs removed\nii. All green algae removed\niii. All crabs and green algae removed\niv. All crabs, red, and green algae are retained (Control)\n\nThe results of red algae growth from these experiments are shown in the graph. Plus (+) indicates presence and minus (-) indicates absence. Red algae growth in all the treatments was significantly different from each other.\n\nBased on these results, the correct option is:",
    [
        {"id": "a", "text": "in the absence of crabs, green algae positively affected red algae growth.", "isCorrect": False, "explanation": "In absence of crabs, presence of green algae reduces red algae growth due to competition."},
        {"id": "b", "text": "in the presence of crabs, green algae positively affected red algae growth.", "isCorrect": True, "explanation": "In the presence of crabs acting as selective consumers, green algae presence positively supports red algae growth."},
        {"id": "c", "text": "in the absence of green algae, crabs negatively affected red algae growth.", "isCorrect": False, "explanation": "Crabs do not negatively affect red algae."},
        {"id": "d", "text": "in the presence of green algae, crabs negatively affected red algae growth.", "isCorrect": False, "explanation": "Crabs facilitate red algae."}
    ],
    "**Correct Answer: Option (2) / (B)**\n\n**Ecological Analysis:**\n- In treatment (iv) (Control: Crabs +, Green algae +) vs (i) (Crabs -, Green algae +), presence of crabs drastically increases red algae growth because crabs selectively consume competing green algae (trophic facilitation/indirect mutualism).",
    img=cld["q9"]
))

# Q10 (VERBATIM FROM PDF)
questions.append(make_q(
    "bio-2023-s1-q10", 10, "Biology", "Cell Biology & Bioenergetics", "ATP Synthase Rotational Catalysis Calculation", "MCQ", 2.5, 1.0,
    "Synthesis of ATP takes place when protons flow back to the matrix side through an enzyme complex called ATP synthase. ATP synthase is made up of two operational units: a rotatory and a stationary component. Assume that the ATP synthase does $\\sim 100\\text{ rotations per second}$, and each rotation results in the generation of $3\\text{ ATP}$ molecules. Suppose that a cell needs $\\sim 3 \\times 10^{10}\\text{ molecules of ATP}$ for one round of cell division that takes $30\\text{ minutes}$ with the ATP synthase functioning at $50\\%$ efficiency. The minimum number of ATP synthase required for one round of cell division in this cell is:",
    [
        {"id": "a", "text": "$222222$", "isCorrect": False, "explanation": "Arithmetic error."},
        {"id": "b", "text": "$55555.5$", "isCorrect": False, "explanation": "Missed efficiency factor."},
        {"id": "c", "text": "$111111$", "isCorrect": True, "explanation": "Rate per enzyme = 100 rot/s * 3 ATP/rot * 0.50 = 150 ATP/s. In 30 min (1800 s), 1 enzyme produces 150 * 1800 = 2.7 * 10^5 ATP. Number of enzymes needed = (3 * 10^10) / (2.7 * 10^5) = 1.11111 * 10^5 = 111111."},
        {"id": "d", "text": "$277777$", "isCorrect": False, "explanation": "Arithmetic error."}
    ],
    "**Correct Answer: Option (3) / (C)**\n\n**Mathematical Calculation:**\n- Rate of ATP production per ATP synthase:\n  $$\\text{Rate} = 100\\text{ rot/s} \\times 3\\text{ ATP/rot} \\times 0.50\\text{ efficiency} = 150\\text{ ATP/s}$$\n- Total time available $t = 30\\text{ min} \\times 60\\text{ s/min} = 1800\\text{ s}$.\n- ATP synthesized per complex in $30\\text{ min}$:\n  $$\\text{ATP}_{\\text{single}} = 150 \\times 1800 = 2.7 \\times 10^5\\text{ ATP}$$\n- Minimum number of ATP synthase enzymes:\n  $$N = \\frac{3 \\times 10^{10}}{2.7 \\times 10^5} = \\frac{300,000}{2.7} \\approx 111111$$"
))

# Q11 (VERBATIM FROM PDF)
questions.append(make_q(
    "bio-2023-s1-q11", 11, "Biology", "Cell Biology", "Lipid Bilayer Membrane Permeability", "MCQ", 2.5, 1.0,
    "The permeability of molecules across a lipid bilayer depends on their size and solubility in a nonpolar solvent relative to their solubility in water. For the species $\\text{O}_2, \\text{H}_2\\text{O}, \\text{K}^+$, glycerol and glucose, the order of their permeability across a lipid bilayer in the absence of any protein transporters is:",
    [
        {"id": "a", "text": "$\\text{O}_2 > \\text{H}_2\\text{O} > \\text{Glycerol} > \\text{Glucose} > \\text{K}^+$", "isCorrect": True, "explanation": "Small non-polar gas (O2) > Small uncharged polar (H2O) > Medium uncharged polar (glycerol) > Large uncharged polar (glucose) > Charged ions (K+)."},
        {"id": "b", "text": "$\\text{H}_2\\text{O} > \\text{O}_2 > \\text{Glycerol} > \\text{Glucose} > \\text{K}^+$", "isCorrect": False, "explanation": "Non-polar O2 diffuses faster than polar H2O."},
        {"id": "c", "text": "$\\text{O}_2 > \\text{H}_2\\text{O} > \\text{Glucose} > \\text{Glycerol} > \\text{K}^+$", "isCorrect": False, "explanation": "Glycerol is smaller than glucose."},
        {"id": "d", "text": "$\\text{K}^+ > \\text{O}_2 > \\text{H}_2\\text{O} > \\text{Glycerol} > \\text{Glucose}$", "isCorrect": False, "explanation": "Inorganic ions have the lowest permeability across hydrophobic bilayer."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Small non-polar molecules ($\\text{O}_2$) have the highest permeability coefficient ($\\sim 10^{-1}\\text{ cm/s}$), followed by small uncharged polar ($\\text{H}_2\\text{O} \\sim 10^{-2}$), uncharged polar 3-carbon ($\\text{glycerol} \\sim 10^{-6}$), 6-carbon ($\\text{glucose} \\sim 10^{-7}$), and charged ions ($\\text{K}^+ \\sim 10^{-12}\\text{ cm/s}$)."
))

# Q12 (VERBATIM FROM PDF)
questions.append(make_q(
    "bio-2023-s1-q12", 12, "Biology", "Immunology & Virology", "Monoclonal Antibody Epitope Neutralization", "MCQ", 2.5, 1.0,
    "A monoclonal (antibody specific for a given epitope of an antigen) IgG antibody ($M$) was produced in the laboratory that binds a surface protein ($P$) of a virus ($V_1$) and neutralizes $100\\%$ of $V_1$. It was observed that $M$ is also effective in neutralizing other viruses $V_2, V_3$ and $V_4$ at $40\\%, 90\\%$ and $32\\%$ efficiency as compared to $V_1$. If there are no other confounding factors, then the most accurate inference is:",
    [
        {"id": "a", "text": "$V_1, V_2, V_3$, and $V_4$ have identical surface protein $P$.", "isCorrect": False, "explanation": "Neutralization efficiency varies widely, indicating sequence divergence in the epitope."},
        {"id": "b", "text": "the genome of $V_1$ and $V_3$ has to be $90\\%$ identical for the observed binding efficiency.", "isCorrect": False, "explanation": "Antibody binds an epitope, not the whole genome."},
        {"id": "c", "text": "the sequence of $P$ is more similar in $V_2$ and $V_4$ than in $V_1$ and $V_2$.", "isCorrect": False, "explanation": "Antibody binding reflects similarity to V1."},
        {"id": "d", "text": "a segment of sequence in $P$ is highly conserved in $V_1$ and $V_3$ whereas the same segment is less conserved in $V_2$ and $V_4$.", "isCorrect": True, "explanation": "High neutralization efficiency in V3 (90%) reflects strong conservation of the specific epitope recognized by M, whereas V2 (40%) and V4 (32%) have amino acid substitutions in the epitope."}
    ],
    "**Correct Answer: Option (4) / (D)**\n\n- Monoclonal antibodies bind a specific contiguous or conformational **epitope** on antigen $P$.\n- $90\\%$ cross-neutralization in $V_3$ indicates high epitope conservation with $V_1$, whereas $40\\%$ and $32\\%$ in $V_2$ and $V_4$ reflect epitope sequence divergence."
))

# Q13 (VERBATIM FROM PDF)
questions.append(make_q(
    "bio-2023-s1-q13", 13, "Biology", "Biochemistry", "Hemoglobin Dimerization & Cooperativity", "MCQ", 2.5, 1.0,
    "A genetic engineering experiment resulted in a new haemoglobin variant which exists primarily as $\\alpha\\beta$ dimers in solution. Based on the oxygen saturation curves of the variant (dashed line) and normal haemoglobin (solid line), it can be inferred that:",
    [
        {"id": "a", "text": "the variant has a higher affinity to oxygen and shows non-cooperative behaviour.", "isCorrect": True, "explanation": "Dissociation into alpha-beta dimers abolishes tetrameric allosteric subunit interactions (positive cooperativity), converting the sigmoidal binding curve to a left-shifted hyperbolic curve (higher affinity, Hill coefficient n=1)."},
        {"id": "b", "text": "the variant has a higher affinity to oxygen and shows cooperative behaviour.", "isCorrect": False, "explanation": "Dimers lack the cooperativity of the full tetramer."},
        {"id": "c", "text": "the oxygen dissociation of the variant is less than $10\\%$ at $20\\text{ mm of Hg}$.", "isCorrect": False, "explanation": "Curve shows saturation > 70% at 20 mmHg."},
        {"id": "d", "text": "at sea level ($\\sim 150\\text{ mm of Hg}$), animals with this variant of haemoglobin can survive better than the ones with normal haemoglobin.", "isCorrect": False, "explanation": "High affinity prevents unloading oxygen in peripheral tissues, causing hypoxia."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Normal hemoglobin tetramer exhibits cooperative sigmoidal binding ($n_H \\approx 2.8$).\n- Isolated $\\alpha\\beta$ dimers lack the quaternary $\\text{T} \\leftrightarrow \\text{R}$ allosteric transition, binding oxygen with **hyperbolic, non-cooperative kinetics** and high affinity (left-shifted curve).",
    img=cld["q13"]
))

# Q14 (VERBATIM FROM PDF)
questions.append(make_q(
    "bio-2023-s1-q14", 14, "Biology", "Microbiology & Genetics", "Nosocomial Antibiotic Resistance Mechanisms", "MCQ", 2.5, 1.0,
    "A hospital witnessed an outbreak of a nosocomial (hospital-acquired) infection caused by *Klebsiella pneumoniae*. It showed resistance to antibiotics generally used for its treatment. Under the given scenario, the antibiotic resistance of this organism can be attributed to:",
    [
        {"id": "a", "text": "the presence of antibiotic resistance gene acquired through horizontal transfer from other prevalent strains in the hospital.", "isCorrect": True, "explanation": "Nosocomial outbreaks of multi-drug resistant Klebsiella pneumoniae spread primarily via conjugative plasmids through horizontal gene transfer under clinical antibiotic selection pressure."},
        {"id": "b", "text": "silent mutations in target sites of antibiotics.", "isCorrect": False, "explanation": "Silent mutations do not alter protein structure or confer resistance."},
        {"id": "c", "text": "neutralisation of antibiotics by enzymes that target and inactivate these antibiotics.", "isCorrect": False, "explanation": "Horizontal gene transfer is the primary epidemiological mechanism."},
        {"id": "d", "text": "reduced permeability of these antibiotics due to the formation of a protective barrier.", "isCorrect": False, "explanation": "Secondary factor."}
    ],
    "**Correct Answer: Option (1) / (A)**\n\n- Hospital-acquired outbreaks of multidrug-resistant *K. pneumoniae* are driven by **horizontal gene transfer (HGT)** of resistance plasmids carrying beta-lactamase and carbapenemase genes."
))

# Q15 (VERBATIM FROM PDF) - MSQ
questions.append(make_q(
    "bio-2023-s1-q15", 15, "Biology", "Plant Developmental Genetics (MSQ)", "ABC Model of Floral Organ Identity", "MSQ", 4.0, 0.0,
    "In the ABC model, the acquisition of floral organ identity is regulated by the floral homeotic genes named A, B, and C. A wild-type flower is depicted below.\n\nConsider the following mutants:\ni. loss of gene C\nii. loss of gene A\niii. loss of gene B\niv. loss of genes B and C\n\nPossible floral phenotypes (P-S) resulting from these mutations are given below.\n\nBased on this ABC model, the correct option(s) is(are): *(Select all correct options)*",
    [
        {"id": "a", "text": "(i) corresponds to R and (iv) corresponds to Q.", "isCorrect": False, "explanation": "Check ABC mapping."},
        {"id": "b", "text": "(i) corresponds to S and (ii) corresponds to Q.", "isCorrect": True, "explanation": "Loss of C: A expands everywhere => Sepal, Petal, Petal, Sepal (Phenotype S). Loss of A: C expands everywhere => Carpel, Stamen, Stamen, Carpel (Phenotype Q)."},
        {"id": "c", "text": "(ii) corresponds to P and (iii) corresponds to S.", "isCorrect": False, "explanation": "Loss of B corresponds to P."},
        {"id": "d", "text": "(iii) corresponds to P and (iv) corresponds to R.", "isCorrect": True, "explanation": "Loss of B (iii): Sepal, Sepal, Carpel, Carpel (Phenotype P). Loss of B and C (iv): only A active in all 4 whorls => Sepal, Sepal, Sepal, Sepal (Phenotype R)."}
    ],
    "**Correct Answers: Options (2) and (4) / (B) and (D)**\n\n**ABC Floral Model Breakdown:**\n- **Mutant (i) [loss of C]:** Sepal, Petal, Petal, Sepal (matches **S**).\n- **Mutant (ii) [loss of A]:** Carpel, Stamen, Stamen, Carpel (matches **Q**).\n- **Mutant (iii) [loss of B]:** Sepal, Sepal, Carpel, Carpel (matches **P**).\n- **Mutant (iv) [loss of B & C]:** Sepal, Sepal, Sepal, Sepal (matches **R**).\n- Therefore, (i)=S & (ii)=Q [Option 2], and (iii)=P & (iv)=R [Option 4].",
    imgs=[cld["q15_1"], cld["q15_2"]]
))

# Q16 (VERBATIM FROM PDF) - MSQ
questions.append(make_q(
    "bio-2023-s1-q16", 16, "Biology", "Microbiology & Genetics (MSQ)", "Auxotroph Replica Plating Analysis", "MSQ", 4.0, 0.0,
    "Auxotrophs are organisms with mutations that have lost the ability to synthesise essential organic compounds, and hence need supplements for growth in minimal media. Prototrophs are organisms that are able to synthesize essential compounds and hence can grow in minimal media without supplements. Colonies from six different strains of *E. coli* ($U, V, W, X, Y, Z$) are grown separately on a single master plate containing complete medium. No strain carries more than a single auxotrophic mutation. Replica plates are then made from this master plate. Each of this replica plate contains minimal medium to which a single supplement (either $P, Q, R,$ or $S$) is added. In the diagram below, filled circles represent colonies that grew on the medium and absence denotes failure to grow.\n\nBased on the scheme, the correct interpretation(s) is(are): *(Select all correct options)*",
    [
        {"id": "a", "text": "strain $W$ is a prototrophic strain and strain $V$ is auxotrophic for $Q$.", "isCorrect": False, "explanation": "Check plate growth data."},
        {"id": "b", "text": "strain $Z$ is auxotrophic for $R$ and strain $Y$ is auxotrophic for $S$.", "isCorrect": False, "explanation": "Check plate growth data."},
        {"id": "c", "text": "strain $U$ is a prototrophic strain and strain $X$ is auxotrophic for $Q$.", "isCorrect": True, "explanation": "Strain U grows on all plates (prototroph). Strain X only grows when supplement Q is present, proving it is auxotrophic for Q."},
        {"id": "d", "text": "strain $Y$ is auxotrophic for $P$ and strain $Z$ is auxotrophic for $R$.", "isCorrect": True, "explanation": "Strain Y only grows when P is added (P auxotroph); Strain Z only grows when R is added (R auxotroph)."}
    ],
    "**Correct Answers: Options (3) and (4) / (C) and (D)**\n\n**Replica Plating Logic:**\n- **Strain $U$:** Grows on minimal medium with any supplement $\\implies$ **prototrophic**.\n- **Strain $X$:** Grows exclusively on the replica plate containing supplement $Q \\implies$ **auxotrophic for $Q$**.\n- **Strain $Y$:** Grows exclusively on supplement $P \\implies$ **auxotrophic for $P$**.\n- **Strain $Z$:** Grows exclusively on supplement $R \\implies$ **auxotrophic for $R$**.",
    img=cld["q16"]
))

# Q17 (VERBATIM FROM PDF) - MSQ
questions.append(make_q(
    "bio-2023-s1-q17", 17, "Biology", "Ecology (MSQ)", "Ecological Pyramids of Energy & Biomass", "MSQ", 4.0, 0.0,
    "Energy diagrams allow ecologists to compare patterns of energy flow through the trophic levels of different ecosystems while biomass diagrams allow them to compare the amount of material present in living organisms at different trophic levels. The energy flow and biomass diagrams for a few ecosystems are given.\n\nChoose the correct statement(s): *(Select all correct options)*",
    [
        {"id": "a", "text": "$\\text{III B}$ cannot be the biomass pyramid of an open ocean since a biomass pyramid cannot be inverted at any level.", "isCorrect": False, "explanation": "Open ocean biomass pyramids ARE inverted."},
        {"id": "b", "text": "$\\text{I B}$ and $\\text{II B}$ are the biomass pyramids of a grassland and a forest ecosystem respectively, since most of the biomass in a grassland is found in the green parts and hence the efficiency of energy transfer from producers to primary consumers is higher in grassland as compared to a forest ecosystem.", "isCorrect": True, "explanation": "In grasslands (I B), standing crop biomass is upright with high consumption efficiency; in forests (II B), huge producer biomass is locked in non-consumed wood."},
        {"id": "c", "text": "$\\text{III A}$ could be the energy flow pyramid for an open ocean.", "isCorrect": True, "explanation": "Energy flow pyramids are ALWAYS upright in all ecosystems due to Second Law of Thermodynamics (10% law)."},
        {"id": "d", "text": "$\\text{I A}$ could be the energy flow pyramid for a forest ecosystem, since the majority of the biomass is tied up in wood and is not available to most herbivores.", "isCorrect": True, "explanation": "Forest energy pyramids have a very broad producer base with a steep drop to herbivores since most tree biomass enters the detrital food web rather than grazing food chain."}
    ],
    "**Correct Answers: Options (2), (3), and (4) / (B), (C), and (D)**\n\n**Ecosystem Bioenergetics:**\n- Biomass pyramid of open ocean is inverted (high turnover of phytoplankton).\n- Energy flow pyramids are **strictly upright** in all ecosystems due to thermodynamic dissipation at each trophic transfer.\n- In grasslands, photosynthetic tissue dominates, giving high herbivore trophic transfer efficiency compared to woody forests.",
    img=cld["q17"]
))

# Save the updated master paper
# Load existing paper and overwrite questions
json_path = os.path.join(os.getcwd(), "content", "nest", "mocks", "nest", "nest-pyq-2023-s1.json")
with open(json_path, "r", encoding="utf-8") as f:
    master_paper = json.load(f)

# Keep questions 18 to 68 and replace 1 to 17
existing_q18_68 = master_paper["questions"][17:]
master_paper["questions"] = questions + existing_q18_68

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(master_paper, f, indent=2, ensure_ascii=False)

# Sync with other directories
d_path = r"d:\nest-pyq\jsons\2023_s1\nest_2023_session_1_full_paper.json"
app_path = os.path.join(os.getcwd(), "content", "nest", "jsons", "2023_s1", "nest_2023_session_1_full_paper.json")
with open(d_path, "w", encoding="utf-8") as f:
    json.dump(master_paper, f, indent=2, ensure_ascii=False)
with open(app_path, "w", encoding="utf-8") as f:
    json.dump(master_paper, f, indent=2, ensure_ascii=False)

print(f"Master paper written with {len(master_paper['questions'])} questions!")
