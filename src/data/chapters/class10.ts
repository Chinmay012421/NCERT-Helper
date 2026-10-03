import { NcertSubjectData } from '../ncertTypes';

export const CLASS_10_SUBJECTS: NcertSubjectData[] = [
  // 1. Science (All 13 Rationalized NCERT Chapters)
  {
    id: 'c10-science',
    name: 'Science (PCB)',
    color: '#059669',
    icon: 'FlaskConical',
    chapters: [
      {
        id: 'c10-sci-ch1',
        chapterNumber: 1,
        title: 'Chemical Reactions and Equations',
        description: 'Writing and balancing chemical equations, types of reactions (combination, decomposition, displacement, double displacement, redox), corrosion and rancidity.',
        keyTopics: ['Balancing Chemical Equations', 'Exothermic & Endothermic Reactions', 'Redox (Oxidation & Reduction)', 'Corrosion & Rancidity'],
        sampleQuestions: [
          {
            id: 'c10-s-1',
            questionNumber: 'In-Text Q1',
            question: 'Why should a magnesium ribbon be cleaned before burning in air?',
            formulaOrConcept: '2Mg + O₂ → 2MgO (Surface Oxidation)',
            steps: [
              'Magnesium is a reactive metal that reacts slowly with atmospheric oxygen at room temperature.',
              'A thin protective layer of basic magnesium oxide (MgO) is formed on its surface.',
              'This layer prevents further direct contact of magnesium metal with oxygen.',
              'Cleaning with sandpaper removes this oxide film so the metal catches fire easily.'
            ],
            finalAnswer: 'Magnesium ribbon is cleaned with sandpaper to remove the protective layer of magnesium oxide from its surface, allowing it to ignite smoothly.',
            examTips: 'Mention both the compound formed (magnesium oxide) and why sandpaper is used for full 2 marks.'
          },
          {
            id: 'c10-s-2',
            questionNumber: 'Exercise Q7',
            question: 'Write a balanced chemical equation with state symbols for the reaction between barium chloride and sodium sulphate.',
            formulaOrConcept: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)',
            steps: [
              'Reactants: Barium chloride aqueous BaCl₂(aq) and Sodium sulphate aqueous Na₂SO₄(aq).',
              'Reaction type: Double displacement and precipitation reaction.',
              'White precipitate formed: Barium sulphate BaSO₄(s).',
              'Soluble salt: Sodium chloride 2NaCl(aq).'
            ],
            finalAnswer: 'BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)',
            examTips: 'Always include the precipitate downward arrow (↓) or state symbol (s) to get the complete mark.'
          }
        ]
      },
      {
        id: 'c10-sci-ch2',
        chapterNumber: 2,
        title: 'Acids, Bases and Salts',
        description: 'Indicators, chemical properties of acids and bases, pH scale in everyday life, preparation and uses of Bleaching Powder, Baking Soda, Washing Soda, and Plaster of Paris.',
        keyTopics: ['Olfactory & Synthetic Indicators', 'pH Scale Applications', 'Chlor-Alkali Process (NaOH, Cl₂, H₂)', 'Plaster of Paris & Water of Crystallisation'],
        sampleQuestions: [
          {
            id: 'c10-s-3',
            questionNumber: 'In-Text Q2',
            question: 'Why does dry HCl gas not change the colour of the dry litmus paper?',
            formulaOrConcept: 'Arrhenius Concept: Ionisation requires aqueous medium (H⁺ + H₂O → H₃O⁺)',
            steps: [
              'Litmus paper changes color only in the presence of hydrogen ions (H⁺) or hydronium ions (H₃O⁺).',
              'Dry HCl gas does not ionize in the absence of moisture/water.',
              'Since no H⁺ ions are produced, no acidic behavior is exhibited on dry litmus paper.'
            ],
            finalAnswer: 'Dry HCl does not furnish H⁺ ions without water; thus, dry litmus paper color remains unaffected.',
            examTips: 'Specify that separation of H⁺ ions from HCl molecules occurs only in aqueous conditions.'
          }
        ]
      },
      {
        id: 'c10-sci-ch3',
        chapterNumber: 3,
        title: 'Metals and Non-Metals',
        description: 'Physical & chemical properties of metals and non-metals, reactivity series, ionic bonding, metallurgy (roasting and calcination), refining and corrosion prevention.',
        keyTopics: ['Reactivity Series of Metals', 'Electron Dot Ionic Bond Formation', 'Roasting vs Calcination', 'Thermite Process & Electrolytic Refining'],
        sampleQuestions: [
          {
            id: 'c10-s-4',
            questionNumber: 'Exercise Q3',
            question: 'Which gas is usually liberated when an acid reacts with a metal? Illustrate with an example and explain the test.',
            formulaOrConcept: 'Metal + Dilute Acid → Metal Salt + H₂↑',
            steps: [
              'Hydrogen gas (H₂) is liberated during metal-acid reactions.',
              'Example: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑',
              'Test: Bring a burning candle near the mouth of the test tube.',
              'Observation: The gas burns with a characteristic pop sound.'
            ],
            finalAnswer: 'Hydrogen gas (H₂) is evolved, which burns with a distinct "pop" sound when tested with a flame.',
            examTips: 'Write the balanced chemical equation alongside the pop-sound observation.'
          }
        ]
      },
      {
        id: 'c10-sci-ch4',
        chapterNumber: 4,
        title: 'Carbon and its Compounds',
        description: 'Covalent bonding in carbon, versatile nature (catenation and tetravalency), homologous series, nomenclature, combustion, oxidation, addition and substitution reactions, ethanol, ethanoic acid, and soaps/detergents.',
        keyTopics: ['Tetravalency & Catenation', 'Homologous Series & Functional Groups', 'Esterification & Saponification', 'Micelle Mechanism in Soaps'],
        sampleQuestions: [
          {
            id: 'c10-s-5',
            questionNumber: 'In-Text Q4',
            question: 'What is a homologous series? State two main characteristics.',
            formulaOrConcept: 'Series differing by -CH₂- unit and 14 u molecular mass',
            steps: [
              'A homologous series is a family of organic compounds having the same functional group and similar chemical properties.',
              'Successive members differ by a -CH₂- unit.',
              'Successive members differ by 14 atomic mass units (14 u) in molecular mass.',
              'They display a regular gradation in physical properties (boiling point, melting point).'
            ],
            finalAnswer: 'A homologous series shares a general formula and functional group, with adjacent members differing by -CH₂- and 14 u.',
            examTips: 'Give an example such as alkanes (CH₄, C₂H₆, C₃H₈) to substantiate the definition.'
          }
        ]
      },
      {
        id: 'c10-sci-ch5',
        chapterNumber: 5,
        title: 'Life Processes',
        description: 'Nutrition (autotrophic and heterotrophic), human digestive system, respiration (aerobic and anaerobic), human circulatory system and heart, transportation in plants (xylem and phloem), and excretion (nephron structure).',
        keyTopics: ['Stomatal Mechanism & Photosynthesis', 'Human Heart Double Circulation', 'Xylem vs Phloem Transport', 'Nephron Filtration & Urine Formation'],
        sampleQuestions: [
          {
            id: 'c10-s-6',
            questionNumber: 'Exercise Q4',
            question: 'What is the role of saliva in the digestion of food?',
            formulaOrConcept: 'Salivary Amylase: Starch → Maltose (Disaccharide)',
            steps: [
              'Saliva moistens and lubricates the food into a bolus for smooth swallowing.',
              'It contains the enzyme salivary amylase (ptyalin).',
              'Salivary amylase breaks down complex starch molecules into simpler disaccharide sugars (maltose) at neutral/mildly acidic pH.'
            ],
            finalAnswer: 'Saliva contains salivary amylase which hydrolyses starch into maltose, and mucus that eases passage down the oesophagus.',
            examTips: 'Name the specific enzyme (salivary amylase) and its substrate (starch) explicitly.'
          }
        ]
      },
      {
        id: 'c10-sci-ch6',
        chapterNumber: 6,
        title: 'Control and Coordination',
        description: 'Neuron structure, synapse, reflex arc, human brain (forebrain, midbrain, hindbrain), plant hormones (auxin, gibberellin, cytokinin, abscisic acid), tropic movements, and endocrine glands.',
        keyTopics: ['Neuron & Synapse Chemical Transmission', 'Reflex Arc Path', 'Human Brain Anatomy & Functions', 'Plant Phytohormones & Tropic Movements'],
        sampleQuestions: []
      },
      {
        id: 'c10-sci-ch7',
        chapterNumber: 7,
        title: 'How do Organisms Reproduce?',
        description: 'Asexual reproduction (binary fission, fragmentation, regeneration, budding, vegetative propagation, spore formation), sexual reproduction in flowering plants, human male & female reproductive systems, menstruation, and contraception methods.',
        keyTopics: ['Double Fertilization in Angiosperms', 'Male & Female Reproductive Anatomy', 'Menstrual Cycle Physiology', 'Contraceptive Barrier, Chemical & Surgical Methods'],
        sampleQuestions: []
      },
      {
        id: 'c10-sci-ch8',
        chapterNumber: 8,
        title: 'Heredity',
        description: 'Mendelian inheritance (monohybrid and dihybrid cross), dominant and recessive traits, law of segregation, law of independent assortment, and sex determination in human beings (XX and XY chromosomes).',
        keyTopics: ['Monohybrid Cross (3:1 Phenotypic Ratio)', 'Dihybrid Cross (9:3:3:1 Ratio)', 'Sex Determination in Humans (XX / XY)', 'Genes & Chromosomal Inheritance'],
        sampleQuestions: []
      },
      {
        id: 'c10-sci-ch9',
        chapterNumber: 9,
        title: 'Light – Reflection and Refraction',
        description: 'Spherical mirrors (concave and convex), mirror formula and magnification, refraction of light, Snell law, refractive index, spherical lenses, lens formula, and power of a lens.',
        keyTopics: ['Mirror Formula: 1/f = 1/v + 1/u', 'Lens Formula: 1/f = 1/v - 1/u', 'Snell Law: n = sin(i)/sin(r)', 'Power of Lens: P = 1/f(m) Dioptres'],
        sampleQuestions: [
          {
            id: 'c10-s-7',
            questionNumber: 'Exercise Q10',
            question: 'An object 5 cm in length is held 25 cm away from a converging lens of focal length 10 cm. Find the position, size and nature of the image formed.',
            formulaOrConcept: 'Lens Formula: 1/f = 1/v - 1/u; Magnification: m = v/u = h₂/h₁',
            steps: [
              'Given: Object height h₁ = +5 cm, object distance u = -25 cm, focal length f = +10 cm (convex lens).',
              'Using lens formula: 1/v - 1/u = 1/f => 1/v = 1/10 + 1/(-25) = (5 - 2)/50 = 3/50.',
              'Image distance v = +50/3 cm ≈ +16.67 cm (formed on the other side of lens).',
              'Magnification m = v/u = (50/3) / (-25) = -2/3.',
              'Image height h₂ = m × h₁ = (-2/3) × 5 = -10/3 cm ≈ -3.33 cm.'
            ],
            finalAnswer: 'Image is formed at 16.67 cm behind the lens; it is real, inverted, and diminished (height = -3.33 cm).',
            examTips: 'Follow Cartesian sign convention strictly: u is always negative; convex lens focal length is positive.'
          }
        ]
      },
      {
        id: 'c10-sci-ch10',
        chapterNumber: 10,
        title: 'The Human Eye and the Colourful World',
        description: 'Structure of the human eye, accommodation, defects of vision (myopia, hypermetropia, presbyopia) and corrections, refraction through glass prism, dispersion of white light, atmospheric refraction, and scattering (Tyndall effect).',
        keyTopics: ['Myopia & Hypermetropia Ray Corrections', 'Prism Dispersion & Rainbow Formation', 'Atmospheric Refraction (Twinkling of Stars)', 'Rayleigh Scattering (Blue Sky & Red Sunset)'],
        sampleQuestions: []
      },
      {
        id: 'c10-sci-ch11',
        chapterNumber: 11,
        title: 'Electricity',
        description: 'Electric current and circuit, electric potential and potential difference, Ohm law, resistance, factors affecting resistance, resistivity, series and parallel resistor combinations, Joule heating effect, and electric power.',
        keyTopics: ['Ohm Law: V = IR', 'Resistivity: R = ρ(l/A)', 'Series vs Parallel Equivalent Resistance', 'Joule Heating Law: H = I²Rt', 'Electric Power: P = VI = I²R = V²/R'],
        sampleQuestions: [
          {
            id: 'c10-s-8',
            questionNumber: 'In-Text Q3',
            question: 'How can three resistors of resistances 2 Ω, 3 Ω, and 6 Ω be connected to give a total resistance of (a) 4 Ω, (b) 1 Ω?',
            formulaOrConcept: 'Series: R_s = R₁ + R₂; Parallel: 1/R_p = 1/R₁ + 1/R₂',
            steps: [
              '(a) To get 4 Ω: Connect 3 Ω and 6 Ω in parallel, then in series with 2 Ω. R_parallel = (3 × 6)/(3 + 6) = 18/9 = 2 Ω. Total R = 2 Ω + 2 Ω = 4 Ω.',
              '(b) To get 1 Ω: Connect all three in parallel. 1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1. Therefore R_eq = 1 Ω.'
            ],
            finalAnswer: '(a) Connect 3 Ω and 6 Ω in parallel and series with 2 Ω for 4 Ω. (b) Connect all 3 resistors in parallel for 1 Ω.',
            examTips: 'Draw the circuit diagram sketch alongside the formula calculation.'
          }
        ]
      },
      {
        id: 'c10-sci-ch12',
        chapterNumber: 12,
        title: 'Magnetic Effects of Electric Current',
        description: 'Magnetic field and field lines, Oersted experiment, field due to current-carrying straight wire, circular loop and solenoid, Fleming left-hand rule, electric motor, electromagnetic induction, Fleming right-hand rule, and domestic electric circuits.',
        keyTopics: ['Right-Hand Thumb Rule', 'Magnetic Field in a Solenoid', 'Fleming Left-Hand Rule (Force on Conductor)', 'Domestic Wiring & Safety (Earthing, Fuse, Short Circuit)'],
        sampleQuestions: []
      },
      {
        id: 'c10-sci-ch13',
        chapterNumber: 13,
        title: 'Our Environment',
        description: 'Ecosystem components (biotic and abiotic), food chains and food webs, 10 percent law of energy transfer, biological magnification, ozone layer depletion (CFCs), and solid waste management.',
        keyTopics: ['Trophic Levels & 10% Energy Transfer Law', 'Biomagnification Mechanisms', 'Ozone Layer Depletion & UV Radiation', 'Biodegradable vs Non-Biodegradable Waste'],
        sampleQuestions: []
      }
    ]
  },

  // 2. Mathematics (All 14 Rationalized NCERT Chapters)
  {
    id: 'c10-math',
    name: 'Mathematics',
    color: '#2563eb',
    icon: 'Calculator',
    chapters: [
      {
        id: 'c10-math-ch1',
        chapterNumber: 1,
        title: 'Real Numbers',
        description: 'Fundamental Theorem of Arithmetic, prime factorisation, proving irrationality of √2, √3, √5, and HCF × LCM = a × b.',
        keyTopics: ['Fundamental Theorem of Arithmetic', 'HCF and LCM by Prime Factorisation', 'Proof of Irrationality (Proof by Contradiction)', 'Decimal Representation Properties'],
        sampleQuestions: [
          {
            id: 'c10-m-1',
            questionNumber: 'Exercise 1.2 Q1',
            question: 'Prove that √5 is irrational.',
            formulaOrConcept: 'Method of Contradiction: If p divides a², p divides a (where p is prime)',
            steps: [
              'Assume to the contrary that √5 is rational. Then √5 = a/b where a and b are co-prime integers and b ≠ 0.',
              'Squaring both sides: 5 = a²/b² => a² = 5b².',
              'Therefore, 5 divides a². By Theorem, 5 divides a. So let a = 5c for some integer c.',
              'Substituting: (5c)² = 5b² => 25c² = 5b² => b² = 5c².',
              'Thus 5 divides b², which implies 5 divides b.',
              'Therefore a and b have at least 5 as a common factor, contradicting that a and b are co-prime.'
            ],
            finalAnswer: 'Hence, our assumption was incorrect, and √5 is proved to be irrational.',
            examTips: 'This standard proof is worth 3 marks in CBSE board exams. Always state that a and b are co-prime.'
          }
        ]
      },
      {
        id: 'c10-math-ch2',
        chapterNumber: 2,
        title: 'Polynomials',
        description: 'Geometrical meaning of zeroes of a polynomial, relationship between zeroes and coefficients of quadratic and cubic polynomials.',
        keyTopics: ['Zeroes & X-axis Intersections', 'Sum of Zeroes: α + β = -b/a', 'Product of Zeroes: αβ = c/a', 'Forming Quadratic Polynomial: x² - (α+β)x + αβ'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch3',
        chapterNumber: 3,
        title: 'Pair of Linear Equations in Two Variables',
        description: 'Graphical method of solution, consistency/inconsistency conditions, algebraic methods: substitution method and elimination method.',
        keyTopics: ['Consistent vs Inconsistent Conditions (a₁/a₂ vs b₁/b₂ vs c₁/c₂)', 'Substitution Method', 'Elimination Method', 'Word Problems on Ages, Speed & Fractions'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch4',
        chapterNumber: 4,
        title: 'Quadratic Equations',
        description: 'Standard form ax² + bx + c = 0, solution by factorisation, solution by quadratic formula, nature of roots based on discriminant D = b² - 4ac.',
        keyTopics: ['Discriminant D = b² - 4ac', 'Real & Distinct Roots (D > 0)', 'Real & Equal Roots (D = 0)', 'Quadratic Formula: x = (-b ± √D) / 2a'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch5',
        chapterNumber: 5,
        title: 'Arithmetic Progressions',
        description: 'Definition of an AP, nth term an = a + (n-1)d, sum of first n terms Sn = n/2[2a + (n-1)d], and real-life applications.',
        keyTopics: ['Common Difference d = a_(k+1) - a_k', 'General Term: a_n = a + (n - 1)d', 'Sum Formula: S_n = n/2(a + l)', 'Real-Life Word Problems on AP'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch6',
        chapterNumber: 6,
        title: 'Triangles',
        description: 'Similar figures, Basic Proportionality Theorem (Thales Theorem) and its converse, criteria for similarity of triangles (AAA, SSS, SAS).',
        keyTopics: ['Basic Proportionality Theorem (BPT)', 'Converse of BPT', 'AAA, SSS, SAS Similarity Criteria', 'Properties of Similar Triangles'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch7',
        chapterNumber: 7,
        title: 'Coordinate Geometry',
        description: 'Distance formula between two points, section formula (internal division), and coordinates of the midpoint of a line segment.',
        keyTopics: ['Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]', 'Section Formula: [ (m₁x₂ + m₂x₁)/(m₁+m₂), (m₁y₂ + m₂y₁)/(m₁+m₂) ]', 'Midpoint Formula: [(x₁+x₂)/2, (y₁+y₂)/2]', 'Collinearity of Three Points'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch8',
        chapterNumber: 8,
        title: 'Introduction to Trigonometry',
        description: 'Trigonometric ratios of an acute angle of a right-angled triangle, values of ratios for 0°, 30°, 45°, 60°, and 90°, and fundamental trigonometric identity sin²θ + cos²θ = 1.',
        keyTopics: ['Trigonometric Ratios (sin, cos, tan, cosec, sec, cot)', 'Specific Angle Table (0° to 90°)', 'Identity: sin²θ + cos²θ = 1', 'Identity: 1 + tan²θ = sec²θ'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch9',
        chapterNumber: 9,
        title: 'Some Applications of Trigonometry',
        description: 'Heights and distances, line of sight, angle of elevation, angle of depression, solving problems involving two right-angled triangles.',
        keyTopics: ['Line of Sight & Observer Position', 'Angle of Elevation vs Depression', 'Single & Double Triangle Height Problems', 'Applications to Towers, Buildings & Ships'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch10',
        chapterNumber: 10,
        title: 'Circles',
        description: 'Tangent to a circle at any point is perpendicular to the radius, lengths of tangents drawn from an external point to a circle are equal.',
        keyTopics: ['Tangent Perpendicular to Radius Theorem', 'Equal Lengths of External Tangents Theorem', 'Quadrilateral Circumscribing a Circle', 'Concentric Circles & Chord Tangency'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch11',
        chapterNumber: 11,
        title: 'Areas Related to Circles',
        description: 'Perimeter and area of a circle, area of sector of angle θ, length of an arc of a sector, area of segment of a circle.',
        keyTopics: ['Area of Sector: (θ/360) × πr²', 'Arc Length: (θ/360) × 2πr', 'Area of Minor & Major Segments', 'Combination of Plane Figures'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch12',
        chapterNumber: 12,
        title: 'Surface Areas and Volumes',
        description: 'Surface areas and volumes of combinations of solids: cubes, cuboids, spheres, hemispheres, right circular cylinders and cones.',
        keyTopics: ['Total & Curved Surface Area of Solids', 'Volume of Combination of Solids', 'Melting & Recasting Problems', 'Hollow Shapes & Composite Objects'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch13',
        chapterNumber: 13,
        title: 'Statistics',
        description: 'Mean of grouped data (direct method and assumed mean method), mode of grouped data, and median of grouped data.',
        keyTopics: ['Mean by Direct & Assumed Mean Methods', 'Mode Formula: l + [(f₁ - f₀)/(2f₁ - f₀ - f₂)] × h', 'Median Formula: l + [((n/2) - cf)/f] × h', 'Empirical Relationship: Mode = 3 Median - 2 Mean'],
        sampleQuestions: []
      },
      {
        id: 'c10-math-ch14',
        chapterNumber: 14,
        title: 'Probability',
        description: 'Classical definition of probability, simple problems on single events, cards, coins, and dice experiments.',
        keyTopics: ['Theoretical Probability: P(E) = n(E)/n(S)', 'Elementary Events & Sum of Probabilities = 1', 'Deck of 52 Playing Cards Breakdown', 'Impossible (0) & Sure (1) Events'],
        sampleQuestions: []
      }
    ]
  },

  // 3. Social Science
  {
    id: 'c10-sst',
    name: 'Social Science',
    color: '#d97706',
    icon: 'Globe',
    chapters: [
      {
        id: 'c10-sst-ch1',
        chapterNumber: 1,
        title: 'The Rise of Nationalism in Europe',
        description: 'The French Revolution and the idea of nation, making of nationalism in Europe, unification of Germany and Italy, and visualising the nation.',
        keyTopics: ['Frederic Sorrieu Utopian Vision', 'Napoleonic Civil Code of 1804', 'Unification of Germany (Bismarck)', 'Unification of Italy (Cavour, Mazzini, Garibaldi)'],
        sampleQuestions: []
      },
      {
        id: 'c10-sst-ch2',
        chapterNumber: 2,
        title: 'Nationalism in India',
        description: 'First World War, Khilafat and Non-Cooperation Movement, Salt March and Civil Disobedience Movement, and the sense of collective belonging.',
        keyTopics: ['Rowlatt Act & Jallianwala Bagh Massacre', 'Non-Cooperation Movement in Towns & Countryside', 'Dandi March & Civil Disobedience', 'Poona Pact (Gandhi & Ambedkar)'],
        sampleQuestions: []
      },
      {
        id: 'c10-sst-ch3',
        chapterNumber: 3,
        title: 'Resources and Development',
        description: 'Classification of resources, sustainable development, resource planning in India, land resources, land degradation and conservation measures, and soil classification.',
        keyTopics: ['Agenda 21 & Rio Summit 1992', 'Resource Planning Stages in India', 'Land Degradation Causes & Conservation', 'Major Soil Types of India'],
        sampleQuestions: []
      },
      {
        id: 'c10-sst-ch4',
        chapterNumber: 4,
        title: 'Power Sharing (Political Science)',
        description: 'Case studies of Belgium and Sri Lanka, majoritarianism in Sri Lanka, accommodation in Belgium, and forms of power sharing in modern democracies.',
        keyTopics: ['Ethnic Composition of Belgium & Sri Lanka', 'Majoritarianism Policies in Sri Lanka', 'Belgian Model of Accommodation', 'Horizontal vs Vertical Power Sharing'],
        sampleQuestions: []
      },
      {
        id: 'c10-sst-ch5',
        chapterNumber: 5,
        title: 'Development (Economics)',
        description: 'What development promises, income and other goals, national development, comparison of countries using per capita income, and sustainable development.',
        keyTopics: ['Conflicting Developmental Goals', 'Per Capita Income & World Bank Criteria', 'Human Development Index (UNDP Criteria)', 'Sustainability & Groundwater Depletion'],
        sampleQuestions: []
      }
    ]
  },

  // 4. English
  {
    id: 'c10-english',
    name: 'English Language & Lit',
    color: '#7c3aed',
    icon: 'BookOpen',
    chapters: [
      {
        id: 'c10-eng-ch1',
        chapterNumber: 1,
        title: 'A Letter to God (First Flight)',
        description: 'Lencho profound faith in God, devastation of cornfield by hailstorm, letter asking for 100 pesos, postmaster compassion, and irony of human nature.',
        keyTopics: ['Lencho Unquestioning Faith', 'Destructive Hailstorm Event', 'Postmaster Act of Charity', 'Irony of the "Bunch of Crooks"'],
        sampleQuestions: []
      },
      {
        id: 'c10-eng-ch2',
        chapterNumber: 2,
        title: 'Nelson Mandela: Long Walk to Freedom',
        description: 'Inauguration ceremony at Union Buildings Pretoria, victory over apartheid, meaning of courage, twin obligations of man, and the concept of true freedom.',
        keyTopics: ['Inauguration of Democratic South Africa', 'Twin Obligations of Every Man', 'Meaning of Courage (Triumph over Fear)', 'Extraordinary Human Disaster of Apartheid'],
        sampleQuestions: []
      },
      {
        id: 'c10-eng-ch3',
        chapterNumber: 3,
        title: 'Two Stories about Flying',
        description: 'Part I: His First Flight (young seagull overcoming fear of flying); Part II: Black Aeroplane (mysterious pilot guiding Dakota flight in storm).',
        keyTopics: ['Young Seagull Fear & Motivation', 'Maternal Tough Love of Mother Seagull', 'Dakota DS 088 in Black Clouds', 'Mystery of the Ghost Aeroplane'],
        sampleQuestions: []
      }
    ]
  }
];
