import { NcertSubjectData } from '../ncertTypes';

export const CLASS_11_SUBJECTS: NcertSubjectData[] = [
  // 1. Physics (Senior Secondary)
  {
    id: 'c11-physics',
    name: 'Physics',
    color: '#0284c7',
    icon: 'Atom',
    chapters: [
      {
        id: 'c11-phy-ch1',
        chapterNumber: 1,
        title: 'Units and Measurements',
        description: 'SI base units, dimensional analysis, dimensional formulas, checking correctness of physical equations, and significant figures.',
        keyTopics: ['SI Fundamental & Derived Units', 'Dimensional Formulae & Homogeneity Principle', 'Applications of Dimensional Analysis', 'Errors in Measurement & Significant Digits'],
        sampleQuestions: [
          {
            id: 'c11-p-1',
            questionNumber: 'NCERT Q2',
            question: 'Check the dimensional consistency of the equation: 1/2 mv² = mgh.',
            formulaOrConcept: 'Principle of Homogeneity of Dimensions: [LHS] = [RHS]',
            steps: [
              'LHS = Kinetic Energy = 1/2 mv².',
              'Dimensions of mass [m] = [M], velocity [v] = [L T⁻¹].',
              '[LHS] = [M] [L T⁻¹]² = [M L² T⁻²].',
              'RHS = Potential Energy = mgh. Acceleration due to gravity [g] = [L T⁻²], height [h] = [L].',
              '[RHS] = [M] [L T⁻²] [L] = [M L² T⁻²].',
              'Since [LHS] = [RHS] = [M L² T⁻²], the equation is dimensionally consistent.'
            ],
            finalAnswer: 'Both LHS and RHS reduce to dimensions of Energy [M L² T⁻²]; hence the formula is dimensionally verified.',
            examTips: 'State the Principle of Homogeneity explicitly in your answer for full marks.'
          }
        ]
      },
      {
        id: 'c11-phy-ch2',
        chapterNumber: 2,
        title: 'Motion in a Straight Line',
        description: 'Position, path length and displacement, average velocity, instantaneous speed and acceleration, kinematic equations of motion by calculus, and relative velocity.',
        keyTopics: ['Kinematic Equations (v = u+at, s = ut+½at², v² = u²+2as)', 'Calculus Derivations (v = dx/dt, a = dv/dt)', 'Motion Under Free Fall Gravity', 'Position-Time and Velocity-Time Graphs'],
        sampleQuestions: []
      },
      {
        id: 'c11-phy-ch3',
        chapterNumber: 3,
        title: 'Motion in a Plane',
        description: 'Scalars and vectors, vector addition and resolution, projectile motion (maximum height, time of flight, horizontal range), and uniform circular motion.',
        keyTopics: ['Vector Dot & Cross Product', 'Projectile Maximum Height: H = (u² sin²θ)/2g', 'Horizontal Range: R = (u² sin 2θ)/g', 'Centripetal Acceleration: a_c = v²/r = ω²r'],
        sampleQuestions: []
      },
      {
        id: 'c11-phy-ch4',
        chapterNumber: 4,
        title: 'Laws of Motion',
        description: 'Newton three laws of motion, inertia, momentum, impulse, conservation of linear momentum, equilibrium of a particle, friction, and dynamics of circular motion.',
        keyTopics: ['Newton Second Law F = dp/dt = ma', 'Impulse J = FΔt = Δp', 'Static, Limiting & Kinetic Friction', 'Banking of Curved Roads: v_max = √[rg(μ + tanθ)/(1 - μ tanθ)]'],
        sampleQuestions: []
      },
      {
        id: 'c11-phy-ch5',
        chapterNumber: 5,
        title: 'Work, Energy and Power',
        description: 'Work-energy theorem, kinetic and potential energy of a spring, conservative and non-conservative forces, conservation of mechanical energy, and elastic/inelastic collisions.',
        keyTopics: ['Work Done W = F · d = Fd cosθ', 'Work-Energy Theorem: W_net = ΔK', 'Potential Energy of Spring: U = ½ kx²', '1D Elastic Collision Velocity Equations'],
        sampleQuestions: []
      },
      {
        id: 'c11-phy-ch6',
        chapterNumber: 6,
        title: 'System of Particles and Rotational Motion',
        description: 'Centre of mass, angular velocity, torque, angular momentum, moment of inertia, radius of gyration, and rolling motion.',
        keyTopics: ['Centre of Mass of 2-Particle & Rigid Bodies', 'Torque τ = r × F and Angular Momentum L = r × p', 'Moment of Inertia I = Σ m_i r_i²', 'Conservation of Angular Momentum (I₁ω₁ = I₂ω₂)'],
        sampleQuestions: []
      },
      {
        id: 'c11-phy-ch7',
        chapterNumber: 7,
        title: 'Gravitation',
        description: 'Universal law of gravitation, Kepler laws of planetary motion, acceleration due to gravity variation with altitude and depth, escape velocity, and satellite orbital velocity.',
        keyTopics: ['Newton Gravitational Law F = G(m₁m₂)/r²', 'Variation of g with Altitude: g_h ≈ g(1 - 2h/R)', 'Escape Velocity: v_e = √(2gR) ≈ 11.2 km/s', 'Orbital Velocity: v_o = √(gR)'],
        sampleQuestions: []
      },
      {
        id: 'c11-phy-ch8',
        chapterNumber: 8,
        title: 'Thermodynamics',
        description: 'Thermal equilibrium, zeroth law of thermodynamics, first law of thermodynamics (ΔQ = ΔU + ΔW), isothermal and adiabatic processes, and second law of thermodynamics.',
        keyTopics: ['First Law of Thermodynamics ΔQ = ΔU + W', 'Isothermal Process (PV = const, W = nRT ln(V₂/V₁))', 'Adiabatic Process (PV^γ = const, W = (P₁V₁ - P₂V₂)/(γ - 1))', 'Molar Specific Heats: C_p - C_v = R'],
        sampleQuestions: []
      }
    ]
  },

  // 2. Chemistry (Senior Secondary)
  {
    id: 'c11-chemistry',
    name: 'Chemistry',
    color: '#059669',
    icon: 'FlaskConical',
    chapters: [
      {
        id: 'c11-chem-ch1',
        chapterNumber: 1,
        title: 'Some Basic Concepts of Chemistry',
        description: 'Mole concept, molar mass, percentage composition, empirical and molecular formula, stoichiometry and stoichiometric calculations, limiting reagent, and concentration units (molarity, molality, mole fraction).',
        keyTopics: ['Mole Concept (1 mol = 6.022 × 10²³ entities)', 'Empirical vs Molecular Formula Determination', 'Limiting Reagent Stoichiometry', 'Molarity (M) vs Molality (m)'],
        sampleQuestions: [
          {
            id: 'c11-c-1',
            questionNumber: 'Exercise Q3',
            question: 'Calculate the mass of sodium acetate (CH₃COONa) required to make 500 mL of 0.375 molar aqueous solution. Molar mass = 82.0245 g/mol.',
            formulaOrConcept: 'Molarity M = (Mass of solute / Molar mass) × (1000 / Volume in mL)',
            steps: [
              'Given: Molarity M = 0.375 mol/L, Volume V = 500 mL = 0.5 L, Molar mass = 82.0245 g/mol.',
              'Moles of solute needed = M × V(L) = 0.375 × 0.5 = 0.1875 mol.',
              'Mass of solute = Moles × Molar Mass = 0.1875 × 82.0245 = 15.379 g.'
            ],
            finalAnswer: 'Mass of sodium acetate required is 15.38 g.',
            examTips: 'State the molarity definition formula clearly before plugging in given numerical values.'
          }
        ]
      },
      {
        id: 'c11-chem-ch2',
        chapterNumber: 2,
        title: 'Structure of Atom',
        description: 'Bohr model of hydrogen atom, de Broglie relation, Heisenberg uncertainty principle, quantum numbers, shapes of s, p and d orbitals, Pauli exclusion principle, and Hund rule of maximum multiplicity.',
        keyTopics: ['de Broglie Wavelength λ = h/mv', 'Heisenberg Uncertainty Principle Δx · Δp ≥ h/4π', 'Four Quantum Numbers (n, l, m, s)', 'Aufbau Principle, Pauli & Hund Rules'],
        sampleQuestions: []
      },
      {
        id: 'c11-chem-ch3',
        chapterNumber: 3,
        title: 'Chemical Bonding and Molecular Structure',
        description: 'Ionic bond, covalent bond, Lewis structures, VSEPR theory, hybridization (sp, sp², sp³, dsp²), valence bond theory, and molecular orbital theory (MOT) of homonuclear diatomic molecules.',
        keyTopics: ['VSEPR Molecular Geometry Predictions', 'Hybridisation Types (sp, sp², sp³)', 'Molecular Orbital Theory & Bond Order', 'Hydrogen Bonding (Inter & Intra)'],
        sampleQuestions: []
      },
      {
        id: 'c11-chem-ch4',
        chapterNumber: 4,
        title: 'Chemical Thermodynamics',
        description: 'State functions, internal energy, enthalpy, heat capacity, Hess law of constant heat summation, entropy (S), Gibbs free energy (G), and spontaneity of processes (ΔG = ΔH - TΔS).',
        keyTopics: ['First Law of Thermodynamics (ΔU = q + w)', 'Enthalpy of Reaction & Hess Law', 'Entropy (S) & Second Law', 'Gibbs Helmholtz Spontaneity Criterion (ΔG < 0)'],
        sampleQuestions: []
      },
      {
        id: 'c11-chem-ch5',
        chapterNumber: 5,
        title: 'Organic Chemistry – Some Basic Principles and Techniques',
        description: 'IUPAC nomenclature of organic compounds, inductive effect, electromeric effect, resonance, hyperconjugation, reactive intermediates (carbocations, carbanions, free radicals), and purification methods.',
        keyTopics: ['IUPAC Nomenclature Rules', 'Inductive (+I, -I) & Resonance (+R, -R) Effects', 'Hyperconjugation & Carbocation Stability', 'Homolytic vs Heterolytic Cleavage'],
        sampleQuestions: []
      }
    ]
  },

  // 3. Mathematics (Senior Secondary)
  {
    id: 'c11-math',
    name: 'Mathematics',
    color: '#2563eb',
    icon: 'Calculator',
    chapters: [
      {
        id: 'c11-math-ch1',
        chapterNumber: 1,
        title: 'Sets',
        description: 'Sets and their representations, empty set, finite and infinite sets, subsets, power set, universal set, Venn diagrams, union and intersection of sets, and difference of sets.',
        keyTopics: ['Roster & Set-Builder Notation', 'Power Set P(A) with 2ⁿ elements', 'Venn Diagram Operations (A ∪ B, A ∩ B, A - B)', 'De Morgan Laws: (A ∪ B)′ = A′ ∩ B′'],
        sampleQuestions: []
      },
      {
        id: 'c11-math-ch2',
        chapterNumber: 2,
        title: 'Relations and Functions',
        description: 'Cartesian product of sets, relations, domain, co-domain and range of a relation, functions as a special kind of relation, domain and range of real functions.',
        keyTopics: ['Cartesian Product A × B', 'Domain, Co-domain and Range', 'Types of Functions (Identity, Polynomial, Rational, Modulus, Signum)', 'Greatest Integer Function [x]'],
        sampleQuestions: []
      },
      {
        id: 'c11-math-ch3',
        chapterNumber: 3,
        title: 'Trigonometric Functions',
        description: 'Radian measure of angles, trigonometric functions and their graphs, compound angle identities, multiple angle formulas (sin 2x, cos 2x, tan 2x), and product-to-sum transformations.',
        keyTopics: ['Radian vs Degree (π rad = 180°)', 'Sign of Trig Functions in Quadrants (ASTC Rule)', 'Compound Angles: cos(A±B), sin(A±B)', 'Double & Half Angle Identities'],
        sampleQuestions: []
      },
      {
        id: 'c11-math-ch4',
        chapterNumber: 4,
        title: 'Limits and Derivatives',
        description: 'Intuitive idea of limit, standard limits lim(x→a) (xⁿ - aⁿ)/(x - a), lim(x→0) sin(x)/x = 1, definition of derivative, derivative by first principle, and product & quotient rules.',
        keyTopics: ['Left-Hand & Right-Hand Limits', 'Standard Limit: lim(x→0) sin x / x = 1', 'Derivative by First Principle: f′(x) = lim(h→0) [f(x+h) - f(x)]/h', 'Product & Quotient Differentiation Rules'],
        sampleQuestions: []
      }
    ]
  },

  // 4. Biology (Senior Secondary)
  {
    id: 'c11-biology',
    name: 'Biology',
    color: '#16a34a',
    icon: 'Microscope',
    chapters: [
      {
        id: 'c11-bio-ch1',
        chapterNumber: 1,
        title: 'The Living World',
        description: 'What is living?, biodiversity, need for classification, three domains of life, taxonomy and systematics, binomial nomenclature (Linnaeus), and taxonomic categories.',
        keyTopics: ['Defining Properties of Life (Metabolism, Cellularity)', 'Binomial Nomenclature Rules (Carolus Linnaeus)', 'Taxonomic Hierarchy (Domain to Species)', 'Herbarium, Botanical Gardens & Zoological Parks'],
        sampleQuestions: []
      },
      {
        id: 'c11-bio-ch2',
        chapterNumber: 2,
        title: 'Biological Classification',
        description: 'Five kingdom classification (Whittaker): Monera, Protista, Fungi, Plantae, and Animalia; lichens, viruses, viroids, and prions.',
        keyTopics: ['Whittaker 5-Kingdom Classification System', 'Archaebacteria vs Eubacteria', 'Protista: Chrysophytes, Dinoflagellates, Euglenoids', 'Fungal Classes (Phyco, Asco, Basidio, Deuteromycetes)'],
        sampleQuestions: []
      },
      {
        id: 'c11-bio-ch3',
        chapterNumber: 3,
        title: 'Cell: The Unit of Life',
        description: 'Cell theory (Schleiden, Schwann, Virchow), prokaryotic vs eukaryotic cells, plant and animal cells, fluid mosaic model of cell membrane (Singer and Nicolson), and organelle functions.',
        keyTopics: ['Fluid Mosaic Membrane Model (Singer & Nicolson)', 'Endomembrane System (ER, Golgi, Lysosomes, Vacuoles)', 'Mitochondria & Plastid Semiautonomous Nature', 'Eukaryotic Ribosomes (80S) & Centrosome'],
        sampleQuestions: []
      }
    ]
  }
];
