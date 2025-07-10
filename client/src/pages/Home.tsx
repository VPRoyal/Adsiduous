import { useAppSelector } from "../hooks/storeHook"

import Hero from "@/components/home/hero"
import Features from "@/components/home/features"
import CTA from "@/components/home/cta"

const Home=() => {
  const { user  } = useAppSelector((state) => state.auth)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <Hero user={user}/>

      {/* Features Section */}
      <Features/>
      

      {/* CTA Section */}
      {!user && (<CTA/>)}
    </div>
  )
}

export default Home
