import plantCellImg from '../assets/images/diagram_plant_cell_1790924751693.jpg';
import humanEyeImg from '../assets/images/diagram_human_eye_1790924770013.jpg';
import candleFlameImg from '../assets/images/diagram_candle_flame_1790924789472.jpg';

export interface DiagramLabel {
  name: string;
  description: string;
}

export interface NcertDiagramItem {
  id: string;
  classId: 'class-6' | 'class-7' | 'class-8' | 'class-9';
  className: string;
  subject: string;
  chapterNumber: number;
  chapterTitle: string;
  diagramTitle: string;
  imageUrl?: string;
  svgType?: 'stomata' | 'neuron' | 'circuit' | 'pinhole' | 'sublimation' | 'triangle';
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
];
