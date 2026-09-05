import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QuizQuestion } from './questions';
import { Wheel, WheelSector } from './Wheel';
import { WordBoard } from './WordBoard';
import { sounds } from './AudioUtils';
import {
  Volume2,
  VolumeX,
  Trophy,
  RotateCcw,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  Flame,
} from 'lucide-react';

const TARGET_WORD = 'PENDEJOS';

type GamePhase = 'IDLE_SPIN' | 'SPINNING' | 'QUESTION' | 'PICK_LETTER' | 'VICTORY';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('IDLE_SPIN');
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [currentSector, setCurrentSector] = useState<WheelSector | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Question pool and tracking
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);

  // User requirement: "при клике на вопрос пусть откроется перевод на рус и варианты тоже"
  const [isQuestionRevealed, setIsQuestionRevealed] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Letters tracking
  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(new Set());
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [lastLetterResult, setLastLetterResult] = useState<string | null>(null);

  // Modal for guessing full word
  const [showGuessWordModal, setShowGuessWordModal] = useState<boolean>(false);
  const [fullWordInput, setFullWordInput] = useState<string>('');
  const [guessError, setGuessError] = useState<string | null>(null);

  // Shuffle question pool on init
  const shuffledQuestions = useMemo(() => {
    return [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  }, []);

  // Check if word is fully revealed
  const isWordFullyRevealed = useMemo(() => {
    const letters = TARGET_WORD.split('');
    return letters.every((char, idx) => revealedLetters.has(char) || revealedIndices.has(idx));
  }, [revealedLetters, revealedIndices]);

  useEffect(() => {
    if (isWordFullyRevealed && phase !== 'VICTORY') {
      triggerVictory();
    }
  }, [isWordFullyRevealed, phase]);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sounds.setMuted(nextState);
  };

  const triggerVictory = () => {
    setPhase('VICTORY');
    sounds.playWin();
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#10B981', '#6366F1', '#EC4899'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 400);
    } catch {
      // ignore
    }
  };

  // Called when wheel finishes spinning
  const handleSpinComplete = (sector: WheelSector) => {
    setCurrentSector(sector);

    // Pick next question from bank of 80 questions
    let nextQ: QuizQuestion | null = null;
    let nextIdx = questionIndex;

    while (nextIdx < shuffledQuestions.length) {
      const candidate = shuffledQuestions[nextIdx];
      if (!usedQuestionIds.has(candidate.id)) {
        nextQ = candidate;
        break;
      }
      nextIdx++;
    }

    // Fallback if all 80 were seen
    if (!nextQ) {
      nextQ = shuffledQuestions[Math.floor(Math.random() * shuffledQuestions.length)];
    }

    setCurrentQuestion(nextQ);
    setQuestionIndex(nextIdx + 1);
    setUsedQuestionIds((prev) => new Set([...prev, nextQ!.id]));

    // Reset question card state
    setIsQuestionRevealed(false);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setLastLetterResult(null);

    setPhase('QUESTION');
  };

  // When player clicks question or reveal button
  const handleRevealQuestion = () => {
    if (!isQuestionRevealed) {
      setIsQuestionRevealed(true);
      sounds.playTick();
    }
  };

  // When player submits an answer
  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (answerSubmitted || !currentQuestion) return;

    setSelectedAnswer(optionId);
    setAnswerSubmitted(true);

    const isCorrect = optionId === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      sounds.playCorrect();
      const pointsWon = currentSector
        ? currentSector.isMultiplier
          ? (score || 500) * (currentSector.value - 1)
          : currentSector.value
        : 500;
      setScore((prev) => prev + Math.max(100, pointsWon));
      setStreak((prev) => prev + 1);

      // Transition to letter selection phase
      setPhase('PICK_LETTER');
    } else {
      sounds.playWrong();
      setStreak(0);
      // As requested: "а если ответ неверный то всё равно продолжить игру то есть крутить барабан и отвечать"
      // Player stays in question state showing review, with option to continue immediately
    }
  };

  // Handle opening letter from keyboard
  const handleSelectLetter = (letter: string) => {
    if (phase !== 'PICK_LETTER') return;

    setUsedLetters((prev) => new Set([...prev, letter]));

    if (TARGET_WORD.includes(letter)) {
      sounds.playLetterReveal();
      const count = TARGET_WORD.split('').filter((l) => l === letter).length;
      setRevealedLetters((prev) => new Set([...prev, letter]));
      setLastLetterResult(`Отлично! Буква «${letter}» открыта (${count} шт.)!`);

      // Check if this completes the word
      const updatedLetters = new Set([...revealedLetters, letter]);
      const isComplete = TARGET_WORD.split('').every(
        (c, i) => updatedLetters.has(c) || revealedIndices.has(i)
      );

      if (isComplete) {
        triggerVictory();
      } else {
        setTimeout(() => {
          setPhase('IDLE_SPIN');
        }, 1200);
      }
    } else {
      sounds.playWrong();
      setLastLetterResult(`Увы, буквы «${letter}» нет в слове. Но очки сохранены!`);
      setTimeout(() => {
        setPhase('IDLE_SPIN');
      }, 1500);
    }
  };

  // Handle direct tile click on the board
  const handleDirectRevealIndex = (index: number) => {
    if (phase !== 'PICK_LETTER') return;

    const letter = TARGET_WORD[index];
    sounds.playLetterReveal();
    setRevealedIndices((prev) => new Set([...prev, index]));
    setRevealedLetters((prev) => new Set([...prev, letter]));
    setUsedLetters((prev) => new Set([...prev, letter]));
    setLastLetterResult(`Вы открыли букву «${letter}» на позиции ${index + 1}!`);

    const updatedIndices = new Set([...revealedIndices, index]);
    const updatedLetters = new Set([...revealedLetters, letter]);
    const isComplete = TARGET_WORD.split('').every(
      (c, i) => updatedLetters.has(c) || updatedIndices.has(i)
    );

    if (isComplete) {
      triggerVictory();
    } else {
      setTimeout(() => {
        setPhase('IDLE_SPIN');
      }, 1200);
    }
  };

  // Guess the full word
  const handleGuessFullWord = () => {
    setGuessError(null);
    const cleaned = fullWordInput.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === TARGET_WORD) {
      // Solved!
      TARGET_WORD.split('').forEach((char) => {
        revealedLetters.add(char);
      });
      setRevealedLetters(new Set(revealedLetters));
      setShowGuessWordModal(false);
      setScore((prev) => prev + 3000);
      triggerVictory();
    } else {
      sounds.playWrong();
      setGuessError(`«${cleaned}» — это не то слово. Попробуйте продолжить игру через барабан!`);
    }
  };

  // Reset entire game
  const handleRestart = () => {
    setPhase('IDLE_SPIN');
    setScore(0);
    setStreak(0);
    setCurrentSector(null);
    setQuestionIndex(0);
    setUsedQuestionIds(new Set());
    setCurrentQuestion(null);
    setIsQuestionRevealed(false);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setRevealedLetters(new Set());
    setRevealedIndices(new Set());
    setUsedLetters(new Set());
    setLastLetterResult(null);
    setShowGuessWordModal(false);
    setFullWordInput('');
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white" id="app">
      {/* Top Header - Vibrant Palette style */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 bg-orange-500 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 sm:p-2.5 rounded-xl text-orange-600 font-black text-xl shadow-md leading-none flex items-center justify-center">
              ES
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight uppercase text-white">
                Поле Чудес: Español
              </h1>
              <p className="text-[11px] sm:text-xs text-orange-100 font-medium">
                80 вопросов • Секрет: PENDEJOS
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] sm:text-xs text-orange-100 uppercase font-bold tracking-wider">
                Вопрос
              </p>
              <p id="q-count" className="text-base sm:text-xl font-black font-mono text-white">
                {usedQuestionIds.size} / {QUIZ_QUESTIONS.length}
              </p>
            </div>

            {streak > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-600 border border-orange-400 text-white text-xs font-bold shadow-inner animate-pulse">
                <Flame className="w-4 h-4 text-yellow-300" />
                <span>x{streak} серия</span>
              </div>
            )}

            <div className="text-right">
              <p className="text-[10px] sm:text-xs text-orange-100 uppercase font-bold tracking-wider">
                Очки
              </p>
              <p id="score" className="text-lg sm:text-2xl font-black font-mono text-white">
                {score}
              </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={toggleSound}
                className="p-2 sm:p-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white border border-orange-400/50 shadow-sm transition active:scale-95 cursor-pointer"
                title={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-200" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-2 sm:p-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white border border-orange-400/50 shadow-sm transition active:scale-95 cursor-pointer"
                title="Начать заново"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col gap-8 items-center">
        {/* The Word Board ("PENDEJOS") */}
        <section className="w-full flex flex-col items-center">
          <WordBoard
            targetWord={TARGET_WORD}
            revealedLetters={revealedLetters}
            revealedIndices={revealedIndices}
            canPickLetter={phase === 'PICK_LETTER'}
            onSelectLetter={handleSelectLetter}
            onDirectRevealIndex={handleDirectRevealIndex}
            usedLetters={usedLetters}
          />

          {/* Optional button to guess word entirely */}
          {phase !== 'VICTORY' && (
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setShowGuessWordModal(true)}
                className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 underline underline-offset-4 flex items-center gap-1.5 transition cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                Назвать всё слово сразу (+3000 очков)
              </button>
            </div>
          )}

          {lastLetterResult && (
            <div className="mt-3 py-2 px-5 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-sm font-bold shadow-sm animate-fade-in text-center">
              {lastLetterResult}
            </div>
          )}
        </section>

        {/* Victory Screen */}
        {phase === 'VICTORY' && (
          <section className="w-full max-w-2xl bg-white border-4 border-orange-400 rounded-3xl p-6 sm:p-10 text-center shadow-2xl flex flex-col items-center gap-5 animate-scale-up text-slate-800">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-orange-600">
              Слово угадано! ПОБЕДА!
            </h2>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-orange-200 text-center w-full">
              <div className="text-3xl sm:text-5xl font-black tracking-widest text-slate-900 font-mono mb-2">
                PENDEJOS
              </div>
              <p className="text-sm sm:text-base text-slate-600 italic">
                (Испанское разговорное слово / сленг: «дурачки / балбесы»)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Итоговый счёт</span>
                <p className="text-xl sm:text-2xl font-black text-orange-600 font-mono">
                  {score}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Вопросов пройдено</span>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
                  {usedQuestionIds.size}
                </p>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="mt-2 px-8 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-black text-lg shadow-xl active:scale-95 transition cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Сыграть ещё раз
            </button>
          </section>
        )}

        {/* Central Game Area: Wheel & Interactive Question Section */}
        {phase !== 'VICTORY' && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: The Wheel */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 bg-white border-2 border-orange-100 rounded-3xl shadow-xl">
              <div className="mb-2 text-center">
                <span className="text-xs uppercase tracking-wider font-extrabold text-orange-600">
                  {phase === 'IDLE_SPIN'
                    ? '1. Вращайте барабан'
                    : phase === 'SPINNING'
                    ? 'Барабан в движении...'
                    : 'Сектор разыгран!'}
                </span>
                <p className="text-xs text-slate-500 font-medium">
                  Барабан без банкрота • Любой сектор даёт баллы
                </p>
              </div>

              <Wheel
                onSpinComplete={handleSpinComplete}
                disabled={phase !== 'IDLE_SPIN'}
                spinning={phase === 'SPINNING'}
                setSpinning={(s) => setPhase(s ? 'SPINNING' : 'QUESTION')}
                currentSector={currentSector}
              />
            </div>

            {/* Right Column: Question & Translation & Options */}
            <div className="lg:col-span-7 flex flex-col items-center w-full">
              {/* Question Phase View */}
              {currentQuestion && (phase === 'QUESTION' || phase === 'PICK_LETTER') ? (
                <div
                  className="w-full bg-white border-2 border-orange-200 rounded-3xl p-5 sm:p-7 shadow-xl flex flex-col gap-5 text-slate-800"
                  id="question-card"
                >
                  {/* Category & Points Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 font-bold text-xs tracking-wider uppercase">
                      Тема: {currentQuestion.category}
                    </span>
                    {currentSector && (
                      <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                        На кону: +{currentSector.label}{' '}
                        {currentSector.isMultiplier ? 'x' : 'баллов'}
                      </span>
                    )}
                  </div>

                  {/* SPANISH SENTENCE CARD - CLICKABLE TO REVEAL */}
                  <div
                    onClick={handleRevealQuestion}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleRevealQuestion()}
                    className={`relative p-5 sm:p-6 rounded-2xl transition-all border-2 cursor-pointer group select-none shadow-sm ${
                      isQuestionRevealed
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-orange-50/80 border-orange-300 hover:border-orange-500 shadow-md ring-2 ring-orange-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span>Вопрос #{currentQuestion.id} (Испанский)</span>
                          {!isQuestionRevealed && (
                            <span className="inline-block px-2 py-0.5 rounded bg-orange-500 text-white font-black text-[10px] animate-pulse">
                              НАЖМИТЕ ЗДЕСЬ
                            </span>
                          )}
                        </div>

                        {/* Spanish question sentence */}
                        <p className="text-lg sm:text-2xl font-black text-slate-800 leading-relaxed">
                          {currentQuestion.questionEs}
                        </p>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                          isQuestionRevealed
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-orange-500 text-white group-hover:scale-110 shadow-md'
                        }`}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            isQuestionRevealed ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* Instruction hint when not revealed */}
                    {!isQuestionRevealed && (
                      <div className="mt-4 pt-3 border-t border-orange-200 flex items-center gap-2 text-xs sm:text-sm text-orange-700 font-medium">
                        <HelpCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span>
                          Нажмите на этот блок, чтобы открыть русский перевод и варианты ответов
                        </span>
                      </div>
                    )}
                  </div>

                  {/* RUSSIAN TRANSLATION & OPTIONS (REVEALED ON CLICK) */}
                  {isQuestionRevealed ? (
                    <div className="flex flex-col gap-5 animate-fade-in">
                      {/* Russian Translation Box */}
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                        <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs font-bold uppercase mt-0.5">
                          Перевод
                        </span>
                        <p className="text-base sm:text-lg text-slate-800 font-semibold">
                          «{currentQuestion.translationRu}»
                        </p>
                      </div>

                      {/* 4 Options Grid (A, B, C, D) */}
                      <div className="flex flex-col gap-2.5">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Выберите верный вариант вставки:
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentQuestion.options.map((opt) => {
                            const isChosen = selectedAnswer === opt.id;
                            const isCorrect = opt.id === currentQuestion.correctAnswer;

                            let btnStyle =
                              'bg-white hover:bg-orange-50/70 border-slate-200 hover:border-orange-300 text-slate-800 shadow-sm cursor-pointer';

                            if (answerSubmitted) {
                              if (isCorrect) {
                                btnStyle =
                                  'bg-emerald-600 border-emerald-700 text-white ring-2 ring-emerald-300 shadow-md';
                              } else if (isChosen && !isCorrect) {
                                btnStyle =
                                  'bg-rose-600 border-rose-700 text-white ring-2 ring-rose-300 shadow-md';
                              } else {
                                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                disabled={answerSubmitted}
                                onClick={() => handleSelectOption(opt.id)}
                                className={`p-4 rounded-2xl border-2 text-left font-bold text-base sm:text-lg flex items-center justify-between gap-3 transition-all active:scale-[0.98] ${btnStyle}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm font-mono border ${
                                      answerSubmitted && (isCorrect || (isChosen && !isCorrect))
                                        ? 'bg-black/20 text-white border-white/30'
                                        : 'bg-slate-100 text-slate-700 border-slate-200'
                                    }`}
                                  >
                                    {opt.id}
                                  </span>
                                  <span>{opt.text}</span>
                                </div>

                                {answerSubmitted && isCorrect && (
                                  <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                                )}
                                {answerSubmitted && isChosen && !isCorrect && (
                                  <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Educational Explanation and Continue Buttons */}
                      {answerSubmitted && (
                        <div className="flex flex-col gap-4 animate-fade-in pt-2">
                          <div
                            className={`p-4 rounded-2xl border ${
                              isAnswerCorrect
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                : 'bg-rose-50 border-rose-200 text-rose-900'
                            }`}
                          >
                            <div className="flex items-center gap-2 font-bold mb-1">
                              {isAnswerCorrect ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                  <span>Правильно! Отличный ответ!</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-rose-600" />
                                  <span>
                                    Не совсем так. Правильный ответ:{' '}
                                    <strong className="underline">
                                      {currentQuestion.correctAnswer}){' '}
                                      {
                                        currentQuestion.options.find(
                                          (o) => o.id === currentQuestion.correctAnswer
                                        )?.text
                                      }
                                    </strong>
                                  </span>
                                </>
                              )}
                            </div>
                            {currentQuestion.explanation && (
                              <p className="text-sm text-slate-700 mt-1 font-medium">
                                {currentQuestion.explanation}
                              </p>
                            )}
                          </div>

                          {/* Action Button */}
                          {isAnswerCorrect ? (
                            <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-center text-orange-800 font-bold text-sm flex items-center justify-center gap-2 shadow-sm">
                              <Sparkles className="w-4 h-4 text-orange-500" />
                              <span>
                                Выберите букву на клавиатуре выше или нажмите на закрытую карточку на
                                табло!
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                              <span className="text-sm text-slate-600 font-medium text-center sm:text-left">
                                Ничего страшного! Продолжайте игру — крутите барабан снова.
                              </span>
                              <button
                                onClick={() => setPhase('IDLE_SPIN')}
                                className="w-full sm:w-auto px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                              >
                                <span>Крутить барабан дальше</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Prompt button to reveal */
                    <button
                      onClick={handleRevealQuestion}
                      className="w-full py-3.5 rounded-2xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-orange-700 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <HelpCircle className="w-5 h-5 text-orange-500" />
                      <span>Открыть русский перевод и 4 варианта ответов</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Idle state waiting for spin */
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 bg-white border-2 border-dashed border-orange-200 rounded-3xl text-center gap-4 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800">
                      Барабан готов к вращению!
                    </h3>
                    <p className="text-sm text-slate-500 max-w-md mt-1 font-medium">
                      Нажмите кнопку «Крутить барабан», чтобы определить стоимость вопроса и получить
                      новое грамматическое задание.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal to guess full word */}
      {showGuessWordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-orange-300 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl flex flex-col gap-4 animate-scale-up text-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-orange-600">
                Назвать всё слово целиком
              </h3>
              <button
                onClick={() => setShowGuessWordModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 font-medium">
              Если вы уже догадались, какое слово из 8 букв спрятано на табло, введите его латиницей
              (регистр не важен):
            </p>

            <input
              type="text"
              value={fullWordInput}
              onChange={(e) => setFullWordInput(e.target.value)}
              placeholder="Например: PENDEJOS"
              maxLength={8}
              className="w-full px-4 py-3 rounded-2xl bg-amber-50 border-2 border-orange-300 text-slate-900 font-mono text-center tracking-widest text-xl font-black uppercase focus:outline-none focus:border-orange-500"
              autoFocus
            />

            {guessError && (
              <p className="text-xs text-rose-600 font-bold text-center">{guessError}</p>
            )}

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => setShowGuessWordModal(false)}
                className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleGuessFullWord}
                className="px-6 py-2.5 rounded-full bg-orange-600 text-white font-bold text-sm shadow-md hover:bg-orange-700 active:scale-95 transition cursor-pointer"
              >
                Проверить слово
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
