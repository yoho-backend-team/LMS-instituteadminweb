/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FONTS } from "../../constants/uiConstants";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { useSelector } from 'react-redux';

const HistoryPage: React.FC = () => {

    const subscriptions = useSelector(
        (state: any) => state.subscription?.insitituteSubscription
    );


    return (
        <div className="bg-white h-full flex flex-col rounded-xl border-2 border-gray-100 shadow-md p-6 mb-8 ">

            <div>
                <h1 style={FONTS.heading_04} className="text-center mb-4 text-gray-700">
                    Subscription History
                </h1>
            </div>
            <Table className="border-separate border-spacing-0 w-full">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="w-[80px] px-4 py-2">ID</TableHead>
                        <TableHead className="px-4 py-2">Plan</TableHead>
                        <TableHead className="px-4 py-2">Amount Paid</TableHead>
                        <TableHead className="px-4 py-2">Issued Date</TableHead>
                        <TableHead className="text-right px-4 py-2">Price</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {subscriptions?.map((sub: any) => (
                        <TableRow key={sub.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium px-4 py-2">#{sub.id}</TableCell>
                            <TableCell className="px-4 py-2">
                                {sub.subscriptionId?.identity || "N/A"}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {sub.paymentMethod === "cash" ? "₹0" : "Paid"}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                                {new Date(sub.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right px-4 py-2">
                                ₹{sub.subscriptionId?.price || "0"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default HistoryPage