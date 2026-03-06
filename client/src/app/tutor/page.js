"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TutorPage() {
  const router = useRouter();
  const [inbox, setInbox] = useState([]);
  const [listings, setListings] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    branch: "",
    year: "",
    semester: "",
    price: "",
    description: ""
  });

  const fetchListings = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/tutors/my-listings",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setListings(res.data);
  };

  const fetchInbox = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/messages", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInbox(res.data);
    } catch (error) {
      console.error("Failed to load inbox", error);
    }
  };

  useEffect(() => {
    fetchListings();
    fetchInbox();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tutors",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchListings();

    setForm({
      subject: "",
      branch: "",
      year: "",
      semester: "",
      price: "",
      description: ""
    });
  };

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Tutor Dashboard
      </h1>

      {/* CREATE LISTING FORM */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-96 mb-10"
      >

        <h2 className="text-xl font-semibold">
          Create Listing
        </h2>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="branch"
          placeholder="Branch"
          value={form.branch}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="semester"
          placeholder="Semester"
          value={form.semester}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-black text-white p-2 rounded">
          Create Listing
        </button>

      </form>

      {/* LISTINGS */}

      <h2 className="text-xl font-semibold mb-4">
        Your Listings
      </h2>

      {listings.length === 0 && (
        <p>No listings yet</p>
      )}

      {listings.map((listing) => (

        <div
          key={listing._id}
          className="border p-4 mb-3 rounded"
        >
          <h3 className="font-bold">
            {listing.subject}
          </h3>

          <p>
            {listing.branch} • Year {listing.year}
          </p>

          <p>
            ₹{listing.price}
          </p>

          <p>
            {listing.description}
          </p>

        </div>

      ))}

      {/* INBOX */}
      <h2 className="text-xl font-semibold mt-10 mb-4">
        Inbox Messages
      </h2>

      {inbox.length === 0 && (
        <p>No messages yet</p>
      )}

      {inbox.map((user) => (
        <div
          key={user._id}
          className="border p-4 mb-3 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          
          <button 
            onClick={() => router.push(`/chat/${user._id}`)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Resume Chat
          </button>
        </div>
      ))}

    </div>
  );
}