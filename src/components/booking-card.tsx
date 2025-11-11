import {Booking} from '@/lib/types';
import {format} from 'date-fns';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export function BookingCard({booking}: {booking: Booking}) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{booking.service}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          {format(new Date(booking.date), 'PPP p')}
        </p>
        <p className="text-sm font-semibold mt-2">${booking.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
