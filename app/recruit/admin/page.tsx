"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getRecruitments } from "@/actions/recruit";
import { Recruitment } from "@/types";
import SpaceWarp from "@/components/space-warp";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Page = () => {
  const [recruitments, setRecruitments] = useState<Recruitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const data = await getRecruitments();
        setRecruitments(data);
      } catch (error) {
        console.error("Error fetching recruitments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  return (
    <div>
      <SpaceWarp />

      <header className="absolute top-10 md:left-[20%] left-[10%]">
        <img src="/logo/light.svg" alt="logo" className="w-10" />
      </header>

      <main
        className={`absolute top-[50%] w-[100%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center px-4`}
      >
        <Card className="w-full max-w-4xl bg-black/20 backdrop-blur-md border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Recruitment Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <Alert className="bg-black/30 border-blue-500">
                <AlertTitle className="text-blue-400">Loading...</AlertTitle>
                <AlertDescription className="text-gray-300">
                  Please wait while we fetch the recruitment data.
                </AlertDescription>
              </Alert>
            ) : recruitments.length > 0 ? (
              <div className="space-y-6">
                {recruitments.map((recruitment) => (
                  <div
                    key={recruitment._id}
                    className="bg-black/30 border border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-gray-600 hover:bg-black/40"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {recruitment.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <span className="text-gray-500">Email:</span>
                        <span>{recruitment.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <span className="text-gray-500">Contact:</span>
                        <span>{recruitment.contact}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-gray-500 mb-2">Why join Eureka?</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {recruitment.why}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Alert className="bg-black/30 border-yellow-600">
                <AlertTitle className="text-yellow-500">
                  No Recruitments Found
                </AlertTitle>
                <AlertDescription className="text-gray-300">
                  There are no recruitment data available at this time.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </main>
      
      <footer className="absolute w-[80%] md:w-[60%] bottom-10 md:mx-[20%] mx-[10%]">
        <p className="text-xl font-semibold text-center mb-2">Socials</p>
        <div className="h-0.5 bg-white mb-4"></div>
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://www.facebook.com/eurekaxitu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={"25"} />
          </a>
          <a
            href="https://www.linkedin.com/company/eureka-itu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={"25"} />
          </a>
          <a
            href="https://www.instagram.com/eureka_itu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={"25"} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Page;
