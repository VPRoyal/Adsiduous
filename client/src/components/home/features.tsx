import { Upload, Search, Shield, Zap, Cloud, Users } from "lucide-react"

const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Drag and drop files or click to select. Support for images, videos, audio, and PDFs.",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description: "Find files instantly with real-time search suggestions and advanced filtering.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your files are stored securely with JWT-based authentication and encryption.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized for speed with thumbnail generation and efficient file processing.",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless integration with Cloudinary for reliable file storage and delivery.",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interface designed for both beginners and power users.",
    },
  ]
const Features = () => {
  return (
    <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to manage your files</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MediaVault provides all the tools you need to upload, organize, and find your multimedia files quickly and
            efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="mx-auto w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Features;
