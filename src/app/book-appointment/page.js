"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React, { useState, useEffect } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const timeSlots = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

const MeetingSection = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [successMessage, setSuccessMessage] = useState(""); // To show success or error messages
  const [isLoading, setIsLoading] = useState(false);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [transactionIdValid, setTransactionIdValid] = useState(false);
  const today = new Date();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const [slotsWithStatus, setSlotsWithStatus] = useState([]);

  useEffect(() => {
    const calculateSlotStatus = () => {
      const now = new Date();

      // Check if the selected date is today
      const isToday =
        selectedDate &&
        new Date(selectedDate).toDateString() === now.toDateString();

      const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

      const slots = timeSlots.map((slot) => {
        const [time, meridian] = slot.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (meridian === "PM" && hours !== 12) hours += 12;
        const slotTimeInMinutes = hours * 60 + minutes;

        return {
          time: slot,
          isPast: isToday && slotTimeInMinutes <= currentTime, // Determine if the slot is in the past
        };
      });

      setSlotsWithStatus(slots);
    };

    calculateSlotStatus();
  }, [selectedDate]);

  // Check if a date is in the past
  const isDateInPast = (year, month, day) => {
    const date = new Date(year, month, day);
    return date < today.setHours(0, 0, 0, 0); // Compare with today's date at midnight
  };

  // Handle navigation between months
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle date selection
  const handleDateSelect = (day) => {
    if (!isDateInPast(currentYear, currentMonth, day)) {
      setSelectedDate(`${months[currentMonth]} ${day}, ${currentYear}`);
      setSelectedTime(null); // Reset time if a new date is selected
    }
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
    if (!isMenuModalOpen) {
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");
      setIsButtonDisabled(false); // Re-enable the button when modal reopens
      setSuccessMessage(""); // Clear success message when modal is closed
    }
  };
  const sendOtp = async () => {
    try {
      setIsButtonDisabled(true); // Disable the button while sending OTP
      const generateOtp = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
      const generatedOtp = generateOtp();

      localStorage.setItem("otp", generatedOtp);

      const apiKey = "APIA4hnyVgI135044";
      const message = `Dear User, Your OTP for login to MobiDoc app is ${generatedOtp}. Valid for 30 minutes. Please do not share this OTP. Regards, Team IntelGray`;

      // const apiUrl = `https://www.bulksmsplans.com/api/send_sms?api_id=${apiKey}&api_password=8920359956&sms_type=OTP&sms_encoding=1&sender=MMABUS&number=${mobileNumber}&message=${message}&template_id=1207164447361211223`;

      const apiUrl = `https://www.bulksmsplans.com/api/send_sms?api_id=${apiKey}&api_password=8920359956&sms_type=Transactional&sms_encoding=text&sender=MMABUS&number=${mobileNumber}&message=${message}&template_id=168383`

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setOtpSent(true);
        setResendCountdown(10); // Set countdown for resend OTP

        let countdownInterval = setInterval(() => {
          setResendCountdown((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval); // Clear interval when countdown ends
              setIsButtonDisabled(false); // Re-enable button after the countdown
            }
            return prev - 1;
          });
        }, 1000);

        return data;
      } else {
        console.error("Error sending OTP:", response);
        setIsButtonDisabled(false); // Re-enable button on error
      }
    } catch (error) {
      console.error("Error occurred while sending OTP:", error);
      setIsButtonDisabled(false); // Re-enable button on error
    }
  };

  const verifyOtp = () => {
    const storedOtp = localStorage.getItem("otp"); // Get OTP from localStorage
    if (otp === storedOtp) {
      setIsVerified(true);
      alert("OTP Verified Successfully!");
    } else {
      alert("Invalid OTP");
    }
  };

  const sendAppointmentConfirmation = async () => {
    setIsLoading(true);
    if (!email || !name || !mobileNumber || !selectedDate || !selectedTime || !upiTransactionId) {
      alert("Please provide all the required information.");
      return;
    }

    setIsButtonDisabled(true); // Disable button to prevent multiple submissions
    setSuccessMessage(""); // Clear previous success message if any

    // const appointmentMessage = `
    //   Dear ${name},
    //   Your appointment is confirmed for ${selectedTime}. Thank you for using our service.
    //   Regards,
    //   Team The Agro Village
    // `;

    // const adminMessage = `
    //   New appointment confirmation:
    //   Name: ${name}
    //   Email: ${email}
    //   Mobile: ${mobileNumber}
    //   Appointment Time: ${selectedTime}
    //   UPI Transaction ID: ${upiTransactionId}
    // `;

    try {
      const responseUser = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobileNumber,
          selectedDate,
          selectedTime,
          upiTransactionId,
        }),
      });
      console.log(responseUser)

      if (!responseUser.ok) {
        throw new Error("Error sending email to user.");
      }

      const responseAdmin = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobileNumber,
          selectedDate,
          selectedTime,
          upiTransactionId,
        }),
      });

      if (!responseAdmin.ok) {
        throw new Error("Error sending email to admin.");
      }
      setIsLoading(false);
      setSuccessMessage("Appointment Confirmed. Confirmation emails sent!"); // Show success message
      setEmail(""); // Assuming you have state variables for each input field
      setName("");
      setMobileNumber("");
      setSelectedDate("");
      setSelectedTime("");
      setUpiTransactionId("");
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred while sending confirmation emails:", error);
      setSuccessMessage("Failed to send confirmation emails."); // Show error message
    } finally {
      setIsButtonDisabled(false); // Re-enable button after the process is complete

    }
  };
  const handleUpiTransactionIdChange = (e) => {
    const value = e.target.value;
    setUpiTransactionId(value);
    setTransactionIdValid(/^\d{12}$/.test(value)); // Validate UPI Transaction ID (12 digits)
  };

  return (
    <>
      <Header />
      <section className="py-16 text-gray-800 bg-white">
        <div className="max-w-7xl flex flex-col lg:flex-row justify-center mx-auto px-4 sm:px-6 lg:px-8 shadow-lg rounded-lg border border-[#082541]">
          {/* Left Section */}
          <div className="p-6 w-full lg:w-1/2 max-w-3xl border-r-2">
            <h1 className="text-red-600 text-3xl font-bold mb-4">BCGCMi</h1>
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">Meeting Name</h2>
            <p className="text-gray-600 text-lg mb-4">
              Do you currently need help with capital and have limited financing options?
            </p>
            <ul className="text-gray-600 list-disc pl-6">
              <li>
                Delayed project timelines due to a lack of access to the necessary capital.
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="p-6 w-full lg:w-1/2 max-w-3xl mt-8 lg:mt-0 lg:ml-8">
            <h2 className="text-gray-800 text-2xl font-semibold mb-4">
              Select a Date & Time
            </h2>

            {/* Month and Year Selector */}
            <div className="flex items-center justify-between mt-4 mb-6">
              <button
                onClick={handlePreviousMonth}
                className="text-gray-600 hover:text-gray-800"
              >
                &lt; Previous
              </button>
              <h3 className="text-lg font-semibold">
                {months[currentMonth]} {currentYear}
              </h3>
              <button
                onClick={handleNextMonth}
                className="text-gray-600 hover:text-gray-800"
              >
                Next &gt;
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 text-center text-gray-700 mt-4 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day} className="font-semibold text-sm">
                  {day}
                </span>
              ))}
              {/* Render empty slots for days before the 1st */}
              {Array.from(
                { length: new Date(currentYear, currentMonth, 1).getDay() },
                (_, index) => (
                  <span key={`empty-${index}`} className="text-gray-400">
                    {/* Empty */}
                  </span>
                )
              )}
              {/* Render days of the month */}
              {Array.from({ length: daysInMonth }, (_, day) => (
                <button
                  key={day + 1}
                  onClick={() => handleDateSelect(day + 1)}
                  disabled={isDateInPast(currentYear, currentMonth, day + 1)}
                  className={`p-2 rounded-lg ${isDateInPast(currentYear, currentMonth, day + 1)
                    ? "text-gray-400 cursor-not-allowed"
                    : selectedDate === `${months[currentMonth]} ${day + 1}, ${currentYear}`
                      ? "bg-green-500 text-white"
                      : "text-gray-700 hover:bg-green-100"
                    }`}
                >
                  {day + 1}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            {
              selectedDate && (
                <div className="mt-6">
                  <h3 className="text-gray-800 font-semibold mb-4">{selectedDate}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {slotsWithStatus.map(({ time, isPast }) => (
                      <button
                        key={time}
                        onClick={() => !isPast && handleTimeSelect(time)} // Prevent clicking past slots
                        disabled={isPast} // Disable past slots
                        className={`p-2 rounded-lg text-sm font-medium ${isPast
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Style for past slots
                          : selectedTime === time
                            ? "bg-green-500 text-white" // Style for selected slot
                            : "bg-[#09336F] text-white hover:bg-green-500"
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>)}
            <div className="mt-6">
              <h3 className="text-gray-800 font-semibold">Selected Date</h3>
              <p className="text-gray-600">
                {selectedDate || "No date selected"}
              </p>
            </div>
            {/* Timezone */}
            <div className="mt-4">
              <h3 className="text-gray-800 font-semibold">Time </h3>
              <p className="text-gray-600">{selectedTime || "No time selected"}</p>
            </div>

            {/* Book Button */}
            {selectedDate && selectedTime && (
              <div className="mt-6">
                <button onClick={toggleMenuModal} className="bg-[#09336F] text-white px-6 py-2 rounded-full font-semibold ">
                  BOOK A CALL
                </button>
              </div>
            )}
            {isMenuModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
                <div className="bg-white  p-8 rounded-lg shadow-xl max-w-xl w-full relative">
                  <h2 className="text-2xl font-semibold mb-6">Book an Appointment</h2>

                  {!isVerified ? (
                    <>
                      {!otpSent ? (
                        <>
                          {/* Full Name Field */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg"
                              placeholder="Enter your full name"
                              required
                            />
                            {name === '' && <p className="text-red-500 text-xs mt-2">Full name is required.</p>}
                          </div>

                          {/* Email Field */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg"
                              placeholder="Enter your email address"
                              required
                            />
                            {email && !/\S+@\S+\.\S+/.test(email) && <p className="text-red-500 text-xs mt-2">Please enter a valid email address.</p>}
                          </div>

                          {/* Mobile Number Field */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                              type="text"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg"
                              placeholder="Enter your mobile number"
                              required
                            />
                            {mobileNumber && !/^\d{10}$/.test(mobileNumber) && <p className="text-red-500 text-xs mt-2">Please enter a valid 10-digit mobile number.</p>}
                          </div>

                          {/* Send OTP Button */}
                          <button
                            onClick={sendOtp}
                            disabled={isButtonDisabled || !name || !email || !mobileNumber || !/\S+@\S+\.\S+/.test(email) || !/^\d{10}$/.test(mobileNumber)}
                            className={`bg-[#43923f] text-white px-6 py-3 rounded-full w-full ${isButtonDisabled ? "opacity-50" : "hover:bg-[#43923f]"}`}
                          >
                            Send OTP
                          </button>
                        </>
                      ) : (
                        <>
                          {/* OTP Field */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                            <input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg"
                              placeholder="Enter OTP sent to your mobile"
                              required
                            />
                            {otp && otp.length !== 6 && <p className="text-red-500 text-xs mt-2">OTP must be 6 digits.</p>}
                          </div>

                          {/* Verify OTP Button */}
                          <button
                            onClick={verifyOtp}
                            disabled={isButtonDisabled || otp.length !== 6}
                            className="bg-[#43923f] text-white px-6 py-3 rounded-full w-full hover:bg-[#43923f]"
                          >
                            Verify OTP
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>

                      {selectedTime && (
                        <div className="mb-4">
                          <img
                            src={"/QR.png"}
                            alt="GPay QR Code"
                            className="w-48 h-48 mx-auto"
                          />
                          <p className="text-sm text-gray-600 mt-2">Scan this QR code to pay for your appointment.</p>
                        </div>
                      )}

                      {/* UPI Transaction ID */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">UPI Transaction ID</label>
                        <input
                          type="text"
                          value={upiTransactionId}
                          onChange={handleUpiTransactionIdChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Enter UPI Transaction ID"
                          required
                        />
                        {upiTransactionId && !transactionIdValid && <p className="text-red-500 text-xs mt-2">UPI Transaction ID must be 12 digits.</p>}
                      </div>
                      {/* Confirm Appointment Button */}
                      <button
                        onClick={sendAppointmentConfirmation}
                        disabled={isButtonDisabled || !transactionIdValid || !selectedDate || !selectedTime || isLoading}
                        className="bg-green-600 text-white px-6 py-3 rounded-full w-full hover:bg-green-700 flex items-center justify-center"
                      >
                        {isLoading ? (
                          <div className="spinner-border animate-spin border-t-2 border-b-2 border-white w-6 h-6 rounded-full"></div>
                        ) : (
                          "Confirm Appointment"
                        )}
                      </button>

                      {successMessage && (
                        <p className="mt-4 text-green-500">{successMessage}</p>
                      )}
                    </>
                  )}

                  {/* Close Modal Button */}
                  <button
                    onClick={toggleMenuModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    &times;
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MeetingSection;
