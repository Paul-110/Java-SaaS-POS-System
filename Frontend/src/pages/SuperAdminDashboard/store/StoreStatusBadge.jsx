import { Badge } from "../../../components/ui/badge";

export default function StoreStatusBadge({ status }) {
    const statusStyles = {
        ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
        PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        BLOCKED: "bg-red-500/10 text-red-400 border-red-500/20",
        INACTIVE: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    };

    const style = statusStyles[status] || statusStyles.INACTIVE;

    return (
        <Badge
            variant="outline"
            className={`capitalize text-xs font-medium ${style}`}
        >
            {status.toLowerCase()}
        </Badge>
    );
}

