"use client"

import {createClient} from "@/utils/supabase/client"
import React from 'react'
import {useState} from 'react'
import Link from 'next/link'
import {useRouter} from "next/navigation";

const page = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!email.endsWith("@iiitdmj.ac.in")){
            alert("Please use college's email address")
            return
        }

        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }

        if(password.length < 6){
            alert("Password must be at least 6 characters")
            return
        }

        const supabase = createClient()

        const {error} = await supabase.auth.signUp({
            email,
            password
        })

        if(error){
            alert(error.message)
            return
        }

        alert("Registration successful! Please check your email to verify your account.")

        router.push("/login");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Create your RideDMJ account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            College Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="yourname@iiitdmj.ac.in"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600"
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-green-600 hover:text-green-700"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    )
}

export default page