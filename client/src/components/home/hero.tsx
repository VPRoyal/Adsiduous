import { NavLink } from "react-router";
import type { User } from "@/types";

interface HeroProps{
    user:User | null;
}
const Hero:React.FC<HeroProps> = ({user}) => {
  return (
    <div className="text-center py-16">
        <div className="mx-auto h-16 w-16 bg-primary-600 rounded-xl flex items-center justify-center mb-8">
          <span className="text-white font-bold text-2xl">M</span>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary-600">MediaVault</span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your ultimate multimedia file management solution. Upload, organize, and search through your images, videos,
          audio files, and documents with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <NavLink to="/upload" className="btn-primary px-8 py-3 text-lg">
                Start Uploading
              </NavLink>
              <NavLink to="/search" className="btn-secondary px-8 py-3 text-lg">
                Browse Files
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register" className="btn-primary px-8 py-3 text-lg">
                Get Started Free
              </NavLink>
              <NavLink to="/login" className="btn-secondary px-8 py-3 text-lg">
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
  )
}

export default Hero;