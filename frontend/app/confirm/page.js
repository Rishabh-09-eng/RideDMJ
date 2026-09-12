"use client"

import React from "react"
import {useSearchParams,useRouter} from "next/navigation"
import {useEffect,useState} from "react"
import Script from "next/script"

const page = () => {

    const searchParams = useSearchParams()
    const router = useRouter()

    const [loading,setLoading] = useState(false)

    const busNumber = searchParams.get("bus")
    const time = searchParams.get("time")

    const handlePayment = async () => {

        try {

            setLoading(true)

            const token = localStorage.getItem("token")

            if(!token){
                alert("Please login first")
                router.push("/login")
                return
            }

            const response = await fetch(
                "http://localhost:8000/payment/create",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if(!response.ok){
                alert(data.detail || "Could not create payment")
                return
            }

            const cashfree = window.Cashfree({
                mode:"sandbox"
            })

            cashfree.checkout({
                paymentSessionId:data.payment_session_id
            })

        } catch(error) {

            console.error(error)
            alert("Something went wrong")

        } finally {

            setLoading(false)

        }
    }

    return (
        <>
            <Script
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                strategy="afterInteractive"
            />

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">

                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                    <h1 className="text-3xl font-bold text-slate-900">
                        Confirm Booking
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Please check your booking details
                    </p>

                    <div className="mt-8 space-y-4 rounded-xl bg-slate-50 p-5">

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Bus
                            </span>

                            <span className="font-semibold text-slate-900">
                                {busNumber}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Time
                            </span>

                            <span className="font-semibold text-slate-900">
                                {time}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Route
                            </span>

                            <span className="font-semibold text-slate-900">
                                Institute → Sadar
                            </span>
                        </div>

                        <div className="border-t border-slate-200 pt-4 flex justify-between">
                            <span className="font-semibold text-slate-700">
                                Total
                            </span>

                            <span className="text-xl font-bold text-green-600">
                                ₹20
                            </span>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handlePayment}
                        disabled={loading}
                        className="mt-6 w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Opening Payment..." : "Pay ₹20"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                        Go Back
                    </button>

                </div>

            </main>
        </>
    )
}

export default page