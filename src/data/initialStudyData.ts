import { Subject, Flashcard, QuizQuestion, StudyNote, DailyStats } from '../types/study';
import bioImg from '../assets/images/subject_biology_cells_1790923411875.jpg';
import csImg from '../assets/images/subject_computer_science_1790923424756.jpg';
import neuroImg from '../assets/images/subject_neuroscience_mind_1790923437367.jpg';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'bio-genetics',
    name: 'Cellular Biology & Genetics',
    code: 'BIO-201',
    description: 'Molecular mechanisms, transcription, translation, DNA repair pathways, and cellular respiration.',
    image: bioImg,
    accentColor: '#059669', // Emerald
    cardCount: 6,
    topics: ['DNA Replication', 'ATP Synthase', 'CRISPR Cas9', 'Mendelian Crosses', 'Mitosis vs Meiosis'],
  },
  {
    id: 'cs-algorithms',
    name: 'Algorithms & Complexity',
    code: 'CS-302',
    description: 'Dynamic programming, graph theory, amortized complexity, and NP-completeness proof patterns.',
    image: csImg,
    accentColor: '#0284C7', // Sky / Azure
    cardCount: 6,
    topics: ['Dynamic Programming', 'Dijkstra & A*', 'Red-Black Trees', 'Master Theorem', 'Graph Traversal'],
  },
  {
    id: 'cog-neuroscience',
    name: 'Cognitive Neuroscience',
    code: 'NEUR-210',
    description: 'Synaptic plasticity, long-term potentiation, hippocampal memory indexing, and executive control.',
    image: neuroImg,
    accentColor: '#7C3AED', // Violet
    cardCount: 6,
    topics: ['Long-Term Potentiation', 'Action Potential', 'Working Memory Buffers', 'Neurotransmitters', 'Visual Cortex Hierarchy'],
  },
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  // Biology
  {
    id: 'bio-1',
    subjectId: 'bio-genetics',
    front: 'What is the exact enzymatic function of DNA Polymerase III versus DNA Polymerase I during prokaryotic replication?',
    back: 'DNA Polymerase III performs the bulk of 5\'→3\' leading and lagging strand synthesis with 3\'→5\' proofreading. DNA Polymerase I removes RNA primers (5\'→3\' exonuclease) and replaces them with deoxynucleotides.',
    hint: 'One synthesizes the bulk; the other cleans up RNA primers.',
    concept: 'DNA Replication',
    interval: 1,
    repetition: 1,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  },
  {
    id: 'bio-2',
    subjectId: 'bio-genetics',
    front: 'How does the proton motive force drive ATP synthesis across the inner mitochondrial membrane?',
    back: 'Protons accumulated in the intermembrane space flow down their electrochemical gradient through the F0 rotor subunit of ATP Synthase, inducing conformational rotation in the F1 catalytic head that condenses ADP + Pi into ATP.',
    hint: 'Think rotary mechanical motor driven by chemiosmosis.',
    concept: 'Chemiosmosis',
    interval: 3,
    repetition: 2,
    easeFactor: 2.6,
    dueDate: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'bio-3',
    subjectId: 'bio-genetics',
    front: 'Why is the Protospacer Adjacent Motif (PAM) sequence essential for Streptococcus pyogenes Cas9 cleavage?',
    back: 'Cas9 requires initial PAM recognition (5\'-NGG-3\') to destabilize the adjacent DNA duplex, allowing guide RNA strand invasion and base-pairing. Without PAM, Cas9 cannot bind or trigger its RuvC/HNH endonuclease domains.',
    hint: 'A 3-base sequence prerequisite for duplex unwinding.',
    concept: 'CRISPR Mechanics',
    interval: 2,
    repetition: 2,
    easeFactor: 2.4,
    dueDate: new Date().toISOString(),
  },

  // Algorithms
  {
    id: 'cs-1',
    subjectId: 'cs-algorithms',
    front: 'What are the two mandatory properties a problem must possess to be solvable via Dynamic Programming?',
    back: '1. Overlapping Subproblems: Subproblems are computed repeatedly rather than generating entirely new subproblems.\n2. Optimal Substructure: An optimal solution to the overall problem incorporates optimal solutions to its constituent subproblems.',
    hint: 'Reused subproblems + compose subproblem optimums.',
    concept: 'Dynamic Programming Foundations',
    interval: 1,
    repetition: 1,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  },
  {
    id: 'cs-2',
    subjectId: 'cs-algorithms',
    front: 'Why does Dijkstra’s algorithm fail or enter undefined states when a graph contains edges with negative weights?',
    back: 'Dijkstra operates greedily on the assumption that once a node is settled (extracted from the priority queue with minimum distance), no shorter path to it can ever be found. Negative edges violate this monotonic non-decreasing invariant.',
    hint: 'Violates the greedy monotonic assumption upon vertex relaxation.',
    concept: 'Shortest Path Invariants',
    interval: 4,
    repetition: 3,
    easeFactor: 2.7,
    dueDate: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'cs-3',
    subjectId: 'cs-algorithms',
    front: 'State the Master Theorem asymptotic solution for recurrence relations of form T(n) = aT(n/b) + f(n).',
    back: 'Compare f(n) to n^(log_b a):\n1. If f(n) = O(n^(log_b a - ε)), T(n) = Θ(n^(log_b a))\n2. If f(n) = Θ(n^(log_b a) * log^k n), T(n) = Θ(n^(log_b a) * log^(k+1) n)\n3. If f(n) = Ω(n^(log_b a + ε)) and regularity holds, T(n) = Θ(f(n)).',
    hint: 'Compare work at tree leaves versus work at the root.',
    concept: 'Recurrence Relations',
    interval: 2,
    repetition: 2,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  },

  // Neuroscience
  {
    id: 'neuro-1',
    subjectId: 'cog-neuroscience',
    front: 'What biophysical sequence enables the NMDA receptor to act as a cellular "coincidence detector"?',
    back: 'At resting potential, Mg2+ ions physically block the NMDA channel pore. Opening requires simultaneous: (1) Presynaptic glutamate release binding the receptor, and (2) Postsynaptic depolarization sufficient to electrostatically expel the Mg2+ block, allowing Ca2+ influx.',
    hint: 'Glutamate binding PLUS membrane depolarization expelling Mg2+.',
    concept: 'Synaptic Coincidence Detection',
    interval: 1,
    repetition: 1,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
  },
  {
    id: 'neuro-2',
    subjectId: 'cog-neuroscience',
    front: 'Contrast the psychological and anatomical distinctions between Episodic and Semantic memory.',
    back: 'Episodic memory involves autonoetic consciousness (mental time-travel to personally experienced events in a spatiotemporal context) reliant on medial temporal lobes/hippocampus. Semantic memory is context-free factual knowledge consolidated widely across neocortex.',
    hint: 'Personal event contextual recall vs decontextualized factual knowledge.',
    concept: 'Declarative Memory Systems',
    interval: 3,
    repetition: 2,
    easeFactor: 2.6,
    dueDate: new Date().toISOString(),
  },
];

export const INITIAL_QUIZZES: QuizQuestion[] = [
  {
    id: 'q-bio-1',
    subjectId: 'bio-genetics',
    question: 'During eukaryotic pre-mRNA splicing, what ribonucleoprotein complex recognizes the 5\' splice site consensus sequence GU?',
    options: [
      'U1 snRNP via complementary base pairing',
      'U2 snRNP at the branch point adenosine',
      'DNA Polymerase II alpha subunit',
      'The 30S ribosomal decoding center',
    ],
    correctIndex: 0,
    explanation: 'U1 snRNP specifically binds the 5\' splice junction through RNA-RNA base pairing, initiating early spliceosome commitment before U2 binds the branch point.',
    conceptTested: 'Spliceosome Assembly',
  },
  {
    id: 'q-bio-2',
    subjectId: 'bio-genetics',
    question: 'Which of the following describes an allosteric inhibitor binding to an enzyme?',
    options: [
      'Binds directly into the catalytic active site in competition with substrate',
      'Binds to a distinct regulatory site, inducing a conformational change that alters active site affinity',
      'Irreversibly forms a covalent bond that cleaves the enzyme peptide backbone',
      'Converts the substrate into an active co-factor',
    ],
    correctIndex: 1,
    explanation: 'Allosteric effectors bind outside the catalytic cleft and trigger quaternary/tertiary structural rearrangements, modifying the substrate binding constant or catalytic rate.',
    conceptTested: 'Enzyme Allostery',
  },
  {
    id: 'q-cs-1',
    subjectId: 'cs-algorithms',
    question: 'In a Fibonacci Heap, what is the amortized time complexity of the decrease-key operation?',
    options: [
      'O(log n)',
      'O(1) amortized',
      'O(n)',
      'O(n log n)',
    ],
    correctIndex: 1,
    explanation: 'Fibonacci Heaps achieve O(1) amortized decrease-key by cutting the node and adding it to the root list without immediately rebalancing trees until extract-min is called.',
    conceptTested: 'Amortized Complexity',
  },
  {
    id: 'q-cs-2',
    subjectId: 'cs-algorithms',
    question: 'Which condition guarantees that the greedy Choice Property holds for the Fractional Knapsack problem?',
    options: [
      'Items cannot be subdivided, requiring recursive backtrack exploration',
      'Items can be continuously divided, and selecting by highest value-to-weight ratio yields global optimality',
      'All item weights must be identical powers of two',
      'The total capacity must exceed the sum of all item weights',
    ],
    correctIndex: 1,
    explanation: 'Because items can be divided fractionally, greedy sorting by value density (v_i / w_i) is mathematically proven to achieve maximum value without wasted capacity.',
    conceptTested: 'Greedy Choice Principle',
  },
  {
    id: 'q-neuro-1',
    subjectId: 'cog-neuroscience',
    question: 'Which calcium-dependent kinase is considered the principal molecular switch for early Long-Term Potentiation (LTP)?',
    options: [
      'CaMKII (Calcium/calmodulin-dependent protein kinase II)',
      'PKA regulatory subunit IV',
      'Acetylcholinesterase',
      'Myosin light-chain kinase',
    ],
    correctIndex: 0,
    explanation: 'CaMKII autophosphorylates upon Ca2+/calmodulin binding, sustaining its active state and driving the insertion of additional AMPA receptors into the postsynaptic density.',
    conceptTested: 'Synaptic Plasticity Kinases',
  },
];

export const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    subjectId: 'bio-genetics',
    title: 'DNA Repair Pathways & Replication Fidelity',
    content: `## High-Fidelity Replication Mechanisms
DNA polymerases maintain replication error rates of ~1 in 10^7 nucleotides due to intrinsic proofreading exonucleolytic domains. Post-replicative mismatch repair (MMR) decreases this error frequency to 1 in 10^9.

### Key Repair Pathways:
- **Base Excision Repair (BER)**: Fixes single-base lesions (uracil incorporation, oxidative damage). DNA glycosylase flips out the damaged base, creating an AP site.
- **Nucleotide Excision Repair (NER)**: Resolves bulky, helix-distorting adducts (e.g. UV-induced thymine dimers). Dual incisions remove an oligonucleotide flap (~24-32 nucleotides in eukaryotes).
- **Homologous Recombination (HR)**: Error-free double-strand break repair utilizing the sister chromatid as a template during S/G2 phase.
- **Non-Homologous End Joining (NHEJ)**: Error-prone direct ligation dominant in G1 phase, often introducing small indels.`,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    synthesizedSummary: {
      executiveSummary: 'Replication fidelity hinges on a multi-tiered defense: polymerase proofreading combined with dedicated post-replication repair pathways customized to distinct lesion types.',
      keyTakeaways: [
        'BER handles small non-distorting lesions via glycosylase excision.',
        'NER resolves bulky cross-links and UV dimers via dual endonucleolytic incisions.',
        'HR is accurate and template-dependent (S/G2), whereas NHEJ is fast and error-prone (G1).',
      ],
      coreDefinitions: [
        { term: 'AP Site', definition: 'Apurinic/apyrimidinic site where a base has been excised leaving an intact phosphodiester backbone.' },
        { term: 'Thymine Dimer', definition: 'Covalent cyclobutane ring between adjacent pyrimidines induced by UV photolesions.' },
      ],
      probableExamQuestions: [
        { question: 'Why does NHEJ dominate in G1 phase while HR operates in S/G2?', answerKey: 'G1 lacks sister chromatids to serve as homologous templates, forcing cells to use non-homologous ligation.' },
      ],
    },
  },
  {
    id: 'note-2',
    subjectId: 'cs-algorithms',
    title: 'Dynamic Programming: Memoization vs Tabulation',
    content: `## Core Paradigms of Dynamic Programming
Dynamic programming transforms exponential recursive time complexities into polynomial time bounds by caching intermediate subproblem solutions.

### 1. Top-Down with Memoization
- Preserves natural recursive structure.
- Solves subproblems strictly on-demand.
- Incurs function call stack overhead and risk of stack overflow on large depths.

### 2. Bottom-Up with Tabulation
- Evaluates subproblems iteratively according to a topological order of dependency.
- Eliminates recursion stack overhead entirely.
- Enables rolling array / space optimization (e.g. tracking only previous two state values in Fibonacci or previous row in edit distance).

### Complexity Invariant:
Total Time = (Number of unique subproblems) × (Time spent per subproblem).`,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_DAILY_STATS: DailyStats = {
  focusMinutesToday: 75,
  dailyGoalMinutes: 120,
  currentStreakDays: 5,
  cardsReviewedToday: 18,
  quizzesCompletedToday: 2,
  weeklyMinutes: [45, 60, 90, 80, 75, 0, 0],
};
