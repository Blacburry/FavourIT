"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function TutorCard({ tutor }) {
  const router = useRouter();
  return (
    <Card className="hover:shadow-lg transition">
      
      <CardHeader>
        <CardTitle>{tutor.tutorId?.name}</CardTitle>
        <p className="text-sm text-gray-500">
          {tutor.branch} • Year {tutor.year}
        </p>
      </CardHeader>

      <CardContent>

        <p>
          <strong>Subject:</strong> {tutor.subject}
        </p>

        <p>
          <strong>Price:</strong> ₹{tutor.price}/hr
        </p>

        <div className="flex gap-3 mt-4">
          <Button>View Profile</Button>
          <Button 
            variant="secondary"
            onClick={() => router.push(`/chat/${tutor.tutorId?._id || tutor.tutorId}`)}
          >
            Message
          </Button>
        </div>

      </CardContent>

    </Card>
  );
}