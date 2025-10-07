import { BookOpen, Youtube, Award, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VisitStats {
  totalVisits: number;
  timestamp?: string;
}

function App() {
  const [stats, setStats] = useState<VisitStats>({ totalVisits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Track visit
    fetch(`${API_URL}/api/visit`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to track visit:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <BookOpen className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
              Hello, I am <span className="text-blue-600">Meta</span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-600 font-light">
              I create courses on Udemy
            </p>
          </div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Course Creation Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Youtube className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Online Education
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Creating engaging and comprehensive courses to help students learn and grow in their careers.
              </p>
            </div>

            {/* Expertise Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Quality Learning
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Dedicated to providing high-quality educational content that makes a real difference in students' lives.
              </p>
            </div>
          </div>

          {/* Backend Stats Card */}
          <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Live Backend Stats</h3>
                  <p className="text-sm text-slate-600">Powered by Express.js API</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Live</span>
              </div>
            </div>
            <div className="mt-6">
              {loading ? (
                <div className="text-slate-600 animate-pulse">Loading stats...</div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-800">{stats.totalVisits}</span>
                  <span className="text-lg text-slate-600">total visits</span>
                </div>
              )}
              {stats.timestamp && (
                <p className="text-sm text-slate-500 mt-2">
                  Last visit: {new Date(stats.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <a
              href="https://www.udemy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              View My Courses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
