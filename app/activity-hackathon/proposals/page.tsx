import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceWarp from "@/components/space-warp";
import connectDB from "@/lib/connectDb";
import Hackathon from "@/models/Hackathon";
import Link from "next/link";

async function getProposals() {
    try {
        await connectDB();
        const proposals = await Hackathon.find({})
            .sort({ createdAt: -1 })
            .select('teamName proposalText proposalLink createdAt')
            .lean();

        return proposals;
    } catch (error) {
        console.error('Failed to fetch proposals:', error);
        return [];
    }
}

export default async function ProposalsPage() {
    const proposals = await getProposals();

    return (
        <div className="min-h-screen bg-black text-white relative">
            <SpaceWarp />

            <div className="absolute inset-0 flex flex-col items-center p-4 overflow-y-auto">
                <div className="max-w-4xl w-full my-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Submitted Activity Proposals
                    </h1>

                    <div className="grid gap-4">
                        {proposals.map((proposal: any) => (
                            <Card
                                key={proposal._id}
                                className="bg-black/50 backdrop-blur-md border-white/20 transition-all hover:bg-black/60"
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        {proposal.teamName}
                                    </CardTitle>
                                    <p className="text-sm text-gray-400">
                                        Submitted on {new Date(proposal.createdAt).toLocaleDateString()}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {proposal.proposalText ? (
                                        <p className="text-gray-200 line-clamp-3">
                                            {proposal.proposalText}
                                        </p>
                                    ) : proposal.proposalLink ? (
                                        <a
                                            href={proposal.proposalLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 underline"
                                        >
                                            View Proposal Document
                                        </a>
                                    ) : (
                                        <p className="text-gray-400 italic">No details available</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}

                        {proposals.length === 0 && (
                            <Card className="bg-black/50 backdrop-blur-md border-white/20">
                                <CardContent className="p-8 text-center">
                                    <p className="text-gray-400">No proposals submitted yet.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 