/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import Rata from "@/models/Rata"
import connectDB from "@/lib/connectDb"
import { Team } from "@/types"

export const getTeams = async () => {
    try {
        await connectDB()
        const teams = await Rata.find()
        return JSON.parse(JSON.stringify(teams))
    } catch (error: any) {
        throw new Error(error)
    }
}

export const addTeam = async (team: Team) => {
    try {
        console.log(team)
        await connectDB()
        const newTeam = await Rata.create(team)
        return JSON.parse(JSON.stringify(newTeam))
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}

export const updatePoints = async (id: string, points: number) => {
    try {
        await connectDB()
        const team = await Rata.findByIdAndUpdate(id, {
            points
        }, {
            new: true
        })

        if (!team) {
            throw new Error("Team not found")
        }

        return JSON.parse(JSON.stringify(team))
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTeam = async (id: string) => {
    try {
        await connectDB()
        const team = await Rata.findByIdAndDelete(id)

        if (!team) {
            throw new Error("Team not found")
        }

        return JSON.parse(JSON.stringify(team))
    }
    catch (error: any) {
        throw new Error(error)
    }
}
