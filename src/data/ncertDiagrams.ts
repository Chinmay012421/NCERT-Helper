import plantCellImg from '../assets/images/diagram_plant_cell_1790924751693.jpg';
import humanEyeImg from '../assets/images/diagram_human_eye_1790924770013.jpg';
import candleFlameImg from '../assets/images/diagram_candle_flame_1790924789472.jpg';

export interface DiagramLabel {
  name: string;
  description: string;
}

export interface NcertDiagramItem {
  id: string;
  classId: 'class-6' | 'class-7' | 'class-8' | 'class-9' | 'class-10' | 'class-11' | 'class-12';
  className: string;
  subject: string;
  chapterNumber: number;
  chapterTitle: string;
  diagramTitle: string;
  imageUrl?: string;
  svgType?: 'stomata' | 'neuron' | 'circuit' | 'pinhole' | 'sublimation' | 'triangle' | 'heart' | 'nephron' | 'dna';
  labels: DiagramLabel[];
  examMarks: '3 Marks' | '5 Marks';
  drawingGuide: string[];
  frequentQuestions: string[];
}

export const NCERT_DIAGRAMS: NcertDiagramItem[] = [
  // ================= CLASS 9 =================
  {
    id: 'diag-c9-plant-cell',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Science',
    chapterNumber: 5,
    chapterTitle: 'The Fundamental Unit of Life',
    diagramTitle: 'Plant Cell: Ultrastructure & Organelles',
    imageUrl: plantCellImg,
    examMarks: '5 Marks',
    labels: [
      { name: 'Cell Wall', description: 'Rigid outer layer composed of cellulose; provides mechanical strength and turgidity.' },
      { name: 'Plasma Membrane', description: 'Selectively permeable phospholipid bilayer regulating transport into the cell.' },
      { name: 'Large Central Vacuole', description: 'Occupies 50–90% of plant cell volume, stores cell sap, maintains turgor pressure.' },
      { name: 'Chloroplasts', description: 'Double-membrane plastids containing chlorophyll where photosynthesis occurs.' },
      { name: 'Nucleus', description: 'Directs cellular activities; contains chromosomes carrying DNA genes.' },
      { name: 'Mitochondria', description: 'The powerhouse of the cell; produces ATP via cellular respiration.' },
      { name: 'Golgi Apparatus', description: 'System of membrane-bound vesicles that package and dispatch proteins.' },
    ],
    drawingGuide: [
      'Step 1: Draw a neat double-lined hexagon or rounded rectangle to represent the cell wall and plasma membrane.',
      'Step 2: Draw a large central oval space for the central vacuole occupying most of the cytoplasm.',
      'Step 3: Push the nucleus towards the periphery (eccentric position) with its nucleolus inside.',
      'Step 4: Draw oval chloroplasts with internal grana stacks and elongated sausage-shaped mitochondria with folded cristae.',
      'Step 5: Use a sharp pencil and ruler to draw horizontal pointer lines on the right side for clear labeling.',
    ],
    frequentQuestions: [
      'Draw a neat labeled diagram of a plant cell and label any four parts.',
      'Why is the nucleus in a mature plant cell pushed to the side?',
      'Which organelle is responsible for maintaining turgidity in plant cells?',
    ],
  },
  {
    id: 'diag-c9-neuron',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Science',
    chapterNumber: 6,
    chapterTitle: 'Tissues',
    diagramTitle: 'Structure of a Neuron (Nerve Cell)',
    svgType: 'neuron',
    examMarks: '3 Marks',
    labels: [
      { name: 'Dendrites', description: 'Hair-like branched projections that receive electrical chemical signals from adjoining neurons.' },
      { name: 'Cyton (Cell Body)', description: 'Contains the cytoplasm and prominent spherical nucleus.' },
      { name: 'Axon', description: 'Long single fiber that conducts nerve impulses away from the cell body.' },
      { name: 'Myelin Sheath', description: 'Insulating lipid layer speeding up electrical conduction.' },
      { name: 'Nerve Ending', description: 'Branching terminals that release neurotransmitters across the synapse.' },
    ],
    drawingGuide: [
      'Step 1: Draw a star-shaped cell body (cyton) in the center with a circular nucleus inside.',
      'Step 2: Extend fine branched hair-like twigs (dendrites) from the tips of the star.',
      'Step 3: Draw one long thick tubular projection (the axon) extending downwards.',
      'Step 4: Add rectangular sausage-like segments along the axon for the myelin sheath.',
      'Step 5: End with branched nerve terminal knobs.',
    ],
    frequentQuestions: [
      'Draw a diagram of a neuron and label dendrite, axon, and nerve ending.',
      'Through which part does an impulse enter a neuron and through which does it leave?',
    ],
  },
  {
    id: 'diag-c9-sublimation',
    classId: 'class-9',
    className: 'Class 9',
    subject: 'Science',
    chapterNumber: 1,
    chapterTitle: 'Matter in Our Surroundings',
    diagramTitle: 'Sublimation of Ammonium Chloride Apparatus',
    svgType: 'sublimation',
    examMarks: '3 Marks',
    labels: [
      { name: 'China Dish', description: 'Ceramic dish containing solid ammonium chloride (NH4Cl).' },
      { name: 'Inverted Glass Funnel', description: 'Placed over the china dish to collect condensing sublimated vapors.' },
      { name: 'Cotton Plug', description: 'Inserted into the stem of the funnel to prevent vapor from escaping into air.' },
      { name: 'Solidified Ammonium Chloride', description: 'Deposited along the cooler inner neck of the funnel.' },
      { name: 'Burner & Tripod Stand', description: 'Supplies heat to vaporize solid directly without melting into liquid.' },
    ],
    drawingGuide: [
      'Step 1: Draw tripod stand with wire gauze and burner underneath.',
      'Step 2: Draw the shallow china dish sitting on the wire gauze.',
      'Step 3: Draw an inverted conical funnel over the dish with its stem pointing upwards.',
      'Step 4: Show a small cotton plug capping the top of the funnel stem.',
      'Step 5: Shade the upper neck of the funnel to indicate solidified ammonium chloride deposit.',
    ],
    frequentQuestions: [
      'Draw the experimental setup for sublimation of camphor or ammonium chloride.',
      'What is the function of the cotton plug in this experiment?',
    ],
  },

  // ================= CLASS 8 =================
  {
    id: 'diag-c8-human-eye',
    classId: 'class-8',
    className: 'Class 8',
    subject: 'Science',
    chapterNumber: 13,
    chapterTitle: 'Light',
    diagramTitle: 'Human Eye: Anatomy & Optical Components',
    imageUrl: humanEyeImg,
    examMarks: '5 Marks',
    labels: [
      { name: 'Cornea', description: 'Transparent front surface of the eye that refracts incoming light rays.' },
      { name: 'Iris', description: 'Dark muscular diaphragm behind cornea that controls the diameter of the pupil.' },
      { name: 'Pupil', description: 'Central aperture that regulates the amount of light entering the eye.' },
      { name: 'Eye Lens', description: 'Convex crystalline lens made of fibrous jelly-like material.' },
      { name: 'Ciliary Muscles', description: 'Adjust the focal length and curvature of the eye lens.' },
      { name: 'Retina', description: 'Delicate light-sensitive back screen containing rod and cone photoreceptors.' },
      { name: 'Optic Nerve', description: 'Transmits visual electrical signals from retina to the brain.' },
    ],
    drawingGuide: [
      'Step 1: Draw a large circle, leaving an open bulge at the front for the curved cornea.',
      'Step 2: Draw a second inner concentric lining for the retina leading to the optic nerve tube at the back.',
      'Step 3: Behind the cornea, draw the biconvex lens suspended by two small bracket-like ciliary muscles.',
      'Step 4: Draw two small shutter flaps (iris) leaving a central opening (pupil) in front of the lens.',
      'Step 5: Label optic nerve, blind spot, retina, ciliary muscles, lens, pupil, iris, and cornea.',
    ],
    frequentQuestions: [
      'Draw a labeled diagram of the human eye and explain the function of the iris and retina.',
      'Which photoreceptor cells are responsible for vision in dim light versus color vision?',
    ],
  },
  {
    id: 'diag-c8-candle-flame',
    classId: 'class-8',
    className: 'Class 8',
    subject: 'Science',
    chapterNumber: 5,
    chapterTitle: 'Combustion and Flame',
    diagramTitle: 'Zones of a Candle Flame',
    imageUrl: candleFlameImg,
    examMarks: '3 Marks',
    labels: [
      { name: 'Outer Zone (Blue)', description: 'Zone of complete combustion; hottest part of the flame; non-luminous.' },
      { name: 'Middle Zone (Yellow)', description: 'Zone of partial combustion; moderately hot; luminous with glowing carbon particles.' },
      { name: 'Innermost Zone (Black)', description: 'Dark zone containing unburnt wax vapors; least hot part near the wick.' },
      { name: 'Wick', description: 'Cotton thread that draws liquid molten wax upwards by capillary action.' },
    ],
    drawingGuide: [
      'Step 1: Draw the rectangular candle body with a black wick poking out from the top.',
      'Step 2: Draw a teardrop-shaped flame contour around the wick.',
      'Step 3: Divide the flame into three distinct concentric layers: thin outer rim, wide middle body, and small dark bubble around the wick.',
      'Step 4: Color or label: Outer (Blue/Hottest), Middle (Yellow/Moderately hot), Innermost (Black/Least hot).',
    ],
    frequentQuestions: [
      'Draw a labeled sketch of a candle flame showing its three zones.',
      'Which zone of a flame do goldsmiths use for melting gold and silver and why?',
    ],
  },

  // ================= CLASS 7 =================
  {
    id: 'diag-c7-stomata',
    classId: 'class-7',
    className: 'Class 7',
    subject: 'Science',
    chapterNumber: 1,
    chapterTitle: 'Nutrition in Plants',
    diagramTitle: 'Stomata: Open & Closed Pore Mechanism',
    svgType: 'stomata',
    examMarks: '3 Marks',
    labels: [
      { name: 'Stomatal Pore', description: 'Microscopic aperture through which gaseous exchange (CO2/O2) and transpiration occur.' },
      { name: 'Guard Cells', description: 'Pair of kidney-shaped (bean-shaped) cells that swell or shrink to regulate pore opening.' },
      { name: 'Chloroplasts', description: 'Green organelles inside guard cells that supply ATP for ion transport.' },
      { name: 'Epidermal Cells', description: 'Surrounding protective leaf skin cells lacking chloroplasts.' },
      { name: 'Inner Thick Wall', description: 'Elastic thickened inner wall of guard cell facing the pore.' },
    ],
    drawingGuide: [
      'Step 1: Draw two bean-shaped or kidney-shaped guard cells facing each other with concave sides together.',
      'Step 2: Leave an open oval space in the middle to represent the stomatal pore.',
      'Step 3: Double-line the inner concave margin to show the thickened cell wall.',
      'Step 4: Draw a nucleus and several small circular chloroplast dots inside each guard cell.',
      'Step 5: Surround with wavy puzzle-piece epidermal cells.',
    ],
    frequentQuestions: [
      'Draw a diagram of an open stomatal pore with labels.',
      'How do guard cells control the opening and closing of stomata?',
    ],
  },
  {
    id: 'diag-c7-circuit',
    classId: 'class-7',
    className: 'Class 7',
    subject: 'Science',
    chapterNumber: 10,
    chapterTitle: 'Electric Current and Its Effects',
    diagramTitle: 'Electric Circuit Diagram (Closed vs Open)',
    svgType: 'circuit',
    examMarks: '3 Marks',
    labels: [
      { name: 'Electric Cell Symbol', description: 'Long thin line represents positive terminal; short thick line represents negative terminal.' },
      { name: 'Switch (Key)', description: 'Open key breaks circuit; closed key completes conductive loop.' },
      { name: 'Electric Bulb Symbol', description: 'Circle with an internal filament loop; glows when circuit is closed.' },
      { name: 'Connecting Wires', description: 'Straight continuous lines representing copper leads.' },
    ],
    drawingGuide: [
      'Step 1: Use a ruler to draw a rectangular loop with clean 90-degree corners.',
      'Step 2: On the top side, insert the cell symbol (long line +, short thick line -).',
      'Step 3: On one side, draw the switch in closed position (line touching both dots).',
      'Step 4: On the bottom side, draw the bulb symbol with radiating light rays.',
      'Step 5: Indicate direction of conventional current with arrows flowing from positive to negative terminal.',
    ],
    frequentQuestions: [
      'Draw the standard circuit symbols for: an electric cell, a bulb, a switch in OFF position, and a battery.',
      'Draw a circuit diagram to show a glowing electric bulb.',
    ],
  },

  // ================= CLASS 6 =================
  {
    id: 'diag-c6-pinhole',
    classId: 'class-6',
    className: 'Class 6',
    subject: 'Science',
    chapterNumber: 7,
    chapterTitle: 'Light, Shadows and Reflections',
    diagramTitle: 'Pinhole Camera: Ray Diagram & Inverted Image',
    svgType: 'pinhole',
    examMarks: '3 Marks',
    labels: [
      { name: 'Light Source / Object (Tree)', description: 'Emits or reflects light rays in all directions.' },
      { name: 'Pinhole Aperture', description: 'Tiny puncture in front cardboard face allowing single light rays to cross over.' },
      { name: 'Translucent Screen (Tracing Paper)', description: 'Screen at the back where the image is projected.' },
      { name: 'Inverted Real Image', description: 'Upside-down, colorful image formed because light travels in straight lines (rectilinear propagation).' },
    ],
    drawingGuide: [
      'Step 1: On the left, draw an upright object (like a vertical arrow or tree AB).',
      'Step 2: In the center, draw a light-tight box with a tiny pinhole dot on its left wall.',
      'Step 3: Draw a straight ray from top point A passing straight through the pinhole to reach bottom of screen A\'.',
      'Step 4: Draw a second ray from bottom point B passing through the pinhole to top B\'.',
      'Step 5: Draw the resulting inverted image A\'B\' on the screen.',
    ],
    frequentQuestions: [
      'Draw a ray diagram showing image formation in a pinhole camera.',
      'Why is the image formed in a pinhole camera inverted?',
    ],
  },

  // ================= CLASS 10 =================
  {
    id: 'diag-c10-human-heart',
    classId: 'class-10',
    className: 'Class 10',
    subject: 'Science (Life Processes)',
    chapterNumber: 5,
    chapterTitle: 'Life Processes',
    diagramTitle: 'Sectional View of the Human Heart & Circulation',
    svgType: 'heart',
    examMarks: '5 Marks',
    labels: [
      { name: 'Right Atrium', description: 'Receives deoxygenated blood from the upper and lower vena cava.' },
      { name: 'Right Ventricle', description: 'Pumps deoxygenated blood to the lungs via the pulmonary artery.' },
      { name: 'Left Atrium', description: 'Receives oxygen-rich blood from lungs via pulmonary veins.' },
      { name: 'Left Ventricle', description: 'Thick muscular chamber pumping oxygenated blood to the body via aorta.' },
      { name: 'Interventricular Septum', description: 'Thick muscular wall preventing mixing of oxygenated and deoxygenated blood.' },
      { name: 'Aorta', description: 'Main systemic artery carrying high-pressure oxygenated blood to all organs.' },
      { name: 'Pulmonary Artery', description: 'Only artery carrying deoxygenated blood from heart to lungs.' },
    ],
    drawingGuide: [
      'Step 1: Sketch a tilted pear or heart shape divided vertically into right and left halves.',
      'Step 2: Draw the upper receiving chambers (thin-walled atria) and lower pumping chambers (ventricles).',
      'Step 3: Make the left ventricular wall significantly thicker than the right.',
      'Step 4: Draw the arching aorta exiting the left ventricle and pulmonary trunk from the right ventricle.',
      'Step 5: Label atria, ventricles, septum, valves, and add arrows showing double circulation path.',
    ],
    frequentQuestions: [
      'Draw a sectional view of human heart and label: Aorta, Pulmonary Artery, Left Ventricle, Septum.',
      'Why is the separation of right and left sides of the heart useful in mammals and birds?',
      'Why are the walls of ventricles thicker than atria?',
    ],
  },
  {
    id: 'diag-c10-nephron',
    classId: 'class-10',
    className: 'Class 10',
    subject: 'Science (Life Processes)',
    chapterNumber: 5,
    chapterTitle: 'Life Processes',
    diagramTitle: 'Structure of a Nephron (Functional Excretory Unit)',
    svgType: 'nephron',
    examMarks: '5 Marks',
    labels: [
      { name: 'Bowman Capsule', description: 'Double-walled cup surrounding the glomerulus where ultrafiltration occurs.' },
      { name: 'Glomerulus', description: 'Tuft of high-pressure capillaries fed by afferent arteriole filtering blood plasma.' },
      { name: 'Proximal Convoluted Tubule (PCT)', description: 'Region where 70–80% of electrolytes, water, glucose, and amino acids are reabsorbed.' },
      { name: 'Loop of Henle', description: 'Hairpin loop (descending and ascending limbs) maintaining osmoregulatory gradient.' },
      { name: 'Distal Convoluted Tubule (DCT)', description: 'Site of conditional reabsorption of Na⁺ and water under aldosterone/ADH.' },
      { name: 'Collecting Duct', description: 'Receives urine from several nephrons and carries it to the renal pelvis.' },
    ],
    drawingGuide: [
      'Step 1: Draw a cup-shaped Bowman capsule at the top left containing a coiled glomerulus knot.',
      'Step 2: Continue the neck into an extensively coiled Proximal Convoluted Tubule (PCT).',
      'Step 3: Draw a deep U-shaped hairpin loop representing Henle loop into the medulla.',
      'Step 4: Continue upward into a second coiled region (DCT) and connect to a vertical Collecting Duct.',
      'Step 5: Label all 6 principal functional regions neatly on the right.',
    ],
    frequentQuestions: [
      'Draw the structure of a nephron and label: Bowman capsule, Glomerulus, Henle loop, Collecting duct.',
      'Describe the three major steps of urine formation in the nephron.',
    ],
  },
  {
    id: 'diag-c10-ray-concave',
    classId: 'class-10',
    className: 'Class 10',
    subject: 'Science (Physics)',
    chapterNumber: 9,
    chapterTitle: 'Light – Reflection and Refraction',
    diagramTitle: 'Ray Diagram: Concave Mirror (Object between C and F)',
    examMarks: '3 Marks',
    labels: [
      { name: 'Object (AB)', description: 'Placed between Center of Curvature (C) and Principal Focus (F).' },
      { name: 'Principal Axis', description: 'Straight line passing through Pole P, Focus F, and Center of Curvature C.' },
      { name: 'Incident Parallel Ray', description: 'Parallel to principal axis; reflects passing through focus F.' },
      { name: 'Focal Incident Ray', description: 'Passes through focus F; reflects parallel to principal axis.' },
      { name: 'Image (A\'B\')', description: 'Formed beyond C; Real, Inverted, and Magnified (enlarged).' },
    ],
    drawingGuide: [
      'Step 1: Use a ruler to draw a straight horizontal line for the Principal Axis.',
      'Step 2: Draw the concave mirror curve and hatch the silvered convex back.',
      'Step 3: Mark Pole P, Focus F at 3 cm, and Center of Curvature C at 6 cm (R = 2f).',
      'Step 4: Erect object arrow AB between C and F.',
      'Step 5: Trace Ray 1 (parallel to axis → reflects through F) with arrows.',
      'Step 6: Trace Ray 2 (through F → reflects parallel) and mark intersection point A\' beyond C.',
    ],
    frequentQuestions: [
      'Draw a ray diagram for image formation by a concave mirror when object is placed between C and F.',
      'State the position, nature and relative size of the image formed.',
    ],
  },

  // ================= CLASS 11 =================
  {
    id: 'diag-c11-chloroplast',
    classId: 'class-11',
    className: 'Class 11',
    subject: 'Biology',
    chapterNumber: 8,
    chapterTitle: 'Cell: The Unit of Life',
    diagramTitle: 'Ultrastructure of a Chloroplast (Photosynthetic Organelle)',
    examMarks: '5 Marks',
    labels: [
      { name: 'Outer Membrane', description: 'Permeable outer lipid bilayer enclosing the organelle.' },
      { name: 'Inner Membrane', description: 'Selectively permeable barrier housing specialized translocon proteins.' },
      { name: 'Stroma', description: 'Gel-like matrix containing RuBisCO enzyme, circular 70S DNA, and ribosomes (Dark reaction site).' },
      { name: 'Thylakoid', description: 'Flattened membranous sacs containing chlorophyll pigments and photosystems (PS I & II).' },
      { name: 'Granum (pl. Grana)', description: 'Stacks of disc-like thylakoids where the light-dependent reactions take place.' },
      { name: 'Stroma Lamellae', description: 'Flat membranous tubules connecting adjacent grana stacks.' },
    ],
    drawingGuide: [
      'Step 1: Draw a neat double-membrane oval structure.',
      'Step 2: Inside, draw several stacks of circular coins representing thylakoids (grana).',
      'Step 3: Connect the grana stacks with tubular bridges called stroma lamellae.',
      'Step 4: Shading the surrounding matrix space as the stroma.',
      'Step 5: Add tiny circular loops for chloroplast DNA and granules for 70S ribosomes.',
    ],
    frequentQuestions: [
      'Draw a labeled diagram of the ultrastructure of a chloroplast.',
      'Where do the light and dark reactions of photosynthesis take place within the chloroplast?',
    ],
  },

  // ================= CLASS 12 =================
  {
    id: 'diag-c12-antibody',
    classId: 'class-12',
    className: 'Class 12',
    subject: 'Biology',
    chapterNumber: 7,
    chapterTitle: 'Human Health and Disease',
    diagramTitle: 'Structure of an Antibody Molecule (H₂L₂ Monomer)',
    examMarks: '3 Marks',
    labels: [
      { name: 'Antigen-Binding Site (Paratope)', description: 'Variable N-terminal region formed by V_H and V_L domains that locks with epitope.' },
      { name: 'Light Chains (L)', description: 'Two shorter polypeptide chains of ~220 amino acids each.' },
      { name: 'Heavy Chains (H)', description: 'Two longer polypeptide chains of ~440 amino acids each.' },
      { name: 'Disulfide Bonds (-S-S-)', description: 'Covalent linkages holding heavy and light chains into a flexible Y-shaped quaternary structure.' },
      { name: 'Constant Region (Fc)', description: 'C-terminal region determining the isotype class (IgG, IgA, IgM, IgE, IgD).' },
    ],
    drawingGuide: [
      'Step 1: Draw two identical parallel central long lines representing the heavy chains, branching into a Y shape at top.',
      'Step 2: Draw two shorter outer lines representing the light chains parallel to the arms of the Y.',
      'Step 3: Draw small horizontal bridges representing interchain disulfide (-S-S-) bonds.',
      'Step 4: Mark the tips of both arms as Antigen-Binding Sites.',
      'Step 5: Label Variable regions (V_H, V_L) and Constant regions (C_H, C_L).',
    ],
    frequentQuestions: [
      'Draw a neat labeled diagram of an antibody molecule (H₂L₂).',
      'Why is an antibody molecule represented as H₂L₂?',
      'Which part of the antibody binds specifically to an antigen?',
    ],
  },
  {
    id: 'diag-c12-blastocyst',
    classId: 'class-12',
    className: 'Class 12',
    subject: 'Biology',
    chapterNumber: 2,
    chapterTitle: 'Human Reproduction',
    diagramTitle: 'Structure of a Human Blastocyst (Pre-Implantation Stage)',
    examMarks: '3 Marks',
    labels: [
      { name: 'Trophoblast', description: 'Outer single layer of epithelial cells that attaches to endometrium and forms placenta.' },
      { name: 'Inner Cell Mass (Embryoblast)', description: 'Cluster of pluripotent stem cells that differentiates into the embryo proper.' },
      { name: 'Blastocoel', description: 'Fluid-filled central cavity providing space for embryonic differentiation.' },
      { name: 'Zona Pellucida (Hatching)', description: 'Glycoprotein shell that prevents ectopic implantation until hatching in uterine cavity.' },
    ],
    drawingGuide: [
      'Step 1: Draw a neat outer circular boundary lined with small cuboidal cells (trophoblast).',
      'Step 2: At one pole, cluster a compact bunch of cells representing the Inner Cell Mass.',
      'Step 3: Label the empty internal space as the blastocyst cavity or blastocoel.',
      'Step 4: Indicate the embryonic pole (with inner cell mass) and abembryonic pole.',
    ],
    frequentQuestions: [
      'Draw a labeled diagram of a human blastocyst.',
      'Differentiate between the functions of trophoblast and inner cell mass.',
    ],
  },
];
