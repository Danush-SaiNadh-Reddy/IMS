import React, { useState, useEffect } from "react";
import api from "../api/axios";
import PurchaseSummary from "../components/PurchaseSummary"; 

export default function Purchase() {
    const [loading, setLoading] = useState(false);
    const [lastSubmission, setLastSubmission] = useState(null);
    const [materialTypes, setMaterialTypes] = useState([]);
    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [errors, setErrors] = useState({});


    const initialFormState = {
        vendorName: "",
        materialCategory: "",
        materialType: "",
        unit: "",
        brandName: "",
        quantity: "",
        purchaseAmount: "",
        purchaseDate: "",
    };
    
    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        api.get('/material/controller/getMaterialCategories').then(res => {
            setCategories(res.data)
        });
        api.get('/vendor/controller/getVendors').then(res => setVendors(res.data));
    }, []);

    useEffect(() => {
        if (form.materialCategory) {
            api.get(`/type/controller/getTypeDetailsByCategoryId/${form.materialCategory}`)
               .then(res => setMaterialTypes(res.data));
            api.get(`/unit/controller/getUnitsByCategoryId/${form.materialCategory}`)
               .then(res => setUnits(res.data));
        } else {
            setMaterialTypes([]);
            setUnits([]);
        }
    }, [form.materialCategory]);
    let noNumbers = (str) => !/\d/.test(str);
    let onlyNumbers= (str)=> {
    return /^\d+$/.test(str);
}

    const validateForm = () => {
            

            const newErrors = {};

            if (form.materialCategory) {
                    if (!noNumbers(form.brandName)) {
                        newErrors.brandName = "Brand name is should not contain digits";
                    }
                    

                    if (!onlyNumbers(form.quantity)) {

                        newErrors.quantity = "Quantity must be a number";

                        if(Number(form.quantity) <= 0) {
                            newErrors.quantity = "Quantity must be greater than 0";
                        }
                    }
                    
                   

                    if (!onlyNumbers(form.purchaseAmount)) {

                        newErrors.purchaseAmount = "Purchase Amount must be a number";

                        if(Number(form.purchaseAmount) <= 0) {
                            newErrors.purchaseAmount = "Purchase Amount must be greater than 0";
                        }
                    }
                   

                    if (!form.purchaseDate) {
                        newErrors.purchaseDate = "Purchase date is required";
                    }
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setLastSubmission(null); 

        try {
            const res = await api.post('/purchase/controller/getPurchase', form);
            
            const vendorObj = vendors.find(v => v.vendorName.toString() === form.vendorName.toString());
            const catObj = categories.find(c => c.categoryId.toString() === form.materialCategory.toString());
            const typeObj = materialTypes.find(t => t.typeId.toString() === form.materialType.toString());
            const unitObj = units.find(u => u.unitId.toString() === form.unit.toString());

            const displayData = {
                ...form,
                vendorNameLabel: vendorObj ? vendorObj.vendorName : "Unknown Vendor",
                categoryLabel: catObj ? catObj.categoryName : "Unknown Category",
                typeLabel: typeObj ? typeObj.typeName : "Unknown Type",
                unitLabel: unitObj ? unitObj.unitName : "Units",
                transactionId:res.data.transactionId
            };

            setLastSubmission(displayData); 
            setForm(initialFormState);      
            
        } catch (err) {
            console.error(err);
            alert("Failed to save purchase");
        } finally {
            setLoading(false);
        }
    };


    const inputClasses = "block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#A100FF] focus:border-transparent transition-all duration-200";
    const labelClasses = "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide";

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 font-sans">
           
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-black tracking-tight mb-2">
                    Material Purchase
                </h1>
                <p className="text-gray-500 font-medium">Enter transaction details below</p>
            </div>
            
  
         
            <form
                onSubmit={handleSubmit}
                
                className="bg-white w-full max-w-4xl border-t-4 border-[#A100FF] shadow-lg rounded-sm p-8 sm:p-12"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     
                     <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Vendor <span className="text-[#A100FF]">*</span>
                        </label>
                        <select
                            name="vendorName"
                            value={form.vendorName}
                            onChange={handleChange}
                            className={`${inputClasses}`}
                        >
                            <option value="">Select Vendor</option>
                            {vendors.map(v => (
                                <option key={v.vendorId} value={v.vendorName}>
                                    {v.vendorName}
                                </option>
                            ))}
                        </select>

                    </div>
                    
                     <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                            Category <span className="text-[#A100FF]">*</span>
                        </label>
                        <select name="materialCategory" value={form.materialCategory} onChange={handleChange} required className={`${inputClasses}`}>
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>)}
                        </select>
                        {errors.materialCategory && ( <p className="mt-1 text-sm text-red-600">{errors.materialCategory}</p>)}
                    </div>

                    {form.materialCategory && (
                        <>
                            <div className="col-span-1">
                                <label className={labelClasses}>Type</label>
                                <select name="materialType" value={form.materialType} onChange={handleChange} required className={`${inputClasses}`}>
                                    <option value="">Select Type</option>
                                    {materialTypes.map(t => <option key={t.typeId} value={t.typeId}>{t.typeName}</option>)}
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className={labelClasses}>Unit</label>
                                <select name="unit" value={form.unit} onChange={handleChange} required className={`${inputClasses}`}>
                                    <option value="">Select Unit</option>
                                    {units.map(u => <option key={u.unitId} value={u.unitId}>{u.unitName}</option>)}
                                </select>
                               
                            </div>
                            <div className="col-span-1">
                                <label className={labelClasses}>Brand</label>
                                <input type="text" name="brandName" value={form.brandName} onChange={handleChange} required placeholder="e.g. UltraTech" className={`${inputClasses} ${errors.brandName ? "border-red-500" : ""}`}/>
                                 {errors.brandName && ( <p className="mt-1 text-sm text-red-600">{errors.brandName}</p>)}
                            </div>
                            <div className="col-span-1">
                                <label className={labelClasses}>Quantity</label>
                                <input type="text" name="quantity" value={form.quantity} onChange={handleChange} required placeholder="0.00" className={`${inputClasses} ${errors.quantity ? "border-red-500" : ""}`}/>
                                {errors.quantity && (<p className="mt-1 text-sm text-red-600">{errors.quantity}</p>)}
                            </div>
                            <div className="col-span-1">
                                <label className={labelClasses}>Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-400">₹</span>
                                    <input type="text" name="purchaseAmount" value={form.purchaseAmount} onChange={handleChange} required className={`${inputClasses} ${errors.purchaseAmount ? "border-red-500" : ""} pl-8`}/>
                                    {errors.purchaseAmount && (<p className="mt-1 text-sm text-red-600">{errors.purchaseAmount}</p>)}
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label className={labelClasses}>Date</label>
                                <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} required className={`${inputClasses}`}/>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex justify-end mt-12 border-t border-gray-100 pt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        
                        className="w-full sm:w-auto bg-[#A100FF] hover:bg-[#8500d1] text-white font-bold py-4 px-12 rounded transition-colors duration-300 ease-in-out flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing
                            </span>
                        ) : (
                            <>
                                SUBMIT ENTRY <span className="ml-2 text-xl">&gt;</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="w-full max-w-4xl mt-6">
                <PurchaseSummary 
                    data={lastSubmission} 
                    onClose={() => setLastSubmission(null)} 
                />
            </div>

        </div>
    );
}