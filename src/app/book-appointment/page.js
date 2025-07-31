"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [transactionIdValid, setTransactionIdValid] = useState(false);
  const today = new Date();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const [slotsWithStatus, setSlotsWithStatus] = useState([]);

  useEffect(() => {
    const calculateSlotStatus = () => {
      const now = new Date();

      const isToday =
        selectedDate &&
        new Date(selectedDate).toDateString() === now.toDateString();

      const currentTime = now.getHours() * 60 + now.getMinutes();

      const slots = timeSlots.map((slot) => {
        const [time, meridian] = slot.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (meridian === "PM" && hours !== 12) hours += 12;
        const slotTimeInMinutes = hours * 60 + minutes;

        return {
          time: slot,
          isPast: isToday && slotTimeInMinutes <= currentTime,
        };
      });

      setSlotsWithStatus(slots);
    };

    calculateSlotStatus();
  }, [selectedDate]);

  const isDateInPast = (year, month, day) => {
    const date = new Date(year, month, day);
    return date < today.setHours(0, 0, 0, 0);
  };

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

  const handleDateSelect = (day) => {
    if (!isDateInPast(currentYear, currentMonth, day)) {
      setSelectedDate(`${months[currentMonth]} ${day}, ${currentYear}`);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
    if (!isMenuModalOpen) {
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");
      setIsButtonDisabled(false);
      setSuccessMessage("");
    }
  };

  const sendOtp = async () => {
    try {
      setIsButtonDisabled(true);
      const generateOtp = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
      const generatedOtp = generateOtp();

      localStorage.setItem("otp", generatedOtp);

      const apiKey = "APIA4hnyVgI135044";
      const message = `Dear User, Your OTP for login to MobiDoc app is ${generatedOtp}. Valid for 30 minutes. Please do not share this OTP. Regards, Team IntelGray`;

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
        setResendCountdown(10);

        let countdownInterval = setInterval(() => {
          setResendCountdown((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsButtonDisabled(false);
            }
            return prev - 1;
          });
        }, 1000);

        return data;
      } else {
        console.error("Error sending OTP:", response);
        setIsButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error occurred while sending OTP:", error);
      setIsButtonDisabled(false);
    }
  };

  const verifyOtp = () => {
    const storedOtp = localStorage.getItem("otp");
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

    setIsButtonDisabled(true);
    setSuccessMessage("");

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
      setSuccessMessage("Appointment Confirmed. Confirmation emails sent!");
      setEmail("");
      setName("");
      setMobileNumber("");
      setSelectedDate("");
      setSelectedTime("");
      setUpiTransactionId("");
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred while sending confirmation emails:", error);
      setSuccessMessage("Failed to send confirmation emails.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleUpiTransactionIdChange = (e) => {
    const value = e.target.value;
    setUpiTransactionId(value);
    setTransactionIdValid(/^\d{12}$/.test(value));
  };

  return (
    <>
      <Header />
      <section className="py-16 text-gray-800 bg-white">
        <div className="max-w-7xl flex flex-col lg:flex-row justify-center mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Section */}
          <Card className="p-6 w-full lg:w-1/2 max-w-3xl border-r-2 shadow-lg">
            <CardHeader>
              <Badge variant="destructive" className="w-fit mb-2">BCGCMi</Badge>
              <CardTitle className="text-2xl">Meeting Name</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg mb-4">
                Do you currently need help with capital and have limited financing options?
              </CardDescription>
              <ul className="text-gray-600 list-disc pl-6">
                <li>
                  Delayed project timelines due to a lack of access to the necessary capital.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Right Section */}
          <Card className="p-6 w-full lg:w-1/2 max-w-3xl mt-8 lg:mt-0 lg:ml-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Select a Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Month and Year Selector */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousMonth}
                  className="text-gray-600 hover:text-gray-800"
                >
                  &lt; Previous
                </Button>
                <h3 className="text-lg font-semibold">
                  {months[currentMonth]} {currentYear}
                </h3>
                <Button
                  variant="outline"
                  onClick={handleNextMonth}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Next &gt;
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 text-center text-gray-700 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <span key={day} className="font-semibold text-sm">
                    {day}
                  </span>
                ))}
                {Array.from(
                  { length: new Date(currentYear, currentMonth, 1).getDay() },
                  (_, index) => (
                    <span key={`empty-${index}`} className="text-gray-400">
                    </span>
                  )
                )}
                {Array.from({ length: daysInMonth }, (_, day) => (
                  <Button
                    key={day + 1}
                    onClick={() => handleDateSelect(day + 1)}
                    disabled={isDateInPast(currentYear, currentMonth, day + 1)}
                    variant={
                      selectedDate === `${months[currentMonth]} ${day + 1}, ${currentYear}`
                        ? "default"
                        : "outline"
                    }
                    className={`p-2 rounded-lg ${isDateInPast(currentYear, currentMonth, day + 1)
                        ? "text-gray-400 cursor-not-allowed"
                        : selectedDate === `${months[currentMonth]} ${day + 1}, ${currentYear}`
                          ? "bg-green-500 text-white"
                          : "text-gray-700 hover:bg-green-100"
                      }`}
                  >
                    {day + 1}
                  </Button>
                ))}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="space-y-4">
                  <h3 className="text-gray-800 font-semibold">{selectedDate}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {slotsWithStatus.map(({ time, isPast }) => (
                      <Button
                        key={time}
                        onClick={() => !isPast && handleTimeSelect(time)}
                        disabled={isPast}
                        variant={
                          selectedTime === time
                            ? "default"
                            : "outline"
                        }
                        className={`${isPast
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : selectedTime === time
                              ? "bg-green-500 text-white"
                              : "bg-[#09336F] text-white hover:bg-green-500"
                          }`}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Selected Date and Time Display */}
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-800 font-semibold">Selected Date</Label>
                  <p className="text-gray-600">
                    {selectedDate || "No date selected"}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-800 font-semibold">Time</Label>
                  <p className="text-gray-600">{selectedTime || "No time selected"}</p>
                </div>
              </div>

              {/* Book Button */}
              {selectedDate && selectedTime && (
                <Button
                  onClick={toggleMenuModal}
                  className="bg-[#09336F] text-white px-6 py-2 rounded-full font-semibold w-full"
                >
                  BOOK A CALL
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modal */}
        {isMenuModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <Card className="bg-white p-8 rounded-lg shadow-xl max-w-xl w-full relative">
              <CardHeader>
                <CardTitle className="text-2xl">Book an Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isVerified ? (
                  <>
                    {!otpSent ? (
                      <>
                        {/* Full Name Field */}
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                          {name === '' && <p className="text-red-500 text-xs">Full name is required.</p>}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                          />
                          {email && !/\S+@\S+\.\S+/.test(email) && <p className="text-red-500 text-xs">Please enter a valid email address.</p>}
                        </div>

                        {/* Mobile Number Field */}
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input
                            id="mobile"
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="Enter your mobile number"
                            required
                          />
                          {mobileNumber && !/^\d{10}$/.test(mobileNumber) && <p className="text-red-500 text-xs">Please enter a valid 10-digit mobile number.</p>}
                        </div>

                        {/* Send OTP Button */}
                        <Button
                          onClick={sendOtp}
                          disabled={isButtonDisabled || !name || !email || !mobileNumber || !/\S+@\S+\.\S+/.test(email) || !/^\d{10}$/.test(mobileNumber)}
                          className="w-full"
                        >
                          Send OTP
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* OTP Field */}
                        <div className="space-y-2">
                          <Label htmlFor="otp">Enter OTP</Label>
                          <Input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP sent to your mobile"
                            required
                          />
                          {otp && otp.length !== 6 && <p className="text-red-500 text-xs">OTP must be 6 digits.</p>}
                        </div>

                        {/* Verify OTP Button */}
                        <Button
                          onClick={verifyOtp}
                          disabled={isButtonDisabled || otp.length !== 6}
                          className="w-full"
                        >
                          Verify OTP
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {selectedTime && (
                      <div className="text-center space-y-2">
                        <img
                          src={"/QR.png"}
                          alt="GPay QR Code"
                          className="w-48 h-48 mx-auto"
                        />
                        <p className="text-sm text-gray-600">Scan this QR code to pay for your appointment.</p>
                      </div>
                    )}

                    {/* UPI Transaction ID */}
                    <div className="space-y-2">
                      <Label htmlFor="upi">UPI Transaction ID</Label>
                      <Input
                        id="upi"
                        type="text"
                        value={upiTransactionId}
                        onChange={handleUpiTransactionIdChange}
                        placeholder="Enter UPI Transaction ID"
                        required
                      />
                      {upiTransactionId && !transactionIdValid && <p className="text-red-500 text-xs">UPI Transaction ID must be 12 digits.</p>}
                    </div>

                    {/* Confirm Appointment Button */}
                    <Button
                      onClick={sendAppointmentConfirmation}
                      disabled={isButtonDisabled || !transactionIdValid || !selectedDate || !selectedTime || isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <div className="spinner-border animate-spin border-t-2 border-b-2 border-white w-6 h-6 rounded-full"></div>
                      ) : (
                        "Confirm Appointment"
                      )}
                    </Button>

                    {successMessage && (
                      <p className="text-green-500 text-center">{successMessage}</p>
                    )}
                  </>
                )}

                {/* Close Modal Button */}
                <Button
                  onClick={toggleMenuModal}
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  &times;
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default MeetingSection;
