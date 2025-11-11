import {TableRow, TableCell} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {Booking} from '@/lib/types';
import {format} from 'date-fns';

type BookingCardProps = {
  booking: Booking;
};

export function BookingCard({booking}: BookingCardProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{booking.clientName}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{booking.service}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge
          className="text-xs"
          variant={
            booking.status === 'Paid'
              ? 'default'
              : booking.status === 'Unpaid'
              ? 'secondary'
              : 'destructive'
          }
        >
          {booking.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {format(new Date(booking.bookingDate), 'PPP')}
      </TableCell>
      <TableCell className="text-right">
        ${booking.totalCost.toFixed(2)}
      </TableCell>
    </TableRow>
  );
}
