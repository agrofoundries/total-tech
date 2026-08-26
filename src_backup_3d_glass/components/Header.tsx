"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

// 6 Core US Enterprise IT Practices with rich corporate descriptions
const ECOSYSTEM_DOMAINS = [
  {
    id: 'software',
    name: '01. Custom Software & Web',
    groups: [
      {
        title: 'Web & Applications',
        links: [
          { name: 'Next.js & React Enterprise', desc: 'Scalable, high-performance web frontends.' },
          { name: 'Node.js & Python Backend', desc: 'Secure backend APIs and distributed services.' },
          { name: 'Modern Web Platforms', desc: 'Edge-rendered, search-optimized web apps.' },
          { name: 'API & Microservices', desc: 'Event-driven and real-time backend links.' }
        ]
      },
      {
        title: 'Mobile Development',
        links: [
          { name: 'iOS Apps (Swift)', desc: 'Premium, native iOS products built with SwiftUI.' },
          { name: 'Android Apps (Kotlin)', desc: 'High-performance native Android applications.' },
          { name: 'Cross-Platform Mobile', desc: 'React Native & Flutter mobile app solutions.' },
          { name: 'Enterprise Apps', desc: 'Offline sync, secure storage, and MDM integration.' }
        ]
      },
      {
        title: 'Custom Engineering',
        links: [
          { name: 'Full-Stack Systems', desc: 'End-to-end custom application engineering.' },
          { name: 'Cloud Migration', desc: 'Seamless migration of legacy logic to cloud.' },
          { name: 'Legacy Modernization', desc: 'Refactoring monoliths into microservices.' },
          { name: 'Database Architecture', desc: 'High-availability SQL and vector databases.' }
        ]
      }
    ]
  },
  {
    id: 'ai',
    name: '02. AI & Data Solutions',
    groups: [
      {
        title: 'Artificial Intelligence',
        links: [
          { name: 'Custom Enterprise LLMs', desc: 'Fine-tuned private models trained on your data.' },
          { name: 'AI Agents & Automation', desc: 'Autonomous workflows and task automation.' },
          { name: 'Document Intelligence', desc: 'Automated data extraction from PDFs and sheets.' },
          { name: 'Model Integration', desc: 'Deploying custom weights to production APIs.' }
        ]
      },
      {
        title: 'Computer Vision',
        links: [
          { name: 'Object Detection', desc: 'Real-time object tracking and segmentation.' },
          { name: 'Visual Quality Inspection', desc: 'Automated defect detection on assembly lines.' },
          { name: 'OCR & Document Scanning', desc: 'High-accuracy text recognition and parsing.' },
          { name: 'Image Recognition', desc: 'Custom classification and search indexing.' }
        ]
      },
      {
        title: 'Data & Analytics',
        links: [
          { name: 'Data Warehousing & BI', desc: 'Snowflake & Databricks pipelines.' },
          { name: 'Real-Time Data Pipelines', desc: 'High-throughput Kafka streaming services.' },
          { name: 'Predictive Analytics', desc: 'Forecasting demand using machine learning.' },
          { name: 'Reporting Dashboards', desc: 'Executive BI dashboards and visual portals.' }
        ]
      }
    ]
  },
  {
    id: 'robotics',
    name: '03. Robotics & IoT',
    groups: [
      {
        title: 'Industrial Automation',
        links: [
          { name: 'Warehouse Automation', desc: 'Fleet coordination and sorting logistics.' },
          { name: 'Robotics Software (ROS 2)', desc: 'Navigation, mapping, and control algorithms.' },
          { name: 'Machine Integration', desc: 'Connecting PLCs and SCADA networks.' },
          { name: 'Automated Logistics', desc: 'Autonomous guided vehicles (AGVs) logic.' }
        ]
      },
      {
        title: 'Embedded Systems',
        links: [
          { name: 'Firmware Development', desc: 'Real-time microcontroller firmware (C/C++).' },
          { name: 'Microcontroller Logic', desc: 'Custom drivers and protocol handling.' },
          { name: 'Hardware Prototyping', desc: 'PCB selection and system architecture.' },
          { name: 'Real-Time Control', desc: 'Low-latency loop control and sensor fusion.' }
        ]
      },
      {
        title: 'IoT Networks',
        links: [
          { name: 'Industrial IoT (IIoT)', desc: 'Deploying smart sensor networks in factories.' },
          { name: 'Smart Sensor Arrays', desc: 'Environmental and condition monitoring.' },
          { name: 'Fleet Telematics', desc: 'Asset tracking, fuel logging, and diagnostics.' },
          { name: 'Facility Monitoring', desc: 'Proactive maintenance alerts and heatmaps.' }
        ]
      }
    ]
  },
  {
    id: 'cloud',
    name: '04. Cloud & DevOps',
    groups: [
      {
        title: 'Cloud Infrastructure',
        links: [
          { name: 'AWS, Azure & Google Cloud', desc: 'Multi-cloud strategy and network design.' },
          { name: 'Kubernetes & Docker', desc: 'Container scheduling and cluster configuration.' },
          { name: 'Serverless Systems', desc: 'Cost-optimized Lambda and Cloud Functions.' },
          { name: 'Hybrid Cloud Setup', desc: 'Secure connection to on-prem data centers.' }
        ]
      },
      {
        title: 'DevOps & CI/CD',
        links: [
          { name: 'Automated Deployment', desc: 'GitOps pipelines for zero-downtime releases.' },
          { name: 'Infrastructure as Code', desc: 'Terraform, Ansible, and CloudFormation setups.' },
          { name: '24/7 Monitoring & SRE', desc: 'Datadog & Prometheus alerts management.' },
          { name: 'Disaster Recovery', desc: 'Automated backup validation and recovery runbooks.' }
        ]
      },
      {
        title: 'Network Systems',
        links: [
          { name: 'Enterprise Networking', desc: 'Sleek routing, firewalls, and SD-WAN setups.' },
          { name: 'SD-WAN Setup', desc: 'Branch-office connection and WAN routing.' },
          { name: 'VPN & Remote Access', desc: 'Zero-trust remote worker connectivity.' },
          { name: 'Load Balancing', desc: 'Traffic optimization and geographical failovers.' }
        ]
      }
    ]
  },
  {
    id: 'security',
    name: '05. Cybersecurity',
    groups: [
      {
        title: 'Security Audits',
        links: [
          { name: 'Penetration Testing', desc: 'Offensive audits to find infrastructure security gaps.' },
          { name: 'Vulnerability Assessments', desc: 'Continuous code scanning and threat audits.' },
          { name: 'Security Auditing', desc: 'Reviewing access control and storage compliance.' },
          { name: 'Code Review', desc: 'Static analysis to find cryptographic issues.' }
        ]
      },
      {
        title: 'Zero-Trust Defense',
        links: [
          { name: 'Identity & Access (IAM)', desc: 'Single Sign-On (SSO) and Multi-Factor Auth.' },
          { name: 'End-to-End Encryption', desc: 'Securing data transit and rest storage.' },
          { name: 'Network Segmentation', desc: 'Preventing lateral movement of threats.' },
          { name: 'Endpoint Security', desc: 'Securing employee laptops and mobile systems.' }
        ]
      },
      {
        title: 'Compliance & Risk',
        links: [
          { name: 'SOC2 Type II Readiness', desc: 'Auditing and gap analysis for compliance.' },
          { name: 'ISO 27001 Compliance', desc: 'Information Security Management System Setup.' },
          { name: 'HIPAA Security', desc: 'Securing Protected Health Information (PHI).' },
          { name: 'Data Privacy (GDPR/CCPA)', desc: 'Managing user consent and data erasure requests.' }
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    name: '06. Enterprise Solutions',
    groups: [
      {
        title: 'Business Platforms',
        links: [
          { name: 'ERP Cloud Integration', desc: 'Connecting enterprise ERP systems to custom services.' },
          { name: 'Enterprise CRM Setup', desc: 'Custom CRM workflows and dashboard setups.' },
          { name: 'ERP Customization', desc: 'Tailoring business management logic to match processes.' },
          { name: 'Supply Chain Tech', desc: 'Tracking warehousing, orders, and logistics.' }
        ]
      },
      {
        title: 'IT Consulting',
        links: [
          { name: 'Digital Transformation', desc: 'Modernizing corporate operations via software.' },
          { name: 'IT Strategy & Advisory', desc: 'Roadmaps and vendor selection guidance.' },
          { name: 'IT Service Management', desc: 'Configuring enterprise IT service workflows.' },
          { name: 'Vendor Management', desc: 'SLA auditing and contract review metrics.' }
        ]
      },
      {
        title: 'Emerging Tech',
        links: [
          { name: 'Digital Twins', desc: 'Sleek visual simulations of physical factories.' },
          { name: 'Smart Automation', desc: 'Custom scripting for back-office paperwork.' },
          { name: 'Web3 & Blockchain', desc: 'Private distributed ledgers for consortiums.' },
          { name: 'Green IT Solutions', desc: 'Optimizing infrastructure carbon footprint.' }
        ]
      }
    ]
  }
];

export default function Header() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const closeMenuWithDelay = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 250);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  const activeCategoryData = ECOSYSTEM_DOMAINS[selectedCategory];

  return (
    <header className={`${styles.headerContainer} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Main Corporate Bar */}
      <div className={styles.mainBar}>
        <Link href="/" className={styles.logoArea}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo_final_blue.png"
              alt="Total Tech Technologies"
              width={260}
              height={56}
              priority
              unoptimized
              className={styles.logoImg}
            />
          </div>
        </Link>

        {/* Simple & Clean US Corporate Navigation */}
        <nav className={styles.navMenu}>
          <div
            className={`${styles.navItem} ${megaMenuOpen ? styles.active : ''}`}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenuWithDelay}
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
          >
            <span>Services</span>
            <svg style={{ marginLeft: '6px' }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          <Link href="#case-studies" className={styles.navItem}>
            Case Studies
          </Link>

          <Link href="#standards" className={styles.navItem}>
            Standards & Security
          </Link>

          <Link href="#contact" className={styles.navItem}>
            Contact Us
          </Link>
        </nav>

        {/* Header Actions */}
        <div className={styles.headerActions}>
          <a href="#contact" className={styles.portalBtn}>
            Client Portal
          </a>
          <a href="#contact" className={styles.consultBtn}>
            Get in Touch
          </a>
        </div>

        {/* Spacious Full-Width Mega Menu Directly in MainBar with seamless hover bridge */}
        <div 
          className={`${styles.megaMenuFull} ${megaMenuOpen ? styles.visible : ''}`}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenuWithDelay}
        >
          <div className={styles.megaContentWrapper}>
            {/* Left: Domain Category Selector */}
            <div className={styles.megaSidebar}>
              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748B', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700 }}>
                Our Practices
              </div>
              {ECOSYSTEM_DOMAINS.map((domain, idx) => (
                <button
                  key={domain.id}
                  className={`${styles.megaCategoryBtn} ${selectedCategory === idx ? styles.selectedCategory : ''}`}
                  onMouseEnter={() => setSelectedCategory(idx)}
                  onClick={(e) => { e.stopPropagation(); setSelectedCategory(idx); }}
                >
                  <span>{domain.name}</span>
                  <span>→</span>
                </button>
              ))}
            </div>

            {/* Center: Detailed 3-Column Service Grid */}
            <div className={styles.megaGridServices}>
              {activeCategoryData.groups.map((grp, i) => (
                <div key={i} className={styles.serviceGroup}>
                  <h4>{grp.title}</h4>
                  <ul className={styles.serviceList}>
                    {grp.links.map((link, lIndex) => (
                      <li key={lIndex}>
                        <Link href="#services" className={styles.serviceLink} onClick={() => setMegaMenuOpen(false)}>
                          <div className={styles.linkTitle}>{link.name}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right: Featured Corporate Practice Brief */}
            <div className={styles.megaFeaturedBox}>
              <div>
                <div className={styles.featuredTag}>US ADVISORY</div>
                <div className={styles.featuredHeading}>Custom Enterprise Engineering</div>
                <p className={styles.featuredText}>
                  We help American businesses build scalable web applications, deploy private AI tools, and modernize legacy IT systems.
                </p>
              </div>
              <Link href="#contact" className={styles.featuredLink} onClick={() => setMegaMenuOpen(false)}>
                Schedule Consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
