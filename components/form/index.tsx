"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Recruitment } from "@/types";
import { createRecruitment } from "@/actions/recruit";
import { toast } from "sonner"

const RecruitmentForm = () => {
  const [formData, setFormData] = useState<Recruitment>({
    name: "",
    email: "",
    contact: "",
    why: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createRecruitment(formData);

      if (response) {
        toast("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          contact: "",
          why: "",
        });
      } else {
        toast("Error submitting form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast("Something went wrong. Please try again later.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Join Our Club</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contact" className="block font-medium mb-2">
              Contact
            </label>
            <Input
              id="contact"
              type="tel"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="why" className="block font-medium mb-2">
              Why do you want to join?
            </label>
            <Textarea
              id="why"
              value={formData.why}
              onChange={handleChange}
              rows={3}
              placeholder="Explain your motivation"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RecruitmentForm;
