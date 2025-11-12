'use client';
import {Booking} from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Calendar} from '@/components/ui/calendar';
import {BookingCard} from '@/components/booking-card';
import {useCollection} from '@/firebase';

export default function AdminDashboard() {
  const {data: bookings, loading} = useCollection<Booking>('booking');

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  const totalRevenue =
    bookings?.reduce(
      (acc, booking) =>
        booking.status === 'completed' ? acc + booking.price : acc,
      0
    ) || 0;

  const totalBookings = bookings?.length || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>
                Total income from completed bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${totalRevenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
              <CardDescription>All bookings made so far</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalBookings}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings && <RecentBookings bookings={bookings} />}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings && <UpcomingBookings bookings={bookings} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RecentBookings({bookings}: {bookings: Booking[]}) {
  const recent = bookings
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recent.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.user.substring(0, 8)}...</TableCell>
            <TableCell>{booking.service}</TableCell>
            <TableCell>{booking.status}</TableCell>
            <TableCell className="text-right">
              ${booking.price.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function UpcomingBookings({bookings}: {bookings: Booking[]}) {
  const upcoming = bookings
    .filter(
      (b) =>
        new Date(b.date) > new Date() &&
        (b.status === 'confirmed' || b.status === 'completed')
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-4">
      {upcoming.length > 0 ? (
        upcoming.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))
      ) : (
        <p>No upcoming bookings.</p>
      )}
    </div>
  );
}
