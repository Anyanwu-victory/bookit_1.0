<template>
    <div>
        <!-- Booking Information Modal -->
        <BaseModal v-model="showBookingModal" :dismissible="true" size="lg" :scrollable="false">
            <div class="space-y-3 sm:space-y-4">
                <h2 class="text-base sm:text-lg font-semibold text-gray-900">Booking Information</h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <!-- Name -->
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input v-model="bookingForm.name" type="text" placeholder="Enter full name"
                            class="w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm" />
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input v-model="bookingForm.phone" type="tel" placeholder="Enter phone number"
                            class="w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm" />
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="bookingForm.email" type="email" placeholder="Enter email address"
                            class="w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm" />
                    </div>

                    <!-- Identification Upload -->
                    <div>
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Identification</label>
                        <input type="file" @change="handleFileUpload" accept=".pdf,.jpg,.jpeg,.png"
                            class="w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm file:mr-2 sm:file:mr-3 file:py-1 file:px-2 sm:file:px-3 file:border-0 file:text-xs sm:file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
                    </div>

                    <!-- Check-in Date -->
                    <div class="min-w-0">
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                        <input v-model="bookingForm.checkInDate" type="date"
                            class="modal-date-input w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>

                    <!-- Checkout Date -->
                    <div class="min-w-0">
                        <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                        <input v-model="bookingForm.checkOutDate" type="date"
                            class="modal-date-input w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                </div>

                <!-- Special Requests -->
                <div>
                    <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                    <textarea v-model="bookingForm.specialRequests" placeholder="Any special requests..." rows="3"
                        class="w-full px-2.5 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm resize-none"></textarea>
                </div>

                <!-- Submit Button -->
                <button @click="submitBookingForm" :disabled="isSubmitting"
                    class="w-full px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <svg v-if="isSubmitting" class="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isSubmitting ? 'Verifying ID...' : 'Submit' }}
                </button>
            </div>
        </BaseModal>

        <!-- Verification Code Modal -->
        <BaseModal v-model="showVerificationModal" :dismissible="true">
            <div class="space-y-4 sm:space-y-6 text-center py-2">
                <!-- Icon -->
                <div class="flex justify-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-1">Enter Verification Code</h2>
                    <p class="text-xs sm:text-sm text-gray-500">We sent a 4-digit code to <span class="text-blue-600 font-medium break-all">{{ bookingForm.email }}</span></p>
                </div>

                <!-- Code Input -->
                <div class="flex justify-center gap-2 sm:gap-3">
                    <input v-for="(digit, index) in verificationCode" :key="index" v-model="verificationCode[index]"
                        @input="handleCodeInput(index, $event)" @keydown="handleCodeKeydown(index, $event)" type="text"
                        maxlength="1"
                        class="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
                </div>

                <!-- Resend Code -->
                <div class="text-xs sm:text-sm">
                    <span class="text-gray-500">Didn't receive the code? </span>
                    <button @click="resendCode" class="text-blue-600 hover:text-blue-700 font-medium">
                        Resend
                    </button>
                </div>
            </div>
        </BaseModal>

        <!-- Confirmation Modal -->
        <BaseModal v-model="showConfirmationModal" :dismissible="!isProcessing">
            <div v-if="!isProcessing" class="space-y-4 sm:space-y-6 text-center py-2">
                <!-- Success Icon -->
                <div class="flex justify-center">
                    <div class="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-1">Booking Confirmed!</h2>
                    <p class="text-xs sm:text-sm text-gray-500">Your reservation has been successfully verified.</p>
                </div>

                <!-- Access Code (shown when CONFIRMED) -->
                <div v-if="accessCode" class="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <p class="text-[10px] sm:text-xs text-green-600 uppercase tracking-wide font-medium mb-1">Your Access Code</p>
                    <p class="font-mono text-xl sm:text-2xl font-bold text-green-700">{{ accessCode }}</p>
                    <p class="text-[10px] sm:text-xs text-green-600 mt-2">Use this code for check-in</p>
                </div>

                <!-- Booking Summary -->
                <div class="bg-gray-50 rounded-lg p-3 sm:p-4 text-left space-y-2">
                    <div class="flex justify-between text-xs sm:text-sm">
                        <span class="text-gray-500">Room</span>
                        <span class="font-medium text-gray-900">{{ selectedRoom?.type }}</span>
                    </div>
                    <div class="flex justify-between text-xs sm:text-sm">
                        <span class="text-gray-500">Check-in</span>
                        <span class="font-medium text-gray-900">{{ bookingForm.checkInDate }}</span>
                    </div>
                    <div class="flex justify-between text-xs sm:text-sm">
                        <span class="text-gray-500">Check-out</span>
                        <span class="font-medium text-gray-900">{{ bookingForm.checkOutDate }}</span>
                    </div>
                    <div class="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                        <span class="text-gray-700 font-medium text-xs sm:text-sm">Total</span>
                        <span class="font-bold text-blue-600 text-sm sm:text-base">₦{{ selectedRoom?.price?.toLocaleString() }}</span>
                    </div>
                </div>

                <!-- Proceed to Payment Button -->
                <button @click="proceedToPayment"
                    class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors text-xs sm:text-sm flex items-center justify-center gap-2">
                    <span>Proceed to Payment</span>
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>

            <!-- Processing State -->
            <div v-else class="py-6 sm:py-8">
                <BaseLoader />
                <p class="text-center text-xs sm:text-sm text-gray-500 mt-4">Processing your payment...</p>
            </div>
        </BaseModal>

        <!-- Payment Summary Modal -->
        <BaseModal v-model="showPaymentSummaryModal" :dismissible="true" size="lg">
            <div class="space-y-4 sm:space-y-6">
                <!-- Header -->
                <div class="flex items-center justify-between">
                    <button @click="goBackToBooking" class="flex items-center gap-1.5 sm:gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span class="text-xs sm:text-sm font-medium">Back</span>
                    </button>
                    <h2 class="text-base sm:text-lg font-bold text-gray-900">Payment</h2>
                    <div class="w-12 sm:w-16"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <!-- Booking Details Card -->
                    <div class="space-y-3 sm:space-y-4">
                        <!-- Room Image -->
                        <div class="rounded-xl overflow-hidden">
                            <img
                                :src="selectedRoom?.image || '/images/room-placeholder.jpg'"
                                :alt="selectedRoom?.type"
                                class="w-full h-32 sm:h-40 object-cover"
                            />
                        </div>

                        <div class="space-y-2 sm:space-y-3">
                            <div>
                                <h3 class="font-semibold text-gray-900 text-sm sm:text-base">{{ selectedRoom?.type }}</h3>
                                <p class="text-[10px] sm:text-xs text-gray-500">Room {{ selectedRoom?.code }}</p>
                            </div>
                        </div>

                        <!-- Guest Info -->
                        <div class="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-1">
                            <p class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide font-medium">Guest</p>
                            <p class="font-medium text-gray-900 text-sm sm:text-base">{{ bookingForm.name }}</p>
                            <p class="text-xs sm:text-sm text-gray-500 break-all">{{ bookingForm.email }}</p>
                        </div>
                    </div>

                    <!-- Payment Summary -->
                    <div class="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 space-y-3 sm:space-y-4">
                        <h3 class="text-sm sm:text-base font-bold text-gray-900">Order Summary</h3>

                        <div class="space-y-2 sm:space-y-3">
                            <div class="flex justify-between text-xs sm:text-sm">
                                <span class="text-gray-500">{{ selectedRoom?.type }} (1 room)</span>
                                <span class="font-medium text-gray-900">₦{{ selectedRoom?.price?.toLocaleString() }}</span>
                            </div>
                            <div class="flex justify-between text-xs sm:text-sm">
                                <span class="text-gray-500">Check-in</span>
                                <span class="font-medium text-gray-900">{{ bookingForm.checkInDate }}</span>
                            </div>
                            <div class="flex justify-between text-xs sm:text-sm">
                                <span class="text-gray-500">Check-out</span>
                                <span class="font-medium text-gray-900">{{ bookingForm.checkOutDate }}</span>
                            </div>
                        </div>

                        <div class="border-t border-gray-200 pt-2 sm:pt-3">
                            <div class="flex justify-between">
                                <span class="text-gray-900 font-medium text-sm sm:text-base">Total</span>
                                <span class="text-base sm:text-lg font-bold text-blue-600">₦{{ selectedRoom?.price?.toLocaleString() }}</span>
                            </div>
                        </div>

                        <!-- Payment Button -->
                        <button @click="initiatePayment" :disabled="isPaymentProcessing"
                            class="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isPaymentProcessing ? 'Processing...' : `Pay ₦${selectedRoom?.price?.toLocaleString()}` }}
                        </button>

                        <!-- Security Notice -->
                        <div class="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Secured by Paystack</span>
                        </div>
                    </div>
                </div>
            </div>
        </BaseModal>

        <!-- ID Verification Success Modal -->
        <BaseModal v-model="showIdVerificationModal" :dismissible="false">
            <div class="space-y-5 py-2">
                <!-- Header with Bookit Logo -->
                <div class="flex flex-col items-center">
                    <!-- Bookit Logo -->
                    <div class="w-12 h-12 mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <img src="@/assets/icons/logo.svg" alt="Bookit" class="w-8 h-8" />
                    </div>
                    <h2 class="text-lg font-bold text-gray-900">Identity verification Successful</h2>
                    <!-- Green Verification Check -->
                    <div class="w-10 h-10 mt-3 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <!-- Verification Data Cards -->
                <div class="space-y-3">
                    <!-- Full Name -->
                    <div class="bg-white border border-gray-200 rounded-xl p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-gray-400">Full Name</p>
                                <p class="text-sm font-semibold text-gray-900">{{ idVerificationData.fullName || bookingForm.name || 'N/A' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- ID Number -->
                    <div class="bg-white border border-gray-200 rounded-xl p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-gray-400">ID Number</p>
                                <p class="text-sm font-semibold text-gray-900">{{ formatIdField(idVerificationData.idNumber, true) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Date of Birth -->
                    <div class="bg-white border border-gray-200 rounded-xl p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-gray-400">Date of Birth</p>
                                <p class="text-sm font-semibold text-gray-900">{{ formatIdField(idVerificationData.dateOfBirth) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Gender -->
                    <div class="bg-white border border-gray-200 rounded-xl p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-gray-400">Gender</p>
                                <p class="text-sm font-semibold text-gray-900">{{ formatGender(idVerificationData.gender) }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Verified Address -->
                    <div class="bg-white border border-gray-200 rounded-xl p-4">
                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-xs text-gray-400">Verified Address</p>
                                <p class="text-sm font-semibold text-gray-900">{{ formatIdField(idVerificationData.address) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Proceed to Payment Button -->
                <button @click="proceedFromVerification"
                    class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors text-sm">
                    Proceed to Payment
                </button>
            </div>
        </BaseModal>

        <!-- ID Flagged Modal -->
        <BaseModal v-model="showIdFlaggedModal" :dismissible="true">
            <div class="space-y-6 text-center py-2">
                <!-- Warning Icon -->
                <div class="flex justify-center">
                    <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-1">ID Verification Issue</h2>
                    <p class="text-sm text-gray-500">We found some issues with your ID document that need to be resolved.</p>
                </div>

                <!-- Issues List -->
                <div v-if="idFlaggedIssues.length > 0" class="bg-yellow-50 rounded-lg p-4 text-left">
                    <p class="text-sm font-medium text-yellow-800 mb-2">Issues detected:</p>
                    <ul class="space-y-2">
                        <li v-for="(issue, index) in idFlaggedIssues" :key="index" class="flex items-start gap-2 text-sm text-yellow-700">
                            <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <span>{{ issue }}</span>
                        </li>
                    </ul>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                    <button @click="retryWithNewId"
                        class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                        Upload New ID
                    </button>
                    <button @click="closeIdFlaggedModal"
                        class="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </BaseModal>

        <!-- Pending Approval Modal -->
        <BaseModal v-model="showPendingApprovalModal" :dismissible="true">
            <div class="space-y-6 text-center py-2">
                <!-- Clock Icon -->
                <div class="flex justify-center">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-1">Booking Under Review</h2>
                    <p class="text-sm text-gray-500">Your booking requires additional verification by our staff.</p>
                </div>

                <!-- Info Box -->
                <div class="bg-blue-50 rounded-lg p-4 text-left space-y-2">
                    <div class="flex items-center gap-2 text-blue-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm font-medium">What happens next?</span>
                    </div>
                    <ul class="space-y-1 text-sm text-blue-600 ml-7">
                        <li>Our team will review your booking within 24 hours</li>
                        <li>You'll receive an email at <span class="font-medium">{{ bookingForm.email }}</span></li>
                        <li>Once approved, you'll get your access code</li>
                    </ul>
                </div>

                <!-- Booking Reference -->
                <div v-if="bookingResponse?.bookingId || bookingResponse?.booking?._id" class="bg-gray-50 rounded-lg p-4">
                    <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Booking Reference</p>
                    <p class="font-mono font-bold text-gray-900">{{ bookingResponse?.bookingId || bookingResponse?.booking?._id }}</p>
                </div>

                <!-- Close Button -->
                <button @click="closePendingApprovalModal"
                    class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                    Got it
                </button>
            </div>
        </BaseModal>

        <!-- Error Modal -->
        <BaseModal v-model="showErrorModal" :dismissible="true">
            <div class="space-y-6 text-center py-2">
                <!-- Error Icon -->
                <div class="flex justify-center">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-1">{{ errorTitle }}</h2>
                    <p class="text-sm text-gray-500">{{ errorMessage }}</p>
                </div>

                <!-- Close Button -->
                <button @click="closeErrorModal"
                    class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm">
                    Close
                </button>
            </div>
        </BaseModal>

        <!-- Success Modal (for payment and other success messages) -->
        <BaseModal v-model="showSuccessModal" :dismissible="true">
            <div class="space-y-6 text-center py-2">
                <!-- Success Icon -->
                <div class="flex justify-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-1">{{ successTitle }}</h2>
                    <p class="text-sm text-gray-500">{{ successMessage }}</p>
                </div>

                <!-- Close Button -->
                <button @click="closeSuccessModal"
                    class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm">
                    Done
                </button>
            </div>
        </BaseModal>

        <!-- Payment Success Modal -->
        <BaseModal v-model="showPaymentSuccessModal" :dismissible="true">
            <div class="space-y-6 text-center py-2">
                <!-- Success Icon with Checkmark -->
                <div class="flex justify-center">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <!-- Thank You Message -->
                <div>
                    <h2 class="text-xl font-bold text-gray-900 mb-2">Thank You!</h2>
                    <p class="text-sm text-gray-600 leading-relaxed">
                        Your booking has been successfully completed.<br>
                        Please check your email for your <span class="font-semibold text-blue-600">Booking ID</span>.
                    </p>
                </div>

                <!-- Email Icon Hint -->
                <div class="flex items-center justify-center gap-2 text-gray-500 bg-gray-50 py-3 px-4 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="text-sm">{{ bookingForm.email }}</span>
                </div>

                <!-- Done Button -->
                <button @click="closePaymentSuccessModal"
                    class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors">
                    Done
                </button>
            </div>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import apiService from '@/services/apiService'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    room: {
        type: Object,
        default: null
    },
    checkIn: {
        type: String,
        default: ''
    },
    checkOut: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue', 'booking-complete'])

// Modal states
const showBookingModal = ref(false)
const showVerificationModal = ref(false)
const showConfirmationModal = ref(false)
const showPaymentSummaryModal = ref(false)
const showIdFlaggedModal = ref(false)
const showPendingApprovalModal = ref(false)
const showErrorModal = ref(false)
const showSuccessModal = ref(false)
const showIdVerificationModal = ref(false)
const showPaymentSuccessModal = ref(false)

const selectedRoom = ref(null)
const isProcessing = ref(false)
const isPaymentProcessing = ref(false)
const isSubmitting = ref(false)

// Booking response data
const bookingResponse = ref(null)
const idFlaggedIssues = ref([])
const accessCode = ref('')
const bookingRef = ref('')

// ID Verification data from API response
const idVerificationData = ref({
    fullName: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    photoUrl: '',
    documentType: '',
    confidence: 0
})

// Error/Success modal data
const errorTitle = ref('Error')
const errorMessage = ref('')
const successTitle = ref('Success')
const successMessage = ref('')

// Helper functions for showing modals
const showError = (title, message) => {
    errorTitle.value = title
    errorMessage.value = message
    showErrorModal.value = true
}

const showSuccess = (title, message) => {
    successTitle.value = title
    successMessage.value = message
    showSuccessModal.value = true
}

const closeErrorModal = () => {
    showErrorModal.value = false
}

const closeSuccessModal = () => {
    showSuccessModal.value = false
}

const closePaymentSuccessModal = () => {
    showPaymentSuccessModal.value = false
    resetForm()
}

// Helper functions for ID verification display
const formatIdField = (value, maskIt = false) => {
    if (!value || value === 'NOT_VISIBLE' || value === 'N/A') return 'Not Available'
    const str = String(value)
    if (maskIt && str.length > 4) {
        return '*'.repeat(str.length - 4) + str.slice(-4)
    }
    return str
}

const formatGender = (value) => {
    if (!value || value === 'NOT_VISIBLE' || value === 'N/A') return 'Not Available'
    if (value === 'M' || value.toLowerCase() === 'male') return 'Male'
    if (value === 'F' || value.toLowerCase() === 'female') return 'Female'
    return value
}

// Proceed from verification to payment
const proceedFromVerification = () => {
    showIdVerificationModal.value = false
    showPaymentSummaryModal.value = true
}

// Form data
const bookingForm = ref({
    name: '',
    phone: '',
    email: '',
    identification: null,
    checkInDate: '',
    checkOutDate: '',
    specialRequests: ''
})

const verificationCode = ref(['', '', '', ''])

// Watch for prop changes
watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        selectedRoom.value = props.room
        bookingForm.value.checkInDate = props.checkIn
        bookingForm.value.checkOutDate = props.checkOut
        showBookingModal.value = true
    }
})

watch(showBookingModal, (newVal) => {
    if (!newVal && !showVerificationModal.value && !showConfirmationModal.value && !showPaymentSummaryModal.value) {
        emit('update:modelValue', false)
    }
})

// Methods
const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        bookingForm.value.identification = file
    }
}

const submitBookingForm = async () => {
    // Validate form
    if (!bookingForm.value.name || !bookingForm.value.email || !bookingForm.value.phone) {
        showError('Missing Information', 'Please fill in all required fields (name, email, and phone).')
        return
    }

    if (!bookingForm.value.checkInDate || !bookingForm.value.checkOutDate) {
        showError('Missing Dates', 'Please select check-in and check-out dates.')
        return
    }

    if (!bookingForm.value.identification) {
        showError('ID Required', 'Please upload your ID document for verification.')
        return
    }

    // Validate file size (max 5MB)
    if (bookingForm.value.identification.size > 5 * 1024 * 1024) {
        showError('File Too Large', 'ID document must be less than 5MB. Please upload a smaller file.')
        return
    }

    isSubmitting.value = true

    try {
        // Prepare booking data for API
        const bookingData = {
            fullName: bookingForm.value.name,
            email: bookingForm.value.email,
            phone: bookingForm.value.phone,
            roomId: selectedRoom.value?._id || selectedRoom.value?.id,
            checkInDate: bookingForm.value.checkInDate,
            checkOutDate: bookingForm.value.checkOutDate,
            specialRequests: bookingForm.value.specialRequests,
            idImage: bookingForm.value.identification
        }

        const response = await apiService.createBooking(bookingData)
        bookingResponse.value = response.data

        // Handle different booking outcomes
        const status = response.data?.status || response.data?.bookingStatus

        showBookingModal.value = false

        // Log the full response for debugging
        console.log('Booking API Response:', response.data)

        // Extract ID verification data from response
        // API returns: extractedIdData with idNumber, dateOfBirth, gender, address
        const extractedData = response.data?.extractedIdData || response.data?.idVerificationData || response.data?.verification || {}
        console.log('Extracted ID Data:', extractedData)

        idVerificationData.value = {
            fullName: extractedData.fullName || extractedData.extractedName || response.data?.fullName || bookingForm.value.name,
            idNumber: extractedData.idNumber || extractedData.extractedIdNumber || extractedData.nin || '',
            dateOfBirth: extractedData.dateOfBirth || extractedData.extractedDob || extractedData.dob || '',
            gender: extractedData.gender || extractedData.extractedGender || '',
            address: extractedData.address || extractedData.extractedAddress || extractedData.verifiedAddress || '',
            photoUrl: response.data?.idImageUrl || extractedData.photoUrl || '',
            documentType: extractedData.documentType || '',
            confidence: extractedData.confidence || 0
        }

        console.log('Parsed ID Verification Data:', idVerificationData.value)

        // Store access code if available
        accessCode.value = response.data?.accessPin || response.data?.accessCode || response.data?.booking?.accessCode || ''

        // Store booking reference for Paystack
        bookingRef.value = response.data?.bookingRef || response.data?.booking?.bookingRef || response.data?.reference || response.data?.booking?.reference || ''
        console.log('Booking Reference:', bookingRef.value)

        if (status === 'CONFIRMED') {
            // Low risk + ID verified → Show verification success modal first
            showIdVerificationModal.value = true
        } else if (status === 'ID_FLAGGED') {
            // Name mismatch/tampering → Returns issues for user to fix
            idFlaggedIssues.value = response.data?.issues || response.data?.verificationIssues || []
            showIdFlaggedModal.value = true
        } else if (status === 'PENDING_APPROVAL') {
            // Medium/High risk → Requires staff review within 24h
            showPendingApprovalModal.value = true
        } else {
            // Fallback: show verification modal if we have verification data, otherwise confirmation
            if (idVerificationData.value.fullName) {
                showIdVerificationModal.value = true
            } else {
                showConfirmationModal.value = true
            }
        }

    } catch (error) {
        console.error('Booking error:', error)
        const errMsg = error.response?.data?.message || error.message || 'An error occurred while processing your booking'
        showError('Booking Failed', errMsg)
    } finally {
        isSubmitting.value = false
    }
}

const handleCodeInput = (index, event) => {
    const value = event.target.value

    if (value.length === 1) {
        if (index < 3) {
            // Move to next input
            const nextInput = event.target.nextElementSibling
            if (nextInput) nextInput.focus()
        } else {
            // Last digit entered, auto-verify
            setTimeout(() => {
                const code = verificationCode.value.join('')
                if (code.length === 4) {
                    verifyCode()
                }
            }, 100)
        }
    }
}

const handleCodeKeydown = (index, event) => {
    if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
        // Move to previous input on backspace
        const prevInput = event.target.previousElementSibling
        if (prevInput) prevInput.focus()
    }
}

const resendCode = () => {
    console.log('Resending verification code to:', bookingForm.value.email)
    verificationCode.value = ['', '', '', '']
    showSuccess('Code Sent', 'Verification code has been resent to your email.')
}

const verifyCode = () => {
    const code = verificationCode.value.join('')

    if (code.length !== 4) {
        showError('Invalid Code', 'Please enter the complete 4-digit verification code.')
        return
    }

    // Simulate verification
    console.log('Verifying code:', code)

    // Move to confirmation step
    showVerificationModal.value = false
    showConfirmationModal.value = true
}

const proceedToPayment = () => {
    // Close confirmation modal and show payment summary
    showConfirmationModal.value = false
    showPaymentSummaryModal.value = true
}

const goBackToBooking = () => {
    showPaymentSummaryModal.value = false
    // Go back to ID Verification modal instead of Confirmation modal
    showIdVerificationModal.value = true
}

const initiatePayment = () => {
    isPaymentProcessing.value = true

    // Paystack configuration
    const paystackConfig = {
        key: process.env.VUE_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxx', // Set VUE_APP_PAYSTACK_PUBLIC_KEY in .env file
        email: bookingForm.value.email,
        amount: selectedRoom.value.price * 100, // Paystack expects amount in kobo
        currency: 'NGN',
        ref: bookingRef.value || `BK-${Date.now()}`, // Use booking reference from API
        metadata: {
            custom_fields: [
                {
                    display_name: 'Customer Name',
                    variable_name: 'customer_name',
                    value: bookingForm.value.name
                },
                {
                    display_name: 'Room Type',
                    variable_name: 'room_type',
                    value: selectedRoom.value.type
                },
                {
                    display_name: 'Room Code',
                    variable_name: 'room_code',
                    value: selectedRoom.value.code
                },
                {
                    display_name: 'Check In',
                    variable_name: 'check_in',
                    value: bookingForm.value.checkInDate
                },
                {
                    display_name: 'Check Out',
                    variable_name: 'check_out',
                    value: bookingForm.value.checkOutDate
                }
            ]
        },
        onClose: () => {
            isPaymentProcessing.value = false
            console.log('Payment window closed')
        },
        callback: (response) => {
            isPaymentProcessing.value = false
            console.log('Payment successful:', response)

            // Close all modals
            showPaymentSummaryModal.value = false

            // Emit event to parent
            emit('booking-complete', {
                bookingDetails: bookingForm.value,
                room: selectedRoom.value,
                paymentReference: response.reference
            })

            // Show payment success modal (form will be reset when modal is closed)
            showPaymentSuccessModal.value = true
        }
    }

    // Initialize Paystack payment
    if (window.PaystackPop) {
        const handler = window.PaystackPop.setup(paystackConfig)
        handler.openIframe()
    } else {
        console.error('Paystack script not loaded')
        showError('Payment Unavailable', 'Payment system is not available. Please try again later.')
        isPaymentProcessing.value = false
    }
}

const resetForm = () => {
    bookingForm.value = {
        name: '',
        phone: '',
        email: '',
        identification: null,
        checkInDate: '',
        checkOutDate: '',
        specialRequests: ''
    }
    verificationCode.value = ['', '', '', '']
    selectedRoom.value = null
    bookingResponse.value = null
    idFlaggedIssues.value = []
    accessCode.value = ''
    bookingRef.value = ''
    idVerificationData.value = {
        fullName: '',
        idNumber: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        photoUrl: '',
        documentType: '',
        confidence: 0
    }
}

// ID Flagged Modal handlers
const retryWithNewId = () => {
    showIdFlaggedModal.value = false
    bookingForm.value.identification = null
    showBookingModal.value = true
}

const closeIdFlaggedModal = () => {
    showIdFlaggedModal.value = false
    emit('update:modelValue', false)
    resetForm()
}

// Pending Approval Modal handler
const closePendingApprovalModal = () => {
    showPendingApprovalModal.value = false
    emit('update:modelValue', false)
    emit('booking-complete', {
        bookingDetails: bookingForm.value,
        room: selectedRoom.value,
        status: 'PENDING_APPROVAL',
        bookingId: bookingResponse.value?.bookingId || bookingResponse.value?.booking?._id
    })
    resetForm()
}
</script>

<style scoped>
/* Modal date input styling - prevents overflow on mobile */
.modal-date-input {
    font-size: 16px !important; /* Prevents iOS zoom on focus */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    min-height: 44px;
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Mobile-specific fixes */
@media (max-width: 639px) {
    .modal-date-input {
        font-size: 16px !important;
        padding-right: 8px !important;
    }
}

.modal-date-input::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
    filter: invert(0.5);
    padding: 2px;
}

.modal-date-input::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
}

.modal-date-input::-webkit-datetime-edit {
    padding: 0;
}

.modal-date-input::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
}

.modal-date-input::-webkit-datetime-edit-text {
    padding: 0 2px;
}

.modal-date-input::-webkit-datetime-edit-month-field,
.modal-date-input::-webkit-datetime-edit-day-field,
.modal-date-input::-webkit-datetime-edit-year-field {
    padding: 0;
}

.modal-date-input:focus {
    outline: none;
}
</style>
