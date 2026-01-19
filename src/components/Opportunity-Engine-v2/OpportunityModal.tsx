'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { Opportunity } from '../types';
import { motion } from 'framer-motion';

interface OpportunityModalProps {
    opportunity: Partial<Opportunity> | null;
}

export default function OpportunityModal({ opportunity }: OpportunityModalProps) {
    const navigate = useNavigate();

    if (!opportunity) return null;
    console.log(opportunity)
    return (
        <Sheet
            open={!!opportunity}
            onOpenChange={(open) => {
                if (!open) navigate('/opportunity', { replace: true });
            }}
        >
            <SheetContent side="right" className="w-[420px] sm:w-[540px]">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                >
                    <SheetHeader>
                        <SheetTitle className="uppercase font-black text-xl">
                            {opportunity.title}
                        </SheetTitle>
                        <p className="text-xs uppercase font-bold text-gray-400">
                            {opportunity.org_name}
                        </p>
                    </SheetHeader>

                    <div className="mt-6 space-y-5 text-sm">
                        <p className="text-gray-700">{opportunity.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {opportunity.categories.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-2 py-1"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div><strong>Type:</strong> {opportunity.type}</div>
                            <div><strong>Time Commitment:</strong> {opportunity.time_commitment}</div>
                            <div><strong>Location:</strong> {opportunity.location}</div>
                        </div>
                    </div>
                </motion.div>
            </SheetContent>
        </Sheet>
    );
}
