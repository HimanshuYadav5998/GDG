import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { BlogProvider } from "./context/BlogContext";

// Components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { BlogDetails } from "./pages/BlogDetails";
import { Category } from "./pages/Category";
import { Search } from "./pages/Search";
import { Bookmarks } from "./pages/Bookmarks";
import { About } from "./pages/About";
import { Dashboard } from "./pages/Dashboard";
import { CreateBlog } from "./pages/CreateBlog";
import { EditBlog } from "./pages/EditBlog";
import { NotFound } from "./pages/NotFound";

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <ToastProvider>
      <BlogProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white text-ink-primary font-sans antialiased selection:bg-ink-accentSoft selection:text-ink-accent">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/blog/:slug" element={<BlogDetails />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/search" element={<Search />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<CreateBlog />} />
                <Route path="/edit/:id" element={<EditBlog />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </BlogProvider>
    </ToastProvider>
  );
}

export default App;
