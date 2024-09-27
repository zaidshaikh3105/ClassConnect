import React from "react";
import Spline from "@splinetool/react-spline";
import Button from "../components/Button";
function LandingPage() {
  return (
    <div className="  p-8 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center items-start text-left space-y-2 ">
          <h1 className="text-4xl font-bold text-white">
            Welcome to ClassConnect
          </h1>
          <p className="text-lg">
            ClassConnect is a cross-platform application designed to bridge the
            gap between teachers and students by facilitating seamless
            communication and resource sharing. Our platform enhances the
            educational experience through the power of technology.
          </p>
          <h3 className=" text-white text-2xl font-bold mt-4">
            Features That Empower Learning
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Note Sharing:</strong> Easily upload, share, and access
              class notes, ensuring students never miss important materials.
            </li>
            <li>
              <strong>Interactive Classroom Activities:</strong> Engage students
              with real-time polls, quizzes, and collaborative tasks to make
              learning more dynamic.
            </li>
            <li>
              <strong>Real-Time Discussions:</strong> Foster classroom
              engagement with real-time discussions, enabling students and
              teachers to communicate effortlessly.
            </li>
            <li>
              <strong>Collaborative Learning Environment:</strong> A platform
              where students can collaborate with peers, participate in group
              discussions, and contribute to classroom conversations.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mt-4 text-white">
            Why Choose ClassConnect?
          </h3>
          <ul className=" list-disc list-inside space-y-2">
            <li>
              <strong>Seamless Communication:</strong> Break down barriers and
              enable open communication channels between educators and learners.
            </li>
            <li>
              <strong>Accessible Anytime, Anywhere:</strong> ClassConnect is
              accessible across devices, whether you're using a laptop, tablet,
              or smartphone, ensuring uninterrupted learning.
            </li>
            <li>
              <strong>Enhanced Classroom Experience:</strong> From resource
              sharing to interactive sessions, ClassConnect enriches the
              traditional classroom experience with cutting-edge tools.
            </li>
          </ul>
          <h3 className="text-2xl font-bold mt-4 text-white">
            Join the Future of Education
          </h3>
          <p className="text-lg">
            Take your learning experience to the next level with ClassConnect.
            Whether you're a teacher looking to engage students or a student
            wanting to access study materials, our platform provides everything
            you need in one place.
          </p>
          <Button>Sign Up Today</Button>
        </div>

        <div className="w-[500px] h-[700px] overflow-hidden">
          <Spline
            className="overflow-hidden"
            scene="https://prod.spline.design/fkUAAB61iSi2lY7t/scene.splinecode"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
