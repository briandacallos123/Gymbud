import React from 'react'

const MainFooter = () => {
  return (
    <div className="flex items-center space-x-12 text-[var(--light-foregorund)]">
        <p className="text-sm">@2024, Gym Buds Fitness</p>
        <p className="hidden lg:block text-sm">developed by Brian Dacallos</p>
        <p className="hidden lg:block text-sm">Manila, Philippines</p>
    </div>
  )
}

export default MainFooter