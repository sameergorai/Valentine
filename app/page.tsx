'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Stars, Frown, Smile, Sparkles, PartyPopper } from 'lucide-react';

export default function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [hearts, setHearts] = useState<{id: number, left: number, delay: number, size: number}[]>([]);

  // Generate floating background hearts on mount
  useEffect(() => {
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 10,
    }));
    setHearts(newHearts);
  }, []);

  const yesButtonSize = noCount * 20 + 16; 
  
  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Pookie please?",
    "Don't do this to me!",
    "I'm going to cry...",
    "You're breaking my heart ;(",
    "I'll give you cookies!",
    "Pretty please?",
    "No isn't an option!",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-gradient-to-br from-pink-100 via-red-100 to-rose-200 p-4 overflow-hidden text-center font-sans relative selection:bg-rose-200">
      
      {/* Import Cute Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Nunito:wght@400;700&display=swap');
        
        .font-lovely {
          font-family: 'Great Vibes', cursive;
        }
        .font-body {
          font-family: 'Nunito', sans-serif;
        }
        
        @keyframes float-up {
          0% { transform: translateY(120vh) scale(0.5) rotate(0deg); opacity: 0.6; }
          100% { transform: translateY(-20vh) scale(1) rotate(360deg); opacity: 0; }
        }

        .floating-heart {
          position: absolute;
          bottom: -10vh;
          animation: float-up 6s linear infinite;
        }
      `}</style>

      {/* Floating Background Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart) => (
          <div 
            key={heart.id}
            className="floating-heart text-rose-300/40"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.delay + 5}s`,
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </div>
        ))}
      </div>

      <div className="z-10 w-full max-w-md flex flex-col items-center gap-6">
        {yesPressed ? (
          /* SUCCESS STATE */
          <div className="animate-bounce-in flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
                alt="Bears kissing" 
                className="relative w-full h-auto max-w-[280px] rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform"
              />
              <Sparkles className="absolute -top-6 -right-6 text-yellow-400 w-12 h-12 animate-spin-slow drop-shadow-md" />
              <Heart className="absolute -bottom-4 -left-4 text-rose-500 w-10 h-10 animate-bounce drop-shadow-md" fill="currentColor" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-lovely text-rose-600 leading-tight drop-shadow-sm">
                Yay!!! <br/> I love you!
              </h1>
              <p className="font-body text-rose-500 text-lg font-semibold flex items-center justify-center gap-2">
                Best Valentine Ever! <Heart size={20} fill="currentColor" className="text-red-500" />
              </p>
            </div>
          </div>
        ) : (
          /* ASKING STATE */
          <>
            <div className="relative mb-4">
              <div className="absolute -inset-2 bg-rose-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <img 
                src="https://media.tenor.com/K2sE98I_eC4AAAAi/bear-blow-kiss.gif" 
                alt="Bear asking" 
                className="relative w-full max-h-52 object-contain rounded-xl drop-shadow-xl"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-lovely text-rose-600 px-4 leading-normal drop-shadow-sm">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-4 w-full mt-4 font-body">
              {/* YES Button - Grows */}
              <button
                className={`bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 flex items-center justify-center gap-2 border-b-4 border-green-700`}
                style={{ fontSize: yesButtonSize, padding: `${Math.min(yesButtonSize/2, 30)}px ${Math.min(yesButtonSize, 60)}px` }}
                onClick={() => setYesPressed(true)}
              >
                Yes <Heart size={yesButtonSize} fill="currentColor" className="animate-pulse" />
              </button>

              {/* NO Button - Shrinks/Changes text */}
              <button
                onClick={() => setNoCount(noCount + 1)}
                className="bg-rose-100 hover:bg-rose-200 text-rose-500 font-bold py-3 px-6 rounded-xl shadow-md transition-all duration-200 text-sm border-2 border-rose-200 hover:border-rose-300"
              >
                {noCount === 0 ? (
                  <span className="flex items-center gap-1">No</span>
                ) : (
                  getNoButtonText()
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}