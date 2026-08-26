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
  'Retail & Supply Chain',
  'Energy & Telecommunications'
];

// 6 Visual Enterprise Practices with Real Editorial Photography
const VISUAL_PRACTICES = [
  {
    id: 'software',
    tag: 'PRACTICE // 01',
    title: 'Custom Software & Web Engineering',
    desc: 'High-throughput full-stack web platforms, microservices APIs, and native mobile applications.',
    image: '/images/software-engineering.jpg',
    pills: ['Next.js 16', 'TypeScript', 'Node.js', 'Python', 'Go', 'iOS/Android']
  },
  {
    id: 'ai',
    tag: 'PRACTICE // 02',
    title: 'Enterprise AI & Data Science',
    desc: 'Private on-premise LLMs, autonomous task workflows, and real-time Kafka lakehouses.',
    image: '/images/ai-data-analytics.jpg',
    pills: ['Private LLMs', 'AI Agents', 'Databricks', 'Snowflake', 'Vector Search']
  },
  {
    id: 'cloud',
    tag: 'PRACTICE // 03',
    title: 'Cloud Computing & DevOps',
    desc: 'AWS, Azure, and Google Cloud infrastructure with Terraform and Kubernetes auto-scaling.',
    image: '/images/cloud-datacenter.jpg',
    pills: ['AWS / Azure / GCP', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', '24/7 SRE']
  },
  {
    id: 'robotics',
    tag: 'PRACTICE // 04',
    title: 'Robotics & Industrial IoT',
    desc: 'Autonomous mobile robot fleet software (ROS 2), SCADA automation, and embedded firmware.',
    image: '/images/robotics-industry.jpg',
    pills: ['ROS 2 Fleet', 'SCADA / PLC', 'Embedded C/C++', 'Industrial IIoT', 'Sensors']
  },
  {
    id: 'security',
    tag: 'PRACTICE // 05',
    title: 'Zero-Trust Cybersecurity',
    desc: 'Penetration testing, continuous vulnerability audits, and SOC2 / ISO 27001 readiness.',
    image: '/images/cybersecurity-defense.jpg',
    pills: ['Zero-Trust IAM', 'SOC2 Type II', 'ISO 27001', 'Penetration Testing', 'HIPAA']
  },
  {
    id: 'advisory',
    tag: 'PRACTICE // 06',
    title: 'Advisory & Digital Modernization',
    desc: 'High-level executive architecture consulting, legacy system refactoring, and IT roadmaps.',
    image: '/images/corporate-advisory.jpg',
    pills: ['Tech Audits', 'Cloud Migration', 'Monolith to Mesh', 'ERP / CRM', 'Cost Optimization']
  }
];

// 12 Core Domains Taxonomy
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

// Delivery Models
const DELIVERY_MODELS = [
  {
    badge: 'MODEL // 01',
    title: 'Dedicated Engineering Pods',
    desc: 'Autonomous, cross-functional engineering teams (Tech Leads, Full-Stack Developers, QA & DevOps) integrated directly with your in-house roadmap.',
    points: [
      'Seamless time-zone alignment with your tech leads',
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
  { step: '01', title: 'Discovery & Architecture', desc: 'Requirement analysis, technical specification, cloud infrastructure design, and project roadmap.' },
  { step: '02', title: 'Agile Sprint Engineering', desc: 'Iterative 2-week development sprints with continuous code reviews, unit tests, and staging demos.' },
  { step: '03', title: 'QA & Security Audit', desc: 'Automated integration testing, OWASP vulnerability scanning, penetration tests, and performance tuning.' },
  { step: '04', title: 'CI/CD Cloud Launch', desc: 'Production release via automated GitHub/GitLab pipelines into AWS, Azure, or private cloud environments.' },
  { step: '05', title: '24/7 SRE & Scale', desc: 'Continuous cloud monitoring, incident response, feature enhancements, and proactive infrastructure scaling.' }
];

// Enterprise Technology Alliances & Languages (TCS / Infosys / Accenture Grade)
const TECH_STACK_TABS = [
  'ALL ALLIANCES',
  'CLOUD & HYPERSCALERS',
  'LANGUAGES & APIS',
  'AI & DATA LAKES',
  'DEVOPS & ROBOTICS'
];

interface TechStackItem {
  name: string;
  category: string;
  tab: string;
  tier: string;
  desc: string;
  sla: string;
  icon: React.ReactNode;
}

const TECH_STACK_DATA: TechStackItem[] = [
  {
    name: 'Amazon Web Services',
    category: 'CLOUD INFRA',
    tab: 'CLOUD & HYPERSCALERS',
    tier: 'PREMIER CLOUD PARTNER',
    desc: 'Multi-region VPCs, Serverless Lambda, and resilient enterprise cloud infrastructure.',
    sla: '99.99% Cloud SLA',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M6.2 11.5c0-.6.4-1 1-1h1.7c.6 0 1 .4 1 1v4.3c0 .6-.4 1-1 1H7.2c-.6 0-1-.4-1-1v-4.3zm6.3-3.2c0-.6.4-1 1-1h1.7c.6 0 1 .4 1 1v7.5c0 .6-.4 1-1 1h-1.7c-.6 0-1-.4-1-1V8.3zm-10.4 9.9c4.2 2.6 9.4 3 13.9 1.1.5-.2.9.3.6.7-4.1 3.5-10.4 3.4-14.9-.7-.3-.4 0-1 .4-1.1zm18.8-.5c-.3-.4-1.8-.2-2.7-.1-.3 0-.3-.3-.1-.5 1.5-1.1 3.9-.8 4.2-.4.3.4-.1 2.8-1.5 3.9-.2.2-.5.1-.4-.2.4-.9.7-2.4.5-2.7z" fill="#FF9900" />
      </svg>
    )
  },
  {
    name: 'Microsoft Azure',
    category: 'CLOUD PLATFORM',
    tab: 'CLOUD & HYPERSCALERS',
    tier: 'GOLD ALLIANCE PARTNER',
    desc: 'Enterprise Active Directory IAM, Azure Kubernetes (AKS), and private enterprise AI.',
    sla: 'Zero-Trust IAM',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M13.2 2.4L3.6 19.2h5.4L13.2 11l4.8 8.2h2.4L13.2 2.4zm-1.8 9.6l-3.3 5.7h6.6l-3.3-5.7z" fill="#0078D4" />
      </svg>
    )
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'DATA & CLOUD',
    tab: 'CLOUD & HYPERSCALERS',
    tier: 'PREMIER PARTNER',
    desc: 'BigQuery petabyte analytics, Google Kubernetes Engine (GKE), and Vertex AI models.',
    sla: 'Multi-Region Mesh',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
      </svg>
    )
  },
  {
    name: 'Kubernetes (K8s)',
    category: 'CONTAINER MESH',
    tab: 'CLOUD & HYPERSCALERS',
    tier: 'CNCF CERTIFIED MESH',
    desc: 'Production cluster orchestration, zero-downtime rolling deploys, and automated scaling.',
    sla: 'Auto-Scaling Mesh',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#326CE5">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.3L5.34 8.16v7.68L12 19.7l6.66-3.86V8.16L12 4.3zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    )
  },
  {
    name: 'Next.js 16 & React',
    category: 'ENTERPRISE FRONTEND',
    tab: 'LANGUAGES & APIS',
    tier: 'CORE FRONTEND STACK',
    desc: 'React 19 Server Components, sub-50ms edge rendering, and enterprise web applications.',
    sla: 'Sub-50ms SSR',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#0A2556">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 17.653l-6.536-8.527V17h-2V7h2l6.536 8.527V7h2v10.653h-2z" />
      </svg>
    )
  },
  {
    name: 'TypeScript',
    category: 'TYPE-SAFE LANGUAGE',
    tab: 'LANGUAGES & APIS',
    tier: 'STRICT CODE BASELINE',
    desc: 'Strict type safety, automated API contract interfaces, and zero runtime type errors.',
    sla: 'Strict Type Safety',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 8.5H6.5v2h1.6v6.5h2.1V10.5h1.3v-2zm3.3 5.4c.5.3 1.1.5 1.7.5.8 0 1.2-.3 1.2-.8 0-.5-.4-.7-1.3-1-1.3-.4-2.1-1-2.1-2.1 0-1.3 1.1-2.2 2.7-2.2.8 0 1.5.2 2 .5l-.5 1.5c-.4-.2-.9-.4-1.5-.4-.6 0-1 .3-1 .7 0 .4.4.6 1.2.9 1.4.5 2.2 1.1 2.2 2.2 0 1.4-1.1 2.3-2.9 2.3-.9 0-1.8-.2-2.4-.6l.7-1.5z" fill="#FFF" />
      </svg>
    )
  },
  {
    name: 'Node.js Enterprise',
    category: 'BACKEND RUNTIME',
    tab: 'LANGUAGES & APIS',
    tier: 'CERTIFIED RUNTIME',
    desc: 'Event-driven high-concurrency microservices, GraphQL APIs, and asynchronous message processors.',
    sla: 'High-Throughput IO',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#5FA04E">
        <path d="M12 2l10 5.75v11.5L12 25 2 19.25V7.75L12 2zm0 2.3L4 8.9v9.2l8 4.6 8-4.6V8.9L12 4.3z" />
        <path d="M12 7l6 3.45v6.9L12 20.8l-6-3.45v-6.9L12 7z" />
      </svg>
    )
  },
  {
    name: 'Python & AI Stack',
    category: 'AI & DATA SCIENCE',
    tab: 'LANGUAGES & APIS',
    tier: 'AI CORE LANGUAGE',
    desc: 'PyTorch machine learning pipelines, FastAPI microservices, and private enterprise LLMs.',
    sla: 'Air-Gapped AI',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M11.87 2c-5.46 0-5.11 2.36-5.11 2.36l.01 2.45h5.18v.74H4.59S2 7.26 2 12.74c0 5.49 2.26 5.3 2.26 5.3h1.35v-1.88s-.07-2.26 2.22-2.26h5.16s2.14.04 2.14-2.09V4.09S15.65 2 11.87 2zm-1.45 1.52c.48 0 .86.39.86.87 0 .48-.38.86-.86.86-.48 0-.87-.38-.87-.86 0-.48.39-.87.87-.87zm.26 18.48c5.46 0 5.11-2.36 5.11-2.36l-.01-2.45h-5.18v-.74h7.36s2.59.29 2.59-5.19c0-5.49-2.26-5.3-2.26-5.3h-1.35v1.88s.07 2.26-2.22 2.26H9.12s-2.14-.04-2.14 2.09v7.72s-.52 2.09 3.26 2.09zm1.45-1.52c-.48 0-.86-.39-.86-.87 0-.48.38-.86.86-.86.48 0 .87.38.87.86 0 .48-.39.87-.87.87z" fill="#3776AB" />
      </svg>
    )
  },
  {
    name: 'Go (Golang)',
    category: 'MICROSERVICES',
    tab: 'LANGUAGES & APIS',
    tier: 'PERFORMANCE ENGINE',
    desc: 'High-speed concurrent services, gRPC protocol communication, and network edge gateways.',
    sla: 'Sub-10ms gRPC',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#00ADD8">
        <path d="M1.8 10.3c.3-1.6 1.4-2.8 3-3.2 1.6-.4 3.3.1 4.5 1.2l-1.4 1.4c-.8-.7-1.8-1-2.8-.7-.9.2-1.6 1-1.8 2-.3 1.3.4 2.6 1.7 3 1.1.4 2.3 0 3-.8v-1.1H5.7v-1.8h4.5v3.8c-1.1 1.2-2.7 1.8-4.3 1.6-2.2-.3-3.9-2-4.1-4.2v-1.2zm14.6-3.1c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6zm0 2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z" />
      </svg>
    )
  },
  {
    name: 'Snowflake Data Cloud',
    category: 'DATA WAREHOUSE',
    tab: 'AI & DATA LAKES',
    tier: 'ELITE ALLIANCE',
    desc: 'Centralized enterprise data mesh, real-time SQL querying, and secure data sharing.',
    sla: 'Petabyte Scale',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#29B5E8">
        <path d="M12 0l1.2 3.6L15 2.4l.8 1.4-1.8 1.8 3.6 1.2v1.6l-3.6 1.2 1.8 1.8-.8 1.4-1.8-1.2L12 16.4l-1.2-3.6-1.8 1.2-.8-1.4 1.8-1.8L6.4 9.6V8l3.6-1.2-1.8-1.8.8-1.4 1.8 1.2L12 0zm0 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8zm0 16.4l-1.2-3.6-1.8 1.2-.8-1.4 1.8-1.8-3.6-1.2v-1.6l3.6-1.2-1.8-1.8.8-1.4 1.8 1.2L12 7.6l1.2 3.6 1.8-1.2.8 1.4-1.8 1.8 3.6 1.2v1.6l-3.6 1.2 1.8 1.8-.8 1.4-1.8-1.2L12 24z" />
      </svg>
    )
  },
  {
    name: 'Databricks Lakehouse',
    category: 'LAKEHOUSE & AI',
    tab: 'AI & DATA LAKES',
    tier: 'SELECT PARTNER',
    desc: 'Apache Spark distributed data processing, automated ML feature stores, and delta lake tables.',
    sla: 'Delta Lake Mesh',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#FF3621">
        <path d="M12 1.5l10.5 6.06v1.88L12 3.38 1.5 9.44V7.56L12 1.5zm0 4.88l10.5 6.06v1.88L12 8.26 1.5 14.32v-1.88L12 6.38zm0 4.88l10.5 6.06v1.88l-10.5-6.06-10.5 6.06v-1.88l10.5-6.06zm0 4.88l10.5 6.06v1.88L12 18.02 1.5 24.08v-1.88l10.5-6.06z" />
      </svg>
    )
  },
  {
    name: 'PostgreSQL & pgvector',
    category: 'ENTERPRISE DATABASE',
    tab: 'AI & DATA LAKES',
    tier: 'ENTERPRISE STANDARD',
    desc: 'High-throughput ACID transactional database with vector indexing for generative AI search.',
    sla: 'Zero-Downtime HA',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V19h-2v-.07C7.05 18.5 4 15.6 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 3.6-3.05 6.5-7 6.93z" />
      </svg>
    )
  },
  {
    name: 'HashiCorp Terraform',
    category: 'INFRASTRUCTURE AS CODE',
    tab: 'DEVOPS & ROBOTICS',
    tier: 'CERTIFIED IaC STACK',
    desc: 'Multi-cloud automated provisioning, zero configuration drift, and reproducible environments.',
    sla: 'Zero-Drift IaC',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#7B42BC">
        <path d="M1.5 2.5h6.3v7.2H1.5zm7.3 7.2h6.3v7.2H8.8zm7.4-7.2h6.3v7.2h-6.3zm0 7.2h6.3v7.2h-6.3zm-7.4 7.3h6.3v7.2H8.8z" />
      </svg>
    )
  },
  {
    name: 'Docker Enterprise',
    category: 'CONTAINERIZATION',
    tab: 'DEVOPS & ROBOTICS',
    tier: 'DEVSECOPS STANDARD',
    desc: 'Standardized container runtimes, immutable build artifacts, and automated security scans.',
    sla: 'Immutable Containers',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#2496ED">
        <path d="M13 3.5h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm9 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm-3 0h2v2H1zm22.4 1.4c-.3-.2-1.5-.4-2.8.3-.4.2-.7.5-.9.8-.7-.4-1.7-.5-2.7-.4v.6c0 3.3-2.5 6-6 6-1.5 0-3-.5-4.1-1.4-.4-.3-.9-.6-1.5-.6s-1.1.2-1.5.5C.4 14.8 0 15.9 0 17.1c0 3.5 3.8 5.4 9.5 5.4 7.6 0 12.9-3.9 13.9-9.9.1-.4 0-.8-.2-1.1-.2-.2-.5-.4-.8-.5z" />
      </svg>
    )
  },
  {
    name: 'ROS 2 (Robotics OS)',
    category: 'ROBOTICS & IIoT',
    tab: 'DEVOPS & ROBOTICS',
    tier: 'INDUSTRIAL STANDARD',
    desc: 'Autonomous mobile robot (AMR) navigation, real-time sensor fusion, and SCADA integration.',
    sla: 'Real-Time Fleet',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30">
        <circle cx="6" cy="6" r="3" fill="#0052CC" />
        <circle cx="12" cy="6" r="3" fill="#0052CC" />
        <circle cx="18" cy="6" r="3" fill="#0052CC" />
        <circle cx="6" cy="12" r="3" fill="#0052CC" />
        <circle cx="12" cy="12" r="3" fill="#00A3FF" />
        <circle cx="18" cy="12" r="3" fill="#0052CC" />
        <circle cx="6" cy="18" r="3" fill="#0052CC" />
        <circle cx="12" cy="18" r="3" fill="#0052CC" />
        <circle cx="18" cy="18" r="3" fill="#0052CC" />
      </svg>
    )
  },
  {
    name: 'Apache Kafka',
    category: 'EVENT STREAMING',
    tab: 'AI & DATA LAKES',
    tier: 'HIGH-VOLUME BROKER',
    desc: 'Distributed streaming platform for high-throughput real-time data pipelines and messaging.',
    sla: 'Sub-5ms Latency',
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="#0A2556">
        <circle cx="12" cy="12" r="4" fill="#0052CC" />
        <path d="M12 2a10 10 0 1010 10h-2.1a7.9 7.9 0 11-7.9-7.9V2zm0 4a6 6 0 106 6h-2a4 4 0 11-4-4V6z" fill="#0052CC" />
      </svg>
    )
  }
];

// Global Office Hubs
const GLOBAL_HUBS = [
  {
    city: 'New York Headquarters',
    address: '105 Maxess Road, Melville, NY 11747',
    phone: '(631) 452-1111',
    image: '/images/office-newyork.jpg'
  },
  {
    city: 'Florida Innovation Hub',
    address: '850 NW Federal Hwy, Stuart, FL 34994',
    phone: '(772) 297-0700',
    image: '/images/office-toronto.jpg'
  },
  {
    city: 'Canada Engineering Center',
    address: 'One Yonge Street, Toronto, ON M5E 1R4',
    phone: '+1 (418) 805-9990',
    image: '/images/hero-enterprise.jpg'
  }
];

// Executive Testimonials
const TESTIMONIALS = [
  {
    quote: 'Total Tech integrated an autonomous engineering pod into our product roadmap within 3 weeks. Their microservices architecture helped us scale transaction volume by 400% without downtime.',
    author: 'Chief Technology Officer',
    role: 'Tier-1 Financial Services Platform'
  },
  {
    quote: 'Total Tech engineered the real-time sensor processing and embedded firmware for our bionic medical hardware, achieving sub-2ms response latency under strict ISO compliance baselines.',
    author: 'VP of Engineering',
    role: 'Biomedical Robotics & Life Sciences Group'
  },
  {
    quote: 'Total Tech’s robotics engineers developed our autonomous mobile fleet controller using ROS 2, optimizing fulfillment routing across 12 distribution centers in North America.',
    author: 'Head of Industrial Automation',
    role: 'Global Logistics Corporation'
  }
];

// Enterprise FAQs
const FAQS = [
  {
    q: 'How quickly can Total Tech deploy a dedicated engineering pod?',
    a: 'Our standard dedicated pod onboarding timeline is 2 to 4 weeks. Pods include a Dedicated Tech Lead, Full-Stack Engineers, QA Automation Specialists, and DevOps SREs matched directly to your technology stack and time zone.'
  },
  {
    q: 'How does Total Tech protect enterprise intellectual property and data?',
    a: '100% of code, architecture diagrams, and artifacts created are owned by your enterprise under full IP assignment. All engineering operations adhere to strict SOC2 Type II, zero-trust IAM access, and confidentiality NDAs.'
  },
  {
    q: 'What cloud platforms and architectures do you support?',
    a: 'We architect and manage production workloads on AWS, Microsoft Azure, Google Cloud Platform, and private air-gapped on-premise Kubernetes clusters using Terraform Infrastructure as Code.'
  },
  {
    q: 'Do you offer 24/7 post-launch support and SLAs?',
    a: 'Yes. We provide 24/7 Site Reliability Engineering (SRE) support with guaranteed response times under strict Service Level Agreements (SLAs), continuous monitoring, security patching, and proactive scaling.'
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTechTab, setActiveTechTab] = useState('ALL ALLIANCES');
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = useMemo(() => [
    'Custom Software & Web Engineering',
    'AI & Enterprise Data Science',
    'Robotics & Industrial Automation',
    'Zero-Trust Cloud & DevOps',
    'Financial Services & Banking',
    'Healthcare & Life Sciences'
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
          1. HERO SECTION WITH EXACT RESTORED VECTOR CIRCUIT BACKGROUND
          ========================================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
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
              Total Tech Technologies serves as one unified platform spanning the entire technology universe — engineering high-throughput software, private enterprise AI, industrial robotics, and resilient cloud architectures for industry-leading enterprises, financial institutions, and global innovators.
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

          {/* Institutional KPI Telemetry Ribbon */}
          <div className={styles.kpiRibbon}>
            <div className={styles.kpiItem}>
              <div className={styles.kpiVal}>99.99%</div>
              <div className={styles.kpiLbl}>ENTERPRISE SLA UPTIME</div>
            </div>
            <div className={styles.kpiItem}>
              <div className={styles.kpiVal}>SOC2 Type II</div>
              <div className={styles.kpiLbl}>ZERO-TRUST ASSURANCE</div>
            </div>
            <div className={styles.kpiItem}>
              <div className={styles.kpiVal}>&lt;50ms</div>
              <div className={styles.kpiLbl}>GLOBAL EDGE LATENCY</div>
            </div>
            <div className={styles.kpiItem}>
              <div className={styles.kpiVal}>2–4 Weeks</div>
              <div className={styles.kpiLbl}>DEDICATED POD SCALING</div>
            </div>
          </div>

          {/* 4 Clean Executive Practice Highlights */}
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
          2. "INDUSTRIES WE TRANSFORM" RAIL
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
          3. EXECUTIVE VALUE PROPOSITION / ABOUT TOTAL TECH
          ========================================================================= */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.sectionContainer}>
          <div className={styles.aboutGrid}>
            <div>
              <span className={styles.sectionPre}>Institutional Authority</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: '2.4rem', marginBottom: '18px' }}>
                One Single Platform to the Tech Universe.
              </h2>
              <p style={{ color: '#1E467A', fontSize: '14.5px', lineHeight: '1.7', marginBottom: '16px' }}>
                From modern web platforms and mission-critical cloud infrastructure to autonomous robotics and enterprise AI, Total Tech delivers comprehensive engineering capability through a single unified partnership.
              </p>
              <ul className={styles.aboutPoints}>
                <li className={styles.aboutPointItem}>
                  <div className={styles.aboutPointIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: '#0A2556', fontSize: '13.5px' }}>Seamless Co-Engineering Pods</strong>
                    <p style={{ color: '#1E467A', fontSize: '12.5px', marginTop: '2px' }}>Direct sprint synchronization, dedicated time-zone alignment, and daily transparent commits with your engineering leadership.</p>
                  </div>
                </li>
                <li className={styles.aboutPointItem}>
                  <div className={styles.aboutPointIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: '#0A2556', fontSize: '13.5px' }}>Zero-Trust SOC2 & ISO Compliance</strong>
                    <p style={{ color: '#1E467A', fontSize: '12.5px', marginTop: '2px' }}>Strict security baselines, encrypted CI/CD pipelines, and air-gapped data architectures.</p>
                  </div>
                </li>
                <li className={styles.aboutPointItem}>
                  <div className={styles.aboutPointIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div>
                    <strong style={{ color: '#0A2556', fontSize: '13.5px' }}>100% Intellectual Property Ownership</strong>
                    <p style={{ color: '#1E467A', fontSize: '12.5px', marginTop: '2px' }}>Complete assignment of all source code, architecture patents, and custom model weights to your organization.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.aboutImageWrapper}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.aboutVideo}
                poster="/images/hero-enterprise.jpg"
              >
                <source src="/videos/gettyimages-2177769949-640_adpp.mp4" type="video/mp4" />
              </video>
              <div className={styles.aboutBadgeOverlay}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--blue-300)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ENTERPRISE CO-ENGINEERING
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                  DEDICATED PODS • 2–4 WEEK DEPLOYMENT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CORE VISUAL PRACTICE SHOWCASE (REAL EDITORIAL PHOTOGRAPHY)
          ========================================================================= */}
      <section className={styles.ecosystemSection} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionPre}>Enterprise Capability Directory</span>
              <h2 className={styles.sectionTitle}>Our Core Practices & Services.</h2>
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

          {/* Visual Practice Cards with Real Photography */}
          <div className={styles.visualPracticeGrid}>
            {VISUAL_PRACTICES.filter((p) =>
              !searchQuery ||
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.pills.some((pill) => pill.toLowerCase().includes(searchQuery.toLowerCase()))
            ).map((practice) => (
              <div key={practice.id} className={styles.visualPracticeCard}>
                <div className={styles.visualPracticeImageWrapper}>
                  <Image
                    src={practice.image}
                    alt={practice.title}
                    width={600}
                    height={340}
                    className={styles.visualPracticeImg}
                  />
                  <div className={styles.visualPracticeBadge}>{practice.tag}</div>
                </div>

                <div className={styles.visualPracticeBody}>
                  <div>
                    <h3 className={styles.visualPracticeTitle}>{practice.title}</h3>
                    <p className={styles.visualPracticeDesc}>{practice.desc}</p>
                  </div>

                  <div className={styles.visualPracticeCapabilities}>
                    {practice.pills.map((pill, pIdx) => (
                      <span key={pIdx} className={styles.visualPracticePill}>
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. COMPREHENSIVE 12-PRACTICE TAXONOMY DIRECTORY
          ========================================================================= */}
      <section className={styles.ecosystemSection} style={{ background: '#FFFFFF' }}>
        <div className={styles.sectionContainer}>
          <div style={{ marginBottom: '36px' }}>
            <span className={styles.sectionPre}>Complete Practice Matrix</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: '2.1rem' }}>
              Full-Stack Domain Taxonomy.
            </h2>
          </div>

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
          6. DELIVERY BLUEPRINT & ENGAGEMENT MODELS
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
          7. 5-STAGE ENGINEERING LIFECYCLE
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
          8. TECHNOLOGY ECOSYSTEM & PARTNER CLOUD STACK (TCS / ACCENTURE GRADE)
          ========================================================================= */}
      <section className={styles.techStackSection}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 28px' }}>
            <span className={styles.sectionPre}>Enterprise Technology Alliances</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: '2.3rem' }}>
              Built On Modern Enterprise Technologies & Alliances.
            </h2>
            <p style={{ color: '#1E467A', fontSize: '14px', lineHeight: '1.6', marginTop: '10px' }}>
              Total Tech engineers scalable architectures leveraging premier global cloud alliances, high-throughput programming languages, and enterprise-grade data platforms.
            </p>
          </div>

          {/* Interactive Technology Tabs */}
          <div className={styles.techFilterTabs}>
            {TECH_STACK_TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.techTab} ${activeTechTab === tab ? styles.techTabActive : ''}`}
                onClick={() => setActiveTechTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 16 Enterprise Technology Alliance Cards */}
          <div className={styles.techStackGrid}>
            {TECH_STACK_DATA.filter((item) =>
              activeTechTab === 'ALL ALLIANCES' || item.tab === activeTechTab
            ).map((tech, idx) => (
              <div key={idx} className={styles.techStackCard}>
                <div>
                  <div className={styles.techStackHeader}>
                    <div className={styles.techStackIconFrame}>
                      {tech.icon}
                    </div>
                    <span className={styles.techStackCategory}>{tech.category}</span>
                  </div>

                  <h3 className={styles.techStackName}>{tech.name}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--blue-500)', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.04em' }}>
                    {tech.tier}
                  </div>
                  <p className={styles.techStackDesc}>{tech.desc}</p>
                </div>

                <div className={styles.techStackFooter}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={styles.techStackStatusDot} />
                    <span>PRODUCTION READY</span>
                  </div>
                  <span style={{ color: 'var(--blue-600)', fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>{tech.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FEATURED CLIENT CASE STUDIES & SOLUTIONS
          ========================================================================= */}
      <section className={styles.caseStudiesSection} id="case-studies">
        <div className={styles.sectionContainer}>
          <div style={{ marginBottom: '44px' }}>
            <span className={styles.sectionPre}>Proven Work</span>
            <h2 className={styles.sectionTitle}>Featured Client Solutions.</h2>
          </div>

          <div className={styles.caseGrid}>
            {/* Case 01: Robotics */}
            <div className={styles.caseCard}>
              <div className={styles.caseImageWrapper}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.caseImage}
                  poster="/images/robotics-automation.jpg"
                >
                  <source src="/videos/gettyimages-2288224107-640_adpp.mp4" type="video/mp4" />
                </video>
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

            {/* Case 02: Robotics, IoT & Multi-Cloud Platform */}
            <div className={styles.caseCard}>
              <div className={styles.caseImageWrapper}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.caseImage}
                  poster="/images/cloud-fintech.jpg"
                >
                  <source src="/videos/Secure Multi-Cloud-Web-Platform.mp4" type="video/mp4" />
                </video>
              </div>
              <div className={styles.caseHeader}>
                <div className={styles.caseClient}>ROBOTICS, IIoT & MULTI-CLOUD PLATFORM</div>
                <h3 className={styles.caseTitle}>Secure Multi-Cloud Web Platform</h3>
              </div>
              <div className={styles.caseBody}>
                <p className={styles.caseDesc}>
                  Engineered a secure multi-cloud web platform connecting distributed industrial IoT telemetry, autonomous robotics fleet operations, and high-throughput data processing.
                </p>
                <div>
                  <div className={styles.impactMetrics}>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Sub-50ms</div>
                      <div className={styles.impactLbl}>Edge IoT Telemetry</div>
                    </div>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>Multi-Cloud</div>
                      <div className={styles.impactLbl}>Zero-Trust Mesh</div>
                    </div>
                  </div>
                  <div className={styles.caseStack}>
                    <span className={styles.stackBadge}>Next.js 16</span>
                    <span className={styles.stackBadge}>ROS 2 / IoT</span>
                    <span className={styles.stackBadge}>AWS / Azure</span>
                    <span className={styles.stackBadge}>PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 03: Biomedical Robotics & IoT Sensor Telemetry */}
            <div className={styles.caseCard}>
              <div className={styles.caseImageWrapper}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.caseImage}
                  poster="/images/healthcare-ai.jpg"
                >
                  <source src="/videos/gettyimages-2235857041-640_adpp.mp4" type="video/mp4" />
                </video>
              </div>
              <div className={styles.caseHeader}>
                <div className={styles.caseClient}>BIOMEDICAL ROBOTICS & EMBEDDED IoT</div>
                <h3 className={styles.caseTitle}>Bionic Robotics & Sensor Telemetry</h3>
              </div>
              <div className={styles.caseBody}>
                <p className={styles.caseDesc}>
                  Engineered real-time embedded firmware, digital waveform telemetry interfaces, and low-latency motor control algorithms for advanced bionic robotic limbs.
                </p>
                <div>
                  <div className={styles.impactMetrics}>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>&lt;2ms</div>
                      <div className={styles.impactLbl}>Firmware Latency</div>
                    </div>
                    <div className={styles.impactBox}>
                      <div className={styles.impactVal}>ISO 13485</div>
                      <div className={styles.impactLbl}>Medical Ready</div>
                    </div>
                  </div>
                  <div className={styles.caseStack}>
                    <span className={styles.stackBadge}>Embedded C/C++</span>
                    <span className={styles.stackBadge}>ROS 2 Telemetry</span>
                    <span className={styles.stackBadge}>IoT Sensors</span>
                    <span className={styles.stackBadge}>Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. GOVERNANCE & ENGINEERING STANDARDS
          ========================================================================= */}
      <section className={styles.governanceSection} id="standards">
        <div className={styles.sectionContainer}>
          <div className={styles.govGrid}>
            <div>
              <span className={styles.sectionPre}>Quality & Assurance</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: '2.1rem' }}>
                Engineering Standards & Reliability.
              </h2>
              <p style={{ color: '#1E467A', fontSize: '13.5px', lineHeight: '1.65', marginTop: '12px' }}>
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
              <span className={styles.sectionPre}>Regulatory Assurance</span>
              <h2 className={styles.sectionTitle} style={{ fontSize: '2.1rem' }}>
                Institutional Compliance Matrix.
              </h2>
              <p style={{ color: '#1E467A', fontSize: '13.5px', lineHeight: '1.65', marginTop: '12px' }}>
                Prepared for complex regulatory requirements across banking, healthcare, and global supply chains.
              </p>

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
          11. GLOBAL HUBS & DELIVERY CENTERS
          ========================================================================= */}
      <section className={styles.hubsSection}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <span className={styles.sectionPre}>Global Footprint</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: '2.1rem' }}>
              Global Engineering & Delivery Hubs.
            </h2>
          </div>

          <div className={styles.hubsGrid}>
            {GLOBAL_HUBS.map((hub, idx) => (
              <div key={idx} className={styles.hubCard}>
                <div className={styles.hubImageWrapper}>
                  <Image
                    src={hub.image}
                    alt={hub.city}
                    width={600}
                    height={300}
                    className={styles.hubImage}
                  />
                </div>
                <div className={styles.hubBody}>
                  <h3 className={styles.hubCity}>{hub.city}</h3>
                  <p className={styles.hubAddress}>{hub.address}</p>
                  <div className={styles.hubPhone}>{hub.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. INNOVATION LAB & R&D
          ========================================================================= */}
      <section className={styles.labSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.labGrid}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--blue-300)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                RESEARCH & DEVELOPMENT
              </span>
              <h2 className={styles.labTitle}>Enterprise Deep-Tech Lab.</h2>
              <p className={styles.labDesc}>
                Total Tech maintains dedicated R&D pods pioneering industrial digital twin simulations, autonomous task agent workflows, and low-latency edge AI models for next-generation enterprise applications.
              </p>
              <a href="#contact" className={styles.btnPrimary} style={{ background: 'var(--blue-500)', border: 'none' }}>
                <span>EXPLORE R&D INITIATIVES</span>
                <span>→</span>
              </a>
            </div>

            <div>
              <div className={styles.labCards}>
                <div className={styles.labCard}>
                  <h4>Digital Twin Modeling</h4>
                  <p>Real-time physical asset simulation and predictive failure analysis.</p>
                </div>
                <div className={styles.labCard}>
                  <h4>Autonomous Multi-Agents</h4>
                  <p>Task automation workflows orchestrating complex ERP & CRM pipelines.</p>
                </div>
                <div className={styles.labCard}>
                  <h4>Edge AI & Computer Vision</h4>
                  <p>Sub-10ms visual defect inspection directly on factory floor microcontrollers.</p>
                </div>
                <div className={styles.labCard}>
                  <h4>Private Vector Lakehouse</h4>
                  <p>Air-gapped enterprise search indexed over petabyte-scale knowledge bases.</p>
                </div>
              </div>

              <div className={styles.labVideoWrapper}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.labVideo}
                >
                  <source src="/videos/gettyimages-2291182648-640_adpp.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. TESTIMONIALS & EXECUTIVE QUOTES
          ========================================================================= */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <span className={styles.sectionPre}>Client Trust</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: '2.1rem' }}>
              What Engineering Leaders Say.
            </h2>
          </div>

          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <p className={styles.quoteText}>"{t.quote}"</p>
                <div>
                  <div className={styles.authorName}>{t.author}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. FREQUENTLY ASKED QUESTIONS (FAQ)
          ========================================================================= */}
      <section className={styles.faqSection}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
            <span className={styles.sectionPre}>Clarity & Transparency</span>
            <h2 className={styles.sectionTitle} style={{ fontSize: '2.1rem' }}>
              Frequently Asked Questions.
            </h2>
          </div>

          <div className={styles.faqGrid}>
            {FAQS.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.q}</h3>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          15. CONTACT & CONSULTATION INTAKE PORTAL
          ========================================================================= */}
      <section className={styles.consultationSection} id="contact">
        <div className={styles.consultationContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#0A2556', fontWeight: 800 }}>
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
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--blue-500)', marginBottom: '12px' }}>
                THANK YOU FOR REACHING OUT
              </div>
              <p style={{ color: '#0A2556', fontSize: '14.5px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                We have received your message. A technical consultant from our team will reach back out to you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          16. GLOBAL HUBS & CORPORATE FOOTER
          ========================================================================= */}
      <footer className={styles.footerSection}>
        <div className={styles.footerTopRow}>
          {/* Brand Info */}
          <div className={styles.footerBrandCol}>
            <div className={styles.footerLogoContainer}>
              <Image
                src="/logo_white_transparent.png"
                alt="Total Tech Technologies"
                width={180}
                height={38}
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
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Technical Case Studies</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Whitepapers & Reports</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Engineering Blog</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Open Source Projects</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Documentation Portal</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Client Portal Access</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Architecture Blueprints</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> API Reference Docs</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Security Advisories</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Status & Monitoring</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Learning Center</Link></li>
              <li><Link href="#case-studies" className={styles.columnLink}><span>+</span> Technology Glossary</Link></li>
            </ul>
          </div>

          {/* Column 5: COMPANY */}
          <div className={styles.linkColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnSquare}></span>
              COMPANY
            </div>
            <ul className={styles.columnList}>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> About Total Tech</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Leadership & Team</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Global Office Hubs</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Career Opportunities</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Brand & Media Kit</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Partner Ecosystem</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Newsroom & Press</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Sustainability Goals</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Research Lab</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Investor Relations</Link></li>
              <li><Link href="#about" className={styles.columnLink}><span>+</span> Community Initiatives</Link></li>
              <li><Link href="#contact" className={styles.columnLink}><span>+</span> Contact Enterprise</Link></li>
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
