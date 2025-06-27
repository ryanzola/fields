import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// pages
import Home from './pages/Home'
import EarlyAccess from './pages/EarlyAccess'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Newsletter from './pages/Newsletter'
import Team from './pages/Team'
import Feedback from './pages/Feedback'
import PressKit from './pages/PressKit'

// components
import Header from './components/Header'
import Footer from './components/Footer'

// images
import logo from './assets/fields-logo.avif'

function App() {
  return <div className="App">
    <Router>
      <div className="fixed inset-0 bg-[url('./assets/bg-sky.avif')] bg-no-repeat bg-cover z-[-1]" />
      <Header />
      <main className={`flex-1`}>
        <div className="grid place-items-center">
          <img className="w-[548px]" src={logo} alt="Fields of Mistria" />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/team" element={<Team />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/press-kit" element={<PressKit />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </div>
}

export default App
