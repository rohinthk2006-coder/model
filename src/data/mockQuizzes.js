export const quizQuestionBank = {
  Cybersecurity: {
    MCQ: [
      {
        id: 'cs-1',
        question: 'What is the primary purpose of encryption?',
        options: [
          'Data compression',
          'Data protection',
          'Data deletion',
          'Network acceleration'
        ],
        correctIndex: 1,
        explanation: 'Encryption converts plain readable data into unreadable ciphertext to protect sensitive information from unauthorized access and interception.',
        governanceContext: 'Required under CERT-In guidelines for all departmental communications involving classified dispatches.'
      },
      {
        id: 'cs-2',
        question: 'Under CERT-In directions, within what timeframe must cybersecurity incidents be reported by government entities?',
        options: [
          'Within 6 hours of noticing the incident',
          'Within 24 hours of confirmation',
          'Within 3 working days',
          'Only during annual security audits'
        ],
        correctIndex: 0,
        explanation: 'CERT-In mandatory directions mandate that all specified cyber incidents must be reported to CERT-In within 6 hours of noticing them.',
        governanceContext: 'Direction No. 20(3)/2022-CERT-In issued under Section 70B of IT Act 2000.'
      },
      {
        id: 'cs-3',
        question: 'Which of the following represents the most secure approach for authenticating government personnel accessing remote portals?',
        options: [
          'Single static 8-character password',
          'Multi-Factor Authentication (MFA) with hardware token or e-Pramaan',
          'Sharing departmental admin credentials across shift operators',
          'Password saved in browser auto-fill'
        ],
        correctIndex: 1,
        explanation: 'Multi-Factor Authentication (MFA) requires two or more verification factors, dramatically reducing unauthorized account compromises.',
        governanceContext: 'Enforced on all e-Office, SPARROW, and PFMS access.'
      },
      {
        id: 'cs-4',
        question: 'What is a "Spear Phishing" attack?',
        options: [
          'A random spam email sent to millions of public email addresses',
          'A highly targeted fraudulent message crafted specifically for a chosen individual or office',
          'An attack using physical electromagnetic pulses',
          'A hardware failure in network switches'
        ],
        correctIndex: 1,
        explanation: 'Spear phishing targets specific officers using customized details gathered from public directories or organizational charts.',
        governanceContext: 'Commonly seen in spoofed notifications disguised as official gazettes or deputation orders.'
      },
      {
        id: 'cs-5',
        question: 'Which official Indian government instant messaging app is approved for secure inter-departmental communication?',
        options: [
          'WhatsApp Messenger',
          'Sandes (Government Instant Messaging System)',
          'Telegram Channels',
          'WeChat'
        ],
        correctIndex: 1,
        explanation: 'Sandes is developed by the National Informatics Centre (NIC) specifically for secure, sovereign government employee communication.',
        governanceContext: 'Mandated by Ministry of Electronics & IT for internal dispatches.'
      }
    ],
    'True/False': [
      {
        id: 'cs-tf-1',
        question: 'Official government files may be uploaded to third-party personal cloud services like Google Drive or Dropbox without departmental authorization.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Uploading official government records to unauthorized commercial clouds violates the Central Secretariat Security Manual and Data Sovereignty rules.',
        governanceContext: 'Strictly prohibited under Government Email & Cloud Security Policies.'
      },
      {
        id: 'cs-tf-2',
        question: 'Digital signatures generated through NIC-CA or e-Sign possess legal validity equivalent to handwritten signatures under the Information Technology Act 2000.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Section 5 of the Information Technology Act 2000 confers legal recognition to electronic and digital signatures.',
        governanceContext: 'Fundamental backbone of e-Office and electronic file movement.'
      }
    ]
  },
  'Cloud Computing': {
    MCQ: [
      {
        id: 'cc-1',
        question: 'What is the primary initiative by the Government of India for providing cloud infrastructure to ministries and departments?',
        options: [
          'Digital India Bhashini',
          'GI Cloud (MeghRaj)',
          'DigiLocker',
          'UMANG App'
        ],
        correctIndex: 1,
        explanation: 'GI Cloud, branded as "MeghRaj", is the initiative aimed at accelerating delivery of e-services in the country while optimizing ICT spending.',
        governanceContext: 'Managed by National Informatics Centre (NIC) under MeitY.'
      },
      {
        id: 'cc-2',
        question: 'Which cloud deployment model is most suitable for hosting sensitive citizen biometric authentication data?',
        options: [
          'Unencrypted Public Multi-Tenant Cloud',
          'Sovereign Private Cloud / Government Dedicated Cloud',
          'Community Blog Cloud',
          'Unmanaged Hybrid Peer-to-Peer network'
        ],
        correctIndex: 1,
        explanation: 'Dedicated government clouds with strict data residency within India ensure biometric and citizen privacy boundaries.',
        governanceContext: 'UIDAI and Aadhaar data residency requirements.'
      },
      {
        id: 'cc-3',
        question: 'What does "Data Sovereignty" in government cloud adoption dictate?',
        options: [
          'Data can be hosted anywhere in the world without restriction',
          'Data is subject to the laws and governance structures of the nation where it is physically stored',
          'Only cloud providers own the stored public records',
          'Data cannot be accessed by authorized judicial bodies'
        ],
        correctIndex: 1,
        explanation: 'Data sovereignty establishes that digital data stored within India is subject exclusively to Indian legal jurisdiction and constitutional protections.',
        governanceContext: 'DPDP Act 2023 and National Data Governance Framework.'
      },
      {
        id: 'cc-4',
        question: 'What is the main benefit of adopting Infrastructure as a Service (IaaS) for departmental software deployments?',
        options: [
          'Eliminating the need to design software logic',
          'Rapid elasticity and scaling without purchasing physical on-premise hardware',
          'Automatic manual paper printouts',
          'Bypassing all financial audit requirements'
        ],
        correctIndex: 1,
        explanation: 'IaaS allows departments to spin up computational servers and storage on-demand, reducing capital expenditures and deployment lead times.',
        governanceContext: 'GeM Cloud procurement framework.'
      },
      {
        id: 'cc-5',
        question: 'In cloud disaster recovery, what does "RPO" (Recovery Point Objective) measure?',
        options: [
          'The maximum acceptable age of files that must be recovered from backup storage for normal operations to resume',
          'The total salary of cloud administrators',
          'The electric power rating of the data center',
          'The number of citizen complaints handled per day'
        ],
        correctIndex: 0,
        explanation: 'RPO defines the maximum tolerable period in which data might be lost due to a major incident before backup recovery.',
        governanceContext: 'Essential metric in critical infrastructure SLAs (NIC/MeitY).'
      }
    ],
    'True/False': [
      {
        id: 'cc-tf-1',
        question: 'Government departments are mandated to procure cloud services through the Government e-Marketplace (GeM) using empaneled Cloud Service Providers (CSPs).',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. MeitY empanelled CSPs can be directly provisioned through GeM under standardized SLA schedules.',
        governanceContext: 'Rule 149 of General Financial Rules (GFR) 2017.'
      }
    ]
  },
  'Data Analytics': {
    MCQ: [
      {
        id: 'da-1',
        question: 'What standard directory code is used to uniquely identify states, districts, sub-districts, and villages across Indian governance systems?',
        options: [
          'PIN Code exclusively',
          'Local Government Directory (LGD) Code',
          'Vehicle Registration Code',
          'GST Identification Number'
        ],
        correctIndex: 1,
        explanation: 'The Local Government Directory (LGD) maintained by Ministry of Panchayati Raj assigns persistent spatial identity codes across India.',
        governanceContext: 'Critical for interoperability between Central and State DBT portals.'
      },
      {
        id: 'da-2',
        question: 'In public policy evaluation, what distinguishes a "Lead Indicator" from a "Lag Indicator"?',
        options: [
          'Lead indicators forecast future trends, while lag indicators reflect historical outcomes',
          'Lead indicators are only recorded by the Prime Minister Office',
          'Lag indicators are always inaccurate',
          'There is no functional distinction'
        ],
        correctIndex: 0,
        explanation: 'Lead indicators (e.g., vaccine appointments booked) predict future outcomes, whereas lag indicators (e.g., mortality rate reduction) confirm completed achievements.',
        governanceContext: 'NITI Aayog Aspirational Districts monitoring framework.'
      },
      {
        id: 'da-3',
        question: 'Which portal serves as the official single-point open repository for publishing government datasets for public research and analytics in India?',
        options: [
          'data.gov.in (Open Government Data - OGD India)',
          'google.com',
          'wikipedia.org',
          'pib.gov.in'
        ],
        correctIndex: 0,
        explanation: 'data.gov.in is the national portal designed to promote transparency, innovation, and evidence-based analysis by sharing anonymized public datasets.',
        governanceContext: 'National Data Sharing and Accessibility Policy (NDSAP).'
      }
    ],
    'True/False': [
      {
        id: 'da-tf-1',
        question: 'Before publishing departmental administrative data on open platforms, personally identifiable information (PII) must be scrubbed or de-identified.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Anonymization and differential privacy safeguards are legally required to prevent citizen de-anonymization.',
        governanceContext: 'DPDP Act 2023 compliance.'
      }
    ]
  },
  'AI Fundamentals': {
    MCQ: [
      {
        id: 'ai-1',
        question: 'What is the name of the national digital public infrastructure initiative providing AI-based speech and language translation across Indian languages?',
        options: [
          'Project Bhashini (National Language Translation Mission)',
          'UPI Pay',
          'DigiYatra',
          'CoWIN'
        ],
        correctIndex: 0,
        explanation: 'Project Bhashini aims to transcend language barriers using AI models for speech-to-speech, text-to-speech, and neural machine translation in 22 scheduled languages.',
        governanceContext: 'Spearheaded by Digital India Bhashini Division (MeitY).'
      },
      {
        id: 'ai-2',
        question: 'What risk occurs when a Generative AI model produces convincing, authoritative sounding text that is factually false?',
        options: [
          'Overclocking',
          'Hallucination',
          'Bandwidth throttle',
          'Cache miss'
        ],
        correctIndex: 1,
        explanation: 'AI hallucination refers to instances where generative models fabricate incorrect facts with high confidence, necessitating human review in government decisions.',
        governanceContext: 'NITI Aayog Responsible AI Principles.'
      },
      {
        id: 'ai-3',
        question: 'Why is "Human-in-the-Loop" (HITL) mandatory when using AI systems for citizen welfare eligibility assessments?',
        options: [
          'To ensure computers consume less electricity',
          'To maintain constitutional accountability, prevent algorithmic bias, and protect natural justice',
          'Because AI cannot process numerical scores',
          'To slow down service delivery'
        ],
        correctIndex: 1,
        explanation: 'Administrative actions impacting citizen rights and entitlements must retain human officer accountability to adhere to natural justice and due process.',
        governanceContext: 'Supreme Court jurisprudence on automated administrative action.'
      }
    ],
    'True/False': [
      {
        id: 'ai-tf-1',
        question: 'Confidential draft cabinet notes and inter-ministerial correspondence may be pasted directly into commercial public AI chatbots like ChatGPT.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False. Submitting official non-public drafts to commercial external LLMs can breach data residency, Official Secrets provisions, and government information security guidelines.',
        governanceContext: 'Cabinet Secretariat Advisory on AI usage.'
      }
    ]
  },
  'Digital Governance': {
    MCQ: [
      {
        id: 'dg-1',
        question: 'Which mission-mode platform has transformed file movement and paperless operations across central government ministries?',
        options: [
          'e-Office by NIC',
          'WhatsApp Business',
          'PaperTrail Express',
          'Postal Docket System'
        ],
        correctIndex: 0,
        explanation: 'e-Office enables efficient, paperless, auditable, and transparent file management across central and state secretariats.',
        governanceContext: 'DARPG Department of Administrative Reforms & Public Grievances.'
      },
      {
        id: 'dg-2',
        question: 'What is the role of the DigiLocker platform in the India Stack ecosystem?',
        options: [
          'Gaming console streaming',
          'Providing citizens with a secure cloud repository for verified digital documents with legal parity to physical originals',
          'Hosting social media videos',
          'Managing central tax budgets'
        ],
        correctIndex: 1,
        explanation: 'DigiLocker issues and stores verifiable digital credentials (driving licenses, marksheets, caste certificates) directly from the issuer repository.',
        governanceContext: 'Rule 9A of Information Technology (Preservation and Retention of Information) Rules.'
      }
    ],
    'True/False': [
      {
        id: 'dg-tf-1',
        question: 'The National Programme for Civil Services Capacity Building (NPCSCB) is anchored by the iGOT Karmayogi digital learning platform.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True. Mission Karmayogi operates through iGOT Karmayogi to deliver role-based, continuous competency-linked training.',
        governanceContext: 'Capacity Building Commission (CBC) mandate.'
      }
    ]
  }
};
