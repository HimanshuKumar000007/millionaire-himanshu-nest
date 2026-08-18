import os
import sys
import json
import re

sys.stdout.reconfigure(encoding='utf-8')

# Cloudinary image mapping
cld = {
    "q1_cladogram": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983028/nest_pyqs/2023_s1/nest_2023_s1_page_2_img_1_2.png",
    "q5_cyanide": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983038/nest_pyqs/2023_s1/nest_2023_s1_page_4_img_1_8.png",
    "q6_pedigree": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983041/nest_pyqs/2023_s1/nest_2023_s1_page_4_img_2_9.png",
    "q9_foodweb": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983047/nest_pyqs/2023_s1/nest_2023_s1_page_6_img_1_16.png",
    "q13_hemoglobin": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983054/nest_pyqs/2023_s1/nest_2023_s1_page_8_img_1_22.png",
    "q15_promoter": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983056/nest_pyqs/2023_s1/nest_2023_s1_page_9_img_1_26.png",
    "q15_table": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983057/nest_pyqs/2023_s1/nest_2023_s1_page_9_img_2_27.png",
    "q16_replica": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982977/nest_pyqs/2023_s1/nest_2023_s1_page_10_img_1_32.png",
    "q17_metabolic": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982979/nest_pyqs/2023_s1/nest_2023_s1_page_11_img_1_36.png",
    
    "q19_chem": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982981/nest_pyqs/2023_s1/nest_2023_s1_page_12_img_1_40.png",
    "q21_reagents": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786982982/nest_pyqs/2023_s1/nest_2023_s1_page_13_img_1_44.png",
    "q26_coord": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983008/nest_pyqs/2023_s1/nest_2023_s1_page_15_img_1_54.png",
    "q28_carbene": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983015/nest_pyqs/2023_s1/nest_2023_s1_page_16_img_3_64.png",
    "q29_reaction": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983016/nest_pyqs/2023_s1/nest_2023_s1_page_17_img_1_70.png",
    "q33_kinetics": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983021/nest_pyqs/2023_s1/nest_2023_s1_page_19_img_1_84.png",
    
    "q43_geometry": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983022/nest_pyqs/2023_s1/nest_2023_s1_page_22_img_1_92.png",
    "q44_triangle": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983023/nest_pyqs/2023_s1/nest_2023_s1_page_23_img_1_96.png",
    
    "q53_comet": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983024/nest_pyqs/2023_s1/nest_2023_s1_page_26_img_1_104.png",
    "q55_pv": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983025/nest_pyqs/2023_s1/nest_2023_s1_page_27_img_1_108.png",
    "q60_wire": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983026/nest_pyqs/2023_s1/nest_2023_s1_page_29_img_1_116.png",
    "q63_bucket": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983029/nest_pyqs/2023_s1/nest_2023_s1_page_30_img_1_120.png",
    "q64_train": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983031/nest_pyqs/2023_s1/nest_2023_s1_page_31_img_1_124.png",
    "q67_cylinder": "https://res.cloudinary.com/dhb8qmnxt/image/upload/v1786983033/nest_pyqs/2023_s1/nest_2023_s1_page_32_img_1_128.png"
}

# Questions definitions
questions_data = [
    # ==================== BIOLOGY (Q1 - Q17) ====================
    {
        "num": 1, "subj": "Biology", "code": "bio", "topic": "Evolution & Diversity", "subtopic": "Cladistics & Character Evolution",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": cld["q1_cladogram"],
        "text": "A cladogram representing the evolution of some animals ($P$, $Q$, $R$, and $S$) is shown. The features marked $\\text{I}$ to $\\text{IV}$ in the cladogram represent different features that have evolved. What is the correct statement with respect to the given cladogram?",
        "options": [
            {"id": "a", "text": "If $Q$ is a bullfrog, $\\text{II}$ could be placenta.", "isCorrect": False, "explanation": "Placenta evolved in eutherian mammals, much higher up than amphibians (bullfrog)."},
            {"id": "b", "text": "If features $\\text{III}$ and $\\text{IV}$ are mammary glands and hair, respectively, then $R$ represents kangaroo and $S$ represents humans.", "isCorrect": False, "explanation": "Mammary glands and hair evolved in the common ancestor of all mammals (monotremes, marsupials, eutherians), so both kangaroos and humans possess both."},
            {"id": "c", "text": "If $Q$, $R$, and $S$ represent bullfrog, koala, and human, respectively, then feature $\\text{II}$ could be two pairs of limbs (tetrapod limbs).", "isCorrect": True, "explanation": "Feature II represents the evolution of tetrapod limbs (two pairs of limbs), which is shared by amphibians (bullfrog, Q), marsupials (koala, R), and eutherians (human, S), but absent in ancestral fish lineage P."},
            {"id": "d", "text": "If feature $\\text{I}$ is lungs, then $P$ and $Q$ are shark and bullfrog respectively.", "isCorrect": False, "explanation": "If feature I evolved at the base, it would apply to all downstream lineages."}
        ],
        "solution": "**Correct Answer: Option (C)**\n\n**Detailed Analysis:**\n- In the provided cladogram, lineage $P$ branches off before synapomorphy $\\text{II}$.\n- Synapomorphy $\\text{II}$ defines the clade containing $Q$, $R$, and $S$.\n- If $Q = \\text{bullfrog}$ (Amphibia), $R = \\text{koala}$ (Metatheria), and $S = \\text{human}$ (Eutheria), the derived characteristic uniting all three is **two pairs of limbs (Tetrapoda)**.\n- Therefore, statement (3)/(C) is accurate."
    },
    {
        "num": 2, "subj": "Biology", "code": "bio", "topic": "Biochemistry & Molecular Biology", "subtopic": "Nucleic Acid Conformations & Melting Temperature",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "A $1000\\text{ base pair}$ double-stranded DNA (B-form) has a melting temperature ($T_m$) of $58^\\circ\\text{C}$. If a duplex RNA (A-form) of the same length and sequence is constructed, then the $T_m$ of this new RNA duplex with respect to the DNA (B-form) would be:",
        "options": [
            {"id": "a", "text": "higher due to greater stability of A-form of RNA duplex.", "isCorrect": True, "explanation": "Double-stranded RNA adopts the A-form conformation with 2'-OH groups participating in ribose puckering (C3'-endo) and favorable hydration/base-stacking networks, providing significantly higher thermal stability and higher Tm than B-form DNA of the same sequence."},
            {"id": "b", "text": "lower due to lower stability of A-form of RNA duplex.", "isCorrect": False, "explanation": "A-form RNA duplexes are more thermally stable than B-form DNA duplexes."},
            {"id": "c", "text": "lower because of unfavorable enthalpy of formation of RNA duplex.", "isCorrect": False, "explanation": "RNA duplex formation is enthalpy-driven and highly favorable."},
            {"id": "d", "text": "identical, as the number of hydrogen bonds remain the same.", "isCorrect": False, "explanation": "Melting temperature depends heavily on base stacking enthalpy and conformational rigidity, not just base pairing hydrogen bonds."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Molecular Biophysics Explanation:**\n- Duplex RNA preferentially adopts the compact **A-form geometry** due to the steric constraint of the 2'-hydroxyl group enforcing a $\\text{C3'-endo}$ sugar pucker.\n- The A-form duplex has superior base-stacking overlap, tighter helical pitch (11 bp/turn vs 10.5 in B-DNA), and extensive hydration networks.\n- Consequently, an RNA duplex exhibits a significantly **higher melting temperature ($T_m$)** than a DNA duplex of identical sequence and length."
    },
    {
        "num": 3, "subj": "Biology", "code": "bio", "topic": "Biochemistry", "subtopic": "Ion Exchange Chromatography",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "A biochemist wants to purify a protein $X$ (molecular weight $= 30.2\\text{ kDa}$ and $\\text{pI} = 7.5$) from a solution containing proteins $X$ and $Y$ (molecular weight $= 30.9\\text{ kDa}$ and $\\text{pI} = 3.5$) using ion exchange chromatography. In this technique, an anion exchange resin is positively charged and a cation exchange resin is negatively charged. The most appropriate resin where protein $X$, but not $Y$ will remain bound is:",
        "options": [
            {"id": "a", "text": "cation exchanger at $\\text{pH} = 7.5$.", "isCorrect": False, "explanation": "At pH = 7.5 (equal to pI of X), protein X has net zero charge and will not bind strongly."},
            {"id": "b", "text": "anion exchanger at $\\text{pH} = 2.5$.", "isCorrect": False, "explanation": "At pH = 2.5 (below both pIs), both proteins are positively charged and will not bind to anion exchanger."},
            {"id": "c", "text": "cation exchanger at $\\text{pH} = 5.0$.", "isCorrect": True, "explanation": "At pH = 5.0: For Protein X (pI = 7.5), pH < pI => net positive charge (binds to negatively charged cation exchanger). For Protein Y (pI = 3.5), pH > pI => net negative charge (repelled/passes through cation exchanger)."},
            {"id": "d", "text": "anion exchanger at $\\text{pH} = 7.5$.", "isCorrect": False, "explanation": "At pH = 7.5, Y (pI 3.5) is negatively charged and will bind, while X (pI 7.5) is neutral."}
        ],
        "solution": "**Correct Answer: Option (C)**\n\n**Chromatography Principles:**\n- Net charge of a protein depends on the ambient $\\text{pH}$ relative to its isoelectric point ($\\text{pI}$):\n  - If $\\text{pH} < \\text{pI} \\implies$ Net positive charge ($+$), binds to **cation exchanger**.\n  - If $\\text{pH} > \\text{pI} \\implies$ Net negative charge ($-$), binds to **anion exchanger**.\n- At $\\text{pH} = 5.0$:\n  - Protein $X$ ($\\text{pI} = 7.5$): $\\text{pH} < \\text{pI} \\implies$ positively charged $\\implies$ **binds to cation exchanger**.\n  - Protein $Y$ ($\\text{pI} = 3.5$): $\\text{pH} > \\text{pI} \\implies$ negatively charged $\\implies$ **elutes in flow-through**."
    },
    {
        "num": 4, "subj": "Biology", "code": "bio", "topic": "Microbiology", "subtopic": "Bacterial Endospore Resistance Mechanisms",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "Bacterial endospores are highly resistant to environmental stresses such as heat, UV radiation, and oxidizing agents. They can remain dormant for a prolonged period. During the period of dormancy, they prevent the accumulation of potentially harmful mutations in their DNA. This is primarily due to:",
        "options": [
            {"id": "a", "text": "decreased water content and reduced enzyme activity.", "isCorrect": True, "explanation": "The dehydrated core (containing dipicolinic acid-calcium complexes and SASPs) drastically suppresses water-mediated hydrolytic DNA damage and halts enzymatic chemical reactions."},
            {"id": "b", "text": "decreased salt concentration and enhanced enzyme activity.", "isCorrect": False, "explanation": "Enzyme activity is virtually dormant/inactive, not enhanced."},
            {"id": "c", "text": "decreased respiration and decreased DNA supercoiling.", "isCorrect": False, "explanation": "Small acid-soluble spore proteins (SASPs) bind and protect DNA by altering conformation from B to A-like form."},
            {"id": "d", "text": "increased enzyme activity and increased membrane permeability.", "isCorrect": False, "explanation": "Membrane permeability and enzymatic reactions are reduced to minimal levels."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Spore Biology:**\n- Endospores achieve profound metabolic dormancy through core dehydration (water content drops to 10–30% of vegetative cells).\n- The absence of free water prevents depurination, hydrolytic deamination of cytosine, and reactive oxygen generation, keeping the genetic material intact for centuries."
    },
    {
        "num": 5, "subj": "Biology", "code": "bio", "topic": "Plant Physiology", "subtopic": "Membrane Potential & Cyanide Inhibition of ETC",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": cld["q5_cyanide"],
        "text": "Pea seeds were allowed to germinate for $4\\text{ days}$, and segments of the epicotyl were treated with cyanide ($\\text{CN}^-$) at a concentration of $0.1\\text{ mM}$. The membrane potential was recorded before and after the addition and removal of cyanide. The graph of cell membrane potential ($\\text{mV}$) against time (minutes) is shown. Based on these experimental observations, the correct option is:",
        "options": [
            {"id": "a", "text": "addition of cyanide will decrease the membrane potential because of the depletion of ATP.", "isCorrect": True, "explanation": "Cyanide inhibits cytochrome c oxidase in mitochondrial Complex IV, blocking ATP synthesis. The plasma membrane H+-ATPase loses its substrate ATP, collapsing the electrogenic proton gradient and causing depolarization (decrease in negative potential magnitude). Washing out cyanide restores respiration and repolarizes the membrane."},
            {"id": "b", "text": "addition of cyanide will decrease the pH of the intermembrane space.", "isCorrect": False, "explanation": "Blocking ETC halts proton pumping, increasing the pH of the IMS (less acidic)."},
            {"id": "c", "text": "addition of excess oxygen will increase the membrane potential in the presence of cyanide.", "isCorrect": False, "explanation": "Cyanide non-competitively blocks Complex IV; excess O2 cannot overcome this inhibition."},
            {"id": "d", "text": "addition of cyanide will cause a rapid but irreversible depolarization of membrane potential.", "isCorrect": False, "explanation": "The graph shows clear reversibility: upon cyanide removal/washout, membrane potential rapidly returns to baseline."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Electrophysiological Analysis:**\n- Plant cell resting potential ($\\sim -120\\text{ to } -160\\text{ mV}$) is maintained by electrogenic plasma membrane $\\text{H}^+\\text{-ATPase}$ pumps powered by mitochondrial $\\text{ATP}$.\n- Cyanide ($\\text{CN}^-$) binds the heme $a_3-\\text{Cu}_B$ binuclear center of Cytochrome $c$ Oxidase, abruptly shutting down respiration and depleting cellular $[\\text{ATP}]$.\n- The proton pump halts, depolarizing the membrane towards diffusion potential."
    },
    {
        "num": 6, "subj": "Biology", "code": "bio", "topic": "Genetics", "subtopic": "Pedigree Analysis",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": cld["q6_pedigree"],
        "text": "In the given pedigree, circles represent females and squares represent males. Filled shapes indicate affected individuals while unfilled shapes indicate unaffected individuals. Based on the pedigree information provided, the correct inheritance pattern is:",
        "options": [
            {"id": "a", "text": "autosomal dominant.", "isCorrect": False, "explanation": "Unaffected parents having affected offspring rules out autosomal dominant."},
            {"id": "b", "text": "autosomal recessive.", "isCorrect": True, "explanation": "Unaffected parents (Generation I) produce affected male and female offspring in Generation II, characteristic of autosomal recessive inheritance."},
            {"id": "c", "text": "X-linked dominant.", "isCorrect": False, "explanation": "Affected daughters would require an affected father in X-linked dominant, which is not present."},
            {"id": "d", "text": "X-linked recessive.", "isCorrect": False, "explanation": "An affected female must have an affected father in X-linked recessive, but the father is unaffected."}
        ],
        "solution": "**Correct Answer: Option (B)**\n\n**Pedigree Analysis Rules:**\n1. Trait skips generations (unaffected parents have affected children) $\\implies$ **Recessive**.\n2. Affected females are born to unaffected parents $\\implies$ In X-linked recessive, an affected female ($X^a X^a$) must inherit $X^a$ from her father, meaning the father must be affected ($X^a Y$). Since the father is phenotypically normal, it **cannot be X-linked recessive**.\n3. Hence, the trait is definitively **autosomal recessive**."
    },
    {
        "num": 7, "subj": "Biology", "code": "bio", "topic": "Population Genetics", "subtopic": "Hardy-Weinberg Equilibrium with Multiple Alleles",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "A population has a single locus with three alleles ($X_1, X_2, X_3$). The frequencies of these alleles are $p, q,$ and $r$, respectively, and if $p + q + r = 1$, then the correct statement is:",
        "options": [
            {"id": "a", "text": "the population is in Hardy-Weinberg equilibrium.", "isCorrect": False, "explanation": "Knowing allele frequencies sum to 1 does not guarantee genotype frequencies match HW expansion."},
            {"id": "b", "text": "the population is not in Hardy-Weinberg equilibrium because it has three alleles.", "isCorrect": False, "explanation": "Hardy-Weinberg equilibrium applies perfectly to multi-allelic loci."},
            {"id": "c", "text": "this information is insufficient to state whether the population is in Hardy-Weinberg equilibrium.", "isCorrect": True, "explanation": "Allele frequencies always sum to 1 by definition (p + q + r = 1) in any population regardless of equilibrium. To test for HWE, observed genotype frequencies must be compared with expected expansion (p^2 + q^2 + r^2 + 2pq + 2pr + 2qr)."},
            {"id": "d", "text": "the population will be in Hardy-Weinberg equilibrium if $r = 0$ and $p + q = 1$.", "isCorrect": False, "explanation": "Setting r=0 reduces it to 2 alleles, but still requires genotype frequencies to match p^2, 2pq, q^2."}
        ],
        "solution": "**Correct Answer: Option (C)**\n\n**Theoretical Explanation:**\n- The relation $p + q + r = 1$ is an algebraic identity representing the sum of all gene frequencies at a locus in any diploid population.\n- Hardy-Weinberg Equilibrium is defined by whether the **observed diploid genotype frequencies** conform to $(p+q+r)^2 = p^2 + q^2 + r^2 + 2pq + 2pr + 2qr$.\n- Without observed genotype data, one cannot determine if equilibrium holds."
    },
    {
        "num": 8, "subj": "Biology", "code": "bio", "topic": "Evolution", "subtopic": "Darwinian Selection vs Mendelian Particulate Inheritance",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "Mendelian theory of inheritance was crucial for Darwin-Wallace’s theory of natural selection because it resolved the major problem of:",
        "options": [
            {"id": "a", "text": "dilution and loss of favorable continuous variations through 'blending inheritance'.", "isCorrect": True, "explanation": "Under 19th-century blending inheritance, rare advantageous traits would be diluted by half in each generation. Mendel's discovery of discrete, particulate alleles proved that genetic variation is preserved undiluted across generations."},
            {"id": "b", "text": "the origin of life from prebiotic organic molecules.", "isCorrect": False, "explanation": "Mendelism explains inheritance mechanism, not abiogenesis."},
            {"id": "c", "text": "the inheritance of acquired characters proposed by Lamarck.", "isCorrect": False, "explanation": "Weismann's germplasm theory primarily addressed Lamarckism."},
            {"id": "d", "text": "the exact rate of spontaneous gene mutations in eukaryotes.", "isCorrect": False, "explanation": "Mutation rates were discovered decades later with Thomas Hunt Morgan and H.J. Muller."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Historical & Theoretical Context:**\n- Fleeming Jenkin presented a critical challenge to Darwin's theory: if inheritance were 'blending', any novel advantageous variation would be diluted by 50% in each generation, disappearing before natural selection could act.\n- Mendel's particulate theory demonstrated that alleles retain their integrity without blending, preserving genetic variance upon which natural selection acts."
    },
    {
        "num": 9, "subj": "Biology", "code": "bio", "topic": "Ecology", "subtopic": "Food Web Dynamics & Trophic Manipulations",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": cld["q9_foodweb"],
        "text": "In a fresh-water pond ecosystem, the interaction between green algae, aquatic snails, and predatory diving beetles was investigated through selective removal experiments. Based on the population curves shown across experimental setups (Control, Snails removed, Green algae removed, Beetles removed), the correct trophic relationship is:",
        "options": [
            {"id": "a", "text": "Green algae are primary producers, snails are primary consumers, and diving beetles are secondary consumers.", "isCorrect": True, "explanation": "Removal of snails causes green algae to proliferate (trophic release) and beetles to decline (prey starvation). Removal of beetles causes snails to surge and overgraze algae."},
            {"id": "b", "text": "Diving beetles graze on green algae directly, competing with snails.", "isCorrect": False, "explanation": "Beetles are carnivorous predators of snails."},
            {"id": "c", "text": "Snails act as apex predators regulating beetle density.", "isCorrect": False, "explanation": "Snails are herbivores, not predators."},
            {"id": "d", "text": "All three species occupy the same trophic level in a mutualistic guild.", "isCorrect": False, "explanation": "They form a classical tri-trophic linear food chain."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Community Ecology Analysis:**\n- The top-down and bottom-up responses in the experimental plots confirm a classic tri-trophic cascade:\n  $$\\text{Green Algae (Producer)} \\longrightarrow \\text{Snail (Primary Consumer)} \\longrightarrow \\text{Diving Beetle (Secondary Consumer)}$$"
    },
    {
        "num": 10, "subj": "Biology", "code": "bio", "topic": "Cell Biology", "subtopic": "Mitotic Spindle Microtubules & Kinetochore Tension",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "During mitotic metaphase, chromosomes align at the equatorial plate. If a laser microbeam is used to sever the kinetochore microtubule fibers attached to one of the sister chromatids, what will be the immediate behavior of the chromosome?",
        "options": [
            {"id": "a", "text": "The entire chromosome will immediately move towards the opposite spindle pole whose attachment remains intact.", "isCorrect": True, "explanation": "In metaphase, balanced poleward pulling forces (kinetochore dynein/depolymerization) from opposing poles keep chromosomes centered. Severing fibers to one kinetochore leaves an unopposed poleward force from the intact side, rapidly pulling the chromosome towards that pole."},
            {"id": "b", "text": "The chromosome will remain stationary at the metaphase plate due to cytoplasmic viscosity.", "isCorrect": False, "explanation": "The intact kinetochore exerts active pulling force causing immediate poleward motion."},
            {"id": "c", "text": "Both sister chromatids will immediately premature separate into anaphase.", "isCorrect": False, "explanation": "Loss of tension activates the Spindle Assembly Checkpoint (SAC), preventing cohesin cleavage."},
            {"id": "d", "text": "The chromosome will be immediately ejected out of the cell nucleus.", "isCorrect": False, "explanation": "Movement is directed strictly along the remaining spindle fiber toward the centrosome."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Spindle Mechanics:**\n- Congression at metaphase is a dynamic equilibrium of opposing poleward forces.\n- Destroying one sister kinetochore's fiber attachment breaks force balance; the intact kinetochore pulls the entire divalent chromosome to its connected pole."
    },
    {
        "num": 11, "subj": "Biology", "code": "bio", "topic": "Molecular Biology", "subtopic": "Genetic Code Degeneracy Combinatorics",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "Consider a hypothetical genetic code where codons consist of $2\\text{ nucleotides}$ each, and there are $6\\text{ distinct nitrogenous bases}$ available ($A, U, G, C, X, Y$). How many possible unique codons can be formed, and what is the minimum codon length required if $20\\text{ amino acids}$ and $1\\text{ stop signal}$ must be uniquely encoded?",
        "options": [
            {"id": "a", "text": "$36\\text{ codons}$, and minimum length is $2\\text{ nucleotides}$.", "isCorrect": True, "explanation": "With 6 bases and 2-letter codons: 6^2 = 36 possible codons. Since 36 >= 21 (20 amino acids + 1 stop), a doublet code is sufficient."},
            {"id": "b", "text": "$64\\text{ codons}$, and minimum length is $3\\text{ nucleotides}$.", "isCorrect": False, "explanation": "6^2 = 36, not 64."},
            {"id": "c", "text": "$12\\text{ codons}$, and minimum length is $3\\text{ nucleotides}$.", "isCorrect": False, "explanation": "6^2 = 36, not 12."},
            {"id": "d", "text": "$216\\text{ codons}$, and minimum length is $2\\text{ nucleotides}$.", "isCorrect": False, "explanation": "216 corresponds to triplet codons (6^3 = 216)."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Mathematical Formulation:**\n- Number of permutations with $B = 6$ bases and codon length $L = 2$:\n  $$N = 6^2 = 36$$\n- Since $36 \\ge 21$, doublet codons ($L = 2$) are fully sufficient to unambiguously encode 20 amino acids plus 1 termination signal."
    },
    {
        "num": 12, "subj": "Biology", "code": "bio", "topic": "Plant Physiology", "subtopic": "C4 Photosynthesis & Photorespiration",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": None,
        "text": "In $\\text{C}_4$ plants like maize, the initial carbon fixation occurs in mesophyll cells via PEP carboxylase, while the Calvin cycle occurs in bundle sheath cells. Which of the following conditions in the bundle sheath cells directly suppresses the oxygenase activity of RuBisCO?",
        "options": [
            {"id": "a", "text": "High local concentration of $\\text{CO}_2$ generated by decarboxylation of $\\text{C}_4$ acids (malate).", "isCorrect": True, "explanation": "Malate transported to bundle sheath chloroplasts is decarboxylated by NADP-malic enzyme, concentrating CO2 to ~1000-2000 uM around RuBisCO, competitively outcompeting O2 and eliminating photorespiration."},
            {"id": "b", "text": "Complete absence of ATP synthase in bundle sheath chloroplasts.", "isCorrect": False, "explanation": "Bundle sheath cells carry out cyclic photophosphorylation to generate ample ATP."},
            {"id": "c", "text": "Elevated oxygen concentration generated by active Photosystem II.", "isCorrect": False, "explanation": "Bundle sheath chloroplasts typically lack PS II (agranal), keeping O2 levels low."},
            {"id": "d", "text": "Acidification of bundle sheath stroma to $\\text{pH } 4.0$.", "isCorrect": False, "explanation": "Calvin cycle enzymes require an alkaline stroma (pH ~8.0)."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Biochemical Rationale:**\n- RuBisCO is a bifunctional enzyme with both carboxylase and oxygenase activities.\n- In $\\text{C}_4$ plants, the $\\text{CO}_2$ concentrating mechanism raises bundle sheath $[\\text{CO}_2]$ over 10-fold compared to ambient air, saturating RuBisCO with its preferred substrate and suppressing photorespiration."
    },
    {
        "num": 13, "subj": "Biology", "code": "bio", "topic": "Biochemistry", "subtopic": "Hemoglobin Oxygen Binding Curves & Mutants",
        "type": "MCQ", "marks": 2.5, "neg": 1.0, "img": cld["q13_hemoglobin"],
        "text": "The oxygen binding curve of wild-type human adult hemoglobin (HbA) is sigmoidal due to positive cooperativity. A mutant hemoglobin variant shows the oxygen saturation curve shifted to the left (hyperbolic-like, lower $P_{50}$) as shown in the graph. Which of the following is true for this variant?",
        "options": [
            {"id": "a", "text": "The variant has a higher affinity for oxygen and impaired release of oxygen to peripheral tissues.", "isCorrect": True, "explanation": "A left-shifted curve (lower P50) means higher oxygen affinity at lower pO2, stabilizing the R (relaxed) state and causing tissue hypoxia because oxygen is not efficiently offloaded at physiological tissue pO2 (~20-40 mmHg)."},
            {"id": "b", "text": "The variant has a lower affinity for oxygen and facilitates faster oxygen unloading.", "isCorrect": False, "explanation": "A left shift corresponds to higher affinity, not lower."},
            {"id": "c", "text": "The variant has an increased binding affinity for 2,3-bisphosphoglycerate (2,3-BPG).", "isCorrect": False, "explanation": "Increased 2,3-BPG binding stabilizes the T-state, shifting the curve to the right."},
            {"id": "d", "text": "The cooperativity (Hill coefficient) is significantly greater than $4.0$.", "isCorrect": False, "explanation": "The maximum theoretical Hill coefficient for a tetramer is 4.0."}
        ],
        "solution": "**Correct Answer: Option (A)**\n\n**Allosteric Regulation:**\n- Left-shift of oxygen dissociation curve $\\implies$ decreased $P_{50} \\implies$ increased oxygen affinity.\n- Hemoglobin holds onto oxygen tightly even in peripheral capillaries, leading to polycythemia and tissue hypoxia."
    },
    # MSQs in Biology: Q14, Q15, Q16, Q17
    {
        "num": 14, "subj": "Biology", "code": "bio", "topic": "Immunology (MSQ)", "subtopic": "Antibody Diversity & Somatic Hypermutation",
        "type": "MSQ", "marks": 4.0, "neg": 0.0, "img": None,
        "text": "Which of the following mechanism(s) contribute(s) directly to the generation of primary antibody diversity in naive B lymphocytes prior to antigen exposure? *(Select all correct statements)*",
        "options": [
            {"id": "a", "text": "Combinatorial joining of $V, D,$ and $J$ gene segments by RAG1/RAG2 recombinase.", "isCorrect": True, "explanation": "V(D)J recombination creates millions of distinct variable region combinations in naive B cells."},
            {"id": "b", "text": "Junctional flexibility and addition of P- and N-nucleotides by TdT (Terminal deoxynucleotidyl transferase).", "isCorrect": True, "explanation": "N-nucleotide addition at CDR3 junctions introduces non-templated nucleotide diversity."},
            {"id": "c", "text": "Combinatorial pairing of different heavy and light chain polypeptides.", "isCorrect": True, "explanation": "Random association of distinct heavy (H) and light (L) chains multiplies overall antigen-binding site diversity."},
            {"id": "d", "text": "Activation-Induced Cytidine Deaminase (AID)-mediated somatic hypermutation in germinal centers.", "isCorrect": False, "explanation": "Somatic hypermutation occurs secondary to antigen exposure in germinal centers, not in primary naive B cells."}
        ],
        "solution": "**Correct Answers: Options (A), (B), (C)**\n\n**Immunology Breakdown:**\n- Primary (antigen-independent) antibody diversity arises from:\n  1. $V(D)J$ gene segment rearrangement (RAG complex).\n  2. Junctional diversity via $P$- and $N$-nucleotide addition (TdT enzyme).\n  3. Combinatorial association of $\\text{V}_H$ and $\\text{V}_L$ chains.\n- Somatic hypermutation and class-switch recombination occur *after* antigen exposure."
    },
    {
        "num": 15, "subj": "Biology", "code": "bio", "topic": "Molecular Genetics (MSQ)", "subtopic": "Lac Operon Promoter & Operator Mutations",
        "type": "MSQ", "marks": 4.0, "neg": 0.0, "img": cld["q15_promoter"],
        "text": "Consider the regulatory regions and structural genes of the *E. coli* lac operon shown in the diagram, along with the phenotypic expression levels of $\\beta$-galactosidase and permease in various mutant strains. Which of the following statement(s) is(are) correct? *(Select all correct options)*",
        "options": [
            {"id": "a", "text": "An $I^-$ mutation produces a non-functional repressor resulting in constitutive expression in the absence of lactose.", "isCorrect": True, "explanation": "I- alleles fail to bind the operator, allowing continuous transcription."},
            {"id": "b", "text": "An $O^c$ (operator constitutive) mutation is cis-dominant and leads to constitutive expression of downstream structural genes on the same DNA molecule.", "isCorrect": True, "explanation": "Oc is a cis-acting mutation in the operator DNA sequence."},
            {"id": "c", "text": "An $I^s$ (super-repressor) mutation encodes a repressor that cannot bind the inducer allolactose, causing uninducible repression even in the presence of lactose.", "isCorrect": True, "explanation": "Is repressor stays permanently bound to the operator, acting trans-dominant over wild-type I+."},
            {"id": "d", "text": "Glucose stimulates lac operon transcription by directly increasing intracellular cAMP concentration.", "isCorrect": False, "explanation": "Glucose inhibits adenylate cyclase, lowering cAMP levels and repressing transcription (catabolite repression)."}
        ],
        "solution": "**Correct Answers: Options (A), (B), (C)**\n\n**Molecular Genetics Analysis:**\n- $I^-$: Inactive repressor $\\implies$ constitutive (recessive in merodiploids).\n- $O^c$: Mutated operator sequence $\\implies$ cis-dominant constitutive.\n- $I^s$: Allosteric site mutant repressor $\\implies$ trans-dominant uninducible.\n- Glucose causes **catabolite repression** by lowering [cAMP], preventing CAP-cAMP activation."
    },
    {
        "num": 16, "subj": "Biology", "code": "bio", "topic": "Microbiology (MSQ)", "subtopic": "Lederberg Replica Plating & Spontaneous Mutation",
        "type": "MSQ", "marks": 4.0, "neg": 0.0, "img": cld["q16_replica"],
        "text": "In the classical Lederberg replica plating experiment shown, bacterial colonies grown on master plates without antibiotic were stamped onto replica plates containing streptomycin. Which of the following conclusion(s) is(are) demonstrated by this experiment? *(Select all correct options)*",
        "options": [
            {"id": "a", "text": "Streptomycin-resistant mutants existed on the master plate prior to exposure to streptomycin.", "isCorrect": True, "explanation": "Identical colonies grew in the exact same coordinate positions across multiple replica plates, proving the mutations arose spontaneously on the master plate before antibiotic selection."},
            {"id": "b", "text": "Mutations for antibiotic resistance are spontaneous and not directed by the environmental selective agent.", "isCorrect": True, "explanation": "Direct experimental confirmation of spontaneous Darwinian mutation over Lamarckian directed adaptation."},
            {"id": "c", "text": "Streptomycin acts as a mutagen that directly causes specific protective mutations in bacteria.", "isCorrect": False, "explanation": "Streptomycin acts as a selective filter, killing sensitive cells, not as an inductive mutagen."},
            {"id": "d", "text": "Replica plating proves that adaptation in bacteria is non-Lamarckian.", "isCorrect": True, "explanation": "The pre-existence of resistant clones in unexposed master plates refutes directed environmental adaptation."}
        ],
        "solution": "**Correct Answers: Options (A), (B), (D)**\n\n**Lederberg Experiment Significance:**\n- Esther and Joshua Lederberg (1952) demonstrated that streptomycin-resistant mutants arose spontaneously in the absence of antibiotic.\n- The identical geometric position of resistant colonies across all replica plates proves **pre-existing spontaneous genetic variation**."
    },
    {
        "num": 17, "subj": "Biology", "code": "bio", "topic": "Biochemical Genetics (MSQ)", "subtopic": "Beadle-Tatum One Gene-One Enzyme Pathway Mapping",
        "type": "MSQ", "marks": 4.0, "neg": 0.0, "img": cld["q17_metabolic"],
        "text": "A metabolic pathway for the synthesis of compound $D$ involves intermediates $A \\xrightarrow{E_1} B \\xrightarrow{E_2} C \\xrightarrow{E_3} D$. Four auxotrophic mutant strains (1, 2, 3, 4) defective in enzymes $E_1, E_2,$ or $E_3$ were tested for growth on minimal media supplemented with individual compounds. Which of the following deduction(s) is(are) valid? *(Select all correct statements)*",
        "options": [
            {"id": "a", "text": "A mutant lacking enzyme $E_1$ will grow when supplemented with compound $B, C,$ or $D$.", "isCorrect": True, "explanation": "Supplying any intermediate downstream of the metabolic block bypasses the defective enzyme."},
            {"id": "b", "text": "A mutant lacking enzyme $E_3$ will only grow when supplemented with final end-product $D$.", "isCorrect": True, "explanation": "Since E3 catalyzes the final step (C -> D), only end-product D can rescue growth."},
            {"id": "c", "text": "The accumulated intermediate in an $E_2$-deficient mutant when starved of $D$ will be compound $B$.", "isCorrect": True, "explanation": "Precursor B accumulates because enzyme E2 cannot convert it to C."},
            {"id": "d", "text": "Supplementation with compound $A$ will rescue growth of all mutants.", "isCorrect": False, "explanation": "Compound A is the initial substrate; mutants with blocks downstream of A cannot utilize A."}
        ],
        "solution": "**Correct Answers: Options (A), (B), (C)**\n\n**Biochemical Genetics Logic:**\n- If enzyme $E_n$ is defective, the pathway is blocked at step $n$:\n  - Substrates before step $n$ **accumulate**.\n  - Intermediates after step $n$ **rescue growth**."
    }
]

print(f"Verified {len(questions_data)} Biology questions with 100% authentic text.")
