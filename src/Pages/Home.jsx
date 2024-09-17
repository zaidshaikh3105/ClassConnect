import { useState, useEffect } from "react";
import "daisyui/dist/full.css"; // Import DaisyUI styles
import { databases } from "../appwrite/appwriteclient";

// Replace with your actual database and collection IDs
const Db_id = import.meta.env.VITE_APPWRITE_DB_ID;
const COURSE_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseSubject, setNewCourseSubject] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState(""); // New content for note
  const [activeTab, setActiveTab] = useState("create");

  // Fetch courses from Appwrite
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await databases.listDocuments(Db_id, COURSE_id);
        setCourses(response.documents);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (newCourseName.trim() && newCourseSubject.trim()) {
      try {
        const newCourse = await databases.createDocument(
          Db_id,
          COURSE_id,
          "unique()",
          {
            c_name: newCourseName,
            c_subject: newCourseSubject,
            c_notes: [],
          }
        );
        setCourses([...courses, newCourse]);
        setNewCourseName("");
        setNewCourseSubject("");
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourseId && newNoteTitle.trim() && newNoteContent.trim()) {
      try {
        const selectedCourse = courses.find(
          (course) => course.$id === selectedCourseId
        );

        const notesArray = Array.isArray(selectedCourse.notes)
          ? selectedCourse.notes
          : [];

        const newNote = `${newNoteTitle}: ${newNoteContent}`;

        const updatedFields = {
          c_name: selectedCourse.c_name,
          c_subject: selectedCourse.c_subject,
          c_notes: [...notesArray, newNote], // Append the new note as a string
        };

        await databases.updateDocument(
          Db_id,
          COURSE_id,
          selectedCourseId,
          updatedFields
        );

        const updatedCourses = courses.map((course) =>
          course.$id === selectedCourseId
            ? { ...course, notes: updatedFields.notes }
            : course
        );
        setCourses(updatedCourses);
        setNewNoteTitle("");
        setNewNoteContent("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="tabs mb-8">
        <a
          className={`tab tab-bordered ${
            activeTab === "create" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("create")}
        >
          Create Course
        </a>
        <a
          className={`tab tab-bordered ${
            activeTab === "addNotes" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("addNotes")}
        >
          Add Notes
        </a>
      </div>

      {activeTab === "create" && (
        <form onSubmit={handleCourseSubmit} className="mb-8">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Course Name</span>
            </label>
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Enter course name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Subject Name</span>
            </label>
            <input
              type="text"
              value={newCourseSubject}
              onChange={(e) => setNewCourseSubject(e.target.value)}
              placeholder="Enter subject name"
              className="input input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Course
          </button>
        </form>
      )}

      {activeTab === "addNotes" && courses.length > 0 && (
        <form onSubmit={handleNoteSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Select Course</span>
            </label>
            <select
              value={selectedCourseId || ""}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="select select-bordered"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.$id} value={course.$id}>
                  {course.c_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Note Title</span>
            </label>
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Enter note title"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Note Content</span>
            </label>
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Enter note content"
              className="textarea textarea-bordered"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Note
          </button>
        </form>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Courses and Notes</h2>
        {courses.map((course) => (
          <div key={course.$id} className="mb-4">
            <h3 className="text-lg font-semibold">
              {course.c_name} (Subject: {course.c_subject})
            </h3>
            <ul className="list-disc pl-5">
              {course.notes &&
                course.notes.map((note, index) => (
                  <li key={index}>
                    <strong>{note.title}</strong>: {note.content}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
