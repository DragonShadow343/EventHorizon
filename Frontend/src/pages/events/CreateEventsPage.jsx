import React from 'react'
import Navbar from '../../components/NavBar/Navbar'

const SectionCard = ({ title, tall = false }) => {
  return (
    <div
      className={`w-full rounded-2xl border border-gray-200 bg-white shadow-sm ${
        tall ? 'min-h-45' : 'min-h-22'
      }`}
    >
      <div className="flex items-start justify-between p-5">
        <div className="flex w-full gap-3">
          <div className="mt-1 text-gray-500 text-lg"></div>
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  )
}

const CreateEventsPage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f8fafc] px-6 py-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <button className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
            ← Back
          </button>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_1.25fr]">
            {/* Left panel */}
            <div className="hidden lg:block">
              <div className="h-full min-h-180 rounded-4xl bg-[#5b9df0]" />
            </div>

            {/* Right content */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <p className="text-sm font-medium text-[#5b9df0]">
                  Create Event
                </p>
                <h1 className="mt-2 text-4xl font-semibold text-gray-900">
                  Build your event page
                </h1>
                <p className="mt-3 text-gray-500">
                  Add details for your event. You can edit everything later.
                </p>
              </div>

              <div className="space-y-5">
                {/* Banner */}
                <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-5">
                  <div className="flex min-h-62.5 flex-col items-center justify-center rounded-3xl bg-gray-50 text-center">
                    <div className="mb-4 text-3xl"></div>
                    <h2 className="text-lg font-semibold">
                      Upload Event Banner
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      Add a cover image for your event
                    </p>
                    <button className="mt-5 rounded-xl bg-[#5b9df0] px-5 py-3 text-white font-semibold hover:opacity-90">
                      Choose Image
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="mb-3 flex justify-between items-center">
                    <label className="text-lg font-semibold">
                      Event Title
                    </label>
                    <button className="h-10 w-10 rounded-full border hover:bg-gray-50">
                      +
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter your event title"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#5b9df0] focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Row */}
                <div className="grid gap-5 md:grid-cols-2">
                  <SectionCard
                    title="Event Location + Time"
                  />
                  <SectionCard
                    title="Organizers"
                  />
                </div>

                {/* Overview */}
                <div className="rounded-2xl border border-gray-200 bg-white">
                  <div className="flex justify-between p-5">
                    <div className="w-full">
                      <h3 className="text-lg font-semibold">
                        Event Overview
                      </h3>
                      <textarea
                        rows="6"
                        placeholder="Write a description..."
                        className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#5b9df0] focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <button className="ml-4 h-10 w-10 rounded-full border hover:bg-gray-50">
                      +
                    </button>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full rounded-2xl bg-[#5b9df0] py-4 text-white font-semibold hover:opacity-90">
                  Save and Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateEventsPage