
'use client';

import {useState, useEffect} from 'react';
import Configuration from '@/components/Configuration';
import FeatureInput from '@/components/FeatureInput';
import FeatureList from '@/components/FeatureList';
import EffortCalculation from '@/components/EffortCalculation';

export default function Home() {
  const [features, setFeatures] = useState<{ description: string; size: string }[]>([]);
  const [totalEffort, setTotalEffort] = useState(0);

  const handleFeatureAdd = (newFeature: { description: string; size: string }) => {
    setFeatures([...features, newFeature]);
  };

  useEffect(() => {
    const calculateTotalEffort = () => {
      // This is placeholder logic. Replace with your actual calculation.
      const effortValues: { [key: string]: number } = {
        XS: 1,
        S: 2,
        M: 4,
        L: 8,
        XL: 16,
      };

      let calculatedEffort = 0;
      features.forEach((feature) => {
        calculatedEffort += effortValues[feature.size] || 0;
      });
      setTotalEffort(calculatedEffort);
    };

    calculateTotalEffort();
  }, [features]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Frontend Estimator Pro</h1>
      <Configuration />
      <FeatureInput onFeatureAdd={handleFeatureAdd} />
      <FeatureList features={features} />
      <EffortCalculation totalEffort={totalEffort} />
    </div>
  );
}

