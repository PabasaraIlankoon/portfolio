export const personalInfo = {
  name: "Pabasara Ilankoon",
  title: "Electronic & Telecommunication Engineer",
  roles: ["Embedded AI Engineer", "Undergraduate Student"],
  tagline: ["ENGINEERING", "INTELLIGENT", "SYSTEMS"],
  bio: "Building intelligent systems at the intersection of embedded hardware and machine intelligence. Currently pursuing Electronic and Telecommunication Engineering at KDU while researching AI-based wildlife safety systems.",
  bio2:
    "B.Sc. (Hons) Electronic and Telecommunication Engineering\nGeneral Sir John Kotelawala Defence University",
  email: "pvillankoon@gmail.com",
  phone: "+94 76 251 8343",
  location: "Sri Lanka",
  github: "https://github.com/PabasaraIlankoon",
  linkedin: "https://linkedin.com/in/pabasara-ilankoon",
  resumeUrl: "/resume.pdf",
  photo: "/images/profile.jpg",
  affiliation: "IET Member",
  cgpa: "In Progress",
  stats: [
    { value: "6+", label: "Projects" },
    { value: "3", label: "Certifications" },
    { value: "2", label: "Degrees" },
  ],
};

export const education = [
  {
    degree: "BSc (Hons) Electronic & Telecom. Engineering",
    institution: "General Sir John Kotelawala Defence University",
    period: "Feb 2024 – Present",
    icon: "🎓",
  },
  {
    degree: "BSc Information Technology (External)",
    institution: "University of Colombo School of Computing",
    period: "Sep 2024 – Present",
    icon: "💻",
  },
  {
    degree: "GCE A/L & O/L — Physical Science Stream",
    institution: "St. Anne's College, Kurunegala",
    period: "Jan 2013 – Feb 2022",
    icon: "🏫",
  },
];

export const leadership = [
  { role: "Chairman", org: "IEEE ComSoc KDU", period: "Jun 2026 – Present" },
  {
    role: "Finance Team Lead",
    org: "GENESIZ'26",
    period: "May 2026 – Present",
  },
  {
    role: "Finance Committee Member",
    org: "ERIC KDU",
    period: "Feb 2026 – Present",
  },
  {
    role: "Program Team Member",
    org: "IEEE ComSoc KDU",
    period: "Jun 2025 – Jun 2026",
  },
  {
    role: "Design Committee Member",
    org: "Mathematical Society KDU",
    period: "Feb 2025 – Feb 2026",
  },
];

export type ProjectComparison = {
  photo: string;
  result: string;
  caption: string;
};

export type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  images: string[];
  comparisons?: ProjectComparison[];
  category: string;
  year: string;
  status: "completed" | "ongoing" | "research";
  featured: boolean;
  image: string;
  tech: string[];
  github?: string;
  demo?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Elevision",
    subtitle: "AI-Based Elephant Detection & Early Warning System",
    description:
      "Real-time AI-powered railway safety system that detects elephants on or near tracks using computer vision deployed at the edge on Raspberry Pi.",
    longDescription:
      "Elevision is an end-to-end AI safety system designed to protect both wildlife and passengers on Sri Lankan railways. Elephants crossing railway tracks at night is a critical problem causing both animal deaths and train accidents. The system uses a YOLOv8 object detection model fine-tuned on a custom dataset of elephant images in railway environments, exported to ONNX format for efficient edge inference on Raspberry Pi hardware.\n\nThe pipeline captures live video from cameras mounted near high-risk track sections, runs inference locally on the Raspberry Pi, and triggers multi-channel alerts — GSM SMS to train operators, push notifications via Firebase to a Flutter mobile app, and visual indicators at the trackside unit — all within 2 seconds of detection.\n\nA React.js web dashboard provides real-time monitoring, alert history, and system health status for railway control rooms. The dual-channel alert (edge + cloud) ensures reliability even during intermittent internet connectivity.",
    highlights: [
      "YOLOv8 model fine-tuned on custom wildlife-railway dataset",
      "ONNX export for efficient Raspberry Pi edge inference",
      "Sub-2-second end-to-end alert latency",
      "Dual-channel alerts: GSM + Firebase push notifications",
      "Flutter mobile app for remote monitoring",
      "React.js control room dashboard with live status",
      "Preprint manuscript under preparation",
    ],
    images: [
      "/images/projects/elevision/hero.jpg",
      "/images/projects/elevision/system-diagram.jpg",
      "/images/projects/elevision/dashboard.jpg",
      "/images/projects/elevision/hardware.jpg",
    ],
    category: "AI & Computer Vision",
    year: "2024",
    status: "research",
    featured: true,
    image: "/images/elevision-profile.jpg",
    tech: [
  "YOLOv8",
  "OpenCV",
  "Raspberry Pi",
  "Firebase",
  "Flutter",
  "GSM"
],
github: "https://github.com/PabasaraIlankoon/elevision-device",

    highlight: "Preprint manuscript under preparation",
  },
  {
    id: 2,
    title: "LankaMesh",
    subtitle: "LoRa-Based Disaster Communication System",
    description:
      "Decentralised emergency communication network for disaster environments — no internet or cellular required. ESP32-S3 nodes form a LoRa mesh with SOS broadcast, GPS sharing, and a Flutter app over USB.",
    longDescription:
      "LankaMesh addresses a critical gap in Sri Lanka's disaster response infrastructure: when floods, landslides, or cyclones knock out cellular towers and internet connectivity, first responders and civilians lose the ability to communicate.\n\n" +
      "The system creates a resilient mesh communication network using ESP32-S3 N16R8 microcontrollers paired with LoRa SX1278 RA-02 modules operating at 433 MHz, capable of peer-to-peer range up to 5 km in open terrain. Each node acts as both a terminal and a relay — SOS packets are flooded through the mesh with random backoff to avoid collisions.\n\n" +
      "Features include one-button SOS broadcast with embedded GPS coordinates, real-time location sharing via NEO-6M GPS, structured emergency message categories (Medical, Flood, Landslide, Fire, Evacuation), environmental sensing via DHT22, and a local OLED status display. Nodes are housed in waterproof ABS enclosures on custom PCBs designed in EasyEDA.\n\n" +
      "A Flutter mobile app connects over USB CDC Serial — no Bluetooth pairing or network setup required. Presented at TECHXHIBIT 2026 (Hardware & IoT Track) with two fully functional nodes demonstrating live bidirectional communication and SOS broadcast.",
    highlights: [
      "LoRa SX1278 RA-02 mesh — up to 5 km per hop, 433 MHz",
      "Zero infrastructure — no internet or cellular required",
      "One-button SOS broadcast with embedded GPS coordinates",
      "Mesh relay with random backoff collision avoidance",
      "Categorised messages: Medical, Flood, Landslide, Fire, Evacuation",
      "Real-time GPS sharing (NEO-6M) + OLED status display",
      "DHT22 environmental sensing (temperature & humidity)",
      "Custom PCB (EasyEDA) in waterproof ABS enclosure",
      "Flutter app via USB CDC — no Bluetooth pairing needed",
      "3-node system cost: Rs. 20,550 (~$68 USD)",
      "Presented at TECHXHIBIT 2026 — Hardware & IoT Track",
    ],
    images: [
      "/images/lankamesh-detail.jpg",
      "/images/lankamesh.jpg",
      "/images/lankamesh/app-messages.jpg",
      "/images/lankamesh-sos.jpg",
      "/images/lankamesh-mobile.jpg",
    ],
    category: "IoT & Embedded",
    year: "2025",
    status: "completed",
    featured: true,
    image: "/images/lankamesh.jpg",
    tech: [
      "ESP32-S3",
      "LoRa SX1278",
      "GPS NEO-6M",
      "SSD1306 OLED",
      "DHT22",
      "Flutter",
      "Embedded C++",
      "EasyEDA",
    ],
    github: "https://github.com/SanchilaAmavi/LankaMesh",
    highlight: "TECHXHIBIT 2026 — Hardware & IoT Track",
  },
  {
    id: 3,
    title: "AgroVision Tomato AI",
    subtitle: "Intelligent Tomato Leaf Disease Detection",
    description:
      "Full-stack AI system for tomato leaf disease classification using EfficientNetB0 transfer learning, served via FastAPI with a React web demo and Flutter mobile app.",
    longDescription:
      "AgroVision Tomato AI is an end-to-end deep learning system for diagnosing tomato leaf diseases from a single photograph. Built for farmers, agronomists, and researchers, it returns a disease label, confidence score, likely cause, recommended treatment, and prevention guidance - all within seconds, and always as a clean result card rather than raw JSON.\n\n" +
      "The model recognises ten distinct tomato leaf conditions spanning bacterial, fungal, viral, and pest-related causes - including bacterial spot, early blight, spider mite damage, target spot, tomato mosaic virus, and tomato yellow leaf curl virus - plus a dedicated healthy class so the system can confidently rule disease out, not just rule it in.\n\n" +
      "Every prediction follows the same pipeline: the uploaded image is preprocessed, leaf-aware cropped, and normalised, then passed through the EfficientNetB0 model for inference. The output is structured into a result card - label, confidence, cause, treatment, prevention - alongside validation metrics and a confusion matrix logged for ongoing evaluation.\n\n" +
      "A FastAPI backend exposes /predict, /metrics, and /history endpoints, keeping the inference engine cleanly reusable across the React web demo, Flutter mobile app, and any future integration. The Flutter app is built for offline field use via a .tflite export; the server runs the full .h5 model.",
    highlights: [
      "EfficientNetB0 transfer learning - 10 tomato disease classes",
      "Exports: model.h5 (server) + model.tflite (mobile / edge)",
      "FastAPI backend: /predict, /metrics, /history endpoints",
      "Structured result card: disease label, confidence, cause, treatment, prevention",
      "React.js web demo - no raw JSON exposed to the user",
      "Flutter mobile app for offline field use",
      "Confusion matrix and per-class metrics served via API",
      "Designed to support - not replace - agronomist expertise",
    ],
    images: [
      "/images/tomato_leaf_sample_2.png",
      "/images/screenshot_tomato_powdery_mildew.png",
      "/images/tomato_leaf_sample_3.jpg",
      "/images/screenshot_tomato_bacterial_spot_1.png",
      "/images/tomato_leaf_sample_4.jpg",
      "/images/602953915-ebc9887f-ab61-4e88-9870-f8ac6a0f13.png",
    ],
    comparisons: [
      {
        photo: "/images/tomato_leaf_sample_2.png",
        result: "/images/screenshot_tomato_powdery_mildew.png",
        caption: "Powdery mildew — detected with treatment guidance",
      },
      {
        photo: "/images/tomato_leaf_sample_3.jpg",
        result: "/images/screenshot_tomato_bacterial_spot_1.png",
        caption: "Bacterial spot — high-confidence detection",
      },
      {
        photo: "/images/tomato_leaf_sample_4.jpg",
        result: "/images/602953915-ebc9887f-ab61-4e88-9870-f8ac6a0f13.png",
        caption: "Healthy leaf — maintenance-oriented verdict",
      },
    ],
    category: "AI & Computer Vision",
    year: "2026",
    status: "completed",
    featured: true,
    image: "/images/tomato_leaf_sample_2.png",
    tech: ["EfficientNetB0", "TensorFlow", "Keras", "FastAPI", "React.js", "Flutter", "Firebase", "Python"],
    github: "https://github.com/PabasaraIlankoon/agrovision-tomato-ai",
    highlight: "Supports 10 disease classes with treatment + prevention guidance",
  
  },
  {
    id: 4,
    title: "Digital Communication Simulator",
    subtitle: "Web-Based Communication Systems Simulator",
    description:
      "Interactive simulation platform for digital communication systems with modulation schemes, AWGN channel effects, and BER vs SNR analysis.",
    longDescription:
      "Built as a learning and analysis tool for digital communications coursework and research, this simulator lets users configure and visualise complete digital communication chains in the browser — no MATLAB licence required.\n\nSupported modulation schemes include ASK, QPSK, and 16-QAM, with OFDM multi-carrier modulation for broadband scenarios. The AWGN channel model introduces configurable noise levels, and the BER vs SNR performance curves are generated in real-time using SciPy numerical methods.\n\nAll signal visualisations — time-domain waveforms, constellation diagrams, power spectral density plots — are rendered interactively using Plotly, allowing users to zoom, pan, and export. The Flask backend handles computationally intensive simulations, keeping the frontend responsive.",
    highlights: [
      "ASK, QPSK, 16-QAM and OFDM modulation schemes",
      "AWGN channel model with configurable SNR",
      "Real-time BER vs SNR performance curves",
      "Interactive Plotly constellation and waveform plots",
      "Power spectral density visualisation",
      "No MATLAB required — fully browser-based",
    ],
    images: [
      "/images/ASK Modulation.png",
      "/images/OFDM Modulation.png",
      "/images/Performance Analysis.png",
    
    ],
    category: "Software",
    year: "2024",
    status: "completed",
    featured: false,
    image: "/images/comms.jpg",
    tech: ["Python", "Flask", "NumPy", "SciPy", "Plotly", "Matplotlib", "DSP"],
    github: "https://github.com/pvillankoon",
  },
  {
    id: 5,
    title: "Mars Robot",
    subtitle: "Autonomous Competition Robotics System",
    description:
      "Autonomous robot for competition-based navigation and object handling using sensor fusion and SolidWorks-designed chassis.",
    longDescription:
      "Designed and built for a university robotics competition simulating planetary surface exploration tasks, this autonomous robot navigates an obstacle course, identifies coloured objects by type, and deposits them into designated zones — all without human input.\n\nThe sensor suite combines IR sensors for close-range obstacle detection, ultrasonic sensors for distance measurement, an MPU6050 IMU for orientation tracking, and a TCS34725 colour sensor for object classification. All sensor data is fused in real-time on an ESP32-S3, which runs the navigation state machine and motor control.\n\nThe chassis was designed in SolidWorks and fabricated using 3D printing, with careful attention to weight distribution and ground clearance for the competition surface. TB6612FNG motor drivers with encoder feedback enable precise wheel odometry for dead-reckoning navigation.",
    highlights: [
      "Fully autonomous navigation and object handling",
      "4-sensor fusion: IR, ultrasonic, IMU, colour",
      "ESP32-S3 real-time state machine control",
      "TB6612FNG motor driver with encoder odometry",
      "SolidWorks chassis design, 3D printed fabrication",
      "Colour-based object classification and sorting",
    ],
    images: [
      "/images/projects/mars-robot/hero.jpg",
      "/images/projects/mars-robot/chassis.jpg",
      "/images/projects/mars-robot/electronics.jpg",
      "/images/projects/mars-robot/competition.jpg",
    ],
    category: "Robotics",
    year: "2024",
    status: "completed",
    featured: false,
    image: "/images/mars-robot.jpg",
    tech: ["ESP32-S3", "C/C++", "MPU6050", "TCS34725", "SolidWorks", "TB6612FNG"],
  },
  {
    id: 6,
    title: "ROSCO'25 Robot",
    subtitle: "Autonomous Line & Wall Following Robot",
    description:
      "Competition robot capable of line following, wall following, and ramp navigation with ToF sensor array and IMU-based stability.",
    longDescription:
      "Built for the ROSCO'25 inter-university robotics competition, this robot had to master three distinct navigation modes under time pressure: precise line following on a marked track, wall following through a corridor maze, and stable ramp climbing with gradient compensation.\n\nThe VL53L0X time-of-flight sensor array provides millimetre-accurate wall distance measurements for the corridor navigation mode. The IR sensor array handles line detection with 8-sensor resolution for smooth PID-based path following. The MPU6050 IMU detects ramp gradients and adjusts motor power to maintain speed and prevent tipping.\n\nThe chassis is laser-cut acrylic with custom 3D-printed motor mounts and sensor brackets. Encoder-based feedback on both drive wheels enables accurate distance measurement and differential steering for tight corners.",
    highlights: [
      "Three navigation modes: line, wall, ramp",
      "VL53L0X ToF array for millimetre wall sensing",
      "8-sensor IR array with PID line following",
      "MPU6050 IMU for ramp gradient compensation",
      "Encoder-based wheel odometry",
      "Laser-cut acrylic + 3D-printed chassis",
    ],
    images: [
      "/images/projects/rosco/hero.jpg",
      "/images/projects/rosco/sensors.jpg",
      "/images/projects/rosco/chassis.jpg",
      "/images/projects/rosco/track.jpg",
    ],
    category: "Robotics",
    year: "2025",
    status: "completed",
    featured: false,
    image: "/images/rosco.jpg",
    tech: ["ESP32-S3", "VL53L0X", "IR Sensors", "MPU6050", "TB6612FNG", "SolidWorks"],
  },
];

export const projectCategories = [
  "All Projects",
  "AI & Computer Vision",
  "IoT & Embedded",
  "Robotics",
  "Software",
];

export type Skill = {
  id: number;
  label: string;
  title: string;
  description: string;
  context: string;
  tools: string[];
  extra: string[];
  points?: string[];
  badge?: string;
};

export const skills: Skill[] = [
  {
    id: 1,
    label: "Languages",
    title: "Programming",
    description:
      "Core languages I use to bring projects from prototype to working system — from embedded firmware to web interfaces.",
    context: "Across all projects",
    tools: ["Python", "C", "C++", "Arduino", "JavaScript"],
    extra: [],
  },
  {
    id: 2,
    label: "Main focus",
    title: "AI/ML & Vision",
    description:
      "Most of my recent work involves deploying deep learning models at the edge — real-time object detection, classification, and sensor-driven intelligence on constrained hardware.",
    context: "In Elevision & AgroVision",
    tools: ["YOLOv8", "OpenCV", "TensorFlow", "Keras", "MobileNetV2", "CNN"],
    extra: [
      "Machine Learning",
      "Deep Learning",
      "Transfer Learning",
      "Image Processing",
      "Object Detection",
      "Computer Vision",
      "CVAT",
      "Data Annotation",
    ],
  },
  {
    id: 3,
    label: "Hardware layer",
    title: "Embedded Systems",
    description:
      "Comfortable moving down to the hardware layer — sensor integration, motor control, PCB design, and debugging circuits under real-world constraints.",
    context: "In robotics & IoT builds",
    tools: ["ESP32", "ESP32-S3", "ESP32-C3-Mini", "STM32", "Raspberry Pi", "Arduino"],
    extra: ["Sensor Integration", "Motor Control", "Motor Drivers", "PCB Design", "Circuit Debugging", "Power Systems"],
  },
  {
    id: 4,
    label: "Mechanical & control",
    title: "Robotics & Autonomy",
    description:
      "End-to-end robot development — from navigation algorithms and sensor fusion to PCB design and real-time control systems.",
    context: "In Mars Robot & ROSCO'25",
    tools: ["Autonomous Navigation", "Path Planning", "Sensor Fusion", "PID Control"],
    extra: ["Maze Solving Robots", "Obstacle Detection", "Real-Time Embedded Systems", "PCB Designing", "Robot Control Systems"],
  },
  {
    id: 5,
    label: "Full stack",
    title: "Cloud & Software",
    description:
      "Taking technical work beyond notebooks — wrapping models in APIs, building mobile and web frontends, and shipping demos people can actually use.",
    context: "In AgroVision & LankaMesh",
    tools: ["Firebase", "FastAPI", "REST APIs", "Flutter", "React.js"],
    extra: ["Tailwind CSS", "Git", "GitHub", "Mobile App Development", "Web Application Development"],
  },
  {
    id: 6,
    label: "Connectivity",
    title: "Communication",
    description:
      "Designing systems that connect embedded hardware to the cloud and to each other — from LoRa mesh networks to short-range device protocols.",
    context: "In LankaMesh & Elevision",
    tools: ["LoRa", "GSM", "Wi-Fi", "Bluetooth"],
    extra: ["UART", "SPI", "I2C", "IoT Systems"],
  },
  {
    id: 7,
    label: "Design & simulation",
    title: "Design Tools",
    description:
      "Tools I rely on for circuit design, simulation, and mechanical modelling before anything gets built.",
    context: "Across hardware projects",
    tools: ["EasyEDA", "Proteus", "SolidWorks", "LTSpice"],
    extra: ["MATLAB", "VS Code", "Arduino IDE", "Microchip"],
  },
  {
    id: 8,
    label: "Research",
    title: "Research Experience",
    description:
      "Elevision: A Real-Time AI-Powered Elephant Detection and Alert System for Railway Safety in Sri Lanka.",
    context: "Preprint manuscript under preparation",
    tools: ["YOLOv8", "Computer Vision", "Edge AI", "Raspberry Pi"],
    extra: ["Elephant Detection", "Railway Safety", "Firebase", "Flutter"],
    badge: "Preprint Manuscript — Under Preparation",
    points: [
      "Researching an AI-based railway safety system for real-time elephant detection and early warning.",
      "Developing YOLOv8-based computer vision models for elephant detection in railway environments.",
      "Implementing edge AI deployment on Raspberry Pi using ONNX for real-time inference.",
      "Integrating Firebase, IoT communication, and Flutter applications for remote monitoring and alerts.",
      "Preparing a preprint manuscript on system design, implementation, and performance evaluation.",
    ],
  },
];
export type Achievement = {
  title: string;
  org: string;
  year: string;
  type: string;
  description: string;
  image?: string | string[];
  credentialUrl?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Champions — Target Sprint Shooting Competition",
    org: "KDU",
    year: "2025",
    type: "Winner",
    description:
      "Won the KDU Target Sprint Shooting Competition, representing the university in precision sport shooting.",
    image: "/images/Target sprint.jpg",
  },
  {
    title: "KDU Colours — Air Rifle",
    org: "KDU",
    year: "2025",
    type: "Award",
    description:
      "Awarded KDU Colours for outstanding and consistent performance in Air Rifle across university competitions.",
     image: [ "/images/colours.jpg","/images/colours image.jpg"],
  },
  {
    title: "Precision Shooter — Open Air Gun Championship",
    org: "Magam Sports Shooting Club",
    year: "2025",
    type: "Winner",
    description:
      "Won the Precision Shooter title in the University Men Air Rifle 10 Shots event at the Magam Sports Shooting Club Open Air Gun Shooting Championship 2025, held at the Sri Lanka Ports Authority Security Training School Air Gun Shooting Range.",
    image: "/images/MSSC.jpg",
  },
  {
    title: "TECHXHiBiT 2.0 — Hardware & Software Exhibition",
    org: "BCS Student Chapter / KDU",
    year: "2026",
    type: "Participant",
    description:
      "Participated as Team Voltvision in TECHXHiBiT 2.0, an Innovation Driven Hardware & Software Exhibition and Competition, under the Hardware Category. Organized by the BCS Student Chapter of General Sir John Kotelawala Defence University.",
    image: "/images/texhibit.jpg",
  },
  {
    title: "ROSCO '25 — Robotics Showdown Competition",
    org: "IMechE / ERIC / KDU",
    year: "2025",
    type: "Participant",
    description:
      "Participated as Team Linestrom in the Robotics Showdown Competition 2025, organized by the Institution of Mechanical Engineers Student Chapter and Electronics, Robotics and Innovation Club of KDU.",
    image: "/images/rosco certificate.jpg",
  },
];

export type Certification = {
  title: string;
  org: string;
  year: string;
  description: string;
  image?: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "AI/ML Engineer — Stage 1",
    org: "SLIIT",
    year: "2026",
    description:
      "Machine learning pipelines, supervised and unsupervised learning, neural networks, TensorFlow, Keras, and model evaluation techniques.",
    image: "/images/SLIIT stage 1.jpg",
    credentialUrl: "https://code.sliit.org/certificates/cnyrcodaxm",
  },
  {
    title: "AI/ML Engineer — Stage 2",
    org: "SLIIT",
    year: "2026",
    description:
      "Advanced model deployment, evaluation pipelines, and applied machine learning practices building on Stage 1.",
    image: "/images/SLIIT stage 2.jpg",
    credentialUrl: "https://code.sliit.org/certificates/mqkspfmqwd",
  },
  {
    title: "PCB Design Workshop on EAGLE Software",
    org: "IET / KDU",
    year: "2025",
    description:
      "Active participation in the PCB Design workshop on EAGLE Software, held at the Faculty of Engineering, General Sir John Kotelawala Defence University. Organized by IET On-Campus (KDU) and Sri Lanka Institute of Robotics.",
    image: "/images/PCB_certificate.jpg",
  },
  {
    title: "Deep Learning Specialization",
    org: "DeepLearning.AI",
    year: "2024",
    description:
      "Neural networks, CNNs, sequence models, optimization algorithms, hyperparameter tuning, and reinforcement learning fundamentals.",
  },
  {
    title: "MATLAB Fundamentals",
    org: "MATLAB Training Program",
    year: "2024",
    description:
      "Numerical computing, matrix operations, data visualization, scripting, and engineering simulation techniques.",
    image: "/images/matlab.jpeg",
    credentialUrl:
      "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=9b88c9cd-6666-481e-aead-193484857180&",
  },
];
export const coursework = [
  "Signals and Systems",
  "Electronic Systems",
  "Communication Theory",
  "Control Systems",
  "Electromagnetics",
  "Electronic Circuits",
  "Communication Networks",
  "Digital System Design",
  "Embedded Systems",
  "Digital Signal Processing",
  "Power Electronics",
  "Image Processing and Vision",
];