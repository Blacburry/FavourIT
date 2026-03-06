"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const [listings, setListings] = useState([]);
  const router = useRouter();

  const fetchListings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/tutors"
      );

      setListings(res.data);

    } catch (error) {

      console.error(error);

      alert("Failed to fetch available tutors. Please try again later.");

    }

  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Available Tutors
      </h1>

      {listings.length === 0 && (
        <p>No tutors available</p>
      )}

      {listings.map((listing) => (

        <div
          key={listing._id}
          className="border p-4 mb-4 rounded"
        >

          <h2 className="text-lg font-bold">
            {listing.subject}
          </h2>

          <p>
            Tutor: {listing.tutorId?.name}
          </p>

          <p>
            {listing.branch} • Year {listing.year}
          </p>

          <p>
            Semester {listing.semester}
          </p>

          <p>
            Price: ₹{listing.price}
          </p>

          <p>
            {listing.description}
          </p>

          <button
            onClick={() => router.push(`/chat/${listing.tutorId?._id}`)}
            className="mt-3 bg-black text-white px-4 py-2 rounded"
          >
            Message Tutor
          </button>

        </div>

      ))}

    </div>
  );
}