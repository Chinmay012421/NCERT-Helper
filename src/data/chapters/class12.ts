import { NcertSubjectData } from '../ncertTypes';

export const CLASS_12_SUBJECTS: NcertSubjectData[] = [
  // 1. Physics (Class 12 CBSE Board)
  {
    id: 'c12-physics',
    name: 'Physics',
    color: '#0284c7',
    icon: 'Atom',
    chapters: [
      {
        id: 'c12-phy-ch1',
        chapterNumber: 1,
        title: 'Electric Charges and Fields',
        description: 'Coulomb law, principle of superposition, continuous charge distribution, electric field, electric field lines, electric dipole, electric flux, Gauss law and its applications.',
        keyTopics: ['Coulomb Law in Vector Form F = (1/4πε₀) (q₁q₂/r²) r̂', 'Electric Dipole Field on Axial & Equatorial Lines', 'Gauss Law Flux: Φ = ∮ E · dA = q_encl/ε₀', 'Electric Field due to Infinitely Long Straight Wire & Thin Sheet'],
        sampleQuestions: [
          {
            id: 'c12-p-1',
            questionNumber: 'Exercise 1.1',
            question: 'What is the force between two small charged spheres having charges of 2 × 10⁻⁷ C and 3 × 10⁻⁷ C placed 30 cm apart in air?',
            formulaOrConcept: 'Coulomb Law: F = (1 / 4πε₀) · (|q₁ q₂| / r²), where 1/4πε₀ = 9 × 10⁹ N m² C⁻²',
            steps: [
              'Given: q₁ = 2 × 10⁻⁷ C, q₂ = 3 × 10⁻⁷ C, r = 30 cm = 0.3 m.',
              'F = (9 × 10⁹ × 2 × 10⁻⁷ × 3 × 10⁻⁷) / (0.3)²',
              'F = (54 × 10⁻⁵) / 0.09 = 6 × 10⁻³ N.',
              'Since both charges are positive, the force is repulsive.'
            ],
            finalAnswer: 'The electrostatic force is 6 × 10⁻³ N (Repulsive).',
            examTips: 'Always convert distance to SI meters (0.3 m) before squaring.'
          }
        ]
      },
      {
        id: 'c12-phy-ch2',
        chapterNumber: 2,
        title: 'Electrostatic Potential and Capacitance',
        description: 'Electric potential due to a point charge and dipole, equipotential surfaces, potential energy of a system of charges, capacitance of a parallel plate capacitor with and without dielectric, and combination of capacitors.',
        keyTopics: ['Electric Potential V = (1/4πε₀)(q/r)', 'Equipotential Surfaces & E = -dV/dr', 'Parallel Plate Capacitance C = κε₀A/d', 'Energy Stored in Capacitor U = ½ CV² = Q²/2C'],
        sampleQuestions: []
      },
      {
        id: 'c12-phy-ch3',
        chapterNumber: 3,
        title: 'Current Electricity',
        description: 'Electric current, drift velocity and mobility of electrons, Ohm law, temperature dependence of resistivity, internal resistance of a cell, Kirchhoff rules and Wheatstone bridge.',
        keyTopics: ['Drift Velocity v_d = -eEτ/m and I = n e A v_d', 'Kirchhoff Current Law (KCL) & Voltage Law (KVL)', 'EMF vs Terminal Voltage: V = E - Ir', 'Wheatstone Bridge Balance Condition: P/Q = R/S'],
        sampleQuestions: []
      },
      {
        id: 'c12-phy-ch4',
        chapterNumber: 4,
        title: 'Moving Charges and Magnetism',
        description: 'Biot-Savart law, magnetic field on axis of a circular current loop, Ampere circuital law, magnetic field of a solenoid, force on a moving charge (Lorentz force), and torque on a current loop in magnetic field.',
        keyTopics: ['Biot-Savart Law dB = (μ₀/4π) (I dl × r̂)/r²', 'Magnetic Field on Axis of Circular Loop B = (μ₀ I R²)/2(R² + x²)^(3/2)', 'Ampere Circuital Law ∮ B · dl = μ₀ I_encl', 'Torque on Magnetic Dipole: τ = M × B'],
        sampleQuestions: []
      },
      {
        id: 'c12-phy-ch5',
        chapterNumber: 5,
        title: 'Electromagnetic Induction',
        description: 'Faraday laws of induction, induced EMF and current, Lenz law and conservation of energy, motional electromotive force, self-inductance and mutual inductance.',
        keyTopics: ['Magnetic Flux Φ_B = B · A = BA cosθ', 'Faraday-Lenz Law: ε = -dΦ_B/dt', 'Motional EMF: ε = Bvl', 'Self-Inductance L = NΦ/I and Energy U = ½ LI²'],
        sampleQuestions: []
      },
      {
        id: 'c12-phy-ch6',
        chapterNumber: 6,
        title: 'Alternating Current',
        description: 'AC voltage applied to resistor, inductor and capacitor, series LCR circuit, phasor diagrams, resonance in LCR circuit, quality factor Q, power in AC circuits (power factor), and AC transformer.',
        keyTopics: ['Reactance: X_L = ωL, X_C = 1/ωC', 'Series LCR Impedance: Z = √[R² + (X_L - X_C)²]', 'Resonance Condition: ω₀ = 1/√(LC)', 'Transformer Voltage Ratio: V_s / V_p = N_s / N_p'],
        sampleQuestions: []
      },
      {
        id: 'c12-phy-ch7',
        chapterNumber: 7,
        title: 'Ray Optics and Optical Instruments',
        description: 'Refraction at spherical surfaces, lens maker formula, total internal reflection, prism formula, compound microscope and astronomical telescope magnification powers.',
        keyTopics: ['Total Internal Reflection & Critical Angle: sin C = 1/n', 'Lens Maker Formula: 1/f = (n - 1)(1/R₁ - 1/R₂)', 'Prism Refraction: n = sin[(A + D_m)/2] / sin(A/2)', 'Compound Microscope & Astronomical Telescope Magnification'],
        sampleQuestions: []
      },
      {
        id: 'c12-phy-ch8',
        chapterNumber: 8,
        title: 'Semiconductor Electronics: Materials, Devices & Simple Circuits',
        description: 'Intrinsic and extrinsic semiconductors (p-type and n-type), p-n junction diode forward and reverse bias characteristics, half-wave and full-wave rectifiers.',
        keyTopics: ['Energy Band Theory (Valence, Conduction & Energy Gap Eg)', 'p-n Junction Formation (Depletion Layer & Barrier Potential)', 'Forward & Reverse V-I Characteristics', 'Full-Wave Rectifier Circuit with Center-Tapped Transformer'],
        sampleQuestions: []
      }
    ]
  },

  // 2. Chemistry (Class 12 CBSE Board)
  {
    id: 'c12-chemistry',
    name: 'Chemistry',
    color: '#059669',
    icon: 'FlaskConical',
    chapters: [
      {
        id: 'c12-chem-ch1',
        chapterNumber: 1,
        title: 'Solutions',
        description: 'Types of solutions, Raoult law for volatile solutes, ideal and non-ideal solutions, colligative properties (relative lowering of vapour pressure, elevation of boiling point, depression of freezing point, osmotic pressure), van\'t Hoff factor.',
        keyTopics: ['Henry Law: p = K_H · x', 'Raoult Law: P_total = P°_A x_A + P°_B x_B', 'Colligative Elevation: ΔT_b = i · K_b · m', 'Colligative Depression: ΔT_f = i · K_f · m', 'Osmotic Pressure: π = i · C R T', 'van\'t Hoff Factor i (Association & Dissociation)'],
        sampleQuestions: [
          {
            id: 'c12-c-1',
            questionNumber: 'In-Text Q2',
            question: 'State Raoult law for a solution containing volatile liquids. What are the conditions for an ideal solution?',
            formulaOrConcept: 'Raoult Law: P_A = P°_A · x_A and P_B = P°_B · x_B',
            steps: [
              'Statement: For a solution of volatile liquids, the partial vapour pressure of each component is directly proportional to its mole fraction in the solution.',
              'Conditions for an ideal solution:',
              '1. Follows Raoult law over the entire range of concentrations.',
              '2. Enthalpy of mixing is zero: Δ_mix H = 0.',
              '3. Volume change on mixing is zero: Δ_mix V = 0.',
              '4. Intermolecular attractive forces between A-B are identical to A-A and B-B interactions.'
            ],
            finalAnswer: 'P_i = P°_i · x_i; An ideal solution exhibits Δ_mix H = 0, Δ_mix V = 0, and uniform intermolecular forces.',
            examTips: 'Cite an example of an ideal solution (e.g. n-hexane + n-heptane, bromoethane + chloroethane).'
          }
        ]
      },
      {
        id: 'c12-chem-ch2',
        chapterNumber: 2,
        title: 'Electrochemistry',
        description: 'Galvanic cells, Nernst equation, standard electrode potential, relationship between standard Gibbs energy and equilibrium constant, Kohlrausch law of independent migration of ions, and electrolysis.',
        keyTopics: ['Nernst Equation: E_cell = E°_cell - (0.0591/n) log Q at 298 K', 'Gibbs Free Energy: ΔG° = -n F E°_cell = -2.303 RT log K_c', 'Kohlrausch Law: Λ°_m = ν₊ λ°₊ + ν₋ λ°₋', 'Faraday Laws of Electrolysis: m = Z I t'],
        sampleQuestions: []
      },
      {
        id: 'c12-chem-ch3',
        chapterNumber: 3,
        title: 'Chemical Kinetics',
        description: 'Rate of reaction, factors affecting rate, order and molecularity of a reaction, integrated rate equations for zero and first order reactions, half-life, Arrhenius equation and activation energy.',
        keyTopics: ['Differential & Integrated Rate Laws', 'First-Order Half-Life: t_1/2 = 0.693 / k', 'Arrhenius Equation: k = A e^(-E_a / RT)', 'log(k₂/k₁) = (E_a / 2.303R) [1/T₁ - 1/T₂]'],
        sampleQuestions: []
      },
      {
        id: 'c12-chem-ch4',
        chapterNumber: 4,
        title: 'The d- and f-Block Elements',
        description: 'Transition elements electronic configuration, oxidation states, atomic radii, magnetic properties, catalytic properties, formation of coloured ions and interstitial compounds; potassium dichromate and permanganate; lanthanoid contraction.',
        keyTopics: ['Variable Oxidation States of 3d Series', 'Magnetic Moment: μ = √[n(n+2)] Bohr Magnetons', 'Lanthanoid Contraction & Consequences on 4d/5d Radii', 'Coloured Ions due to d-d Transitions'],
        sampleQuestions: []
      },
      {
        id: 'c12-chem-ch5',
        chapterNumber: 5,
        title: 'Coordination Compounds',
        description: 'Werner theory, ligands and coordination number, IUPAC nomenclature of mononuclear coordination compounds, isomerism (structural and stereoisomerism), valence bond theory, crystal field theory (CFT) in octahedral and tetrahedral complexes.',
        keyTopics: ['IUPAC Naming of Complexes with Oxidation States', 'Geometrical & Optical Isomerism', 'Crystal Field Splitting Δ_o in Octahedral Fields', 'Spectrochemical Series & High Spin / Low Spin Complexes'],
        sampleQuestions: []
      },
      {
        id: 'c12-chem-ch6',
        chapterNumber: 6,
        title: 'Aldehydes, Ketones and Carboxylic Acids',
        description: 'Nomenclature and nature of carbonyl group, methods of preparation, physical properties, nucleophilic addition reactions, acidity of α-hydrogens, aldol condensation, Cannizzaro reaction, Hell-Volhard-Zelinsky (HVZ) reaction.',
        keyTopics: ['Nucleophilic Addition Mechanisms (HCN, NaHSO₃)', 'Aldol & Cross-Aldol Condensation', 'Cannizzaro Reaction (Aldehydes without α-H)', 'Tollens and Fehling Tests for Aldehydes'],
        sampleQuestions: []
      }
    ]
  },

  // 3. Mathematics (Class 12 CBSE Board)
  {
    id: 'c12-math',
    name: 'Mathematics',
    color: '#2563eb',
    icon: 'Calculator',
    chapters: [
      {
        id: 'c12-math-ch1',
        chapterNumber: 1,
        title: 'Relations and Functions',
        description: 'Types of relations: reflexive, symmetric, transitive and equivalence relations, one-one (injective) and onto (surjective) functions, composite functions and invertible functions.',
        keyTopics: ['Equivalence Relations (Reflexive, Symmetric, Transitive)', 'Bijective Functions (Injective & Surjective)', 'Invertible Functions & Inverse Function f⁻¹', 'Binary Operations Properties'],
        sampleQuestions: []
      },
      {
        id: 'c12-math-ch2',
        chapterNumber: 2,
        title: 'Matrices',
        description: 'Order of matrices, operations on matrices (addition, multiplication, transpose), symmetric and skew-symmetric matrices, elementary row operations, and invertible matrices.',
        keyTopics: ['Matrix Multiplication Non-Commutativity (AB ≠ BA)', 'Transpose Properties (AB)ᵀ = Bᵀ Aᵀ', 'Symmetric (Aᵀ = A) & Skew-Symmetric (Aᵀ = -A)', 'A = ½(A + Aᵀ) + ½(A - Aᵀ) Decomposition'],
        sampleQuestions: []
      },
      {
        id: 'c12-math-ch3',
        chapterNumber: 3,
        title: 'Determinants',
        description: 'Determinant of a square matrix up to 3×3, minors and cofactors, adjoint and inverse of a matrix, consistency of system of linear equations, and solving equations by matrix method.',
        keyTopics: ['Evaluation of 3×3 Determinants', 'Adjoint Matrix: adj(A) and A⁻¹ = (1/|A|) adj(A)', 'Area of Triangle using Determinants', 'Solving Linear System AX = B by X = A⁻¹B'],
        sampleQuestions: []
      },
      {
        id: 'c12-math-ch4',
        chapterNumber: 4,
        title: 'Continuity and Differentiability',
        description: 'Continuity of a function at a point, derivative of composite functions (chain rule), implicit differentiation, logarithmic differentiation, derivative of functions in parametric forms, and second order derivatives.',
        keyTopics: ['Continuity Condition: lim(x→c) f(x) = f(c)', 'Chain Rule of Differentiation', 'Logarithmic Differentiation (Functions of form u(x)^v(x))', 'Parametric Derivatives: dy/dx = (dy/dt) / (dx/dt)'],
        sampleQuestions: []
      },
      {
        id: 'c12-math-ch5',
        chapterNumber: 5,
        title: 'Application of Derivatives',
        description: 'Rate of change of quantities, increasing and decreasing functions, tangents and normals, maxima and minima (first derivative test and second derivative test).',
        keyTopics: ['Rate of Change ds/dt, dV/dt', 'Strictly Increasing (f′(x) > 0) & Decreasing (f′(x) < 0)', 'First & Second Derivative Tests for Local Maxima/Minima', 'Applied Word Problems on Optimization'],
        sampleQuestions: []
      },
      {
        id: 'c12-math-ch6',
        chapterNumber: 6,
        title: 'Integrals',
        description: 'Integration as inverse process of differentiation, integration by substitution, integration using partial fractions, integration by parts, fundamental theorem of calculus, and properties of definite integrals.',
        keyTopics: ['Standard Indefinite Integrals', 'Integration by Parts: ∫ u v dx = u ∫ v dx - ∫ [u′ ∫ v dx] dx', 'Definite Integral King Property: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx', 'Even & Odd Functions: ∫₋ₐᵃ f(x) dx'],
        sampleQuestions: []
      },
      {
        id: 'c12-math-ch7',
        chapterNumber: 7,
        title: 'Three Dimensional Geometry',
        description: 'Direction cosines and direction ratios of a line joining two points, Cartesian and vector equation of a line, coplanar and skew lines, shortest distance between two lines.',
        keyTopics: ['Direction Cosines (l² + m² + n² = 1) & Ratios', 'Vector & Cartesian Equation of Line: r = a + λb', 'Shortest Distance between Skew Lines: d = |(a₂ - a₁) · (b₁ × b₂)| / |b₁ × b₂|', 'Angle between Two Lines'],
        sampleQuestions: []
      }
    ]
  },

  // 4. Biology (Class 12 CBSE Board)
  {
    id: 'c12-biology',
    name: 'Biology',
    color: '#16a34a',
    icon: 'Microscope',
    chapters: [
      {
        id: 'c12-bio-ch1',
        chapterNumber: 1,
        title: 'Sexual Reproduction in Flowering Plants',
        description: 'Flower structure, development of male and female gametophytes, pollination (types, agencies and examples), outbreeding devices, pollen-pistil interaction, double fertilization, post-fertilization events (development of endosperm and embryo), and apomixis/polyembryony.',
        keyTopics: ['Microsporogenesis & Pollen Grain Structure', 'Megasporogenesis & 7-Celled 8-Nucleate Embryo Sac', 'Double Fertilization (Syngamy + Triple Fusion)', 'Endosperm Types (Nuclear, Cellular) & Dicot/Monocot Embryo'],
        sampleQuestions: [
          {
            id: 'c12-b-1',
            questionNumber: 'Exercise Q2',
            question: 'What is double fertilization? Why is it unique to angiosperms?',
            formulaOrConcept: 'Syngamy (n + n = 2n Zygote) + Triple Fusion (n + 2n = 3n PEN)',
            steps: [
              'One male gamete (n) fuses with the haploid egg cell (n) to form a diploid zygote (2n). This process is Syngamy.',
              'The second male gamete (n) fuses with the diploid secondary nucleus (2n) formed by two polar nuclei, resulting in a triploid Primary Endosperm Nucleus (3n PEN). This is Triple Fusion.',
              'Because two fusions take place within the same embryo sac, it is called double fertilization.',
              'It ensures that nutritive endosperm tissue develops only when fertilization is successful, conserving reproductive energy.'
            ],
            finalAnswer: 'Double fertilization combines syngamy (giving diploid embryo) and triple fusion (giving triploid endosperm), an evolutionary hallmark unique to angiosperms.',
            examTips: 'Clearly state the ploidy levels: Zygote is 2n, PEN is 3n.'
          }
        ]
      },
      {
        id: 'c12-bio-ch2',
        chapterNumber: 2,
        title: 'Human Reproduction',
        description: 'Male and female reproductive systems, microscopic anatomy of testis and ovary, spermatogenesis and oogenesis, menstrual cycle, fertilization, embryo development up to blastocyst formation, implantation, pregnancy and placenta formation, and parturition/lactation.',
        keyTopics: ['Spermatogenesis vs Oogenesis Timeline', 'Menstrual Cycle Hormonal Regulation (LH Surge & FSH)', 'Fertilization & Cortical Reaction preventing Polyspermy', 'Blastocyst Structure, Trophoblast & Inner Cell Mass'],
        sampleQuestions: []
      },
      {
        id: 'c12-bio-ch3',
        chapterNumber: 3,
        title: 'Principles of Inheritance and Variation',
        description: 'Mendel laws of inheritance, deviations from Mendel (incomplete dominance, co-dominance, multiple alleles), chromosomal theory of inheritance, linkage and recombination, sex-linked inheritance (haemophilia, colour blindness), and Mendelian disorders (sickle cell anaemia, phenylketonuria, thalassemia).',
        keyTopics: ['Incomplete Dominance (Mirabilis jalapa) & Co-dominance (ABO Blood)', 'Morgan Fruit Fly Linkage Experiments', 'Sex-Linked Recessive Traits (Haemophilia, Colour Blindness)', 'Aneuploidy: Down Syndrome (Trisomy 21), Turner (45, XO), Klinefelter (47, XXY)'],
        sampleQuestions: []
      },
      {
        id: 'c12-bio-ch4',
        chapterNumber: 4,
        title: 'Molecular Basis of Inheritance',
        description: 'Structure of DNA and RNA, search for genetic material (Griffith, Avery-MacLeod-McCarty, Hershey-Chase), DNA replication (Meselson-Stahl), transcription, genetic code, translation, regulation of gene expression (lac operon), and Human Genome Project (HGP).',
        keyTopics: ['DNA Double Helix (Watson & Crick, B-DNA)', 'Hershey-Chase Bacteriophage Experiment (³²P and ³⁵S)', 'Meselson-Stahl Semiconservative DNA Replication (¹⁵N)', 'Lac Operon Inducible System in E. coli'],
        sampleQuestions: []
      },
      {
        id: 'c12-bio-ch5',
        chapterNumber: 5,
        title: 'Biotechnology: Principles and Processes',
        description: 'Genetic engineering principles, tools of recombinant DNA technology (restriction enzymes, DNA ligase, vectors pBR322, competent host cells), processes of rDNA technology (isolation of DNA, PCR amplification, insertion into host, bioreactors, and downstream processing).',
        keyTopics: ['Restriction Endonucleases (Palindromic Sequences & Sticky Ends)', 'Cloning Vector pBR322 (ori, ampR, tetR, rop)', 'Polymerase Chain Reaction (Denaturation, Annealing, Extension)', 'Stirred-Tank Bioreactors & Downstream Processing'],
        sampleQuestions: []
      }
    ]
  }
];
