"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="border-2 border-rose-100 focus:border-rose-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="border-2 border-rose-100 focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                className="border-2 border-rose-100 focus:border-rose-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                required
                value={formData.message}
                onChange={handleChange}
                className="min-h-[150px] border-2 border-rose-100 focus:border-rose-500"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
} 