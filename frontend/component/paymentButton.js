"use client"

import Script from "next/script"
import {useState} from "react"

const PaymentButton = () => {

    const [loading,setLoading] = useState(false)

    const handlePayment = async () => {

        try {

            setLoading(true)

            // 1. Ask our FastAPI backend to create a Cashfree order
            const response = await fetch(
                "http://localhost:8000/payment/create",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            )

            if(!response.ok){
                throw new Error("Could not create payment")
            }

            const data = await response.json()

            console.log("Payment data:",data)

            // 2. Initialize Cashfree
            const cashfree = window.Cashfree({
                mode:"sandbox"
            })

            // 3. Open Cashfree checkout
            cashfree.checkout({
                paymentSessionId:data.payment_session_id
            })

        } catch(error) {

            console.error(error)
            alert("Unable to start payment")

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

            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600 disabled:opacity-50"
            >
                {loading ? "Opening Payment..." : "Pay ₹20"}
            </button>
        </>
    )
}

export default PaymentButton