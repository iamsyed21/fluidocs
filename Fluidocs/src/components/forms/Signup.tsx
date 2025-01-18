'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send a request to your API to create a new user
        // For this example, we'll just log the values and redirect
        console.log('Sign up:', { email, password })
        router.push('/login')
    }
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return <div>Loading...</div>
    }
    return (
        <div className="relative flex items-center justify-center h-screen w-screen m-auto p-16 bg-black text-white  ">
            <div className="absolute lab-bg inset-0 size-full bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="flex flex-col gap-2 relative">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-gray-500">Create an account to get started</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>

    )
}

