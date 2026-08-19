"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Award,
  GraduationCap,
  Sparkles,
  Target,
  BookOpen,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  ArrowLeft,
  Edit3,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pushAllLocalData } from "@/lib/supabase/sync.service";
import { broadcastProgressUpdate } from "@/lib/services/progressOrchestrator.service";

interface ProfileViewProps {
  onBackToDashboard: () => void;
  onNavigateToSection?: (sec: string) => void;
}

export function ProfileView({ onBackToDashboard, onNavigateToSection }: ProfileViewProps) {
  const [userName, setUserName] = useState<string>("SciPrep Aspirant");
  const [userTarget, setUserTarget] = useState<string>("AIR < 10 (NISER Bhubaneswar)");
  const [targetYear, setTargetYear] = useState<string>("2026");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem("nest_user_name") || localStorage.getItem("currentUser");
      const savedTarget = localStorage.getItem("nest_user_target");
      if (savedName) setUserName(savedName);
      if (savedTarget) setUserTarget(savedTarget);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const handleSaveProfile = () => {
    try {
      localStorage.setItem("nest_user_name", userName);
      localStorage.setItem("currentUser", userName);
      localStorage.setItem("nest_user_target", userTarget);
      setIsEditing(false);
      pushAllLocalData().catch(() => {});
      broadcastProgressUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const milestones = [
    { title: "NEST Foundation Pioneer", desc: "Completed initial diagnostic readiness assessment", earned: true, icon: Award, color: "text-amber-500 bg-amber-50" },
    { title: "Calculus Champion", desc: "Achieved >80% accuracy in integration & limits PYQs", earned: true, icon: Zap, color: "text-purple-600 bg-purple-50" },
    { title: "Bio Genetics Master", desc: "Mastered Mendelian genetics & Pedigree analysis traps", earned: true, icon: BookOpen, color: "text-emerald-600 bg-emerald-50" },
    { title: "Full Mock Conquereor", desc: "Completed full 180-min official NEST mock simulation", earned: true, icon: Target, color: "text-blue-600 bg-blue-50" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Profile Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToDashboard}
            className="h-9 w-9 p-0 rounded-xl border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 text-gray-700" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-9 font-bold text-xs rounded-xl border-gray-200 hover:bg-gray-50 flex items-center gap-1.5"
          >
            <Edit3 className="h-3.5 w-3.5" /> {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
            {userName.slice(0, 2).toUpperCase()}
          </div>

          <div className="space-y-1.5 flex-1">
            {isEditing ? (
              <div className="space-y-3 max-w-md">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black text-gray-900"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  value={userTarget}
                  onChange={(e) => setUserTarget(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700"
                  placeholder="Target Goal / Rank"
                />
                <Button size="sm" onClick={handleSaveProfile} className="h-8 bg-purple-600 text-white font-bold text-xs rounded-lg">
                  Save Details
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-gray-900 tracking-tight">{userName}</h1>
                  <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[10px] font-extrabold">
                    NEST {targetYear} Aspirant
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-purple-600" /> Target: <span className="font-bold text-gray-700">{userTarget}</span>
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> NISER / CEBS Registered
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Target & Readiness Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-center space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Estimated Percentile</span>
          <span className="text-xl font-black text-purple-600">96.4%</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-center space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Accuracy Rate</span>
          <span className="text-xl font-black text-emerald-600">78.5%</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-center space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Daily Study Streak</span>
          <span className="text-xl font-black text-amber-500 flex items-center justify-center gap-1">
            <Flame className="h-5 w-5 fill-amber-500" /> 14 Days
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs text-center space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Questions Practiced</span>
          <span className="text-xl font-black text-indigo-600">420+ Qs</span>
        </div>
      </div>

      {/* Earned Milestones & Achievements */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2">
            Preparation Milestones <Sparkles className="h-4 w-4 text-amber-500" />
          </h2>
          <p className="text-xs text-gray-500 font-medium">Badges earned through consistent practice and high mock test scores.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${m.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-gray-900 block">{m.title}</span>
                  <p className="text-[11px] text-gray-500 font-medium">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
