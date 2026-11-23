'use client';

import { useEffect, useMemo, useState } from 'react';

const PRESET_TIPS = [15, 18, 20, 25];

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}

export default function TipCalculator() {
  const [billInput, setBillInput] = useState('');
  const [tipPercent, setTipPercent] = useState<number | null>(18);
  const [customTip, setCustomTip] = useState('');
  const [split, setSplit] = useState(1);
  const [roundUp, setRoundUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bill = parseFloat(billInput || '0') || 0;

  const activeTip = useMemo(() => {
    if (tipPercent !== null) return tipPercent;
    const c = parseFloat(customTip);
    return Number.isFinite(c) && c >= 0 ? c : 0;
  }, [tipPercent, customTip]);

  const rawTip = bill * (activeTip / 100);
  const rawTotal = bill + rawTip;
  const perPersonRaw = split > 0 ? rawTotal / split : rawTotal;

  const total = roundUp ? Math.ceil(perPersonRaw) : perPersonRaw;
  const tipAmount = total - (split > 0 ? bill / split : bill);

  function handleBillChange(e: React.ChangeEvent<HTMLInputElement>) {
    let v = e.target.value;
    // Allow digits, one dot, and at most 2 decimal places
    if (v === '' || /^\d*\.?\d{0,2}$/.test(v)) {
      setBillInput(v);
    }
  }

  function handlePreset(p: number) {
    setTipPercent(p);
    setCustomTip('');
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === '' || /^\d{0,3}(\.?\d{0,2})?$/.test(value)) {
      setCustomTip(value);
      setTipPercent(null);
    }
  }

  function changeSplit(delta: number) {
    setSplit((s) => Math.max(1, Math.min(50, s + delta)));
  }

  return (
    <main
      className={[
        'w-full max-w-md mx-auto bg-white rounded-3xl shadow-soft overflow-hidden transition-all duration-700',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      ].join(' ')}
    >
      <header className="bg-chair px-6 py-7 text-center">
        <h1 className="font-serif text-2xl font-bold text-cream tracking-tight">
          Corner Chair Barbers
        </h1>
        <p className="text-cream/70 text-sm mt-1 font-medium">Tip Calculator</p>
      </header>

      <section className="px-5 pt-6 pb-4">
        <label htmlFor="bill" className="block text-xs font-bold uppercase tracking-wider text-ink/50 mb-2">
          Bill amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 text-lg font-semibold">
            $
          </span>
          <input
            id="bill"
            type="text"
            inputMode="decimal"
            value={billInput}
            onChange={handleBillChange}
            placeholder="0.00"
            className="w-full pl-9 pr-4 py-4 text-3xl font-serif font-bold text-ink bg-cream rounded-2xl outline-none ring-2 ring-transparent focus:ring-chair transition-shadow placeholder:text-ink/20"
          />
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-ink/50 mb-3">Choose tip</p>
        <div className="grid grid-cols-4 gap-3">
          {PRESET_TIPS.map((p) => {
            const active = tipPercent === p;
            return (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={[
                  'relative py-3 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95',
                  active
                    ? 'bg-chair text-cream shadow-lift'
                    : 'bg-cream text-ink hover:bg-chair/10',
                ].join(' ')}
              >
                {p}%
              </button>
            );
          })}
        </div>
        <div className="mt-3 relative">
          <input
            type="number"
            inputMode="decimal"
            value={customTip}
            onChange={handleCustomChange}
            placeholder="Custom %"
            className={[
              'w-full px-4 py-3 bg-cream rounded-2xl text-ink font-semibold outline-none ring-2 transition-all placeholder:text-ink/30',
              tipPercent === null && customTip
                ? 'ring-chair bg-cream'
                : 'ring-transparent focus:ring-chair',
            ].join(' ')}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 font-semibold">%</span>
        </div>
      </section>

      <section className="px-5 pb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink/50 mb-1">Split between</p>
          <p className="text-sm text-ink/70">
            {split} {split === 1 ? 'person' : 'people'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-cream rounded-2xl p-1">
          <button
            onClick={() => changeSplit(-1)}
            disabled={split <= 1}
            aria-label="Decrease split"
            className="w-10 h-10 rounded-xl bg-white text-chair font-bold shadow-sm disabled:opacity-40 disabled:active:scale-100 active:scale-95 transition-transform"
          >
            −
          </button>
          <span className="w-8 text-center font-serif font-bold text-lg">{split}</span>
          <button
            onClick={() => changeSplit(1)}
            disabled={split >= 50}
            aria-label="Increase split"
            className="w-10 h-10 rounded-xl bg-white text-chair font-bold shadow-sm disabled:opacity-40 disabled:active:scale-100 active:scale-95 transition-transform"
          >
            +
          </button>
        </div>
      </section>

      <section className="px-5 pb-6">
        <button
          onClick={() => setRoundUp((v) => !v)}
          className={[
            'w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all duration-200',
            roundUp
              ? 'border-chair bg-chair/5 text-chair'
              : 'border-cream bg-cream text-ink/70 hover:border-chair/20',
          ].join(' ')}
        >
          <span className="font-semibold text-sm">Round up to whole dollar</span>
          <span
            className={[
              'w-11 h-6 rounded-full relative transition-colors',
              roundUp ? 'bg-chair' : 'bg-ink/15',
            ].join(' ')}
          >
            <span
              className={[
                'absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform',
                roundUp ? 'translate-x-5' : 'translate-x-0',
              ].join(' ')}
            />
          </span>
        </button>
      </section>

      <section className="bg-chair px-6 py-7 text-center text-cream">
        <p className="text-xs font-bold uppercase tracking-wider text-cream/60 mb-1">
          Total {split > 1 ? `each (${split})` : 'to pay'}
        </p>
        <div className="text-6xl font-serif font-bold tracking-tight">{formatCurrency(total)}</div>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm text-cream/80">
          <span>Tip {formatCurrency(tipAmount > 0 ? tipAmount : 0)}</span>
          <span className="text-cream/40">|</span>
          <span>{activeTip.toFixed(activeTip % 1 === 0 ? 0 : 1)}%</span>
        </div>
      </section>

      <footer className="px-5 py-4 text-center">
        <button
          onClick={() => {
            setBillInput('');
            setTipPercent(18);
            setCustomTip('');
            setSplit(1);
            setRoundUp(false);
          }}
          className="text-xs font-semibold text-ink/40 hover:text-chair transition-colors"
        >
          Reset calculator
        </button>
      </footer>
    </main>
  );
}
