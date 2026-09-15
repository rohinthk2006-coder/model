import express from 'express';
import { getStore } from '../db/database.js';

const router = express.Router();

// Knowledge base for GovLearn local intelligence engine
const GOV_KNOWLEDGE_BASE = [
  {
    keywords: ['gfr', 'procurement', 'gem', 'purchase', 'tender', 'rule 149', 'l1', 'bidding'],
    topic: 'GFR 2017 & GeM Procurement',
    reply: `**General Financial Rules (GFR 2017) & GeM Procurement Protocol:**\n\n1. **Rule 149(i) - Direct Purchase:** For goods/services up to **₹25,000**, procurement can be made directly through any GeM seller who meets requisite quality, specifications, and delivery terms.\n2. **Rule 149(ii) - L1 Comparison (₹25,000 to ₹5,00,000):** Mandatory comparison of products of at least **3 different manufacturers** meeting specifications, selecting the lowest (L1) price.\n3. **Rule 149(iii) - Above ₹5,00,000:** Mandatory online bidding or reverse auction on GeM.\n4. **MSE Exemptions:** Micro & Small Enterprises registered with Udyam are **100% exempt from Earnest Money Deposit (EMD)** under GFR Rule 170.\n\n*Recommended Course:* **Digital Governance & Secretariat Procedures** or **Data Analytics for Governance**.`,
    relatedCourseId: 'digital-governance',
  },
  {
    keywords: ['cert-in', 'certin', 'cyber', 'incident', 'hack', 'phishing', 'breach', 'security', 'sandes', 'kavach'],
    topic: 'CERT-In Cyber Security Directives',
    reply: `**CERT-In Directions & Mandatory Incident Reporting:**\n\n1. **Mandatory 6-Hour Reporting:** Under CERT-In Directions (April 2022), all government entities, ministries, and service providers must report cybersecurity incidents within **6 hours** of noticing or being brought to notice.\n2. **System Clock Synchronization:** All ICT devices and systems must synchronize their system clocks to the Network Time Protocol (NTP) servers of NIC or NPL.\n3. **Log Retention:** System and network logs must be maintained securely within the Indian jurisdiction for an active rolling period of **180 days**.\n4. **Secure Communication:** Official communications must strictly use **Sandes** and NIC Mail with **Kavach Multi-Factor Authentication (2FA)**.\n\n*Recommended Course:* **Cybersecurity Essentials for Public Servants**.`,
    relatedCourseId: 'cybersecurity-essentials',
  },
  {
    keywords: ['rti', 'right to information', 'pio', 'appeals', 'section 8', 'transparency'],
    topic: 'Right to Information (RTI) Act 2005',
    reply: `**Right to Information (RTI) Act 2005 Key Timelines & Rules:**\n\n1. **Standard Timeline:** Information must be supplied within **30 days** of receiving the application by the Central Public Information Officer (CPIO).\n2. **Life and Liberty:** If the information sought concerns the life or liberty of a person, it must be provided within **48 hours**.\n3. **Third-Party Information:** If information involves a third party, an additional **10 days** is permitted for notice.\n4. **Section 8 Exemptions:** Disclosure is exempt if it prejudicially affects national sovereignty, cabinet papers before decision, trade secrets, or privacy unless public interest outweighs.\n5. **Proactive Disclosure:** Mandated under Section 4(1)(b) on departmental portals.\n\n*Recommended Course:* **Digital Governance & Secretariat Procedures**.`,
    relatedCourseId: 'digital-governance',
  },
  {
    keywords: ['karmayogi', 'igot', 'frac', 'cbc', 'capacity', 'upskill', 'civil service', 'competency'],
    topic: 'Mission Karmayogi & iGOT',
    reply: `**Mission Karmayogi (National Programme for Civil Services Capacity Building):**\n\n1. **Shift in Paradigm:** Transition from conventional 'rules-based' to dynamic 'roles-based' human resource management.\n2. **FRAC Framework:** Uses the **Framework for Roles, Activities, and Competencies** to map every government post to specific behavioral, functional, and domain competencies.\n3. **Learning Benchmark:** Civil servants are encouraged to achieve **40 hours** of annual continuous learning on the iGOT platform.\n4. **Competency Passports:** Your GovLearn AI learning progress automatically records verified competencies and aligns with Karmayogi national benchmarks (target 75%+).\n\n*Recommended Action:* Explore the **AI Skill Gap Analysis** page to calibrate your departmental competencies.`,
    relatedCourseId: 'ai-fundamentals',
  },
  {
    keywords: ['dpdp', 'data protection', 'privacy', 'fiduciary', 'personal data', 'consent'],
    topic: 'Digital Personal Data Protection (DPDP) Act 2023',
    reply: `**DPDP Act 2023 Principles for Government Applications:**\n\n1. **Data Fiduciary Responsibility:** Government departments processing citizen data are statutory Data Fiduciaries obligated to ensure reasonable security safeguards.\n2. **Purpose Limitation & Minimization:** Collect only data strictly necessary for delivering the specific welfare scheme or statutory public service.\n3. **Breach Notification:** Data breaches must be reported both to the **Data Protection Board of India (DPB)** and affected citizen data principals without delay.\n4. **Penalties:** Fines up to **₹250 Crore** can be levied for failure to implement security safeguards preventing data breaches.\n\n*Recommended Course:* **Cloud Computing Fundamentals** (Module 4 covers DPDP compliance).`,
    relatedCourseId: 'cloud-fundamentals',
  },
  {
    keywords: ['cloud', 'meghraj', 'infrastructure', 'hosting', 'ndc', 'data sovereignty'],
    topic: 'GI Cloud (MeghRaj)',
    reply: `**GI Cloud (MeghRaj) Architectural Standards:**\n\n1. **Objective:** Accelerate delivery of e-services while optimizing public ICT capital expenditure.\n2. **Data Sovereignty:** All government workload telemetry, citizen databases, and backups must physically reside within Indian sovereign territory.\n3. **Empaneled CSPs:** Government cloud services must be procured through MeitY-empaneled Cloud Service Providers listed on GeM.\n4. **Disaster Recovery (DR):** Public applications must maintain active-passive or active-active DR across distinct seismic zones (e.g. Delhi NDC and Hyderabad NDC).\n\n*Recommended Course:* **Cloud Computing Fundamentals**.`,
    relatedCourseId: 'cloud-fundamentals',
  },
];

// POST /api/ai/chat - GovLearn AI Copilot assistant
router.post('/chat', (req, res) => {
  try {
    const { message = '' } = req.body;
    const cleanMsg = message.toLowerCase().trim();

    if (!cleanMsg) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    // Match against knowledge base
    let matchedEntry = null;
    let highestScore = 0;

    for (const entry of GOV_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (cleanMsg.includes(kw)) score += 2;
      }
      if (score > highestScore) {
        highestScore = score;
        matchedEntry = entry;
      }
    }

    let responseText = '';
    let suggestedTopic = '';
    let relatedCourseId = null;

    if (matchedEntry && highestScore > 0) {
      responseText = matchedEntry.reply;
      suggestedTopic = matchedEntry.topic;
      relatedCourseId = matchedEntry.relatedCourseId;
    } else {
      // General civil service assistance fallback
      responseText = `**GovLearn AI Copilot:**\n\nI am your specialized civil service learning mentor for the Smart India Hackathon (SIH26101) initiative.\n\nYou can ask me about:\n- **GFR 2017 & GeM Rules:** Direct purchase thresholds, L1 bidding, MSE exemptions\n- **CERT-In Directives:** 6-hour incident reporting, 180-day log retention\n- **RTI Act 2005:** Response timelines, Section 8 exemptions\n- **Mission Karmayogi:** FRAC competency framework & 40-hour benchmarks\n- **DPDP Act 2023:** Data fiduciary duties & citizen privacy safeguards\n\nHow can I assist your upskilling journey today?`;
      suggestedTopic = 'Civil Services Knowledge Base';
    }

    return res.json({
      success: true,
      reply: responseText,
      topic: suggestedTopic,
      relatedCourseId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/ai/recommend - Personalized learning path recommendations
router.post('/recommend', (req, res) => {
  try {
    const store = getStore();
    const skillsToImprove = store.skillsToImprove || [];
    const courses = store.courses || [];

    const recommendations = skillsToImprove.slice(0, 3).map((skill) => {
      const course = courses.find((c) => c.id === skill.recommendedCourseId);
      return {
        skillName: skill.name,
        gap: skill.gap,
        severity: skill.severity,
        courseId: skill.recommendedCourseId,
        courseTitle: skill.recommendedCourseTitle,
        duration: skill.targetHours,
        rationale: skill.description,
        progress: course ? course.progress : 0,
      };
    });

    return res.json({
      success: true,
      recommendations,
      summary: 'Targeted learning plan generated to close critical competency gaps in Cloud and Cybersecurity within 60 days.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
