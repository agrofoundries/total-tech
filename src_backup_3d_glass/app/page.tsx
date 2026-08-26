"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

// 4 Clean Hero Practice Highlights
const HERO_PILLARS = [
  {
    code: 'PRACTICE // 01',
    title: 'Custom Web & Microservices',
    desc: 'Next.js 16 full-stack web platforms, high-throughput Node.js APIs, and global edge architectures.'
  },
  {
    code: 'PRACTICE // 02',
    title: 'Private Enterprise AI & Data',
    desc: 'Air-gapped LLMs, autonomous multi-agent task workflows, and real-time Kafka lakehouses.'
  },
  {
    code: 'PRACTICE // 03',
    title: 'Robotics & Industrial Automation',
    desc: 'Autonomous mobile robot fleet coordination (ROS 2), SCADA systems, and embedded firmware.'
  },
  {
    code: 'PRACTICE // 04',
    title: 'Zero-Trust Cloud & SOC2 Defense',
    desc: 'AWS & Azure cloud infrastructure as code, zero-trust IAM security, and 24/7 SRE reliability.'
  }
];

// Industries We Transform
const INDUSTRIES = [
  'Financial Services & Banking',
  'Healthcare & Life Sciences',
  'Manufacturing & Robotics',
  'High-Growth Technology',
  'Retail & Supply Chain'
];

// Itransition-Inspired Engagement Models
const DELIVERY_MODELS = [
  {
    badge: 'MODEL // 01',
    title: 'Dedicated Engineering Pods',
    desc: 'Autonomous, cross-functional engineering teams (Tech Leads, Full-Stack Developers, QA & DevOps) integrated directly with your in-house roadmap.',
    points: [
      'Direct time-zone overlap with US teams',
      'Transparent sprint tracking & code commits',
      'Flexible team scaling in 2–4 weeks',
      'Complete intellectual property ownership'
    ]
  },
  {
    badge: 'MODEL // 02',
    title: 'End-to-End Solution Delivery',
    desc: 'Turnkey product engineering from discovery, system architecture, and UI/UX design to production deployment and milestone governance.',
    points: [
      'Guaranteed milestone deliverables',
      'Strict quality & security baseline audits',
      'Modern CI/CD automated deployment',
      'Post-launch SLA & warranty support'
    ]
  },
  {
    badge: 'MODEL // 03',
    title: 'Advisory & Cloud Modernization',
    desc: 'High-level technology consulting for legacy migration, cloud infrastructure optimization, AI strategy, and SOC2/HIPAA compliance preparation.',
    points: [
      'Comprehensive architectural audits',
      'Zero-trust security & compliance roadmaps',
      'Cloud cost & performance optimization',
      'Custom AI & data pipeline strategy'
    ]
  }
];

// 5-Stage Engineering Lifecycle
const LIFECYCLE_STAGES = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    desc: 'Requirement analysis, technical specification, cloud infrastructure design, and project roadmap.'
  },
  {
    step: '02',
    title: 'Agile Sprint Engineering',
    desc: 'Iterative 2-week development sprints with continuous code reviews, unit tests, and live staging demos.'
  },
  {
    step: '03',
    title: 'QA & Security Audit',
    desc: 'Automated integration testing, OWASP vulnerability scanning, penetration tests, and performance tuning.'
  },
  {
    step: '04',
    title: 'CI/CD Cloud Launch',
    desc: 'Production release via automated GitHub/GitLab pipelines into AWS, Azure, or private cloud environments.'
  },
  {
    step: '05',
    title: '24/7 SRE & Scale',
    desc: 'Continuous cloud monitoring, incident response, feature enhancements, and proactive infrastructure scaling.'
  }
];

// 12 Core Domains (Perfect 3x4 Grid Balance - Zero Empty Slots)
const ECOSYSTEM_TAXONOMY = [
  {
    id: 'software',
    index: 'PRACTICE // 01',
    title: 'Custom Software & Web Engineering',
    desc: 'Full-stack web applications, distributed APIs, native iOS/Android mobile apps, and enterprise software platforms.',
    capabilities: [
      'Frontend (Next.js, React, TypeScript)',
      'Backend (Node.js, Python, Go, Java, C#)',
      'Native iOS (Swift) & Android (Kotlin)',
      'Modern REST & GraphQL Microservices',
      'Legacy System Modernization'
    ]
  },
  {
    id: 'ai',
    index: 'PRACTICE // 02',
    title: 'AI, Cognitive & Data Science',
    desc: 'Private on-premise AI models, automated enterprise agents, predictive analytics, and computer vision systems.',
    capabilities: [
      'Private Enterprise LLMs & Document AI',
      'Automated Workflow & Task Agents',
      'Computer Vision & OCR Inspection',
      'Snowflake, Databricks & BigQuery Warehousing',
      'Real-Time Reporting & Business Intelligence'
    ]
  },
  {
    id: 'robotics',
    index: 'PRACTICE // 03',
    title: 'Robotics, IoT & Embedded Systems',
    desc: 'Autonomous mobile robots (AMRs), industrial automation systems, microcontroller firmware, and connected IoT sensors.',
    capabilities: [
      'ROS 2 Autonomous Fleet Software',
      'Industrial Robotics & Assembly Automation',
      'Embedded Microcontroller Firmware (C/C++)',
      'Industrial IIoT & SCADA Integration',
      'Fleet Telematics & Tracking Systems'
    ]
  },
  {
    id: 'cloud',
    index: 'PRACTICE // 04',
    title: 'Cloud Computing & DevOps',
    desc: 'AWS, Azure, and Google Cloud infrastructure, Kubernetes containerization, and automated deployment pipelines.',
    capabilities: [
      'Multi-Cloud Setup (AWS, Azure, Google Cloud)',
      'Kubernetes, Docker & Terraform as Code',
      'Automated CI/CD Deployment Pipelines',
      '24/7 Cloud Monitoring & SRE Support',
      'Cost Optimization & High Availability'
    ]
  },
  {
    id: 'security',
    index: 'PRACTICE // 05',
    title: 'Cybersecurity & Compliance',
    desc: 'Zero-trust network security, penetration testing, vulnerability audits, and SOC2 / ISO 27001 compliance prep.',
    capabilities: [
      'Penetration Testing & Security Audits',
      'Zero-Trust Network Architecture',
      'Identity & Access Management (IAM)',
      'SOC2 Type II & ISO 27001 Readiness',
      'Data Encryption & Threat Mitigation'
    ]
  },
  {
    id: 'network',
    index: 'PRACTICE // 06',
    title: 'Networking & Telecommunications',
    desc: 'Enterprise network engineering, SD-WAN deployments, private wireless networks, and office connectivity.',
    capabilities: [
      'Enterprise SD-WAN & Network Routing',
      'Private 5G / Wireless Network Setup',
      'Datacenter & Office Interconnects',
      'Satellite & Remote Internet Solutions',
      'High-Availability Load Balancing'
    ]
  },
  {
    id: 'database',
    index: 'PRACTICE // 07',
    title: 'Database & Storage Architecture',
    desc: 'PostgreSQL, MySQL, NoSQL, and vector database engineering for high-speed transactions and analytics.',
    capabilities: [
      'PostgreSQL, MySQL & SQL Server Tuning',
      'Vector Databases for AI Search',
      'In-Memory Redis & Caching Layers',
      'Cloud Storage & Disaster Recovery Backups',
      'High-Speed Database Sharding'
    ]
  },
  {
    id: 'web3',
    index: 'PRACTICE // 08',
    title: 'Web3 & Blockchain Engineering',
    desc: 'Smart contract development, decentralized applications, and private business consortium ledgers.',
    capabilities: [
      'Smart Contract Engineering & Auditing',
      'Decentralized Application (dApp) Development',
      'Digital Asset & Wallet Integration',
      'Enterprise Private Consortium Ledgers',
      'Cryptographic Verification Systems'
    ]
  },
  {
    id: 'uiux',
    index: 'PRACTICE // 09',
    title: 'UI/UX Design & Digital Products',
    desc: 'Product design, design systems, executive dashboard UX, and mobile user experience optimization.',
    capabilities: [
      'Enterprise Design Systems & UI Kits',
      'Executive Dashboard & Portal UX',
      'Mobile App UI/UX Design',
      'User Research & High-Fidelity Prototyping',
      'Accessibility & Usability Testing'
    ]
  },
  {
    id: 'enterprise_tech',
    index: 'PRACTICE // 10',
    title: 'Enterprise Systems & ERP',
    desc: 'Modernization, integration, and custom workflow development for enterprise ERP, CRM, and service platforms.',
    capabilities: [
      'ERP Cloud Migration & Customization',
      'Enterprise CRM Architecture & Workflows',
      'Enterprise Service Workflow Management',
      'Supply Chain & ERP Integrations',
      'Business Process Automation'
    ]
  },
  {
    id: 'emerging',
    index: 'PRACTICE // 11',
    title: 'Emerging Technologies & Innovation',
    desc: 'Digital twin modeling, smart automation prototypes, and custom deep-tech engineering solutions.',
    capabilities: [
      'Industrial Digital Twin Simulations',
      'Custom Machine Learning Prototypes',
      'Smart Device & Hardware Integration',
      'Data-Driven Decision Systems',
      'Energy-Efficient IT Architecture'
    ]
  },
  {
    id: 'qa_automation',
    index: 'PRACTICE // 12',
    title: 'QA Engineering & Test Automation',
    desc: 'Continuous automated test suites, performance benchmarking, stress load validation, and end-to-end SDLC verification.',
    capabilities: [
      'Automated Test Suites (Playwright & Cypress)',
      'API & Microservices Contract Testing',
      'High-Volume Performance & Stress Load Audits',
      'Security & Vulnerability Penetration Tests',
      '24/7 CI/CD Automated Test Pipelines'
    ]
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = useMemo(() => [
    'Manufacturing & Robotics',
    'Financial Services & Banking',
    'Healthcare & Life Sciences',
    'High-Growth Technology',
    'Retail & Supply Chain',
    'Custom Software & Web Engineering',
    'AI & Enterprise Data Solutions',
    'Cloud Computing & DevOps',
    'Cybersecurity & Compliance'
  ], []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[currentIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(95);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === currentPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      setTypingSpeed(200);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typingSpeed, phrases]);

  // Real-time filtering across the 12 domains
  const filteredDomains = useMemo(() => {
    if (!searchQuery) return ECOSYSTEM_TAXONOMY;
    const q = searchQuery.toLowerCase();
    return ECOSYSTEM_TAXONOMY.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.capabilities.some((c) => c.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSubmitted(true);
  };

  return (
    <div className={styles.pageContainer}>
      {/* =========================================================================
          1. CLEAN & CENTERED HERO WITH SEAMLESS TECH PENCIL SKETCH PATTERN
          ========================================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>TOTAL TECH // ENTERPRISE TECHNOLOGY & SOFTWARE CONSULTING</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.taglineText}>One Single Platform to the Tech Universe</span>
              <span className={styles.typewriterContainer}>
                {currentText}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Total Tech Technologies engineers high-performance software platforms, private enterprise AI, and resilient cloud architectures for leading US businesses, mid-market innovators, and global enterprises.
            </p>

            <div className={styles.heroButtons}>
              <a href="#services" className={styles.btnPrimary}>
                <span>EXPLORE CAPABILITIES</span>
                <span>→</span>
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                <span>SCHEDULE ADVISORY REVIEW</span>
              </a>
            </div>
          </div>

          {/* 4 Clean Light Practice Highlights */}
          <div className={styles.heroPillarsGrid}>
            {HERO_PILLARS.map((pillar, idx) => (
              <div key={idx} className={styles.heroPillarCard}>
                <div>
                  <div className={styles.pillarCode}>{pillar.code}</div>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                </div>
                <p className={styles.pillarDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          "INDUSTRIES WE TRANSFORM" RAIL
          ========================================================================= */}
      <div className={styles.industriesRail}>
        <div className={styles.industriesInner}>
          <div className={styles.industriesLabel}>INDUSTRIES WE TRANSFORM:</div>
          <div className={styles.industriesList}>
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className={styles.industryItem}>
                <span>■</span>
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          DELIVERY BLUEPRINT & ENGAGEMENT MODELS
          ========================================================================= */}
      <section className={styles.deliverySection}>
        <div className={styles.sectionContainer}>
          <div>
            <span className={styles.sectionPre}>Flexible Engagement</span>
            <h2 className={styles.sectionTitle}>How We Partner With You.</h2>
          </div>

          <div className={styles.deliveryGrid}>
            {DELIVERY_MODELS.map((model, idx) => (
              <div key={idx} className={styles.deliveryCard}>
                <div>
                  <div className={styles.deliveryBadge}>{model.badge}</div>
                  <h3 className={styles.deliveryTitle}>{model.title}</h3>
                  <p className={styles.deliveryDesc}>{model.desc}</p>
                </div>
                <ul className={styles.deliveryPoints}>
                  {model.points.map((pt, pIdx) => (
                    <li key={pIdx} className={styles.deliveryPointItem}>
                      <span style={{ color: 'var(--blue-500)' }}>✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5-STAGE ENGINEERING LIFECYCLE (CLEAN ICE BLUE SURFACE)
          ========================================================================= */}
      <section className={styles.lifecycleSection}>
        <div className={styles.sectionContainer}>
          <div>
            <span className={styles.sectionPre}>Proven Methodology</span>
            <h2 className={styles.sectionTitle}>The Engineering Lifecycle.</h2>
          </div>

          <div className={styles.lifecycleGrid}>
            {LIFECYCLE_STAGES.map((stage, sIdx) => (
              <div key={sIdx} className={styles.lifecycleCard}>
                <div className={styles.lifecycleStep}>{stage.step}</div>
                <div>
                  <h3 className={styles.lifecycleTitle}>{stage.title}</h3>
                  <p className={styles.lifecycleDesc}>{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICES & CAPABILITIES DIRECTORY (12 BALANCED PRACTICE CARDS)
          ========================================================================= */}
      <section className={styles.ecosystemSection} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionPre}>Full Capability Directory</span>
              <h2 className={styles.sectionTitle}>Our Services & Capabilities.</h2>
            </div>

            {/* Real-time Domain Search Bar */}
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search across all services (e.g., React, AI, AWS, QA, Mobile)..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 12 Practice Grid (3 Columns x 4 Rows) */}
          <div className={styles.ecosystemGrid}>
            {filteredDomains.map((domain) => (
              <div key={domain.id} className={styles.domainCard}>
                <div>
                  <div className={styles.domainIndex}>{domain.index}</div>
                  <h3 className={styles.domainTitle}>{domain.title}</h3>
                  <p className={styles.domainDesc}>{domain.desc}</p>
                </div>

                <ul className={styles.subCapabilityList}>
                  {domain.capabilities.map((cap, i) => (
                    <li key={i} className={styles.subCapabilityItem}>
                      <span style={{ color: 'var(--blue-500)' }}>■</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CASE STUDIES WITH REAL UNSPLASH PHOTOGRAPHY
          ========================================================================= */}
      <section className={styles.caseStudiesSection} id="case-studies">
        <div className={styles.sectionContainer}>
          <div style={{ marginBottom: '48px' }}>
            <span className={styles.sectionPre}>Proven Work</span>
            <h2 className={styles.sectionTitle}>Featured Client Solutions.</h2>
          </div>

          <div className={styles.caseGrid}>
            {/* Case 01: Robotics */}
            <div className={styles.caseCard}>
              <div className={styles.caseImageWrapper}>
                <Image
                  src="/images/robotics-automation.jpg"
                  alt="Warehouse AMR Robotics Fleet Controller"
                  width={800}
                  height={450}
                  className={styles.caseImage}
                />
              </div>
              <div className={styles.caseHeader}>
                <div className={styles.caseClient}>INDUSTRIAL AUTOMATION & LOGISTICS</div>
                <h3 className={styles.caseTitle}>Warehouse AMR Fleet Controller</h3>
              </div>
              <div className={styles.caseBody}>
                <p className={styles.caseDesc}>
                  Engineered custom fleet coordinator software connecting autonomous mobile robots across fulfillment hubs with real-time route optimization.
                </p>
                <div>
                  <div className={styles.impactMetrics}>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Real-Time</div>
                      <div className={styles.impactLbl}>Fleet Dispatch</div>
                    </div>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Automated</div>
                      <div className={styles.impactLbl}>Route Optimization</div>
                    </div>
                  </div>
                  <div className={styles.caseStack}>
                    <span className={styles.stackBadge}>ROS 2</span>
                    <span className={styles.stackBadge}>C++20</span>
                    <span className={styles.stackBadge}>Python</span>
                    <span className={styles.stackBadge}>IoT Sensors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 02: Fintech Platform */}
            <div className={styles.caseCard}>
              <div className={styles.caseImageWrapper}>
                <Image
                  src="/images/cloud-fintech.jpg"
                  alt="Secure Multi-Cloud Web Platform"
                  width={800}
                  height={450}
                  className={styles.caseImage}
                />
              </div>
              <div className={styles.caseHeader}>
                <div className={styles.caseClient}>FINANCIAL & ENTERPRISE PLATFORM</div>
                <h3 className={styles.caseTitle}>Secure Multi-Cloud Web Platform</h3>
              </div>
              <div className={styles.caseBody}>
                <p className={styles.caseDesc}>
                  Engineered a modern web portal and API backend with automated cloud failover, end-to-end data encryption, and high-volume transaction processing.
                </p>
                <div>
                  <div className={styles.impactMetrics}>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Secure</div>
                      <div className={styles.impactLbl}>Zero-Trust Auth</div>
                    </div>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Multi-Cloud</div>
                      <div className={styles.impactLbl}>High Availability</div>
                    </div>
                  </div>
                  <div className={styles.caseStack}>
                    <span className={styles.stackBadge}>Next.js</span>
                    <span className={styles.stackBadge}>Node.js</span>
                    <span className={styles.stackBadge}>AWS</span>
                    <span className={styles.stackBadge}>PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 03: Healthcare AI */}
            <div className={styles.caseCard}>
              <div className={styles.caseImageWrapper}>
                <Image
                  src="/images/healthcare-ai.jpg"
                  alt="Private AI Search & Document Intelligence"
                  width={800}
                  height={450}
                  className={styles.caseImage}
                />
              </div>
              <div className={styles.caseHeader}>
                <div className={styles.caseClient}>HEALTHCARE & LIFE SCIENCES</div>
                <h3 className={styles.caseTitle}>Private AI Search & Document Intelligence</h3>
              </div>
              <div className={styles.caseBody}>
                <p className={styles.caseDesc}>
                  Deployed a private, secure AI knowledge base search engine allowing medical research teams to instantly query millions of documents.
                </p>
                <div>
                  <div className={styles.impactMetrics}>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Private AI</div>
                      <div className={styles.impactLbl}>HIPAA Compliant</div>
                    </div>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Fast Search</div>
                      <div className={styles.impactLbl}>Semantic Query</div>
                    </div>
                  </div>
                  <div className={styles.caseStack}>
                    <span className={styles.stackBadge}>Python</span>
                    <span className={styles.stackBadge}>Vector Search</span>
                    <span className={styles.stackBadge}>FastAPI</span>
                    <span className={styles.stackBadge}>Secure Cloud</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ENGINEERING STANDARDS (CLEAN WHITE SURFACE)
          ========================================================================= */}
      <section className={styles.governanceSection} id="standards">
        <div className={styles.sectionContainer}>
          <div className={styles.govGrid}>
            <div>
              <span className={styles.sectionPre}>Quality & Assurance</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: '2.2rem' }}>
                Engineering Standards & Reliability.
              </h2>
              <p style={{ color: 'var(--blue-800)', fontSize: '14.5px', lineHeight: '1.65', marginTop: '14px' }}>
                Our engineering practices follow strict modern software development lifecycle (SDLC) standards to ensure your applications are secure, maintainable, and built to scale.
              </p>

              <table className={styles.govTable}>
                <thead>
                  <tr>
                    <th>PRACTICE AREA</th>
                    <th>OUR STANDARD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Code Quality</td>
                    <td>Strict TypeScript, Automated Unit & Integration Testing</td>
                  </tr>
                  <tr>
                    <td>Security Baseline</td>
                    <td>Zero-Trust IAM, OWASP Top 10 Auditing & Secrets Management</td>
                  </tr>
                  <tr>
                    <td>Deployment CI/CD</td>
                    <td>Automated GitHub Actions / GitLab Pipelines</td>
                  </tr>
                  <tr>
                    <td>Infrastructure as Code</td>
                    <td>Terraform & Docker for Reproducible Environments</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Compliance Frameworks */}
            <div>
              <table className={styles.govTable}>
                <thead>
                  <tr>
                    <th>COMPLIANCE READINESS</th>
                    <th>FRAMEWORK SCOPE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SOC2 Type II</td>
                    <td>Security, Availability & Confidentiality Controls</td>
                  </tr>
                  <tr>
                    <td>ISO/IEC 27001</td>
                    <td>Information Security Management Systems</td>
                  </tr>
                  <tr>
                    <td>HIPAA Security</td>
                    <td>Protected Health Information Architecture</td>
                  </tr>
                  <tr>
                    <td>GDPR / CCPA</td>
                    <td>Data Privacy & User Consent Compliance</td>
                  </tr>
                  <tr>
                    <td>NIST Framework</td>
                    <td>Cybersecurity Assessment & Defense</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT & CONSULTATION
          ========================================================================= */}
      <section className={styles.consultationSection} id="contact">
        <div className={styles.consultationContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--blue-800)', fontWeight: 800 }}>
              Let’s Build Something Great Together
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--blue-500)', fontWeight: 700 }}>
              CLIENT CONSULTATION
            </span>
          </div>

          {!consultationSubmitted ? (
            <form onSubmit={handleConsultationSubmit} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Name / Company</label>
                <input type="text" placeholder="John Doe, Acme Corp" required className={styles.formInput} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email Address</label>
                <input type="email" placeholder="john@company.com" required className={styles.formInput} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Service Needed</label>
                <select className={styles.formSelect}>
                  <option>Custom Web & Mobile Development</option>
                  <option>AI & Machine Learning Solutions</option>
                  <option>Robotics & Industrial Automation</option>
                  <option>Cloud Infrastructure & DevOps</option>
                  <option>Cybersecurity & Code Audits</option>
                  <option>QA & Automated Test Engineering</option>
                  <option>Other Custom Technology Project</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Estimated Timeline</label>
                <select className={styles.formSelect}>
                  <option>Immediate / Next 1–2 Months</option>
                  <option>Quarterly Project (3–6 Months)</option>
                  <option>Long-Term Dedicated Co-Engineering</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                <label className={styles.formLabel}>Project Details / How Can We Help?</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project goals, tech stack preferences, or any specific requirements..."
                  className={styles.formTextarea}
                ></textarea>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button type="submit" className={styles.btnPrimary}>
                  <span>SEND MESSAGE</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--blue-500)', marginBottom: '12px' }}>
                ✓ THANK YOU FOR REACHING OUT!
              </div>
              <p style={{ color: 'var(--blue-800)', fontSize: '15px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                We have received your message. A technical consultant from our team will reach back out to you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          GLOBAL HUBS & CORPORATE FOOTER
          ========================================================================= */}
      <footer className={styles.footerSection}>
        <div className={styles.footerTopRow}>
          {/* Brand Info */}
          <div className={styles.footerBrandCol}>
            <div className={styles.footerLogoContainer}>
              <Image
                src="/logo_final_blue.png"
                alt="Total Tech Technologies"
                width={180}
                height={38}
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
                unoptimized
              />
            </div>
            <p className={styles.footerBrandDesc}>
              Total Tech Technologies is the global authority dedicated to advancing enterprise IT systems, custom software, AI development, and cloud databases.
            </p>
          </div>

          {/* Group Dedicated to Enterprise IT */}
          <div className={styles.footerDedicatedCol}>
            <h4 className={styles.dedicatedHeading}>OUR GROUP DEDICATED TO ENTERPRISE IT</h4>
            <div className={styles.badgeRow}>
              <span className={styles.groupBadge}>TOTAL TECH</span>
              <span className={styles.groupBadge}>AWS</span>
              <span className={styles.groupBadge}>AZURE</span>
              <span className={styles.groupBadge}>GCP</span>
              <span className={styles.groupBadge}>ERP</span>
              <span className={styles.groupBadge}>CRM</span>
            </div>
          </div>

          {/* Office Locations & Socials */}
          <div className={styles.footerOfficesCol}>
            <div className={styles.socialRow}>
              <a href="#" className={styles.socialBtn} aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="#" className={styles.socialBtn} aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163c-.272-1.021-1.077-1.826-2.099-2.099-1.854-.5-9.4-.5-9.4-.5s-7.546 0-9.4.5c-1.021.273-1.826 1.077-2.099 2.099-.5 1.854-.5 9.401-.5 9.401s0 7.547.5 9.401c.273 1.022 1.078 1.826 2.099 2.099 1.854.5 9.4.5 9.4.5s7.547 0 9.4-.5c1.022-.273 1.826-1.077 2.099-2.099.5-1.854.5-9.4.5-9.4s0-7.547-.5-9.401zm-14.26 11.237v-10.8l7.087 5.4-7.087 5.4z" /></svg>
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className={styles.socialBtn} aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
            </div>

            <div className={styles.officeGrid}>
              <div className={styles.officeItem}>
                <span className={styles.officeTitle}>NY OFFICE</span>
                <span className={styles.officeAddr}>105 MAXESS ROAD, MELVILLE, NY 11747</span>
                <span className={styles.officePhone}>(631) 452-1111</span>
              </div>
              <div className={styles.officeItem}>
                <span className={styles.officeTitle}>FL OFFICE</span>
                <span className={styles.officeAddr}>850 NW FEDERAL HWY, STUART, FL 34994</span>
                <span className={styles.officePhone}>(772) 297-0700</span>
              </div>
              <div className={styles.officeItem}>
                <span className={styles.officeTitle}>CANADA OFFICE</span>
                <span className={styles.officeAddr}>ONE YONGE STREET, TORONTO, ONTARIO M5E 1R4, CANADA</span>
                <span className={styles.officePhone}>+1 (418) 805-9990</span>
              </div>
            </div>
          </div>
        </div>

        {/* Link Columns */}
        <div className={styles.footerLinkColumns}>
          {/* Column 1: SERVICES */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              SERVICES
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Custom Web Apps</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Mobile Applications</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Backend Engineering</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> API Integrations</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Database Design</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Cloud Infrastructure</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> DevOps Automation</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> UI/UX Product Design</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> QA & System Testing</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> SRE & Maintenance</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Legacy Refactoring</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> System Architecture</Link></li>
            </ul>
          </div>

          {/* Column 2: PRACTICES */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              PRACTICES
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Software Engineering</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Artificial Intelligence</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Machine Learning</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Robotics & ROS 2</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Embedded Firmware</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Industrial IoT</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Cybersecurity</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Zero-Trust Audits</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Compliance Readiness</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Enterprise ERP</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> ERP Platform Support</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> IT Workflows & ITSM</Link></li>
            </ul>
          </div>

          {/* Column 3: INDUSTRIES */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              INDUSTRIES
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Financial Services</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Healthcare & Life Sciences</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Manufacturing & Robotics</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> High-Growth Startups</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Retail & E-Commerce</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Logistics & Supply Chain</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Energy & Utilities</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Public Sector & Gov</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Telecommunications</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Education Technology</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Media & Entertainment</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Professional Services</Link></li>
            </ul>
          </div>

          {/* Column 4: RESOURCES */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              RESOURCES
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Technical Case Studies</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Whitepapers & Reports</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Engineering Blog</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Open Source Projects</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Documentation Portal</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Client Portal Access</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Architecture Blueprints</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> API Reference Docs</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Security Advisories</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Status & Monitoring</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Learning Center</Link></li>
              <li><Link href="#resources" className={styles.columnLink}><span>+</span> Technology Glossary</Link></li>
            </ul>
          </div>

          {/* Column 5: COMPANY */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              COMPANY
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> About Total Tech</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Leadership & Team</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Global Office Hubs</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Career Opportunities</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Brand & Media Kit</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Partner Ecosystem</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Newsroom & Press</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Sustainability Goals</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Research Lab</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Investor Relations</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Community Initiatives</Link></li>
              <li><Link href="#services" className={styles.columnLink}><span>+</span> Contact Enterprise</Link></li>
            </ul>
          </div>

          {/* Column 6: GOVERNANCE */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              GOVERNANCE
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Security Standards</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Data Privacy Compliance</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> SOC2 Assurance</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> HIPAA Compliance</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> ISO 27001 Audits</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> GDPR/CCPA Policy</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Terms of Service</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Privacy Statement</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Non-Disclosure Terms</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Vendor Requirements</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Service Level Agreements</Link></li>
              <li><Link href="#standards" className={styles.columnLink}><span>+</span> Vulnerability Disclosure</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className={styles.footerBottom}>
          <div>© 2026 Total Tech Technologies Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
