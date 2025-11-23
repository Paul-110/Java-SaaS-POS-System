import React from "react";
import { Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";
import StoreStatusBadge from "./StoreStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

export default function StoreTable({ stores, onSelectStore }) {
    return (
        <div className="rounded-2xl border border-white/10 overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-black/30 hover:bg-black/40 border-b-white/10">
                        <TableHead>Store ID</TableHead>
                        <TableHead>Store Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stores.map((store) => (
                        <TableRow key={store.id} className="hover:bg-white/5 border-b-white/10">
                            <TableCell className="font-mono text-sm text-gray-500">{store.id}</TableCell>
                            <TableCell className="font-medium text-white">{store.name}</TableCell>
                            <TableCell className="text-gray-400">{store.ownerName}</TableCell>
                            <TableCell className="text-gray-400">
                                {new Date(store.registrationDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <StoreStatusBadge status={store.status} />
                            </TableCell>
                            <TableCell className="text-right pr-6">
                                <Button
                                    variant="outline" className="border-white/20 text-white hover:bg-white/10"
                                    size="sm"
                                    onClick={() => onSelectStore(store)}
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
