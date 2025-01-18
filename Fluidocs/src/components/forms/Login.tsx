'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
        })
        if (result?.error) {
            // Handle error
            console.error(result.error)
        } else {
            router.push(callbackUrl)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500">Enter your credentials to access your account</p>
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>
            <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn('google', { callbackUrl })}
            >
                Login with Google
            </Button>
            <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

