"use client";
import { useState } from "react";

const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Sydney",
  "Berlin",
  "Toronto",
  "Singapore",
];

const countries = [
  "United States",
  "United Kingdom",
  "France",
  "Japan",
  "Australia",
  "Germany",
  "Canada",
  "Singapore",
];

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    country: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="w-full max-w-4xl mx-auto bg-base-bg rounded-lg border border-border-default shadow-sm">
          <div className="p-6 border-b border-border-default">
            <h1 className="text-2xl text-heading text-center font-bold">
              Add new Admin
            </h1>
          </div>
          <div className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-paragraph"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-paragraph"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-paragraph"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-paragraph"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-paragraph"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-paragraph"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-paragraph"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full h-10 px-3 py-2 rounded-lg border border-border-default text-paragraph bg-base-bg transition-all duration-200 hover:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
