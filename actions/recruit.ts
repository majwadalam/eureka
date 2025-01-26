"use server";
import connectDB from "@/lib/connectDb";
import Recruitment from "@/models/Recruitment";
import { Recruitment as RecruitmentType } from "@/types";

export async function getRecruitments() {
  try {
    await connectDB();
    const data = await Recruitment.find();
    const recruitments = JSON.parse(JSON.stringify(data));

    return recruitments;
  } catch (error) {
    console.error("Error fetching recruitments:", error);
    throw new Error("Failed to retrieve recruitments.");
  }
}

export async function createRecruitment(recruitment: RecruitmentType) {
  try {
    await connectDB();
    const data = await Recruitment.create(recruitment);
    const newRecruitment = JSON.parse(JSON.stringify(data));

    return newRecruitment;
  } catch (error) {
    console.error("Error creating recruitment:", error);
    throw new Error("Failed to create recruitment.");
  }
}