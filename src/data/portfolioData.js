// Portfolio Data - Easy to update and maintain

export const personalInfo = {
  name: "Abhinav Sharma",
  title: "Full Stack Developer",
  tagline: "Building reliable, scalable systems from backend to blockchain.",
  email: "abhinavsharma.work21@gmail.com",
  location: "Bengaluru,India",
  photo: "/profile1.png", // Add your photo to public folder
  bio: [
    "I am a Full Stack Developer with a strong focus on backend systems and modern web technologies. I design and develop secure, scalable, and high-performance applications from end to end.",
   "My journey into engineering was shaped by my background as a state-level athlete and former school house captain. The discipline, consistency, and attention to detail I learned on the track continue to influence how I approach system design and problem-solving.",
   "Currently, I build production-grade full stack applications while actively learning and working on Web3 projects, including smart contracts and decentralized applications. I strive to create systems that are not only functional but also clean, verifiable, and resilient.",
   "When I’m not coding, you’ll find me cooking, swimming, or experimenting with fashion and design — activities that help me stay balanced and maintain sharp focus."
  ],
  social: {
    github: "https://github.com/abhinav21s",
    linkedin: "https://www.linkedin.com/in/abhinav-sharma-197a213b9",
    twitter: "https://x.com/abhinav_21s",
    email: "abhinavsharma.work21@gmail.com"
  }
}

export const skills = {

  backend: {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "REST APIs",
      "JWT Authentication",
      "Supabase",
      "Caching & Indexing"
    ]
  },
  frontend: {
    title: "Frontend",
    items: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "HTML5 & CSS3",
      "Responsive Design"
    ]
  },



  blockchain: {
    title: "Blockchain & Web3",
    items: [
      "Smart Contracts",
      "Solidity",
      "Solana Concepts",
      "Token Creation",
      "Web3.js",
      "Merkle Trees"
    ],
    note: "Actively learning and building projects"
  },

  tools: {
    title: "Tools & Others",
    items: [
      "Git & GitHub",
      "Postman",
      "Docker",
      "Vercel, Render, Hostinger",
      "Linux (WSL)",
      "VS Code"
    ]
  }
};

export const projects = [
  {
    id: "proj-001",
    title: "Voyage Valt",
    tagline: "AI-Powered Travel Planner",
    description: "Developed an AI-powered travel planning application that generates personalized itineraries, calculates multi-modal transit routes (driving, walking,cycling) with real-time distance and cost estimation, and provides interactive map visualizations for trip management.",
    features: [
      "AI-generated personalized itineraries",
      "Multi-modal route planning with ETAs",
      "Weather integration",
      "Nearby attractions",
      "Trip saving with Firebase"
    ],
    techStack: ["React","Express.js", "Tailwind CSS", "Shadcn UI", "Framer Motion","Firebase", "Groq SDK", "Leaflet Maps", "OpenStreetMap API"],
    challenges: "Replacing Google services with open-source alternatives (Leaflet + OpenStreetMap) while achieving comparable performance and accuracy, designing effective prompts for realistic AI itinerary generation, integrating multiple APIs seamlessly, and implementing complex multi-modal route calculations with estimated time and cost.",
    results: "Successfully transformed a basic travel planner into a feature-rich application by adding dynamic multi-modal routing, weather integration, nearby places, and Firebase persistence for saving trips.",
    links: {
      github: "https://github.com/abhinav21s/Voyage-valt",
      demo: "https://voyage-valt.vercel.app"
    },
    metrics: {
      features: "8+ major features implemented"
    }
  },
  {
  id: "proj-002",
  title: "VaultX",
  tagline: "Web3 Wallet Dashboard",
  description: "A modern Web3 wallet dashboard for Ethereum and EVM-compatible chains. Supports multiple wallet connections, real-time balance tracking, transaction history, and secure token transfers.",
  features: [
    "Multi-wallet connection support",
    "Real-time balance tracking",
    "Transaction history",
    "Secure token transfers",
    "EVM chain support"
  ],
  techStack: ["React", "Wagmi", "Viem", "Reown AppKit", "Node.js", "Express", "MongoDB", "JWT"],
  challenges: "Implementing secure multi-wallet integration across multiple EVM chains, managing wallet state persistence, and ensuring smooth real-time updates on network/account changes.",
  results: "Built a clean and functional Web3 wallet dashboard with multi-wallet support and seamless interaction with Ethereum and Layer 2 networks.",
  metrics: {
    chainsSupported: "6+ EVM Chains",
    status: "Fully Functional",
    features: "Multi-wallet + Transaction Management"
  },
  links: {
    github: "https://github.com/abhinav21s/VaultX",
    demo: "https://vault-x-nine-eta.vercel.app/"
  }
},
  {
  id: "proj-003",
  title: "Decentralized Voting System",
  tagline: "Hybrid Blockchain Voting Platform",
  description: "A hybrid decentralized voting platform combining traditional authentication with blockchain immutability. Features MFA login (Aadhar + OTP + optional face verification) and on-chain vote recording.",
  features: [
    "Multi-factor voter authentication",
    "On-chain vote recording",
    "Smart contract powered election flow",
    "Hybrid off-chain and blockchain architecture",
    "Secure frontend and backend integration"
  ],
  techStack: ["React", "Node.js", "Express", "MySQL", "Solidity", "Hardhat", "Ethers.js"],
  challenges: "Integrating multi-factor authentication with blockchain voting while maintaining security, privacy, and a smooth user experience across frontend, backend, and smart contract layers.",
  results: "Developed a complete end-to-end decentralized voting application with secure hybrid architecture (off-chain auth + on-chain voting).",
  metrics: {
    status: "Fully Functional",
    techIntegration: "Frontend + Backend + Smart Contract",
    features: "MFA + On-chain Voting"
  },
  links: {
    github: "https://github.com/abhinav21s/Decentralized_Voting"
  }
},
  {
  id: "proj-004",
  title: "Golf Charity Platform",
  tagline: "Subscription-Based Golf Charity App",
  description: "A subscription-based platform for golfers to track Stableford scores, participate in monthly prize draws, and automatically contribute to chosen charities with every payment.",
  features: [
    "Stableford score tracking",
    "Stripe subscription payments",
    "Monthly prize draws",
    "Charity contribution flow",
    "Responsive golfer dashboard"
  ],
  techStack: ["React", "Tailwind CSS", "Shadcn/UI", "Node.js", "Express", "Supabase", "Stripe"],
  challenges: "Building a complete subscription system with Stripe integration, implementing a fair monthly draw mechanism, and creating an engaging UI/UX for golf score tracking and charity contributions.",
  results: "Developed a full-stack subscription platform that combines sports tracking, gamification, and charitable giving.",
  metrics: {
    status: "Fully Functional",
    paymentIntegration: "Stripe",
    features: "Score Tracking + Monthly Draws + Charity"
  },
  links: {
    github: "https://github.com/abhinav21s/golf-charity",

  }
},
  {
  id: "proj-005",
  title: "Non-Custodial Web Wallet",
  tagline: "Client-Side Ethereum Wallet",
  description: "A secure, non-custodial Ethereum wallet where the browser generates and encrypts the seed phrase. Private keys never leave the client side while supporting email-based login and multi-account derivation.",
  features: [
    "Client-side seed phrase generation",
    "Encrypted local key storage",
    "Email-based login flow",
    "HD wallet account derivation",
    "Non-custodial security model"
  ],
  techStack: ["React", "Node.js", "Express", "MongoDB", "Ethers.js", "BIP-39"],
  challenges: "Implementing secure client-side seed generation and encryption while maintaining usability through email login and enabling HD wallet account derivation without compromising security.",
  results: "Created a MetaMask-like non-custodial wallet experience with encrypted seed storage and multi-account support.",
  metrics: {
    status: "Functional Prototype",
    securityModel: "Non-Custodial (Client-side keys)",
    features: "HD Wallet + Email Login"
  },
  links: {
    github: "https://github.com/abhinav21s/web-wallet"
  }
},


]

export const experience = [
  {
      id: "exp-001",
      title: "Full Stack Developer",
      company: "Leela Hospitals",
      period: "March 2026 – April 2026",
      type: "Freelance / Contract",
      location: "Remote",
      description: "Developed and optimized the official website for Leela Hospitals using the MERN stack.",
      achievements: [
        "Built a Reviews & Testimonials section by integrating curated Google Reviews data",
        "Implemented a privacy policy consent flow with checkbox validation and dynamic policy display",
        "Improved API performance by implementing pagination, caching, and database indexing",
        "Successfully deployed the application on Vercel and Hostinger with custom domain integration"
      ]
    }
]

export const leadership = [
  {
  id: "lead-001",
  title: "Leadership & Athletics",
  organization: "High School & State Level",
  period: "2017 - 2020",
  description: "Served as School House Captain while competing as a state-level athlete. Led 200+ students and developed discipline, consistency, and leadership skills that I now bring into software engineering."
}
]

export const beyondTheChain = [
  {
    id: "hobby-001",
    title: "Culinary Experiments",
    icon: "🍳",
    description: "Exploring flavors and techniques in the kitchen. Cooking teaches patience and precision—skills that translate directly to debugging complex systems."
  },
  {
    id: "hobby-002",
    title: "Swimming",
    icon: "🏊",
    description: "Regular swimming keeps me physically and mentally sharp. The discipline from athletics continues to shape my approach to engineering."
  },
  {
    id: "hobby-003",
    title: "Fashion & Style",
    icon: "👔",
    description: "Experimenting with personal style and aesthetics. Good design—whether in clothing or code—is about intentional choices and attention to detail."
  },
  {
  id: "hobby-004",
  title: "Music",
  icon: "🎧",
  description: "I enjoy listening to a wide variety of music — from rock and heavy metal to Punjabi pop, Indian indie, and instrumental solos. It helps me relax, recharge, and stay creative after long coding sessions."
}
]
