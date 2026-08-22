'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Flame, UserCheck } from 'lucide-react';

const notifications = [
  { name: 'Aditya K.', city: 'Pune', action: 'enrolled in IAT 2026 Achievers Batch', time: '2m ago' },
  { name: 'Shreya M.', city: 'Kolkata', action: 'booked Free 1-on-1 Academic Counseling', time: '4m ago' },
  { name: 'Rohan P.', city: 'Bhubaneswar', action: 'scored 94% on Science Diagnostic Mock', time: '7m ago' },
  { name: 'Megha S.', city: 'Bengaluru', action: 'enrolled in NEST Super-30 Intensive', time: '11m ago' },
  { name: 'Kabir V.', city: 'Jaipur', action: 'joined All-India Test Series (AITS)', time: '14m ago' },
];

export function LiveNotificationToast() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after initial 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 800);
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const notif = notifications[currentIdx];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm pointer-events-none hidden sm:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-3.5 rounded-2xl glass-panel border border-white/15 bg-[#12121A]/95 shadow-2xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs text-white font-medium">
                <strong className="text-indigo-300">{notif.name}</strong> from {notif.city}
              </div>
              <div className="text-[11px] text-slate-300">
                {notif.action} • <span className="text-slate-500">{notif.time}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
