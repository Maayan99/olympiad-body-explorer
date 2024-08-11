'use client';

import { useState } from 'react';
import InputForm from '../components/InputForm';
import Results from '../components/Results';
import { UserMeasurements } from '@/utils/types';

export default function Home() {
  const [measurements, setMeasurements] = useState<UserMeasurements | null>(null);

  return (
      <>
        <h1 className="text-4xl font-bold mb-8 text-center">Olympic Body Type Explorer</h1>
        <InputForm onSubmit={setMeasurements} />
        {measurements && <Results measurements={measurements} />}
      </>
  );
}