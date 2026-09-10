import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  Award,
  BookOpen,
  Flame,
  CheckCircle2,
  Download,
  ExternalLink,
  Calendar,
  Building2,
  Sparkles,
  Share2,
  FileCheck,
  Eye,
  X,
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, userRole, addToast } = useApp();
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 'cert-1',
      title: 'Digital Personal Data Protection Act 2023 Compliance',
      issuer: 'Ministry of Law & Justice / CBC',
      issueDate: '15 June 2026',
      certId: 'GOV-CERT-2026-DPDP-9812',
      verificationHash: '0x8892f...a17b',
    },
    {
      id: 'cert-2',
      title: 'Advanced e-Governance Systems Architecture',
      issuer: 'National Informatics Centre (NIC)',
      issueDate: '28 April 2026',
      certId: 'NIC-EGOV-ARCH-4412',
      verificationHash: '0x3341b...c990',
    },
    {
      id: 'cert-3',
      title: 'Official Communications & Secretariat Procedures',
      issuer: 'Institute of Secretariat Training and Management (ISTM)',
      issueDate: '12 January 2026',
      certId: 'ISTM-CSMOP-2026-1029',
      verificationHash: '0x5510c...d312',
    },
  ];

  const badges = [
    { title: 'Cyber Defender', icon: '🛡️', desc: 'Completed CERT-In Baseline Drills' },
    { title: '7-Day Streak Master', icon: '🔥', desc: '7 consecutive days of active upskilling' },
    { title: 'Data Steward', icon: '📊', desc: 'Mastered DPDP 2023 statutory controls' },
    { title: 'GovCloud Pioneer', icon: '☁️', desc: 'Certified in MeghRaj GI Cloud principles' },
  ];

  const handleDownloadCert = (cert) => {
    addToast(`Downloading verified certificate for ${cert.title} (PDF)`, 'success');
  };

  return (
    <div className="space-y-7 animate-fade-in max-w-5xl mx-auto">
      {/* Official Government Profile Header Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-xl relative overflow-hidden">
        {/* Subtle gradient banner */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-900 via-navy-900 to-cyan-900 opacity-90" />

        <div className="relative pt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-emerald-600 border-4 border-white dark:border-navy-900 shadow-xl shrink-0">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentUser.name}
                </h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {currentUser.cadre}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {currentUser.designation}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{currentUser.department}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => addToast('Digital Civil Service Dossier downloaded', 'success')}
              className="px-4 py-2 rounded-xl bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Cadre & Level Metadata Grid */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-navy-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Employee Identity ID:</span>
            <p className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {currentUser.employeeId}
            </p>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Learning Maturity:</span>
            <p className="font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
              Level 4 - Advanced Practitioner
            </p>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Overall Skill Score:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {currentUser.skillScore}% (Proficient)
            </p>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Karmayogi Status:</span>
            <p className="font-bold text-emerald-500 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Synced Today
            </p>
          </div>
        </div>
      </div>

      {/* Badges & Recognition Showcase */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Recognitions & Competency Badges
            </h3>
          </div>
          <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold">
            4 Verified Credentials
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 flex items-center gap-3"
            >
              <div className="text-2xl p-2 rounded-xl bg-white dark:bg-navy-900 shadow-sm border border-slate-100 dark:border-navy-800">
                {badge.icon}
              </div>
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">
                  {badge.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Digital Certificates Section */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Official Certificates of Competency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Digitally signed and verifiable on the National Civil Services Credential Ledger
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Cryptographically Verified
          </span>
        </div>

        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-white dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {cert.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Issued by: <strong className="text-slate-700 dark:text-slate-300">{cert.issuer}</strong> • Date: {cert.issueDate}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Cert ID: {cert.certId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => handleDownloadCert(cert)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm btn-command"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border-2 border-emerald-500/40 p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white text-center relative">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                Government of India • National Capacity Building Commission
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Certificate of Competency
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-2">
              <p className="text-xs text-slate-500">This is to certify that</p>
              <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {currentUser.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Has successfully completed and demonstrated certified proficiency in:
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {selectedCert.title}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left text-xs border-t border-slate-100 dark:border-navy-800 pt-4">
              <div>
                <span className="text-slate-400 text-[11px]">Issuer Authority:</span>
                <p className="font-bold text-slate-800 dark:text-slate-200">{selectedCert.issuer}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Issued Date:</span>
                <p className="font-bold text-slate-800 dark:text-slate-200">{selectedCert.issueDate}</p>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 text-[11px]">Verifiable Hash:</span>
                <p className="font-mono text-[10px] text-slate-500">{selectedCert.verificationHash}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  handleDownloadCert(selectedCert);
                  setSelectedCert(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 btn-command"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
