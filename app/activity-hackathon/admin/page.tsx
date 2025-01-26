"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SpaceWarp from "@/components/space-warp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Proposal {
  _id: string;
  teamName: string;
  proposalText?: string;
  proposalLink?: string;
  createdAt: string;
}

export default function AdminPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch proposals on component mount
  useState(() => {
    fetchProposals();
  });

  async function fetchProposals() {
    try {
      const response = await fetch('/api/hackathon/proposals');
      if (!response.ok) throw new Error('Failed to fetch proposals');
      const data = await response.json();
      setProposals(data);
    } catch (err) {
      setError('Failed to load proposals');
      toast.error('Failed to load proposals');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/hackathon/proposals/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete proposal');
      
      setProposals(proposals.filter(p => p._id !== id));
      toast.success('Proposal deleted successfully');
    } catch (err) {
      toast.error('Failed to delete proposal');
    }
    setDeleteId(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <SpaceWarp />
      
      <div className="absolute inset-0 flex flex-col items-center p-4 overflow-y-auto">
        <div className="max-w-4xl w-full my-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Manage Activity Proposals
          </h1>

          {error && (
            <Card className="bg-red-900/50 backdrop-blur-md border-red-500/20 mb-4">
              <CardContent className="p-4 text-center">
                <p className="text-red-200">{error}</p>
              </CardContent>
            </Card>
          )}
          
          <div className="grid gap-4">
            {proposals.map((proposal) => (
              <Card 
                key={proposal._id} 
                className="bg-black/50 backdrop-blur-md border-white/20"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-xl">
                      {proposal.teamName}
                    </CardTitle>
                    <p className="text-sm text-gray-400">
                      Submitted on {new Date(proposal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button 
                    variant="destructive"
                    onClick={() => setDeleteId(proposal._id)}
                  >
                    Delete
                  </Button>
                </CardHeader>
                <CardContent>
                  {proposal.proposalText ? (
                    <p className="text-gray-200 whitespace-pre-wrap">
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

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the proposal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 