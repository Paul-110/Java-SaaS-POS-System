import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import StoreStatusBadge from "./StoreStatusBadge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react";
import { formatDateTime } from "@/utils/formateDate";

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-gray-400 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-medium text-white">{value || "—"}</p>
    </div>
  </div>
);

export default function StoreDetailDrawer({ store, isOpen, onClose }) {
  if (!store) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-black/30 backdrop-blur-xl border-l border-white/10 text-white p-0">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl font-bold text-white">{store.name}</SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            ID: <span className="font-mono text-xs text-gray-400">{store.id}</span> <StoreStatusBadge status={store.status} />
          </SheetDescription>
        </SheetHeader>
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="font-semibold text-white mb-4">Owner Details</h4>
            <div className="space-y-3">
              <DetailItem icon={<User className="w-4 h-4" />} label="Owner Name" value={store.ownerName} />
              <DetailItem icon={<Mail className="w-4 h-4" />} label="Owner Email" value={store.ownerEmail} />
              <DetailItem icon={<Phone className="w-4 h-4" />} label="Owner Mobile" value={store.mobile} />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="font-semibold text-white mb-4">Store Information</h4>
            <div className="space-y-3">
              <DetailItem icon={<MapPin className="w-4 h-4" />} label="Address" value={store.address} />
              <DetailItem icon={<Calendar className="w-4 h-4" />} label="Registration Date" value={formatDateTime(store.registrationDate)} />
            </div>
          </div>

          {/* Add more sections as needed, e.g., subscription details, stats, etc. */}

        </div>
        <SheetFooter className="p-6 bg-black/20 border-t border-white/10">
          {store.status === 'PENDING' && (
            <div className="flex w-full gap-4">
              <Button variant="outline" className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400">
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          )}
          {store.status === 'ACTIVE' && (
            <Button variant="destructive" className="w-full">
              <XCircle className="w-4 h-4 mr-2" />
              Block Store
            </Button>
          )}
          {store.status === 'BLOCKED' && (
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Unblock Store
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
