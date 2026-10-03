export interface NcertPdfChapter {
  id: string;
  chapterNumber: number;
  title: string;
  pagesCount: number;
  pdfUrl: string; // official NCERT portal URL
  chapterSummary: string;
  inTextTopics: string[];
  keyExercises: string[];
}

export interface NcertPdfBook {
  id: string;
  classId: 'class-6' | 'class-7' | 'class-8' | 'class-9';
  className: string;
  subject: string;
  bookTitle: string;
  officialBookCode: string;
  coverAccent: string;
  edition: string;
  totalChapters: number;
  officialPortalUrl: string;
  chapters: NcertPdfChapter[];
}

export const NCERT_PDF_CATALOG: NcertPdfBook[] = [
  // ================= CLASS 9 SCIENCE =================
  {
    id: 'pdf-c9-sci',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Science',
    bookTitle: 'Science — Textbook for Class IX (Rationalized Syllabus)',
    officialBookCode: 'iesc1',
    coverAccent: '#059669',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 12,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?iesc1=0-12',
    chapters: [
      {
        id: 'pdf-c9-sci-ch1',
        chapterNumber: 1,
        title: 'Matter in Our Surroundings',
        pagesCount: 14,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc101.pdf',
        chapterSummary: 'Everything in this universe is made up of material which scientists have named matter. Matter is particulate and particles possess kinetic energy, intermolecular spaces, and mutual attraction.',
        inTextTopics: ['Physical Nature of Matter', 'Characteristics of Particles', 'States of Matter (Solid, Liquid, Gas)', 'Can Matter Change Its State?', 'Evaporation & Cooling'],
        keyExercises: ['Exercise Q1 to Q9: Temperature scale conversions (Kelvin to Celsius), Naphthalene balls disappearance, Cotton clothes in summer.'],
      },
      {
        id: 'pdf-c9-sci-ch2',
        chapterNumber: 2,
        title: 'Is Matter Around Us Pure',
        pagesCount: 16,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc102.pdf',
        chapterSummary: 'Substances can be pure elements/compounds or mixtures (homogeneous solutions or heterogeneous suspensions and colloids). Explores Tyndall effect and physical vs chemical changes.',
        inTextTopics: ['What is a Solution?', 'Suspensions and Colloidal Solutions', 'Tyndall Effect & Brownian Motion', 'Separation of Components', 'Physical & Chemical Changes'],
        keyExercises: ['Exercise Q1 to Q11: Distinguishing between true solution, colloid, and suspension; Saturated solution preparation.'],
      },
      {
        id: 'pdf-c9-sci-ch5',
        chapterNumber: 5,
        title: 'The Fundamental Unit of Life',
        pagesCount: 18,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc105.pdf',
        chapterSummary: 'Cells were discovered by Robert Hooke (1665). Discusses prokaryotic vs eukaryotic cells, the plasma membrane (fluid mosaic), osmosis, cell wall, nucleus, and organelles: ER, Golgi apparatus, lysosomes, mitochondria, and plastids.',
        inTextTopics: ['What are Living Organisms Made Up Of?', 'Structure of Cell: Plasma Membrane & Osmosis', 'Cell Wall & Plasmolysis', 'Nucleus & Cytoplasm', 'Cell Organelles (Mitochondria, Plastids, Vacuoles)'],
        keyExercises: ['In-text & Chapter End Q1 to Q10: Why is plasma membrane selectively permeable, Osmosis experiment with peeled potato.'],
      },
      {
        id: 'pdf-c9-sci-ch7',
        chapterNumber: 7,
        title: 'Motion',
        pagesCount: 20,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc107.pdf',
        chapterSummary: 'Mechanics of motion along a straight line. Distance and displacement, uniform vs non-uniform motion, rate of motion (speed, velocity), rate of change of velocity (acceleration), graphical representation, and equations of motion.',
        inTextTopics: ['Describing Motion (Reference Point)', 'Speed with Direction (Velocity)', 'Rate of Change of Velocity (Acceleration)', 'Distance-Time & Velocity-Time Graphs', 'Three Equations of Motion (v=u+at, s=ut+0.5at², v²-u²=2as)'],
        keyExercises: ['Numerical Exercises 1 to 10: Circular track velocity, odometer readings, train acceleration from rest.'],
      },
      {
        id: 'pdf-c9-sci-ch8',
        chapterNumber: 8,
        title: 'Force and Laws of Motion',
        pagesCount: 18,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iesc108.pdf',
        chapterSummary: 'Newton’s three laws of motion. First law (Galileo’s concept of inertia and mass), Second law (F = dp/dt = ma, momentum p = mv), Third law (action and reaction forces act on different bodies), and law of conservation of momentum.',
        inTextTopics: ['Balanced and Unbalanced Forces', 'First Law of Motion & Inertia', 'Second Law of Motion (Mathematical Formulation)', 'Third Law of Motion', 'Conservation of Momentum'],
        keyExercises: ['Exercise Q1 to Q18: High jumper foam cushion, cricket player pulling hands backward while catching, rifle recoil speed.'],
      },
    ],
  },

  // ================= CLASS 9 MATHEMATICS =================
  {
    id: 'pdf-c9-math',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Mathematics',
    bookTitle: 'Mathematics — Textbook for Class IX',
    officialBookCode: 'iemh1',
    coverAccent: '#0284C7',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 12,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?iemh1=0-12',
    chapters: [
      {
        id: 'pdf-c9-math-ch1',
        chapterNumber: 1,
        title: 'Number Systems',
        pagesCount: 24,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iemh101.pdf',
        chapterSummary: 'Real numbers, rational numbers, irrational numbers proof on number line, real numbers and their decimal expansions (terminating, non-terminating recurring), rationalization of denominators.',
        inTextTopics: ['Irrational Numbers (√2, √3, √5)', 'Real Numbers and Decimal Expansions', 'Representing Real Numbers on Number Line', 'Operations on Real Numbers', 'Laws of Exponents for Real Numbers'],
        keyExercises: ['Exercises 1.1 to 1.5: Finding 5 rational numbers between 3 and 4, Expressing 0.666... in p/q form, Rationalizing 1/(√7-2).'],
      },
      {
        id: 'pdf-c9-math-ch2',
        chapterNumber: 2,
        title: 'Polynomials',
        pagesCount: 26,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iemh102.pdf',
        chapterSummary: 'Polynomials in one variable, degree of a polynomial, zeroes of polynomials, Factor Theorem, splitting the middle term, algebraic identities: (x+y)², (x-y)², x²-y², (x+a)(x+b), (x+y+z)², (x±y)³, and x³+y³+z³-3xyz.',
        inTextTopics: ['Polynomials in One Variable', 'Zeroes of a Polynomial', 'Factor Theorem', 'Factorisation of Polynomials', 'Algebraic Identities'],
        keyExercises: ['Exercises 2.1 to 2.4: Finding p(0), p(1); Factorising cubic polynomials using trial and Factor Theorem.'],
      },
      {
        id: 'pdf-c9-math-ch6',
        chapterNumber: 6,
        title: 'Lines and Angles',
        pagesCount: 22,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iemh106.pdf',
        chapterSummary: 'Basic geometrical axioms, intersecting and parallel lines, Linear Pair Axiom, Vertically Opposite Angles Theorem, Alternate Interior Angles, Consecutive Interior Angles.',
        inTextTopics: ['Linear Pair Axiom', 'Vertically Opposite Angles Theorem', 'Parallel Lines and a Transversal', 'Lines Parallel to Same Line'],
        keyExercises: ['Exercises 6.1 to 6.2: Angle proofs with transversal lines, Finding unknown angles x and y.'],
      },
    ],
  },

  // ================= CLASS 9 SOCIAL SCIENCE =================
  {
    id: 'pdf-c9-sst',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Social Science',
    bookTitle: 'India and the Contemporary World I & Contemporary India I',
    officialBookCode: 'iess1',
    coverAccent: '#D97706',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 16,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?iess1=0-5',
    chapters: [
      {
        id: 'pdf-c9-sst-ch1',
        chapterNumber: 1,
        title: 'History: The French Revolution',
        pagesCount: 24,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iess101.pdf',
        chapterSummary: 'The outbreak of the French Revolution, the Storming of the Bastille on 14 July 1789, abolition of feudalism, Declaration of the Rights of Man, Reign of Terror, and global legacy of liberty, equality, fraternity.',
        inTextTopics: ['French Society Late 18th Century', 'Outbreak of Revolution', 'France Becomes a Republic', 'Reign of Terror & Directory', 'Abolition of Slavery & Legacy'],
        keyExercises: ['Questions 1 to 6: Circumstances leading to the outbreak, Legacy of the French Revolution.'],
      },
      {
        id: 'pdf-c9-sst-ch2',
        chapterNumber: 2,
        title: 'Geography: India — Size and Location',
        pagesCount: 8,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iess201.pdf',
        chapterSummary: 'Location in Northern and Eastern hemispheres, Latitudinal extent (8°4\'N to 37°6\'N), Longitudinal extent (68°7\'E to 97°25\'E), Tropic of Cancer, Standard Meridian (82°30\'E), and neighboring nations.',
        inTextTopics: ['Location and Latitudinal Extent', 'Size: 3.28 Million sq km (2.4% World Area)', 'Standard Meridian of India (Mirzapur)', 'India\'s Strategic Central Maritime Position', 'Neighboring Countries'],
        keyExercises: ['Exercises 1 to 4: Why sunrise in Arunachal Pradesh is 2 hours earlier than Gujarat; Tropic of Cancer pass-through states.'],
      },
    ],
  },

  // ================= CLASS 9 ENGLISH =================
  {
    id: 'pdf-c9-eng',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'English',
    bookTitle: 'Beehive — Textbook for Class IX',
    officialBookCode: 'iebe1',
    coverAccent: '#8B5CF6',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 9,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?iebe1=0-9',
    chapters: [
      {
        id: 'pdf-c9-eng-ch1',
        chapterNumber: 1,
        title: 'The Fun They Had & The Road Not Taken',
        pagesCount: 16,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iebe101.pdf',
        chapterSummary: 'Isaac Asimov’s speculative story of future schooling in 2157 AD alongside Robert Frost\'s iconic philosophical poem on life choices and individual paths.',
        inTextTopics: ['Isaac Asimov: Telebooks and Mechanical Teachers', 'Old Human-Centered Schools', 'Robert Frost: The Road Not Taken Metaphor', 'Theme of Individuality and Retrospection'],
        keyExercises: ['Thinking about the Text: Contrast mechanical vs human teachers; Explain "way leads on to way".'],
      },
    ],
  },

  // ================= CLASS 9 HINDI =================
  {
    id: 'pdf-c9-hindi',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Hindi',
    bookTitle: 'Kshitij Part 1 (क्षितिज भाग १) — Class IX',
    officialBookCode: 'ihks1',
    coverAccent: '#EC4899',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 14,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?ihks1=0-14',
    chapters: [
      {
        id: 'pdf-c9-hin-ch1',
        chapterNumber: 1,
        title: 'दो बैलों की कथा (प्रेमचंद) व साखियाँ (कबीर)',
        pagesCount: 22,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/ihks101.pdf',
        chapterSummary: 'मुंशी प्रेमचंद की कालजयी कहानी जो पशुओं के मूक प्रेम व स्वाधीनता-प्रेम को दर्शाती है, तथा कबीरदास जी के नीतिपरक दोहे।',
        inTextTopics: ['प्रेमचंद का जीवन परिचय', 'हीरा और मोती की स्वाधीनता-चेतना', 'कांजीहौस प्रसंग', 'कबीर की साखियाँ एवं दार्शनिक भावार्थ'],
        keyExercises: ['अभ्यास प्रश्न १ से ८: कांजीहौस में हाजिरी, मानसरोवर सुभर जल का भावार्थ।'],
      },
    ],
  },

  // ================= CLASS 9 SANSKRIT =================
  {
    id: 'pdf-c9-sanskrit',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Sanskrit',
    bookTitle: 'Shemushi Part 1 (शेमुषी प्रथमो भागः) — Class IX',
    officialBookCode: 'iash1',
    coverAccent: '#F97316',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 10,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?iash1=0-10',
    chapters: [
      {
        id: 'pdf-c9-san-ch1',
        chapterNumber: 1,
        title: 'भारतीवसन्तगीतिः व स्वर्णकाकः',
        pagesCount: 16,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/iash101.pdf',
        chapterSummary: 'पं० जानकीवल्लभ शास्त्री कृत सरस्वती वन्दना तथा श्रीपद्मशास्त्री कृत लोभ-निवारक लोककथा "स्वर्णकाकः"।',
        inTextTopics: ['निनादय नवीनामये वाणि वीणाम्', 'स्वर्णकाक कथा प्रसंग', 'लोभाविष्टा बालिकायाः दुष्परिणामः', 'संस्कृत पदच्छेद व सन्धि'],
        keyExercises: ['अभ्यास प्रश्न १ से ५: एकपदेन उत्तरत, पूर्णवाक्येन उत्तरत, सन्धि-विच्छेद।'],
      },
    ],
  },

  // ================= CLASS 8 SCIENCE =================
  {
    id: 'pdf-c8-sci',
    classId: 'class-8',
    className: 'Class 8',
    subject: 'Science',
    bookTitle: 'Science — Textbook for Class VIII',
    officialBookCode: 'hesc1',
    coverAccent: '#059669',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 13,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?hesc1=0-13',
    chapters: [
      {
        id: 'pdf-c8-sci-ch1',
        chapterNumber: 1,
        title: 'Crop Production and Management',
        pagesCount: 16,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hesc101.pdf',
        chapterSummary: 'Agricultural implements, preparation of soil, sowing, adding manure and fertilizers, traditional and modern methods of irrigation (sprinkler and drip), weed control, harvesting, and granaries storage.',
        inTextTopics: ['Agricultural Practices', 'Basic Practices of Crop Production', 'Manure and Fertiliser Differences', 'Irrigation Systems (Drip & Sprinkler)', 'Protection from Weeds & Storage'],
        keyExercises: ['Exercise Q1 to Q10: Kharif vs Rabi crops, continuous plantation effect on soil.'],
      },
      {
        id: 'pdf-c8-sci-ch8',
        chapterNumber: 8,
        title: 'Force and Pressure',
        pagesCount: 18,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hesc108.pdf',
        chapterSummary: 'Force as a push or a pull, forces are due to interaction, magnitude and direction of force, state of motion, contact and non-contact forces, pressure in liquids and gases, atmospheric pressure.',
        inTextTopics: ['A Push or a Pull', 'Forces are Due to an Interaction', 'Contact Forces (Muscular, Friction)', 'Non-contact Forces (Magnetic, Electrostatic, Gravitational)', 'Pressure Exerted by Liquids and Gases', 'Atmospheric Pressure'],
        keyExercises: ['Exercise Q1 to Q10: Calculate pressure for 100 N on 2 m², rubber sucker sticking to glass.'],
      },
    ],
  },

  // ================= CLASS 8 MATHEMATICS =================
  {
    id: 'pdf-c8-math',
    classId: 'class-8',
    className: 'Class 8',
    subject: 'Mathematics',
    bookTitle: 'Mathematics — Textbook for Class VIII',
    officialBookCode: 'hemh1',
    coverAccent: '#0284C7',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 13,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?hemh1=0-13',
    chapters: [
      {
        id: 'pdf-c8-math-ch1',
        chapterNumber: 1,
        title: 'Rational Numbers',
        pagesCount: 20,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/hemh101.pdf',
        chapterSummary: 'Properties of rational numbers (closure, commutativity, associativity, role of zero, role of 1, negative of a number, reciprocal, distributivity of multiplication over addition).',
        inTextTopics: ['Properties of Rational Numbers', 'Representation on Number Line', 'Rational Numbers Between Two Rational Numbers'],
        keyExercises: ['Exercises 1.1 to 1.2: Using properties to evaluate fractions, additive and multiplicative inverses.'],
      },
    ],
  },

  // ================= CLASS 7 SCIENCE =================
  {
    id: 'pdf-c7-sci',
    classId: 'class-7',
    className: 'Class 7',
    subject: 'Science',
    bookTitle: 'Science — Textbook for Class VII',
    officialBookCode: 'gesc1',
    coverAccent: '#059669',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 13,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?gesc1=0-13',
    chapters: [
      {
        id: 'pdf-c7-sci-ch1',
        chapterNumber: 1,
        title: 'Nutrition in Plants',
        pagesCount: 12,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/gesc101.pdf',
        chapterSummary: 'Autotrophic and heterotrophic modes of nutrition. Photosynthesis: food making process in plants, stomata, role of chlorophyll, other modes of nutrition: parasitic (Cuscuta), insectivorous (Pitcher plant), saprotrophic (fungi), and lichens.',
        inTextTopics: ['Mode of Nutrition in Plants', 'Photosynthesis — Food Making Process', 'Other Modes of Nutrition in Plants', 'Saprotrophs & Symbiosis', 'How Nutrients are Replenished in Soil'],
        keyExercises: ['Exercise Q1 to Q13: Starch test in leaves, symbiotic relationship in lichens.'],
      },
    ],
  },

  // ================= CLASS 6 SCIENCE =================
  {
    id: 'pdf-c6-sci',
    classId: 'class-6',
    className: 'Class 6',
    subject: 'Science',
    bookTitle: 'Science — Textbook for Class VI (Curiosity Syllabus)',
    officialBookCode: 'fesc1',
    coverAccent: '#059669',
    edition: '2024–2026 Latest Reprint',
    totalChapters: 12,
    officialPortalUrl: 'https://ncert.nic.in/textbook.php?fesc1=0-12',
    chapters: [
      {
        id: 'pdf-c6-sci-ch1',
        chapterNumber: 1,
        title: 'Components of Food',
        pagesCount: 14,
        pdfUrl: 'https://ncert.nic.in/textbook/pdf/fesc101.pdf',
        chapterSummary: 'Major nutrients in food: carbohydrates, proteins, fats, vitamins, and minerals. Tests for starch (iodine), protein (copper sulphate & caustic soda), and fat (oil patch). Balanced diet and deficiency diseases.',
        inTextTopics: ['What Do Different Food Items Contain?', 'Tests for Starch, Protein, and Fats', 'What Do Various Nutrients Do for Our Body?', 'Balanced Diet & Roughage', 'Deficiency Diseases (Scurvy, Beriberi, Rickets)'],
        keyExercises: ['Exercise Q1 to Q5: Major nutrients list, Iodine test for starch in boiled rice.'],
      },
    ],
  },
];
