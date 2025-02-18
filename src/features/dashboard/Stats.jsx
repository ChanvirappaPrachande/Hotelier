import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1/ number of bookings
  const numBookings = bookings.length;

  // total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //toast confirmed
  const confirmed = confirmedStays.length;

  //occupancey
  const occupancy =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />{" "}
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineCurrencyDollar />}
        value={formatCurrency(sales)}
      />{" "}
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={confirmed}
      />{" "}
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy) + "%"}
      />
    </>
  );
}

export default Stats;
