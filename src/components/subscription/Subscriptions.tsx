import { FONTS } from "../../constants/uiConstants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Subscriptions = () => {
  return (
    <div className="bg-white rounded-xl border shadow-md p-6 mb-8">
      <h1 style={FONTS.heading_04} className="text-center mb-4 text-gray-700">
        Subscription plans
      </h1>
      <p className="text-gray-600 text-center">All plans includes 40+ advance tools and features to boost your product.</p>
      <p className="text-gray-600 text-center mb-4">Choose the best plan to fit your plans</p>
        <Table className="border-separate border-spacing-0">
          <TableHeader className="bg-gray-100 rounded-xl">
            <TableRow className="border-none ">
              <TableHead className="w-[100px] border-none">ID</TableHead>
              <TableHead className="border-none">Plan</TableHead>
              <TableHead className="border-none">Amount Paid</TableHead>
              <TableHead className="border-none">Issued Date</TableHead>
              <TableHead className="text-right border-none">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="mt-8">
            <TableRow>
              <TableCell className="font-medium">#84</TableCell>
              <TableCell>Basic Plan-Free</TableCell>
              <TableCell>$0</TableCell>
              <TableCell>2025-04-07T10:01:18</TableCell>
              <TableCell className="text-right">$0</TableCell>
            </TableRow>
          </TableBody>
        </Table>

    </div>
  );
};
