import { StarIcon } from 'lucide-react'
import { Badge } from '../../../../components/ui/badge'

const CustomerCard = ({customer, onSelectCustomer, selectedCustomer}) => {
  return (
     <div 
        key={customer.id} 
        className={`p-4 cursor-pointer transition-colors ${selectedCustomer?.id === customer.id ? 'bg-emerald-500/10' : 'hover:bg-white/5'}`}
        onClick={() => onSelectCustomer(customer)}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-white">{customer.fullName || 'Unknown Customer'}</h3>
            <p className="text-sm text-gray-400">{customer.phone || 'N/A'}</p>
            <p className="text-sm text-gray-400">{customer.email || 'N/A'}</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-500/10 border-yellow-500/30 text-yellow-300">
            <StarIcon className="h-3 w-3" />
            {customer.loyaltyPoints || 0} pts
          </Badge>
        </div>
      </div>
  )
}

export default CustomerCard