import { NavLink } from "react-router";
const CTA = () => {
  return (
    <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
      <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
        Join thousands of users who trust MediaVault to manage their multimedia
        files securely and efficiently.
      </p>
      <NavLink
        to="/register"
        className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Create Free Account
      </NavLink>
    </div>
  );
};

export default CTA;
