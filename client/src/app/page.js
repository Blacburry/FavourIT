"use client";

import { useEffect, useState } from "react";
import API from "../services/api";
import TutorCard from "../components/TutorCard";

export default function Home() {

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    API.get("/tutors")
      .then(res => setTutors(res.data))
      .catch(err => {
        console.log(err);
        alert("Failed to fetch available tutors. Please try again later.");
      });
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Available Tutors
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map(tutor => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>

    </div>
  );
}