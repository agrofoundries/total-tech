'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

// Precision Luxury SVG Icons
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const CompassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const CloudLightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9" />
    <polyline points="13 11 9 17 15 17 11 23" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const KeyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M21 2l-9.6 9.6" />
    <path d="M15.5 7.5l3 3L22 7l-3-3" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0052CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function PageTwo() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  const phrases = useMemo(() => [
    'Comprehensive Brand & Marketing Solutions',
    'High-Performance Web & App Engineering',
    'Enterprise AI & Deep-Tech Architecture',
    'Robotics & High-Throughput Infrastructure'
  ], []);

  // Smooth Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[currentIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(38);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === currentPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      setTypingSpeed(180);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, typingSpeed, phrases]);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is your typical project delivery & scaling timeline?",
      a: "Our standard dedicated engineering pod deployment operates on an agile 2 to 4 week ramp. Full-scale digital brand and web platforms are architected and deployed across phased 2-week sprints within 6 to 12 weeks with zero scope drift."
    },
    {
      q: "Do you provide 24/7 post-launch infrastructure support and SLAs?",
      a: "Yes. Total Tech provides comprehensive 24/7 Site Reliability Engineering (SRE) support with guaranteed 99.99% uptime SLAs, proactive security patching, continuous telemetry, and rapid incident mitigation."
    },
    {
      q: "How do you ensure full IP ownership and data security?",
      a: "All source code, design systems, algorithms, and documentation are 100% legally assigned to your organization upon completion. We operate under strict SOC2 Type II, ISO 27001, and zero-trust security baselines."
    },
    {
      q: "What is the structure of your dedicated engineering teams?",
      a: "Every engagement is powered by a dedicated multidisciplinary pod featuring a Principal Architect, Senior UI/UX Engineers, Full-Stack Developers, QA Automation Specialists, and a dedicated Technical Project Lead."
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Header />

      {/* =========================================================================
          1. HERO SECTION (AUTOMOTIVE PRECISION LUXURY COCKPIT)
          ========================================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgePulse} />
              <span>TOTAL TECH // TIER-1 DIGITAL ENGINEERING & BRAND ARCHITECTURE</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.taglineText}>One Single Platform to the Tech Universe</span>
              <span className={styles.typewriterContainer}>
                {currentText}
                <span className={styles.cursor}>|</span>
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Total Tech Technologies delivers automotive-grade precision in digital execution — engineering iconic brand systems, high-throughput web platforms, and intelligent automation for global market leaders.
            </p>

            <div className={styles.heroButtons}>
              <a href="#brand-solutions" className={styles.btnPrimary}>
                <span>EXPLORE CAPABILITIES</span>
                <ArrowRightIcon />
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                <span>SCHEDULE ADVISORY REVIEW</span>
              </a>
            </div>
          </div>

          {/* Institutional KPI Telemetry Cockpit */}
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
        </div>
      </section>

      {/* =========================================================================
          2. COMPREHENSIVE BRAND & MARKETING GALLERY (AUTOMOTIVE EDITORIAL)
          ========================================================================= */}
      <section className={`${styles.section} ${styles.gallerySection}`} id="brand-solutions">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionPre}>End-to-End Precision</span>
            <h2 className={styles.sectionTitle}>Comprehensive Brand & Marketing Solutions</h2>
            <p className={styles.sectionSubtitle}>
              Harmonizing bespoke visual identity, high-fidelity UI/UX design, precision Next.js full-stack engineering, and performance marketing into one unified high-octane engine.
            </p>
          </div>

          {/* 3-Column Luxury Hero Gallery Grid */}
          <div className={styles.galleryGrid}>
            {/* Column 1: Large Card - Digital Graphic Design */}
            <div className={styles.galleryCardLarge}>
              <Image
                src="/img/thedigitalartist-network-4851120.jpg"
                alt="Digital Graphic Design"
                fill
                className={styles.galleryImg}
                priority
              />
              <div className={styles.galleryOverlay}>
                <div className={styles.galleryIconCircle}>
                  <LayersIcon />
                </div>
                <h3 className={styles.galleryCardTitle}>Digital Graphic<br />Design</h3>
                <span className={styles.galleryCardLink}>
                  Explore Practice <ArrowRightIcon />
                </span>
              </div>
            </div>

            {/* Column 2: Large Card - Website Design & Development */}
            <div className={styles.galleryCardLarge}>
              <Image
                src="/img/thedigitalartist-network-3526246_1920.jpg"
                alt="Website Design & Development"
                fill
                className={styles.galleryImg}
                priority
              />
              <div className={styles.galleryOverlay}>
                <div className={styles.galleryIconCircle}>
                  <CompassIcon />
                </div>
                <h3 className={styles.galleryCardTitle}>Website Design<br />& Development</h3>
                <span className={styles.galleryCardLink}>
                  Explore Practice <ArrowRightIcon />
                </span>
              </div>
            </div>

            {/* Column 3: Stack of 2 Precision Cards */}
            <div className={styles.galleryStack}>
              <div className={styles.galleryCardSmall}>
                <Image
                  src="/img/gettyimages-1927881398-1024x1024.jpg"
                  alt="Social Media Management"
                  fill
                  className={styles.galleryImg}
                />
                <div className={styles.galleryOverlay}>
                  <div className={styles.galleryIconCircle}>
                    <ActivityIcon />
                  </div>
                  <h3 className={styles.galleryCardTitle} style={{ fontSize: '1.25rem' }}>Social Media<br />Management</h3>
                  <span className={styles.galleryCardLink}>
                    Explore <ArrowRightIcon />
                  </span>
                </div>
              </div>

              <div className={styles.galleryCardSmall}>
                <Image
                  src="/img/gettyimages-2080972792-1024x1024.jpg"
                  alt="SEO & Digital Advertising"
                  fill
                  className={styles.galleryImg}
                />
                <div className={styles.galleryOverlay}>
                  <div className={styles.galleryIconCircle}>
                    <CloudLightningIcon />
                  </div>
                  <h3 className={styles.galleryCardTitle} style={{ fontSize: '1.25rem' }}>SEO & Digital<br />Advertising</h3>
                  <span className={styles.galleryCardLink}>
                    Explore <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-row underneath gallery */}
          <div className={styles.subGalleryRow}>
            <div className={styles.subGalleryPromo}>
              <div className={styles.subGalleryPromoTitle}>
                GET STARTED & SCALE TO OUTPERFORM YOUR INDUSTRY
              </div>
              <a href="#services" className={styles.subGalleryPromoBtn}>
                View All Solutions <ArrowRightIcon />
              </a>
            </div>

            <div className={styles.subGalleryCard}>
              <div className={styles.subGalleryImgWrap}>
                <Image src="/img/gettyimages-2148703154-1024x1024.jpg" alt="Custom Web Design" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.subGalleryBody}>
                <span className={styles.subGalleryTitle}>Custom Web Design</span>
                <span className={styles.subGalleryLink}>Learn More &rarr;</span>
              </div>
            </div>

            <div className={styles.subGalleryCard}>
              <div className={styles.subGalleryImgWrap}>
                <Image src="/img/thedigitalartist-network-3526246_1920.jpg" alt="Cloud Asset Management" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.subGalleryBody}>
                <span className={styles.subGalleryTitle}>Cloud Asset Mgmt</span>
                <span className={styles.subGalleryLink}>Learn More &rarr;</span>
              </div>
            </div>

            <div className={styles.subGalleryCard}>
              <div className={styles.subGalleryImgWrap}>
                <Image src="/img/gettyimages-2080972792-1024x1024.jpg" alt="SEO Audit & Consulting" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.subGalleryBody}>
                <span className={styles.subGalleryTitle}>SEO Audit & Consult</span>
                <span className={styles.subGalleryLink}>Learn More &rarr;</span>
              </div>
            </div>

            <div className={styles.subGalleryCard}>
              <div className={styles.subGalleryImgWrap}>
                <Image src="/img/gettyimages-1927881398-1024x1024.jpg" alt="Web Maintenance & Security" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.subGalleryBody}>
                <span className={styles.subGalleryTitle}>Web Maintenance</span>
                <span className={styles.subGalleryLink}>Learn More &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. OUR PROVEN 4-STEP METHODOLOGY
          ========================================================================= */}
      <section className={`${styles.section} ${styles.methodologySection}`}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className={styles.sectionPre}>Systematic Execution</span>
            <h2 className={styles.sectionTitle}>Our Proven 4-Step Methodology</h2>
            <p className={styles.sectionSubtitle} style={{ margin: '10px auto 0' }}>
              A disciplined, repeatable process designed to eliminate project friction, accelerate delivery speed, and guarantee peak technical performance.
            </p>
          </div>

          <div className={styles.methodologyGrid}>
            {[
              {
                step: '01',
                img: '/img/gettyimages-2148703154-1024x1024.jpg',
                title: 'Strategy',
                desc: 'Comprehensive market analysis, competitor benchmarking, technical architecture blueprints, and KPI roadmap definition.'
              },
              {
                step: '02',
                img: '/img/gettyimages-1927881398-1024x1024.jpg',
                title: 'Concept / Design',
                desc: 'High-fidelity UI/UX design systems, interactive prototypes, user journey testing, and bespoke brand aesthetics.'
              },
              {
                step: '03',
                img: '/img/thedigitalartist-network-3526246_1920.jpg',
                title: 'Development',
                desc: 'Scalable Next.js and TypeScript engineering, secure microservices, database optimizations, and automated CI/CD.'
              },
              {
                step: '04',
                img: '/img/gettyimages-2080972792-1024x1024.jpg',
                title: 'Launch',
                desc: 'Zero-downtime production deployment, real-time analytics telemetry, A/B conversion tuning, and 24/7 SRE support.'
              }
            ].map((m, idx) => (
              <div key={idx} className={styles.methodStep}>
                <div className={styles.methodCircleWrap}>
                  <Image src={m.img} alt={m.title} fill className={styles.methodImg} />
                  <span className={styles.methodStepBadge}>{m.step}</span>
                </div>
                <h3 className={styles.methodTitle}>{m.title}</h3>
                <p className={styles.methodDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BLUE CTA BANNER (HIGH-OCTANE ROYAL COBALT)
          ========================================================================= */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaLeft}>
            <div className={styles.ctaCheckCircle}>
              <CheckCircleIcon />
            </div>
            <div>
              <h3 className={styles.ctaHeadline}>Ready to Dominate Your Digital Market?</h3>
              <p className={styles.ctaSubhead}>
                Partner with an elite team of engineers, designers, and growth strategists ready to scale your platform.
              </p>
            </div>
          </div>
          <a href="#contact" className={styles.ctaBtnWhite}>
            <span>Start Your Project</span>
            <ArrowRightIcon />
          </a>
        </div>
      </section>

      {/* =========================================================================
          5. OUR CORE DIGITAL SERVICES
          ========================================================================= */}
      <section className={`${styles.section} ${styles.servicesSection}`} id="services">
        <div className={styles.sectionContainer}>
          <div className={styles.servicesTopRow}>
            <div>
              <span className={styles.sectionPre}>Modular Capabilities</span>
              <h2 className={styles.sectionTitle}>Our Core Digital Services</h2>
            </div>
            <a href="#contact" style={{ color: '#0052CC', fontWeight: 800, fontSize: '13.5px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Explore All Services <ArrowRightIcon />
            </a>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceImgWrap}>
                <Image src="/img/gettyimages-1927881398-1024x1024.jpg" alt="Search Optimization" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>Search Optimization</h3>
              </div>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImgWrap}>
                <Image src="/img/thedigitalartist-network-4851120.jpg" alt="B2B Campaigns" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>B2B Campaigns</h3>
              </div>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImgWrap}>
                <Image src="/img/gettyimages-2148703154-1024x1024.jpg" alt="Brand Identity" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>Brand Identity</h3>
              </div>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceImgWrap}>
                <Image src="/img/gettyimages-2080972792-1024x1024.jpg" alt="Social Reach" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>Social Reach</h3>
              </div>
            </div>

            <a href="#contact" className={styles.serviceSolidCard}>
              <div className={styles.serviceSolidTitle}>
                Full-Service<br />Digital Agency
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Explore All <ArrowRightIcon />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. WHY CHOOSE TOTAL TECH / FCT
          ========================================================================= */}
      <section className={`${styles.section} ${styles.whySection}`} id="why-us">
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className={styles.sectionPre}>Institutional Standards</span>
            <h2 className={styles.sectionTitle}>Why Choose Total Tech?</h2>
            <p className={styles.sectionSubtitle} style={{ margin: '10px auto 0' }}>
              Engineered for organizations that require technical perfection, airtight security, and transparent collaboration.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {[
              { icon: <LayersIcon />, title: 'Advanced Architecture' },
              { icon: <ActivityIcon />, title: 'Proven Scalability' },
              { icon: <CompassIcon />, title: 'Dedicated Pod Teams' },
              { icon: <CloudLightningIcon />, title: '24/7 SRE Support' },
              { icon: <ShieldCheckIcon />, title: 'Post-Quantum Security' },
              { icon: <KeyIcon />, title: '100% IP Ownership' }
            ].map((item, idx) => (
              <div key={idx} className={styles.whyCard}>
                <div className={styles.whyIconCircle}>{item.icon}</div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. STATE OF THE ART INFRASTRUCTURE & MANUFACTURING
          ========================================================================= */}
      <section className={`${styles.section} ${styles.mfgSection}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.mfgLayout}>
            <div>
              <span className={styles.sectionPre}>High-Throughput Operations</span>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>
                State of the Art Infrastructure & Engineering
              </h2>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '26px' }}>
                We combine modern cloud-native architectures, hardware-in-the-loop testing, and distributed microservices to ensure lightning-fast execution, zero data loss, and uninterrupted global uptime.
              </p>
              <a href="#contact" className={styles.btnPrimary}>
                <span>Explore Technical Specs</span>
                <ArrowRightIcon />
              </a>
            </div>

            <div className={styles.mfgPhotoGrid}>
              <div className={styles.mfgPhotoCard}>
                <Image src="/img/thedigitalartist-network-3526246_1920.jpg" alt="Infrastructure" fill className={styles.mfgImg} />
              </div>
              <div className={styles.mfgPhotoCard}>
                <Image src="/img/thedigitalartist-network-4851120.jpg" alt="Analytics" fill className={styles.mfgImg} />
              </div>
              <div className={styles.mfgPhotoCard}>
                <Image src="/img/gettyimages-2148703154-1024x1024.jpg" alt="Operations" fill className={styles.mfgImg} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CERTIFICATIONS & COMPLIANCE
          ========================================================================= */}
      <section className={`${styles.section} ${styles.certSection}`}>
        <div className={styles.sectionContainer}>
          <span className={styles.sectionPre}>Trust & Governance</span>
          <h2 className={styles.sectionTitle}>Certifications & Compliance</h2>
          <div className={styles.certGrid}>
            {[
              'ISO 9001:2015',
              'ISO 27001',
              'SOC2 Type II',
              'NIST SP 800',
              'GDPR Ready'
            ].map((cert, idx) => (
              <div key={idx} className={styles.certBadge}>
                <span className={styles.certBadgeText}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. LATEST NEWS & INSIGHTS + NEWSLETTER
          ========================================================================= */}
      <section className={`${styles.section} ${styles.newsSection}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.newsLayout}>
            <div>
              <span className={styles.sectionPre}>Thought Leadership</span>
              <h2 className={styles.sectionTitle}>Latest News & Insights</h2>
              <div className={styles.newsGrid}>
                {[
                  {
                    img: '/img/gettyimages-1927881398-1024x1024.jpg',
                    date: 'AUG 24, 2026',
                    title: 'Next-Gen Edge AI Architectures for Global Scale'
                  },
                  {
                    img: '/img/gettyimages-2080972792-1024x1024.jpg',
                    date: 'AUG 18, 2026',
                    title: 'Zero-Trust Cloud Governance & SOC2 Compliance'
                  },
                  {
                    img: '/img/gettyimages-2148703154-1024x1024.jpg',
                    date: 'AUG 10, 2026',
                    title: 'Optimizing Microservices for Sub-50ms Latency'
                  }
                ].map((news, idx) => (
                  <div key={idx} className={styles.newsCard}>
                    <div className={styles.newsImgWrap}>
                      <Image src={news.img} alt={news.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.newsBody}>
                      <span className={styles.newsDate}>{news.date}</span>
                      <h3 className={styles.newsCardTitle}>{news.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.newsletterCard}>
              <h3 className={styles.newsletterTitle}>Stay Ahead with Our Newsletter</h3>
              <p className={styles.newsletterSub}>
                Get curated deep-tech research, architecture blueprints, and market insights delivered weekly.
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter work email..."
                  required
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterSubmit}>
                  Subscribe to Insights
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. RESOURCE DOCK
          ========================================================================= */}
      <div className={styles.resourceDock}>
        <div className={styles.resourceDockInner}>
          <div className={styles.resourceLinks}>
            <a href="#services" className={styles.resourceLinkItem}>
              <LayersIcon /> Technical Whitepapers
            </a>
            <a href="#brand-solutions" className={styles.resourceLinkItem}>
              <CompassIcon /> Case Studies & Architecture
            </a>
            <a href="#why-us" className={styles.resourceLinkItem}>
              <ShieldCheckIcon /> Security Audits
            </a>
            <a href="#contact" className={styles.resourceLinkItem}>
              <ActivityIcon /> 24/7 NOC Telemetry
            </a>
          </div>
          <a href="#contact" className={styles.btnPrimary} style={{ padding: '12px 24px', fontSize: '13px' }}>
            <span>Book Consultation</span>
            <ArrowRightIcon />
          </a>
        </div>
      </div>

      {/* =========================================================================
          11. OUR CORE VALUES
          ========================================================================= */}
      <section className={`${styles.section} ${styles.valuesSection}`}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className={styles.sectionPre}>Guiding Principles</span>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <p className={styles.sectionSubtitle} style={{ margin: '10px auto 0' }}>
              The foundational standards that define how we engineer, collaborate, and deliver excellence.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            {[
              {
                icon: <LayersIcon />,
                title: 'Cross Functionality',
                desc: 'Uniting software engineers, cloud architects, and creative designers into seamless multidisciplinary squads.'
              },
              {
                icon: <CompassIcon />,
                title: 'Proven Methodology',
                desc: 'Rigorous engineering standards, continuous automated testing, and predictable 2-week sprint cadences.'
              },
              {
                icon: <ActivityIcon />,
                title: 'Data-Backed Decisions',
                desc: 'Real-time telemetry, empirical metrics, and statistical benchmarks driving every architectural choice.'
              },
              {
                icon: <ShieldCheckIcon />,
                title: 'Radical Transparency',
                desc: 'Daily commit visibility, shared sprint boards, zero hidden fees, and complete intellectual property ownership.'
              }
            ].map((v, idx) => (
              <div key={idx} className={styles.valueCard}>
                <div className={styles.valueIconWrap}>{v.icon}</div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionContainer}>
          <div className={styles.faqLayout}>
            <div>
              <span className={styles.sectionPre}>Direct Answers</span>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px' }}>
                Have questions about our dedicated pods, development process, or enterprise SLAs? Our team is available 24/7 to provide technical guidance.
              </p>
              <a href="#contact" className={styles.btnPrimary}>
                <span>Ask A Question</span>
                <ArrowRightIcon />
              </a>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`${styles.faqCard} ${openFaq === idx ? styles.faqCardActive : ''}`}
                >
                  <div className={styles.faqQuestionHeader} onClick={() => toggleFaq(idx)}>
                    <span className={styles.faqQuestionText}>{faq.q}</span>
                    <span
                      className={styles.faqToggleIcon}
                      style={{
                        transform: openFaq === idx ? 'rotate(45deg)' : 'none'
                      }}
                    >
                      +
                    </span>
                  </div>
                  {openFaq === idx && (
                    <div className={styles.faqAnswerBody}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. OUR GLOBAL NODES (LUXURY EXECUTIVE CARDS)
          ========================================================================= */}
      <section className={`${styles.section} ${styles.nodesSection}`}>
        <div className={styles.sectionContainer}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className={styles.sectionPre}>Worldwide Presence</span>
            <h2 className={styles.sectionTitle}>Our Global Nodes</h2>
            <p className={styles.sectionSubtitle} style={{ margin: '10px auto 0' }}>
              Strategic physical engineering and customer success hubs serving enterprise partners across time zones.
            </p>
          </div>

          <div className={styles.nodesGrid}>
            {[
              {
                city: 'New York Headquarters',
                addr: '105 Maxess Road, Melville, NY 11747',
                phone: '(631) 452-1111'
              },
              {
                city: 'Miami Innovation Lab',
                addr: '850 NW Federal Hwy, Stuart, FL 34994',
                phone: '(772) 297-0700'
              },
              {
                city: 'Dallas Operations Center',
                addr: '400 N Ervay St, Dallas, TX 75201',
                phone: '(214) 555-0198'
              }
            ].map((node, idx) => (
              <div key={idx} className={styles.nodeCard}>
                <h3 className={styles.nodeCity}>{node.city}</h3>
                <div className={styles.nodeRow}>
                  <MapPinIcon />
                  <span>{node.addr}</span>
                </div>
                <div className={styles.nodeRow}>
                  <PhoneIcon />
                  <span>{node.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. BUILDING A SUSTAINABLE FUTURE (HIGH-OCTANE ROYAL BLUE BANNER)
          ========================================================================= */}
      <section className={styles.futureBanner} id="contact">
        <div className={styles.futureBannerInner}>
          <h2 className={styles.futureTitle}>Building a Sustainable Future</h2>
          <p className={styles.futureDesc}>
            Partner with Total Tech to build carbon-optimized cloud systems, energy-efficient software architectures, and enduring digital platforms engineered for the next generation.
          </p>
          <a href="#contact" className={styles.ctaBtnWhite}>
            <span>Join Our Mission & Connect With Us</span>
            <ArrowRightIcon />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
