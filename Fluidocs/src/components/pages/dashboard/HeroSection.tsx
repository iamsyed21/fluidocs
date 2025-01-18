
"use client";
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react';
import React from 'react'
const HeroSection = () => {
    return (
        <div>
            <Button
                onClick={() => {
                    signOut()
                }
                }
            >sign out </Button>
        </div>
    )
}

export default HeroSection
