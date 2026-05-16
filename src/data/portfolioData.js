// Portfolio Data - Easy to update and maintain

export const personalInfo = {
  name: "Abhinav Sharma",
  title: "Full Stack Developer",
  tagline: "Building reliable, scalable systems from backend to blockchain.",
  email: "abhinavsharma.work21@gmail.com",
  location: "Bengaluru,India",
  photo: "/profile.webp", // Add your photo to public folder
  bio: [
    "I am a Full Stack Engineer with a strong focus on backend systems and a growing expertise in blockchain and Web3 technologies. I design and develop end-to-end applications that are secure, scalable, and performant.",
    
    "My journey in technology is deeply influenced by my background as a state-level athlete and former school house captain. The discipline, consistency, and attention to detail I developed on the track now drive how I approach system design and problem-solving.",
    
    "Currently, I build production-grade full stack applications while actively working on Web3 projects — from smart contracts to decentralized applications. I believe in creating systems that are not only functional but also verifiable and resilient.",
    
    "Outside of coding, I enjoy cooking, swimming, and experimenting with design and personal style — activities that keep me balanced and sharpen my focus."
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
    title: "Backend Engineering",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "GraphQL", "Microservices", "Docker", "Kubernetes"]
  },
  blockchain: {
    title: "Blockchain & Web3",
    items: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Hardhat", "Truffle", "IPFS", "Merkle Trees", "Consensus Algorithms", "DeFi Protocols"]
  },
  frontend: {
    title: "Frontend Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "State Management", "Responsive Design"]
  },
  tools: {
    title: "Tools & Others",
    items: ["Git", "GitHub Actions", "AWS", "Linux", "Nginx", "CI/CD", "Testing (Jest, Mocha)", "Agile/Scrum"]
  }
}

export const projects = [
  {
    id: "proj-001",
    title: "DeFi Lending Protocol",
    description: "Built a decentralized lending platform with automated interest rate calculations and collateral management. Implemented flash loan protection and oracle integration for real-time price feeds.",
    techStack: ["Solidity", "Hardhat", "React", "Web3.js", "Chainlink"],
    challenges: "Ensuring security against reentrancy attacks and flash loan exploits while maintaining gas efficiency.",
    results: "Successfully deployed on testnet with 99.9% uptime. Handled $2M+ in test transactions.",
    links: {
      github: "https://github.com/abhinavsharma/defi-lending",
      demo: "https://defi-lending-demo.com"
    },
    metrics: {
      users: "500+ test users",
      transactions: "10,000+",
      gasOptimization: "30% reduction"
    }
  },
  {
    id: "proj-002",
    title: "Scalable Microservices API",
    description: "Architected and deployed a high-performance microservices backend handling 100K+ requests per minute. Implemented event-driven architecture with message queues and distributed caching.",
    techStack: ["Node.js", "PostgreSQL", "Redis", "RabbitMQ", "Docker", "Kubernetes"],
    challenges: "Managing distributed transactions and ensuring data consistency across services.",
    results: "Reduced response time by 60% and improved system reliability to 99.95% uptime.",
    links: {
      github: "https://github.com/abhinavsharma/microservices-api"
    },
    metrics: {
      throughput: "100K+ req/min",
      latency: "< 50ms p95",
      uptime: "99.95%"
    }
  },
  {
    id: "proj-003",
    title: "NFT Marketplace",
    description: "Developed a full-stack NFT marketplace with lazy minting, royalty distribution, and IPFS integration. Implemented ERC-721 and ERC-1155 standards with custom extensions.",
    techStack: ["Solidity", "Next.js", "IPFS", "Ethers.js", "MongoDB"],
    challenges: "Optimizing gas costs for minting and implementing efficient metadata storage.",
    results: "Launched with 1000+ NFTs minted in first month. Featured in Web3 community.",
    links: {
      github: "https://github.com/abhinavsharma/nft-marketplace",
      demo: "https://nft-marketplace-demo.com"
    },
    metrics: {
      nftsMinted: "1000+",
      gasReduction: "40%",
      users: "300+"
    }
  },
  {
    id: "proj-004",
    title: "Real-time Analytics Dashboard",
    description: "Built a real-time analytics platform processing millions of events per day. Implemented WebSocket connections for live updates and complex data aggregations.",
    techStack: ["Python", "FastAPI", "TimescaleDB", "React", "WebSockets"],
    challenges: "Handling high-volume data ingestion while maintaining real-time query performance.",
    results: "Processing 5M+ events daily with sub-second query response times.",
    links: {
      github: "https://github.com/abhinavsharma/analytics-dashboard"
    },
    metrics: {
      eventsPerDay: "5M+",
      queryTime: "< 1s",
      dataRetention: "1 year"
    }
  },
  {
    id: "proj-005",
    title: "Blockchain Explorer",
    description: "Created a blockchain explorer for viewing transactions, blocks, and smart contract interactions. Implemented advanced search and filtering capabilities.",
    techStack: ["Go", "PostgreSQL", "React", "Web3.js", "Redis"],
    challenges: "Indexing blockchain data efficiently and handling chain reorganizations.",
    results: "Indexing 1M+ blocks with real-time synchronization and search.",
    links: {
      github: "https://github.com/abhinavsharma/blockchain-explorer",
      demo: "https://explorer-demo.com"
    },
    metrics: {
      blocksIndexed: "1M+",
      syncDelay: "< 5s",
      searchSpeed: "< 100ms"
    }
  }
]

export const experience = [
  {
    id: "exp-001",
    title: "Senior Backend Engineer",
    company: "TechCorp Solutions",
    period: "2024 - Present",
    description: "Leading backend architecture for fintech applications. Designed and implemented microservices handling millions of transactions daily.",
    achievements: [
      "Reduced API response time by 60% through optimization",
      "Mentored 5 junior engineers in backend best practices",
      "Implemented CI/CD pipeline reducing deployment time by 80%"
    ]
  },
  {
    id: "exp-002",
    title: "Blockchain Developer",
    company: "Web3 Innovations",
    period: "2023 - 2024",
    description: "Developed smart contracts and DeFi protocols. Conducted security audits and gas optimization.",
    achievements: [
      "Built 10+ production smart contracts with zero security incidents",
      "Reduced gas costs by 40% through optimization techniques",
      "Contributed to open-source Web3 libraries"
    ]
  },
  {
    id: "exp-003",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2022 - 2023",
    description: "Built full-stack applications from concept to deployment. Worked across the entire technology stack.",
    achievements: [
      "Launched 3 products serving 10K+ users",
      "Implemented real-time features using WebSockets",
      "Improved application performance by 50%"
    ]
  }
]

export const leadership = [
  {
    id: "lead-001",
    title: "School House Captain",
    organization: "High School",
    period: "2019 - 2020",
    description: "Led a house of 200+ students in academic and athletic competitions. Organized events and mentored junior students."
  },
  {
    id: "lead-002",
    title: "State-Level Athlete",
    organization: "State Athletics",
    period: "2017 - 2020",
    description: "Competed at state level in track and field. Learned discipline, perseverance, and the value of consistent effort."
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
    title: "Athletic Background",
    icon: "🏃",
    description: "Former state-level athlete. The mindset of continuous improvement and pushing limits drives everything I build."
  }
]
