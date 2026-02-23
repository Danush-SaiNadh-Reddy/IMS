import React, { useEffect, useState } from "react";


import api from "../api/axios";

function ReportTable(props) {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                
                const requestBody = {
                    vendorName: props.vendorName,
                    fromDate: props.reportFromDate,
                    toDate: props.reportToDate
                }

                const res = await api.post("/record/controller/getRecords", requestBody);
                setReports(res.data);
            } catch (err) {
                setError("Failed to fetch reports");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [props.vendorName, props.reportFromDate, props.reportToDate]); 

    if (loading) return (
        <div className="flex justify-center p-8">
             <svg className="animate-spin h-8 w-8 text-[#A100FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    );
    
    if (error) return <div className="p-4 text-red-500 bg-red-50 border-l-4 border-red-500">{error}</div>;

    const thClasses = "px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider";
    const tdClasses = "px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium";

    return (
        <div className="overflow-x-auto animate-fade-in-up">
            <table className="min-w-full bg-white border border-gray-100 shadow-sm rounded-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className={thClasses}>Category</th>
                        <th className={thClasses}>Type</th>
                        <th className={thClasses}>Brand</th>
                        <th className={thClasses}>Qty</th>
                        <th className={thClasses}>Unit</th>
                        <th className={thClasses}>Price</th>
                        <th className={thClasses}>Balance</th>
                        <th className={thClasses}>Date</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                No records found for the selected criteria.
                            </td>
                        </tr>
                    ) : (
                        reports.map((report, index) => (
                            <tr key={index} className="hover:bg-purple-50 transition-colors duration-150">
                                <td className={tdClasses}>{report.materialCategory}</td>
                                <td className={tdClasses}>{report.materialType}</td>
                                <td className={tdClasses}>{report.brand}</td>
                                <td className={tdClasses}>{report.quantity}</td>
                                <td className={tdClasses}>{report.unit}</td>
                                <td className={`${tdClasses} text-[#A100FF] font-bold`}>₹{report.price}</td>
                                <td className={tdClasses}>₹2000</td>
                                <td className={`${tdClasses} text-gray-500`}>{report.purchaseDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReportTable;