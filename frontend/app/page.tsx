'use client';

import React, { useEffect, useState } from 'react';
import { Mail, ExternalLink, Code2, Sparkles, Terminal, Phone } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveDemo?: string;
}

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  skills: string[];
  projects: Project[];
}

export default function Home() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/profile')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Backend not connected or error, loading fallback data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">
        <Sparkles className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-slate-400 font-mono">Loading Profile...</p>
      </div>
    );
  }

  const data = profile || {
    name: "Lalithadithya M",
    role: "backend developer | ui/ux designer | cloud engineer",
    bio: "Passionate about building scalable modern web applications, REST APIs, and sleek UI/UX components.",
    email: "lalithmurugan57@gmail.com",
    phone: "+91 8778924431",
    github: "https://github.com/lalithmurugan57-del",
    linkedin: "https://www.linkedin.com/in/lalithadithya-murugan-183766389/",
    skills: ["Node.js", "HTML", "Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "ui/ux design", "Python", "Java"],
    projects: [
      {
        title: "Portfolio Application",
        description: "Full-stack personal portfolio app powered by Next.js, Express, and MongoDB.",
        techStack: ["Next.js", "Node.js", "MongoDB"],
        githubUrl: "https://github.com/your-username/cinema-music-app",
        liveDemo: "#"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header / Hero Section */}
        <section className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm mb-4">
                <Terminal className="w-4 h-4" />
                <span>Developer Profile</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">
                {data.name}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-indigo-400 mb-4">
                {data.role}
              </p>
            </div>

            {/* Profile Image Section */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="/my-photo.jpg" 
                alt={data.name}
                className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-slate-800 shadow-xl"
              />
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mb-8">
            {data.bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {/* Email Button */}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20"
              >
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </a>
            )}

            {/* Phone Button */}
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all border border-slate-700"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{data.phone}</span>
              </a>
            )}

            {/* GitHub Link */}
            {data.github && (
              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all border border-slate-700"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            )}

            {/* LinkedIn Link */}
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-all border border-slate-700"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-slate-900/30 border border-slate-800/80 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Skills & Technologies</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-slate-800/80 hover:bg-indigo-950/40 text-indigo-300 border border-slate-700/60 hover:border-indigo-500/50 rounded-xl text-sm font-medium transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects?.map((proj, idx) => (
              <div
                key={idx}
                className="group bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.techStack?.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 border-t border-slate-800/80 pt-4">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 font-medium">
                        Code
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 font-medium">
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}