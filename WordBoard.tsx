import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface WordBoardProps {
  targetWord: string; // "PENDEJOS"
  revealedLetters: Set<string>;
  revealedIndices: Set<number>;
  canPickLetter: boolean;
  onSelectLetter: (letter: string) => void;
  onDirectRevealIndex?: (index: number) => void;
  usedLetters: Set<string>;
}

export const WordBoard: React.FC<WordBoardProps> = ({
  targetWord,
  revealedLetters,
  revealedIndices,
  canPickLetter,
  onSelectLetter,
  onDirectRevealIndex,
  usedLetters,
}) => {
  const letters = targetWord.split('');

  // Alphabet for Spanish: A-Z
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const isIndexRevealed = (char: string, index: number) => {
    return revealedLetters.has(char) || revealedIndices.has(index);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6" id="word-board">
      {/* Board Title / Status */}
      <div className="flex items-center gap-2 text-center">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <span className="text-xs uppercase tracking-widest text-slate-700 font-extrabold">
          Загаданное испанское слово ({letters.length} букв)
        </span>
        <Sparkles className="w-5 h-5 text-orange-500" />
      </div>

      {/* The Iconic Word Board in Slate-800 */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3.5 p-5 sm:p-8 bg-slate-800 border-4 border-slate-900 rounded-3xl shadow-2xl">
        {letters.map((char, index) => {
          const revealed = isIndexRevealed(char, index);
          const isClickableCard = canPickLetter && !revealed && onDirectRevealIndex;

          return (
            <div
              key={index}
              onClick={() => {
                if (isClickableCard) {
                  onDirectRevealIndex(index);
                }
              }}
              title={isClickableCard ? 'Нажмите, чтобы открыть эту букву!' : undefined}
              className={`relative perspective-500 group ${
                isClickableCard ? 'cursor-pointer' : ''
              }`}
            >
              <motion.div
                animate={{ rotateY: revealed ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-11 h-16 sm:w-14 sm:h-20 md:w-16 md:h-24 rounded-xl flex items-center justify-center font-bold text-2xl sm:text-3xl md:text-4xl shadow-md transition-all [transform-style:preserve-3d]"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Back side of tile (Closed state) */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-xl flex flex-col items-center justify-center [backface-visibility:hidden] border-b-4 transition-all ${
                    isClickableCard
                      ? 'bg-orange-600 border-orange-800 text-white ring-4 ring-orange-400 hover:scale-105 animate-pulse'
                      : 'bg-slate-600 border-slate-900 text-slate-300'
                  }`}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 rotate-45 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white/70 rotate-45" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-300 font-bold mt-1">
                    {index + 1}
                  </span>
                </div>

                {/* Front side of tile (Revealed letter) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-xl flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-orange-500 text-white border-b-4 border-orange-700 shadow-md font-black"
                >
                  {char}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Letter picking keyboard during letter selection phase */}
      <AnimatePresence>
        {canPickLetter && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full max-w-2xl bg-slate-800 border-2 border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center gap-3 animate-fade-in"
            id="letter-picker"
          >
            <div className="flex items-center gap-2 text-center">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-sm sm:text-base font-bold text-orange-400">
                Верный ответ! Назовите букву или нажмите на карточку выше:
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {alphabet.map((letter) => {
                const isUsed = usedLetters.has(letter) || revealedLetters.has(letter);
                return (
                  <button
                    key={letter}
                    disabled={isUsed}
                    onClick={() => onSelectLetter(letter)}
                    className={`w-8 h-9 sm:w-10 sm:h-11 rounded-lg font-extrabold text-sm sm:text-base transition-all border-b-4 ${
                      isUsed
                        ? 'bg-slate-700 text-slate-500 border-slate-900 cursor-not-allowed line-through'
                        : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white border-orange-700 hover:brightness-110 active:scale-95 shadow-md cursor-pointer'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
