import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className="h-screen flex justify-center items-center p-8 text-center">
        <div className="glass-panel p-16 text-center">
            <h1 className="font-bold text-5xl text-text-primary mb-4">Page Not Found</h1>
            <p className="text-text-secondary mb-8">The page you are looking for does not exist.</p>
            <Button className="btn-solid" onClick={() => navigate(-1)}>Go Back</Button>
        </div>
    </div>
  )
}

export default PageNotFound