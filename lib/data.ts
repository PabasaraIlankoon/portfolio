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
    { value: "10+", label: "Projects" },
    { value: "7", label: "Certifications" },
    { value: "2", label: "Degrees" },
  ],
};

export const education = [
  {
    degree: "BSc (Hons) Electronic & Telecom. Engineering",
    institution: "General Sir John Kotelawala Defence University",
    period: "Feb 2024 - Present",
    icon: "🎓",
  },
  {
    degree: "BSc Information Technology (External)",
    institution: "University of Colombo School of Computing",
    period: "Sep 2024 - Present",
    icon: "💻",
  },
  {
    degree: "GCE A/L & O/L — Physical Science Stream",
    institution: "St. Anne's College, Kurunegala",
    period: "Jan 2013 - Feb 2022",
    icon: "🏫",
  },
];

export const leadership = [
 
  {
    role: "Finance Team Lead",
    org: "GENESIZ'26",
    period: "May 2026 - Present",
  },
  {
    role: "Finance Committee Member",
    org: "ERIC KDU",
    period: "Feb 2026 - Present",
  },
  {
    role: "Program Team Member",
    org: "IEEE ComSoc KDU",
    period: "Jun 2025 - Jun 2026",
  },
  {
    role: "Design Committee Member",
    org: "Mathematical Society KDU",
    period: "Feb 2025 - Feb 2026",
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
    subtitle: "AI-Based Elephant Detection & Early Warning",
    description:
      "Real-time AI-powered railway safety system that detects elephants on or near tracks using computer vision deployed at the edge on Raspberry Pi.",
    longDescription:
      "Elevision is an end-to-end AI safety system designed to protect both wildlife and passengers on Sri Lankan railways. Elephants crossing railway tracks at night is a critical problem causing both animal deaths and train accidents. The system uses a YOLOv8 object detection model fine-tuned on a custom dataset of elephant images in railway environments, exported to ONNX format for efficient edge inference on Raspberry Pi hardware.\n\nThe pipeline captures live video from cameras mounted near high-risk track sections, runs inference locally on the Raspberry Pi, and triggers multi-channel alerts - GSM SMS to train operators, push notifications via Firebase to a Flutter mobile app, and visual indicators at the trackside unit - all within 2 seconds of detection.\n\nA React.js web dashboard provides real-time monitoring, alert history, and system health status for railway control rooms. The dual-channel alert (edge + cloud) ensures reliability even during intermittent internet connectivity.",
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
    year: "2026",
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
    subtitle: "LoRa-Based Disaster Communication",
    description:
      "Decentralised emergency communication network for disaster environments - no internet or cellular required. ESP32-S3 nodes form a LoRa mesh with SOS broadcast, GPS sharing, and a Flutter app over USB.",
    longDescription:
      "LankaMesh addresses a critical gap in Sri Lanka's disaster response infrastructure: when floods, landslides, or cyclones knock out cellular towers and internet connectivity, first responders and civilians lose the ability to communicate.\n\n" +
      "The system creates a resilient mesh communication network using ESP32-S3 N16R8 microcontrollers paired with LoRa SX1278 RA-02 modules operating at 433 MHz, capable of peer-to-peer range up to 5 km in open terrain. Each node acts as both a terminal and a relay - SOS packets are flooded through the mesh with random backoff to avoid collisions.\n\n" +
      "Features include one-button SOS broadcast with embedded GPS coordinates, real-time location sharing via NEO-6M GPS, structured emergency message categories (Medical, Flood, Landslide, Fire, Evacuation), environmental sensing via DHT22, and a local OLED status display. Nodes are housed in waterproof ABS enclosures on custom PCBs designed in EasyEDA.\n\n" +
      "A Flutter mobile app connects over USB CDC Serial - no Bluetooth pairing or network setup required. Presented at TECHXHIBIT 2026 (Hardware & IoT Track) with two fully functional nodes demonstrating live bidirectional communication and SOS broadcast.",
    highlights: [
      "LoRa SX1278 RA-02 mesh - up to 5 km per hop, 433 MHz",
      "Zero infrastructure - no internet or cellular required",
      "One-button SOS broadcast with embedded GPS coordinates",
      "Mesh relay with random backoff collision avoidance",
      "Categorised messages: Medical, Flood, Landslide, Fire, Evacuation",
      "Real-time GPS sharing (NEO-6M) + OLED status display",
      "DHT22 environmental sensing (temperature & humidity)",
      "Custom PCB (EasyEDA) in waterproof ABS enclosure",
      "Flutter app via USB CDC - no Bluetooth pairing needed",
      "3-node system cost: Rs. 20,550 (~$68 USD)",
      "Presented at TECHXHIBIT 2026 - Hardware & IoT Track",
    ],
    images: [
      "/images/lankamesh-detail.jpg",
      "/images/lankamesh.jpg",
      "/images/lankamesh/app-messages.jpg",
      "/images/lankamesh-sos.jpg",
      "/images/lankamesh-mobile.jpg",
      "/images/lankamesh_flowchart.jpg",
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
    highlight: "TECHXHIBIT 2026 - Hardware & IoT Track",
  },
  {
    id: 3,
    title: "AgroVision AI",
    subtitle: "Deep Learning Tomato Leaf Disease Detection",
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
        caption: "Powdery mildew - detected with treatment guidance",
      },
      {
        photo: "/images/tomato_leaf_sample_3.jpg",
        result: "/images/screenshot_tomato_bacterial_spot_1.png",
        caption: "Bacterial spot - high-confidence detection",
      },
      {
        photo: "/images/tomato_leaf_sample_4.jpg",
        result: "/images/602953915-ebc9887f-ab61-4e88-9870-f8ac6a0f13.png",
        caption: "Healthy leaf - maintenance-oriented verdict",
      },
    ],
    category: "AI & Computer Vision",
    year: "2026",
    status: "completed",
    featured: true,
    image: "/images/tomato_leaf_sample_2.png",
    tech: ["EfficientNetB0", "TensorFlow", "Keras", "FastAPI", "React.js", "Flutter", "Firebase", "Python"],
    github: "https://github.com/PabasaraIlankoon/agrovision-ai",
    highlight: "Supports 10 disease classes with treatment + prevention guidance",
  
  },
  {
    id: 4,
    title: "Digital Comm Simulator",
    subtitle: "DSP & Modulation Simulator",
    description:
      "Browser-based simulator for digital modulation, noisy channels, and BER analysis - no MATLAB licence required.",
    longDescription:
      "A communication systems laboratory that runs entirely in the browser. Built for coursework, research, and self-study in digital communications, the simulator lets users configure modulation schemes, channel conditions, and noise levels, then see the result instantly.\n\n" +
      "Four modulation schemes are supported: ASK, QPSK, 16-QAM, and OFDM for multi-carrier scenarios. Each scheme lives in its own dedicated Python module - ask.py, qpsk.py, qam.py, ofdm.py - keeping the simulation logic modular and easy to extend.\n\n" +
      "An AWGN channel model lets users dial in a target SNR and watch how each scheme degrades under noise. The BER vs SNR module runs the full simulation across a range of noise levels and renders the performance curve in real time using SciPy.\n\n" +
      "All signal visualisations - time-domain waveforms, constellation diagrams, eye diagrams, and power spectral density plots - are rendered with Plotly, so results can be zoomed, panned, and exported directly from the browser.\n\n" +
      "A Flask backend handles the heavy simulation work, keeping the frontend responsive even for larger OFDM configurations. A parallel Kivy-based mobile app, packaged with Buildozer, brings the same simulation engine to Android as a standalone APK.",
    highlights: [
      "ASK, QPSK, 16-QAM and OFDM modulation schemes",
      "Modular per-scheme Python modules (ask.py, qpsk.py, qam.py, ofdm.py)",
      "AWGN channel model with configurable SNR",
      "Real-time BER vs SNR performance curves",
      "Interactive Plotly constellation, waveform & eye diagrams",
      "Power spectral density visualisation",
      "Flask REST backend separates simulation from rendering",
      "Kivy + Buildozer Android packaging pipeline",
      "No MATLAB required — fully browser-based",
    ],
    images: [
      "/images/ASK Modulation.png",
      "/images/OFDM Modulation.png",
      "/images/Performance Analysis.png",
    
    ],
    category: "Software",
    year: "2026",
    status: "completed",
    featured: false,
    image: "/images/ASK Modulation.png",
    tech: ["Python", "Flask", "NumPy", "SciPy", "Plotly", "Matplotlib", "Kivy", "Buildozer", "DSP"],
    github: "https://github.com/PabasaraIlankoon/Digital_Communication_Simulator",
  },
  {
    id: 5,
    title: "Mars Robot",
    subtitle: "Embedded Autonomous System",
    description:
      "Autonomous robot built for the Mars Robot Challenge - grid navigation, obstacle avoidance, ramp climbing, and barcode-guided sorting, all running on a single ESP32-S3.",
    longDescription:
      "Built for the Mars Robot Challenge: Greenhouse Survival Edition, adapted from SLRC 2025 (University Category) under the ET 2223 Embedded Systems course at KDU, this robot simulates greenhouse operations on Mars from start to finish, with zero human input once it starts.\n\n" +
      "The challenge is split into three tasks. In Plantation, the robot navigates a 6×4 grid, identifies green-sticker plant cells, and collects yellow and white ping-pong-ball potatoes. In Muddy Road & Ramp, it avoids randomly placed obstacles and climbs a 20-degree ramp. In Collection & Sort, it scans a binary barcode and sorts good and bad potatoes into the correct baskets.\n\n" +
      "An ESP32-S3 runs the full state machine - IDLE through three tasks to DONE - fusing data from an 8-channel IR array, three HC-SR04 ultrasonic sensors, a TCS34725 colour sensor, and an MPU6050 IMU. A TB6612FNG H-bridge drives the wheels with encoder feedback for accurate odometry, while four MG90S servos operate a 2-degree-of-freedom arm and a sorting gate.\n\n" +
      "The chassis is laser-cut acrylic, designed in SolidWorks, with a 3D-printed PLA arm. A 2S LiPo battery regulated down to 5V keeps the whole system self-contained, staying within the competition's 24V supply limit.\n\n" +
      "Line following runs on a tuned PID loop reading the IR array. The barcode decoder reads stripe widths to recover a binary value. Ramp detection uses MPU6050 pitch to trigger controlled climbing and descent.",
    highlights: [
      "Three-task state machine: Plantation → Muddy Road & Ramp → Sort",
      "Sensor fusion: 8-ch IR array, 3× HC-SR04, TCS34725, MPU6050",
      "PID-based line following with tunable Kp / Ki / Kd",
      "Binary barcode decoding (3 cm = 0, 6 cm = 1 stripe width)",
      "MPU6050 pitch-based ramp climb & descent detection",
      "4× MG90S servo arm with gripper and sorting gate",
      "SolidWorks-designed, laser-cut acrylic chassis",
      "TB6612FNG motor driver with encoder odometry",
    ],
    images: [
      "/images/mars-robot.jpg",
      "/images/mars_robot_arena.jpg",
      "/images/mars-robot-brackets.jpg",
      "/images/chassis_solidworks.jpg",
      "/images/chassis_photo.jpg",
      "/images/mars-robot-team.jpg",
    ],
    category: "Robotics",
    year: "2025",
    status: "completed",
    featured: false,
    image: "/images/mars-robot.jpg",
    tech: ["ESP32-S3", "C/C++", "MPU6050", "TCS34725", "HC-SR04", "MG90S", "SolidWorks", "TB6612FNG", "PlatformIO"],
    github: "https://github.com/PabasaraIlankoon/mars-robot-challenge",
  },
  {
    id: 6,
    title: "ROSCO'25 Robot",
    subtitle: "Embedded Navigation System",
    description:
      "LineStorm - a three-mode autonomous robot built for ROSCO'25, combining line following, wall following, and ramp navigation on one ESP32-S3 platform.",
    longDescription:
      "Built for the ROSCO'25 inter-university robotics competition, organised by the Institution of Mechanical Engineers Student Chapter and the Electronics, Robotics and Innovation Club of KDU, this robot — codenamed LineStorm - had to master three distinct navigation modes under time pressure.\n\n" +
      "Line following uses an 8-element IR array with a PID controller for smooth, accurate path tracking on a marked track. Wall following relies on a VL53L0X time-of-flight sensor for millimetre-accurate distance sensing through a corridor maze. Ramp navigation uses an MPU6050 IMU to detect gradient changes and adjust motor power so the robot neither stalls nor tips.\n\n" +
      "An ESP32-S3 runs the full finite state machine, with a TB6612FNG driver controlling N20 geared DC motors. Encoder feedback on both wheels enables accurate distance measurement and differential steering through tight corners.\n\n" +
      "The chassis is laser-cut acrylic with custom 3D-printed motor mounts and sensor brackets, keeping the platform light, rigid, and easy to repair between competition runs.\n\n" +
      "PID tuning followed a deliberate order: base speed first, then Kp for responsiveness, Kd for damping, and Ki last for steady-state correction.",
    highlights: [
      "Three navigation modes: line, wall, ramp",
      "VL53L0X ToF sensor for millimetre wall sensing",
      "8-sensor IR array with PID line following",
      "MPU6050 IMU for ramp gradient compensation",
      "FSM-based firmware (ROSCO25_Robot.ino)",
      "Encoder-based wheel odometry",
      "Deliberate PID tuning order: speed → Kp → Kd → Ki",
      "Laser-cut acrylic + 3D-printed chassis",
    ],
    images: [
      "/images/rosco.jpg",
      "/images/rosco-robot.jpg",
      "/images/rosco-chassis.jpg",
      "/images/rosco-brackets.jpg",
    ],
    category: "Robotics",
    year: "2025",
    status: "completed",
    featured: false,
    image: "/images/rosco-robot.jpg",
    tech: ["ESP32-S3", "VL53L0X", "IR Sensors", "MPU6050", "TB6612FNG", "SolidWorks", "PlatformIO"],
    github: "https://github.com/PabasaraIlankoon/autonomous-robot-rosco25",
  },
  {
    id: 7,
    title: "FeelFill",
    subtitle: "Capacitive Liquid-Level Sensing for the Visually Impaired",
    description:
      "Low-cost, non-contact capacitive liquid-level sensor that clips onto any cup and guides visually impaired users to pour an exact volume through voice and haptic feedback.",
    longDescription:
      "Globally, an estimated 285 million people live with visual impairment, of whom 39 million are fully blind. Among the most persistent challenges these individuals face are routine household tasks - such as measuring liquids accurately during cooking, medicine preparation, or beverage making. The absence of a visual reference forces reliance on another person or risking dangerous measurement errors.\n\n" +
      "FeelFill is a low-cost, non-contact, capacitive liquid-level sensing device that provides real-time multi-modal feedback through voice announcements and haptic vibration to guide a visually impaired user to pour the exact required volume. The device is self-contained, battery-powered, and designed to clip onto any standard cup, making it universally applicable and affordable.\n\n" +
      "Developed through the Design Thinking framework - grounded in a specific persona (Chamari Perera, 34, a fully blind home-maker from Galle) and validated by empathy research - the design satisfies all six stated design criteria: no visual display, non-contact sensing, universal cup fit, battery operation, under 8,000 LKR unit cost, and no smartphone or digital literacy required.",
    highlights: [
      "Voice feedback at 4 fill levels via DFPlayer Mini + 8Ω speaker",
      "Haptic near-full warning at 95% capacity",
      "Non-contact capacitive sensing through the cup wall - hygienic, safe with hot liquids",
      "ESP32 + DFPlayer Mini architecture with UART/GPIO control",
      "8+ hour battery life - 18650 Li-ion with USB-C (TP4056) charging",
      "Universal cup fit via adjustable silicone sleeve (50-100mm)",
      "Full BOM under 8,000 LKR per unit",
      "No screen, smartphone, or digital literacy required",
    ],
    images: [
      "/images/feelfill-profile.jpg",
    ],
    category: "IoT & Embedded",
    year: "2026",
    status: "ongoing",
    featured: false,
    image: "/images/feelfill-profile.jpg",
    tech: ["ESP32", "DFPlayer Mini", "Capacitive Sensing", "18650 Li-ion", "TP4056", "ABS Enclosure"],
    highlight: "ET-3273 Engineering Product Design - KDU",
  },
{
  id: 8,
  title: "FinFlow",
  subtitle: "Voice-Enabled Finance Manager Secured by WSO2 API Manager",
  description:
    "A full-stack personal finance manager mobile app with a voice assistant, bill-splitting, and budget tracking - every request authenticated and gatewayed through WSO2 API Manager before reaching the backend.",
  longDescription:
    "FinFlow is a complete personal finance manager built to demonstrate a production-style API gateway architecture on a real, working consumer app. Rather than having the Flutter app talk directly to a bare backend, every single request - login, transactions, budgets, reports - is authenticated and routed through WSO2 API Manager, which issues and validates OAuth2 tokens, enforces subscription and throttling policies, and rejects unauthenticated traffic before it ever reaches the Node.js/Express backend.\n\n" +
      "The app covers the full day-to-day finance workflow: multiple accounts (cash, bank, card, savings) with live balances, auto-seeded and customisable income/expense categories, a dashboard with a gradient summary card and category breakdown, monthly per-category budgets with progress tracking, income-vs-expense reports, and a bill-splitting tool for shared expenses with friends.\n\n" +
      "A built-in voice assistant lets users add transactions hands-free - saying something like \"I spent 500 on groceries\" is parsed on-device, matched against existing categories, logged as a transaction, and confirmed back to the user by text-to-speech. The backend itself is a lightweight, dependency-free JSON-file datastore (no native compilation required), designed to be swapped for PostgreSQL/MySQL in a production deployment.\n\n" +
      "The WSO2 layer was configured end-to-end: a REST API definition, deployment to the gateway, a subscribed application with OAuth2 Password-grant credentials, and full request-flow verification from token issuance through to gatewayed API calls - documented as a reusable reference architecture for securing mobile apps behind WSO2 API Manager.",
  highlights: [
    "OAuth2 authentication and authorisation via WSO2 API Manager (Password grant)",
    "Every API call gatewayed - WSO2 rejects unauthenticated traffic before it reaches the backend",
    "Voice assistant - on-device speech parsing adds transactions and speaks a confirmation back",
    "Multi-account tracking (cash, bank, card, savings) with live, auto-updating balances",
    "Per-category monthly budgets with progress bars and overspend alerts",
    "Bill-splitting tool - splits shared expenses across any number of friends automatically",
    "Dashboard with gradient summary card, income/expense donut chart, and recent activity",
    "Reports screen - income vs. expense trend and category-wise breakdown",
    "Dependency-free JSON datastore backend - zero native build tooling required",
  ],
  images: [
    "/images/app1.jpg",
    "/images/app2.jpg",
    "/images/app3.jpg",
    "/images/app4.jpg",
    "/images/app5.jpg",
    "/images/app6.jpg",
    "/images/app7.jpg",
    "/images/app8.jpg",
  ],
  category: "Software",
  year: "2026",
  status: "completed",
  featured: true,
  image: "/images/app1.jpg",
  tech: [
    "Flutter",
    "Node.js",
    "Express",
    "WSO2 API Manager",
    "OAuth2",
    "Dart",
    "REST APIs",
  ],
  github: "https://github.com/PabasaraIlankoon/FinFlow",
  highlight: "Full OAuth2 API-gateway architecture via WSO2 API Manager",
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
      "Core languages I use to bring projects from prototype to working system - from embedded firmware to web interfaces.",
    context: "Across all projects",
    tools: ["Python", "C", "C++", "Arduino", "JavaScript"],
    extra: [],
  },
  {
    id: 2,
    label: "Main focus",
    title: "AI/ML & Vision",
    description:
      "Most of my recent work involves deploying deep learning models at the edge - real-time object detection, classification, and sensor-driven intelligence on constrained hardware.",
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
      "Comfortable moving down to the hardware layer - sensor integration, motor control, PCB design, and debugging circuits under real-world constraints.",
    context: "In robotics & IoT builds",
    tools: ["ESP32", "ESP32-S3", "ESP32-C3-Mini", "STM32", "Raspberry Pi", "Arduino"],
    extra: ["Sensor Integration", "Motor Control", "Motor Drivers", "PCB Design", "Circuit Debugging", "Power Systems"],
  },
  {
    id: 4,
    label: "Mechanical & control",
    title: "Robotics & Autonomy",
    description:
      "End-to-end robot development from navigation algorithms and sensor fusion to PCB design and real-time control systems.",
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
    badge: "Preprint Manuscript - Under Preparation",
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
    title: "Champions | Target Sprint Shooting Competition",
    org: "KDU",
    year: "2025",
    type: "Winner",
    description:
      "Won the KDU Target Sprint Shooting Competition, representing the university in precision sport shooting.",
    image: "/images/Target sprint.jpg",
  },
  {
    title: "KDU Colours | Air Rifle",
    org: "KDU",
    year: "2025",
    type: "Award",
    description:
      "Awarded KDU Colours for outstanding and consistent performance in Air Rifle across university competitions.",
     image: [ "/images/colours.jpg","/images/colours image.jpg"],
  },
  {
    title: "Precision Shooter | Open Air Gun Championship",
    org: "Magam Sports Shooting Club",
    year: "2025",
    type: "Winner",
    description:
      "Won the Precision Shooter title in the University Men Air Rifle 10 Shots event at the Magam Sports Shooting Club Open Air Gun Shooting Championship 2025, held at the Sri Lanka Ports Authority Security Training School Air Gun Shooting Range.",
    image: "/images/MSSC.jpg",
  },
  {
    title: "TECHXHiBiT 2.0 | Hardware & Software Exhibition",
    org: "BCS Student Chapter / KDU",
    year: "2026",
    type: "Participant",
    description:
      "Participated as Team Voltvision in TECHXHiBiT 2.0, an Innovation Driven Hardware & Software Exhibition and Competition, under the Hardware Category. Organized by the BCS Student Chapter of General Sir John Kotelawala Defence University.",
    image: "/images/texhibit.jpg",
  },
  {
    title: "ROSCO '25 | Robotics Showdown Competition",
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
    title: "AI/ML Engineer - Stage 1",
    org: "SLIIT",
    year: "2026",
    description:
      "Machine learning pipelines, supervised and unsupervised learning, neural networks, TensorFlow, Keras, and model evaluation techniques.",
    image: "/images/SLIIT stage 1.jpg",
    credentialUrl: "https://code.sliit.org/certificates/cnyrcodaxm",
  },
  {
    title: "AI/ML Engineer - Stage 2",
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
    title: "MATLAB Fundamentals",
    org: "MATLAB Training Program",
    year: "2024",
    description:
      "Numerical computing, matrix operations, data visualization, scripting, and engineering simulation techniques.",
    image: "/images/matlab.jpeg",
    credentialUrl:
      "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=9b88c9cd-6666-481e-aead-193484857180&",
  },
  {
    title: "Understand the Transformer Architecture and Explore Large Language Models in Azure Machine Learning",
    org: "Microsoft",
    year: "2026",
    description:
      "Microsoft Learn module covering transformer architecture fundamentals and hands-on exploration of large language models within Azure Machine Learning.",
    image: "/images/ms-transformer-llm-azureml.jpg",
    credentialUrl:
          "https://learn.microsoft.com/api/achievements/share/en-us/PabasaraIlankoon-7785/NQP36YAF?sharingId=266B5AFADDEB9C52",
  },
  {
    title: "Explore and Analyze Data with Python",
    org: "Microsoft",
    year: "2026",
    description:
      "Microsoft Learn module on exploratory data analysis, data cleaning, and visualization techniques using Python.",
    image: "/images/ms-explore-analyze-data-python.jpg",
    credentialUrl:
       "https://learn.microsoft.com/api/achievements/share/en-us/PabasaraIlankoon-7785/WMEUL8XN?sharingId=266B5AFADDEB9C52",
    
  },
  {
    title: "Introduction to Machine Learning Concepts",
    org: "Microsoft",
    year: "2026",
    description:
      "Microsoft Learn foundational module covering core machine learning concepts, terminology, and workflows.",
    image: "/images/ms-intro-machine-learning-concepts.jpg",
    credentialUrl:
      "https://learn.microsoft.com/api/achievements/share/en-us/PabasaraIlankoon-7785/8VQ95C5W?sharingId=266B5AFADDEB9C52",
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
