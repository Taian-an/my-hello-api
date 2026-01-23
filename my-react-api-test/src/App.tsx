import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestApi from './TestApi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* This defines the /test_api route required by your assignment */}
        <Route path="/test_api" element={<TestApi />} />
        
        {/* Optional: Redirect home to the test page */}
        <Route path="/" element={<div>Navigate to /test_api to see the result.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;