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
    <div className="bg-white rounded-xl border-2 border-gray-100 shadow-md p-6 mb-8">
      <h1 style={FONTS.heading_04} className="text-center mb-4 text-gray-700">
        Subscription plans
      </h1>
      <p className="text-gray-600 text-center">All plans includes 40+ advance tools and features to boost your product.</p>
      <p className="text-gray-600 text-center mb-4">Choose the best plan to fit your plans</p>

      <Table className="border-separate border-spacing-0 w-full">
        <TableHeader className="bg-gray-100">
          <TableRow className="rounded-xl">
            <TableHead className="w-[100px] border-b border-gray-200 px-4 py-2">ID</TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">Plan</TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">Amount Paid</TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">Issued Date</TableHead>
            <TableHead className="text-right border-b border-gray-200 px-4 py-2">Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium px-4 py-2">#84</TableCell>
            <TableCell className="px-4 py-2">Basic Plan - Free</TableCell>
            <TableCell className="px-4 py-2">$0</TableCell>
            <TableCell className="px-4 py-2">2025-04-07</TableCell>
            <TableCell className="text-right px-4 py-2">$0</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
  );
};
