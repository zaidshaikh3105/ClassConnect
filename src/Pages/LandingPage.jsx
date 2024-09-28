import React, { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      //once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-7xl font-bold text-white leading-loose">
        Welcome to ClassConnect
      </h1>
      <p
        className="text-4xl max-w-lg text-white leading-relaxed"
        data-aos="fade-up"
      >
        ClassConnect is a cross-platform application designed to bridge the gap
        between teachers and students by facilitating seamless communication and
        resource sharing. Our platform enhances the educational experience
        through the power of technology.
      </p>

      <h3
        className="text-4xl font-bold text-white mt-8 leading-loose"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Features That Empower Learning
      </h3>
      <ul
        className="list-disc list-inside space-y-4 leading-relaxed text-xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <li>
          <strong className="text-white">Note Sharing:</strong> Easily upload,
          share, and access class notes, ensuring students never miss important
          materials.
        </li>
        <li>
          <strong className="text-white">
            Interactive Classroom Activities:
          </strong>{" "}
          Engage students with real-time polls, quizzes, and collaborative tasks
          to make learning more dynamic.
        </li>
        <li>
          <strong className="text-white">Real-Time Discussions:</strong> Foster
          classroom engagement with real-time discussions, enabling students and
          teachers to communicate effortlessly.
        </li>
        <li>
          <strong className="text-white">
            Collaborative Learning Environment:
          </strong>{" "}
          A platform where students can collaborate with peers, participate in
          group discussions, and contribute to classroom conversations.
        </li>
      </ul>

      <h3
        className="text-4xl font-bold text-white mt-8 leading-loose"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Why Choose ClassConnect?
      </h3>
      <ul
        className="list-disc list-inside space-y-4 leading-relaxed text-xl"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <li>
          <strong className="text-white">Seamless Communication:</strong> Break
          down barriers and enable open communication channels between educators
          and learners.
        </li>
        <li>
          <strong className="text-white">Accessible Anytime, Anywhere:</strong>{" "}
          ClassConnect is accessible across devices, ensuring uninterrupted
          learning.
        </li>
        <li>
          <strong className="text-white">Enhanced Classroom Experience:</strong>{" "}
          From resource sharing to interactive sessions, ClassConnect enriches
          the traditional classroom experience with cutting-edge tools.
        </li>
      </ul>

      <h3
        className="text-4xl font-bold text-white mt-8 leading-loose "
        data-aos="fade-up"
        data-aos-delay="500"
      >
        Join the Future of Education
      </h3>
      <p
        className="text-lg leading-relaxed text-xl"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        Take your learning experience to the next level with ClassConnect.
        Whether you're a teacher or student, our platform provides everything
        you need in one place.
      </p>

      <Button
        onClick={() => navigate("/signup")}
        data-aos="fade-up"
        data-aos-delay="700"
      >
        Sign Up Today
      </Button>
    </div>
  );
}

export default LandingPage;
