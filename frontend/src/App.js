import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Home from "./components/home/Home";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCard from "./pages/UserCard";
import UserInteraction from "./pages/UserInteraction";
import VideoUpload from "./pages/VideoUpload";
import MeetVideo from "./pages/MeetVideo";
import NoPage from "./pages/NoPage";
import AlumniChat from "./pages/AlumniChat";
import Footer from "./components/common/footer/Footer";
import { useEffect } from "react";
import UploadedVideos from "./pages/UploadedVideos";
import ProfileCard from "./pages/ProfileCard";
const App = () => {
  useEffect(() => {
    if (localStorage.getItem("selectedLanguage") === null) {
      localStorage.setItem("selectedLanguage", "ENGLISH");
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="alumni" element={<UserCard />} />
          <Route path="chat-page" element={<UserInteraction />} />
          <Route path="video-upload" element={<VideoUpload />} />
          <Route path="meet-video" element={<MeetVideo />} />
          <Route path="alumni-videos" element={<UploadedVideos />} />
          <Route path="my-chat-page" element={<AlumniChat />} />
          <Route path="courses" element={<CourseHome />} />
          <Route path="team" element={<Team />} />
          <Route path="profile-card" element={<ProfileCard/>}/>
          <Route path="pricing" element={<Pricing />} />
          <Route path="journal" element={<Blog />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
