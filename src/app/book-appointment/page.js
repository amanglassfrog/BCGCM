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

const timeSlots = ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"];

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
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [verifiedMobileNumber, setVerifiedMobileNumber] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

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

      // Use availableTimeSlots if available, otherwise fallback to static timeSlots
      const slotsToUse = availableTimeSlots.length > 0 ? availableTimeSlots : timeSlots;
      
      const slots = slotsToUse.map((slot) => {
        const [time, meridian] = slot.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (meridian === "PM" && hours !== 12) hours += 12;
        const slotTimeInMinutes = hours * 60 + minutes;

        return {
          time: slot,
          isPast: isToday && slotTimeInMinutes <= currentTime,
          isAvailable: availableTimeSlots.includes(slot)
        };
      });

      setSlotsWithStatus(slots);
    };

    calculateSlotStatus();
  }, [selectedDate, availableTimeSlots]);



  const isDateInPast = (year, month, day) => {
    const date = new Date(year, month, day);
    return date < today.setHours(0, 0, 0, 0);
  };

  const isWeekend = (year, month, day) => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
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

  const handleDateSelect = async (day) => {
    if (!isDateInPast(currentYear, currentMonth, day)) {
      // Check if it's a weekend
      if (isWeekend(currentYear, currentMonth, day)) {
        setSuccessMessage("Bookings are only available Monday to Friday. Please select a weekday.");
        return;
      }
      
      const formattedDate = `${months[currentMonth]} ${day}, ${currentYear}`;
      setSelectedDate(formattedDate);
      setSelectedTime(null);
      
      // Fetch available time slots for the selected date
      await fetchAvailableTimeSlots(formattedDate);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const fetchAvailableTimeSlots = async (date) => {
    if (!date) return;
    
    setIsLoadingSlots(true);
    try {
      const response = await fetch(`/api/check-availability?date=${encodeURIComponent(date)}`);
      if (response.ok) {
        const data = await response.json();
        setAvailableTimeSlots(data.availableSlots || []);
      } else {
        console.error('Failed to fetch available time slots');
        setAvailableTimeSlots([]);
      }
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      setAvailableTimeSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const toggleMenuModal = () => {
    setIsMenuModalOpen(!isMenuModalOpen);
    if (!isMenuModalOpen) {
      // Reset all states when opening modal
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");
      setIsButtonDisabled(false);
      setSuccessMessage("");
      // Don't clear mobileNumber here - user might want to reuse it
      setName("");
      setEmail("");
      setAppointmentConfirmed(false);
      setShowBookingForm(false);
      setVerifiedMobileNumber("");
      setUpiTransactionId("");
      setTransactionIdValid(false);
    }
  };

  const sendOtp = async () => {
    // Only validate mobile number for OTP
    if (!mobileNumber.trim()) {
      setSuccessMessage("Please enter your mobile number.");
      return;
    }
    
    if (!/^\d{10}$/.test(mobileNumber)) {
      setSuccessMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

            // console.log("Sending OTP to mobile:", mobileNumber);
    
    try {
      setIsButtonDisabled(true);
      setIsLoading(true);
      
      // Generate OTP
      const generateOtp = () =>
        Math.floor(100000 + Math.random() * 900000).toString();
      const generatedOtp = generateOtp();

      // Store OTP in localStorage
      localStorage.setItem("otp", generatedOtp);
              // console.log("OTP stored in localStorage:", generatedOtp);
      localStorage.setItem("otpTimestamp", Date.now().toString());

      // SMS API Configuration
      const apiId = "APIA4hnyVgI135044";
      const apiPassword = "8920359956";
      const sender = "MMABUS"; // Try DEMOSM first
      const message = `Dear User, Your OTP for login to MAPL portal is ${generatedOtp}. Valid for 30 minutes. Please do not share this OTP. Regards, MAPL Team: `;
      
      // Fallback sender IDs if the first one fails
      const fallbackSenders = ["BCGCMI", "BCGCM", "MMABUS"];
      
      // Format mobile number with country code - try different formats
      let formattedMobileNumber;
      if (mobileNumber.startsWith('+91')) {
        formattedMobileNumber = mobileNumber;
      } else if (mobileNumber.startsWith('91')) {
        formattedMobileNumber = `+${mobileNumber}`;
      } else if (mobileNumber.length === 10) {
        formattedMobileNumber = `+91${mobileNumber}`;
      } else {
        formattedMobileNumber = mobileNumber; // Keep as is if doesn't match patterns
      }
      

      
      // Try different sender IDs if one fails
      let response;
      let result;
      let currentSender = sender;
      let senderIndex = 0;
      

      
      while (senderIndex < fallbackSenders.length + 1) { // +1 to include the original sender
        try {
          // Build SMS API URL with GET parameters
          const smsUrl = `https://www.bulksmsplans.com/api/send_sms?api_id=${apiId}&api_password=${apiPassword}&sms_type=Transactional&sms_encoding=text&sender=${currentSender}&number=${formattedMobileNumber}&message=${encodeURIComponent(message)}`;

          // Send SMS using GET request
          response = await fetch(smsUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            result = await response.text();
            
            // Check if this sender worked
            let responseData;
            try {
              responseData = JSON.parse(result);
            } catch (e) {
              responseData = { message: result };
            }
            
            // If no validation error, break the loop
            if (!responseData.data || !responseData.data.sender) {
              break;
            }
          } else {
            throw new Error(`GET failed with status: ${response.status}`);
          }
        } catch (getError) {
          console.log(`GET method failed with sender ${currentSender}, trying POST...`, getError.message);
          
          try {
                         // Fallback to POST method
             const postData = {
               api_id: apiId,
               api_password: apiPassword,
               sms_type: 'Transactional',
               sms_encoding: 'text',
               sender: currentSender,
               number: formattedMobileNumber,
               message: message
             };
            
            response = await fetch('https://www.bulksmsplans.com/api/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postData)
            });
            
            if (response.ok) {
              result = await response.text();
              console.log(`SMS API Response (POST) with sender ${currentSender}:`, result);
              
              // Check if this sender worked
              let responseData;
              try {
                responseData = JSON.parse(result);
              } catch (e) {
                responseData = { message: result };
              }
              
              // If no validation error, break the loop
              if (!responseData.data || !responseData.data.sender) {
                break;
              }
            } else {
              throw new Error(`POST failed with status: ${response.status}`);
            }
          } catch (postError) {
            console.log(`Both GET and POST failed with sender ${currentSender}`);
          }
        }
        
        // Try next sender
        senderIndex++;
        if (senderIndex < fallbackSenders.length + 1) {
          currentSender = fallbackSenders[senderIndex - 1];
          console.log(`Switching to sender: ${currentSender}`);
        }
      }
      
      // If we've tried all senders and still have validation errors
      if (!result) {
        throw new Error('All sender IDs failed validation. Please contact support.');
      }

            // Check if we have a result from either GET or POST
      if (result) {
        console.log('SMS API Response:', result);
        
        // Check if SMS was sent successfully (handle different response formats)
        let responseData;
        try {
          responseData = JSON.parse(result);
        } catch (e) {
          // If not JSON, treat as plain text
          responseData = { message: result };
        }
        

        
                  // Check for API errors first
          if (responseData.code && responseData.code !== 200) {
            // Check for specific validation errors
            if (responseData.data) {
              const validationErrors = [];
              Object.keys(responseData.data).forEach(key => {
                if (Array.isArray(responseData.data[key])) {
                  validationErrors.push(`${key}: ${responseData.data[key].join(', ')}`);
                } else {
                  validationValues.push(`${key}: ${responseData.data[key]}`);
                }
              });
              
              if (validationErrors.length > 0) {
                throw new Error(`API Error ${responseData.code}: ${responseData.message}. Validation issues: ${validationErrors.join('; ')}`);
              }
            }
            
            throw new Error(`API Error ${responseData.code}: ${responseData.message || 'Unknown error'}`);
          }
        
        // Check if SMS was sent successfully
        const responseText = result.toLowerCase();
        if (responseText.includes('success') || 
            responseText.includes('200') || 
            responseText.includes('ok') ||
            responseText.includes('sent') ||
            responseText.includes('delivered') ||
            (responseData.status && responseData.status === 'success')) {
          setOtpSent(true);
          setResendCountdown(30); // 30 seconds countdown
          setSuccessMessage("OTP sent successfully! Check your mobile for the 6-digit code.");
          
          // Clear form fields after OTP is sent (but keep mobile number for verification)
          setName("");
          setEmail("");
          // Don't clear mobileNumber here - we need it for OTP verification

          // Start countdown timer
          let countdownInterval = setInterval(() => {
            setResendCountdown((prev) => {
              if (prev === 1) {
                clearInterval(countdownInterval);
                setIsButtonDisabled(false);
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          throw new Error(`SMS API Error: ${result}`);
        }
      } else {
        throw new Error('No response received from SMS API');
      }

    } catch (error) {
      console.error("Error occurred while sending OTP:", error);
      setSuccessMessage(`Failed to send OTP: ${error.message}. Please try again.`);
      
      // Clear OTP from localStorage on error
      localStorage.removeItem("otp");
      localStorage.removeItem("otpTimestamp");
    } finally {
      setIsButtonDisabled(false);
      setIsLoading(false);
    }
  };

  const verifyOtp = () => {
    const storedOtp = localStorage.getItem("otp");
    const otpTimestamp = localStorage.getItem("otpTimestamp");
    
    if (!storedOtp || !otpTimestamp) {
      setSuccessMessage("OTP expired. Please request a new one.");
      return;
    }
    
    // Check if OTP is expired (30 minutes)
    const currentTime = Date.now();
    const otpTime = parseInt(otpTimestamp);
    const otpExpiry = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    if (currentTime - otpTime > otpExpiry) {
      setSuccessMessage("OTP has expired. Please request a new one.");
      localStorage.removeItem("otp");
      localStorage.removeItem("otpTimestamp");
      setOtpSent(false);
      setOtp("");
      return;
    }
    
    if (otp === storedOtp) {
      // Store the verified mobile number
      setVerifiedMobileNumber(mobileNumber);
      setIsVerified(true);
      setShowBookingForm(true);
      setSuccessMessage("OTP Verified Successfully! Please fill in your details and complete payment.");
      localStorage.removeItem("otp"); // Clear OTP after successful verification
      localStorage.removeItem("otpTimestamp");
    } else {
      setSuccessMessage("Invalid OTP. Please check and try again.");
    }
  };

  const sendAppointmentConfirmation = async () => {
    // Validate all required fields (mobile number is already verified via OTP)
    if (!name || !email || !selectedDate || !selectedTime || !upiTransactionId) {
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!selectedDate) missingFields.push("selected date");
      if (!selectedTime) missingFields.push("selected time");
      if (!upiTransactionId) missingFields.push("UPI transaction ID");
      
      setSuccessMessage(`Missing required information: ${missingFields.join(", ")}. Please try again.`);
      return;
    }

    // console.log("Submitting appointment with data:", {
    //   name, email, mobileNumber, selectedDate, selectedTime, upiTransactionId
    // });
    
    // Get the mobile number (use verifiedMobileNumber if available, otherwise fallback to mobileNumber)
    const mobileToUse = verifiedMobileNumber || mobileNumber;
    
    if (!mobileToUse) {
      // console.error("Mobile number is missing! Current state:", { verifiedMobileNumber, mobileNumber, isVerified, otpSent });
      setSuccessMessage("Error: Mobile number not found. Please try again.");
      return;
    }
    
    // console.log("Using mobile number:", mobileToUse);

    setIsButtonDisabled(true);
    setSuccessMessage("");

    try {
      // Send confirmation email to user
      const responseUser = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobileNumber: mobileToUse,
          selectedDate,
          selectedTime,
          upiTransactionId,
          type: "user_confirmation"
        }),
      });

      if (!responseUser.ok) {
        const errorData = await responseUser.json().catch(() => ({}));
        // console.error("User email API error:", errorData);
        throw new Error(`Error sending confirmation email to user: ${errorData.error || responseUser.statusText}${errorData.details ? ` - ${errorData.details}` : ''}`);
      }

      // Send notification email to admin (bcgcmindia@gmail.com)
      const responseAdmin = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobileNumber: mobileToUse,
          selectedDate,
          selectedTime,
          upiTransactionId,
          type: "admin_notification",
          adminEmail: "bccmindia@gmail.com"
        }),
      });

      if (!responseAdmin.ok) {
        const errorData = await responseAdmin.json().catch(() => ({}));
        // console.error("Admin email API error:", errorData);
        throw new Error(`Error sending notification email to admin: ${errorData.error || responseAdmin.statusText}${errorData.details ? ` - ${errorData.details}` : ''}`);
      }

      // Send SMS notifications to both admin and user
      setSuccessMessage("Sending confirmation emails and SMS notifications...");
      await sendSMSNotifications();

      // Show success message and set appointment confirmed
      setIsLoading(false);
      setAppointmentConfirmed(true);
      setSuccessMessage("🎉 Thank you! Your appointment has been confirmed successfully!");
      
      // Clear form fields only after successful confirmation
      setEmail("");
      setName("");
      // Keep mobileNumber for potential reuse
      setSelectedDate("");
      setSelectedTime("");
      setUpiTransactionId("");
      setIsVerified(false);
      setOtpSent(false);
      setOtp("");

      
      // Close modal after 5 seconds
      setTimeout(() => {
        toggleMenuModal();
        setAppointmentConfirmed(false);
      }, 5000);
      
    } catch (error) {
      setIsLoading(false);
      // console.error("Error occurred while confirming appointment:", error);
      setSuccessMessage("Failed to confirm appointment. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  // Function to send SMS notifications to both admin and user
  const sendSMSNotifications = async () => {
    try {
      const adminMessage = `New appointment booking confirmed! Name: ${name}, Date: ${selectedDate}, Time: ${selectedTime}, UPI ID: ${upiTransactionId}`;
      const userMessage = `Your appointment is confirmed! Date: ${selectedDate}, Time: ${selectedTime}, UPI ID: ${upiTransactionId}. Thank you for choosing BCGCM India!`;
      
      // SMS API Configuration
      const apiId = "APIA4hnyVgI135044";
      const apiPassword = "8920359956";
      const sender = "MMABUS";
      const adminNumber = "8920359956";
      const userNumber = verifiedMobileNumber || mobileNumber;
      
      // Send SMS to admin
      const adminSmsUrl = `https://www.bulksmsplans.com/api/send_sms?api_id=${apiId}&api_password=${apiPassword}&sms_type=Transactional&sms_encoding=text&sender=${sender}&number=${adminNumber}&message=${encodeURIComponent(adminMessage)}`;
      
      const adminResponse = await fetch(adminSmsUrl, { method: 'GET' });
      if (!adminResponse.ok) {
        // console.error("Admin SMS notification failed");
      } else {
        // console.log("Admin SMS sent successfully");
      }
      
      // Send SMS to user
      const userSmsUrl = `https://www.bulksmsplans.com/api/send_sms?api_id=${apiId}&api_password=${apiPassword}&sms_type=Transactional&sms_encoding=text&sender=${sender}&number=${userNumber}&message=${encodeURIComponent(userMessage)}`;
      
      const userResponse = await fetch(userSmsUrl, { method: 'GET' });
      if (!userResponse.ok) {
        // console.error("User SMS notification failed");
      } else {
        // console.log("User SMS sent successfully");
      }
      
    } catch (error) {
      // console.error("Error sending SMS notifications:", error);
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
              <div className="w-fit mb-2">
                <span className="text-[#082541] font-serif text-lg font-semibold">BCGCM</span>
                <span className="text-red-600 font-serif text-lg font-semibold">i</span>
              </div>
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
              {/* Business Hours Info */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800 text-sm font-medium">📅 Business Hours:</p>
                <ul className="text-blue-700 text-xs mt-1 list-disc list-inside space-y-1">
                  <li>Available: Monday to Friday only</li>
                  <li>Time slots: 2:00 PM to 5:00 PM (30-minute intervals)</li>
                  <li>Weekends are not available for booking</li>
                </ul>
              </div>
              
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
                  <span key={day} className={`font-semibold text-sm ${day === "Sat" || day === "Sun" ? "text-gray-400" : ""}`}>
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
                {Array.from({ length: daysInMonth }, (_, day) => {
                  const isPast = isDateInPast(currentYear, currentMonth, day + 1);
                  const isWeekendDay = isWeekend(currentYear, currentMonth, day + 1);
                  const isDisabled = isPast || isWeekendDay;
                  
                  return (
                    <Button
                      key={day + 1}
                      onClick={() => handleDateSelect(day + 1)}
                      disabled={isDisabled}
                      variant={
                        selectedDate === `${months[currentMonth]} ${day + 1}, ${currentYear}`
                          ? "default"
                          : "outline"
                      }
                      className={`p-2 rounded-lg ${
                        isPast
                          ? "text-gray-400 cursor-not-allowed"
                          : isWeekendDay
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : selectedDate === `${months[currentMonth]} ${day + 1}, ${currentYear}`
                            ? "bg-green-500 text-white"
                            : "text-gray-700 hover:bg-green-100"
                      }`}
                    >
                      {day + 1}
                    </Button>
                  );
                })}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="space-y-4">
                  <h3 className="text-gray-800 font-semibold">{selectedDate}</h3>
                  
                                    {isLoadingSlots ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#09336F]"></div>
                      <span className="ml-2 text-gray-600">Loading available time slots...</span>
                    </div>
                  ) : availableTimeSlots.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm">
                        {selectedDate && new Date(selectedDate).getDay() === 0 || new Date(selectedDate).getDay() === 6
                          ? "Weekends are not available for booking. Please select a weekday."
                          : "No time slots available for this date. Please select another date."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {slotsWithStatus.map(({ time, isPast, isAvailable }) => (
                        <Button
                          key={time}
                          onClick={() => !isPast && isAvailable && handleTimeSelect(time)}
                          disabled={isPast || !isAvailable}
                          variant={
                            selectedTime === time
                              ? "default"
                              : "outline"
                          }
                          className={`${
                            isPast
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : !isAvailable
                              ? "bg-red-300 text-red-600 cursor-not-allowed"
                              : selectedTime === time
                              ? "bg-green-500 text-white"
                              : "bg-[#09336F] text-white hover:bg-green-500"
                          }`}
                        >
                          {time}
                          {!isAvailable && !isPast && (
                            <span className="ml-2 text-xs">(Booked)</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  )}
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
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <Card className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Book an Appointment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto px-6 pb-6">
                {/* Instructions */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-blue-800 text-sm font-medium">📋 Instructions:</p>
                  <ol className="text-blue-700 text-xs mt-1 list-decimal list-inside space-y-1">
                    <li>Fill in your name, email, and 10-digit mobile number</li>
                    <li>Click "Send OTP" to receive verification code</li>
                    <li>Enter the 6-digit OTP received on your mobile</li>
                    <li>Complete payment and confirm appointment</li>
                  </ol>
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <p className="text-blue-800 text-xs font-medium">⏰ Business Hours:</p>
                    <p className="text-blue-700 text-xs">Monday to Friday, 2:00 PM - 5:00 PM (30-min slots)</p>
                  </div>
                </div>
                
                {/* Success/Error Message Display */}
                {successMessage && (
                  <div className={`p-3 rounded-md text-sm ${
                    successMessage.includes('successfully') || successMessage.includes('Verified') 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {successMessage}
                  </div>
                )}
                




                {/* Step 1: Mobile Number Input (Before OTP) */}
                {!otpSent && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Step 1: Enter Mobile Number</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
                        required
                      />
                      {mobileNumber && !/^\d{10}$/.test(mobileNumber) && (
                        <p className="text-red-500 text-xs">Please enter a valid 10-digit mobile number without country code.</p>
                      )}
                      {mobileNumber && /^\d{10}$/.test(mobileNumber) && (
                        <p className="text-green-500 text-xs">✓ Will be sent as +91{mobileNumber}</p>
                      )}
                    </div>

                    <Button
                      onClick={sendOtp}
                      disabled={isButtonDisabled || !mobileNumber || !/^\d{10}$/.test(mobileNumber)}
                      className="w-full"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending OTP...
                        </div>
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </div>
                )}

                {/* Step 2: OTP Verification */}
                {otpSent && !isVerified && (
                  <div className="space-y-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Step 2: Verify OTP</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter 6-digit OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        required
                      />
                      {otp && otp.length !== 6 && (
                        <p className="text-red-500 text-xs">OTP must be 6 digits.</p>
                      )}
                    </div>

                    <Button
                      onClick={verifyOtp}
                      disabled={isButtonDisabled || otp.length !== 6}
                      className="w-full mb-3"
                    >
                      Verify OTP
                    </Button>

                    <Button
                      onClick={sendOtp}
                      disabled={resendCountdown > 0}
                      variant="outline"
                      className="w-full"
                    >
                      {resendCountdown > 0 
                        ? `Resend OTP in ${resendCountdown}s` 
                        : "Resend OTP"
                      }
                    </Button>
                  </div>
                )}

                {/* Step 3: Booking Form + Payment (After OTP Verification) */}
                {showBookingForm && (
                  <>
                    {/* Booking Form Fields */}
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Step 3: Complete Your Details</h3>
                      
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
                        {email && !/\S+@\S+\.\S+/.test(email) && (
                          <p className="text-red-500 text-xs">Please enter a valid email address.</p>
                        )}
                      </div>

                      {/* Mobile Number Display (Read-only, already verified) */}
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number (Verified)</Label>
                        <Input
                          id="mobile"
                          type="text"
                          value={verifiedMobileNumber ? `+91${verifiedMobileNumber}` : (mobileNumber ? `+91${mobileNumber}` : 'Mobile number not available')}
                          disabled
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-green-500 text-xs">✓ Mobile number verified via OTP</p>
                        {!verifiedMobileNumber && !mobileNumber && (
                          <p className="text-red-500 text-xs">⚠️ Mobile number is missing. Please refresh and try again.</p>
                        )}
                        

                      </div>
                    </div>

                    {/* Payment Section */}
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Step 4: Complete Payment</h3>
                      
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
                        {upiTransactionId && !transactionIdValid && (
                          <p className="text-red-500 text-xs">UPI Transaction ID must be 12 digits.</p>
                        )}
                      </div>
                    </div>

                    {/* Confirm Appointment Button */}
                    <Button
                      onClick={sendAppointmentConfirmation}
                      disabled={isButtonDisabled || !transactionIdValid || !selectedDate || !selectedTime || !name || !email || isLoading}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Confirming Appointment...
                        </div>
                      ) : (
                        "Confirm Appointment"
                      )}
                    </Button>
                    
                    {/* Help Text */}
                    {(!name || !email || !transactionIdValid) && (
                      <p className="text-blue-600 text-xs text-center mt-2">
                        Please fill in all required fields to confirm your appointment
                      </p>
                    )}

                    {successMessage && (
                      <p className="text-green-500 text-center font-semibold text-lg">{successMessage}</p>
                    )}
                    
                    {/* Thank You Message */}
                    {appointmentConfirmed && (
                      <div className="text-center space-y-4 p-6 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-6xl">🎉</div>
                        <h3 className="text-2xl font-bold text-green-800">Thank You!</h3>
                        <p className="text-green-700">
                          Your appointment has been successfully confirmed. We've sent you a confirmation email with all the details.
                        </p>
                        <div className="text-sm text-green-600">
                          <p>• Confirmation email sent to: {email}</p>
                          <p>• Admin notification sent to: bcgcmindia@gmail.com</p>
                          <p>• Copy of user email sent to: bcgcmindia@gmail.com</p>
                          <p>• SMS notifications sent to admin and user</p>
                        </div>
                        <p className="text-green-600 text-sm">
                          This modal will close automatically in a few seconds...
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Close Modal Button */}
                <Button
                  onClick={toggleMenuModal}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10"
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
