import React from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  Printer,
  Copy,
  Check,
  X,
  ShieldCheck,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export const CertificateModal = ({ certificate, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handleCopyLink = () => {
    const url = certificate.qrPayload || `https://govlearn.gov.in/verify/${certificate.certId}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-slate-200 dark:border-navy-700 shadow-2xl overflow-hidden bg-white dark:bg-navy-900 text-slate-900 dark:text-slate-100 flex flex-col max-h-[95vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/70">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-sm text-slate-800 dark:text-white font-display">
              Verifiable Course Completion Certificate
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="border-4 border-double border-amber-500/40 rounded-2xl p-6 sm:p-10 relative bg-gradient-to-b from-amber-50/20 via-white to-amber-50/10 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 text-center space-y-6 shadow-inner">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500" />

            {/* Header Badge */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-navy-950 font-black text-2xl">
                <ShieldCheck className="w-8 h-8 text-navy-950" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-amber-600 dark:text-amber-400 uppercase font-bold">
                Smart India Hackathon 2026 • SIH26101
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white">
                GovLearn AI e-Learning Certificate
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                AI-Enabled Capacity Building for Government Employees
              </p>
            </div>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />

            {/* Body Text */}
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                This certifies that
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-cyan-400 font-display tracking-wide">
                {certificate.recipientName}
              </h3>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-300">
                Official ID: <strong>{certificate.recipientId}</strong>
              </p>
            </div>

            <div className="space-y-1 max-w-lg mx-auto">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                has successfully completed all required modules, assessments, and competency milestones for the professional curriculum:
              </p>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-1">
                {certificate.title}
              </h4>
            </div>

            {/* Verification Metadata Grid */}
            <div className="pt-4 border-t border-slate-200 dark:border-navy-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs bg-slate-50/60 dark:bg-navy-950/60 p-4 rounded-xl border border-slate-200/80 dark:border-navy-800">
              <div>
                <span className="block text-[10px] text-slate-600 dark:text-slate-300 font-bold uppercase">
                  Certificate ID
                </span>
                <span className="font-mono font-bold text-slate-800 dark:text-white text-[11px]">
                  {certificate.certId}
                </span>
              </div>

              <div>
                <span className="block text-[10px] text-slate-600 dark:text-slate-300 font-bold uppercase">
                  Issue Date
                </span>
                <span className="font-semibold text-slate-800 dark:text-white">
                  {certificate.issueDate}
                </span>
              </div>

              <div>
                <span className="block text-[10px] text-slate-600 dark:text-slate-300 font-bold uppercase">
                  Verification Hash
                </span>
                <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 truncate block" title={certificate.verificationHash}>
                  {certificate.verificationHash ? `${certificate.verificationHash.slice(0, 16)}...` : '0x8892fa...'}
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-slate-600 dark:text-slate-300 italic">
              * Issued under the GovLearn AI continuous capacity upskilling framework. Demonstrates competency achievement on the GovLearn AI platform.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-navy-800 bg-slate-50/70 dark:bg-navy-950/70 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Verification Link Copied!' : 'Copy Verification URL'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-navy-800 hover:bg-slate-300 dark:hover:bg-navy-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
