import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceWarp from "@/components/space-warp";

export default function Page() {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <SpaceWarp />

            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="max-w-4xl w-full space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                        Activity Design Hackathon
                    </h1>

                    <Card className="bg-black/50 backdrop-blur-md border-white/20">
                        <CardHeader>
                            <CardTitle>Creating Memorable Team Experiences</CardTitle>
                            <CardDescription className="text-gray-300">
                                Design innovative team-building activities that foster collaboration
                                and engagement among university students.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Guidelines</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    <li>Activity must be cost-effective (preferably free)</li>
                                    <li>Can use university spaces (Lincoln Corner/lecture theaters)</li>
                                    <li>Must be inclusive and engaging for all participants</li>
                                    <li>Focus on team dynamics and interaction</li>
                                    <li>Sustainability encouraged in materials/execution</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">Judging Criteria</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300">
                                    <li>Innovation and Creativity (25%)</li>
                                    <li>Inclusivity and Engagement (25%)</li>
                                    <li>Cost-effectiveness (20%)</li>
                                    <li>Sustainability (15%)</li>
                                    <li>Feasibility (15%)</li>
                                </ul>
                            </div>

                            <div className="flex w-full gap-4 justify-center pt-4">
                                <Link
                                    href="/activity-hackathon/apply"
                                    className="bg-white flex-1 text-center text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Submit Your Proposal
                                </Link>

                                <Link
                                    href="/activity-hackathon/proposals"
                                    className="bg-black flex-1 text-white border border-white/20 text-center px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                                >
                                    View Other Proposals
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 