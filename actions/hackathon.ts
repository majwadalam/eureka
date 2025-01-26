"use server"
import Hackathon from "@/models/Hackathon"
import connectDB from "@/lib/connectDb"
import { HackathonApplication } from "@/types"

export const getApplications = async () => {
  try {
    await connectDB()
    const applications = await Hackathon.find().sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(applications))
  } catch (error: any) {
    throw new Error(error)
  }
}

export const submitApplication = async (application: HackathonApplication) => {
  try {
    await connectDB()
    const newApplication = await Hackathon.create(application)
    return JSON.parse(JSON.stringify(newApplication))
  } catch (error: any) {
    throw new Error(error)
  }
} 