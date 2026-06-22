import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import Library from './pages/Library'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
