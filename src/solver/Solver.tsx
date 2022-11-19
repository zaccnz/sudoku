import { Layout } from '@/components/Layout';
import { useRef, useState } from 'react';
import SolveWorker from './worker?worker';

function App() {
  const [workerResult, setWorkerResult] = useState('');
  const workerRef = useRef(new SolveWorker());
  workerRef.current.onmessage = (e) => {
    console.log('recv');
    setWorkerResult(e.data);
  };

  return (
    <Layout page='solver'>
      <div>main content</div>
      {workerResult}
      <button
        onClick={() => {
          console.log('send');
          workerRef.current.postMessage([3, 4]);
        }}
      >
        Solve
      </button>
    </Layout >
  )
}

export default App
