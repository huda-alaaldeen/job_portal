import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostJob from "./pages/PostJob";
import JobSearch from "./pages/JobSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job-search" element={<JobSearch />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;