import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";

const RegistrationForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setIsFormValid(isFullNameValid && isEmailValid && isPasswordValid);
  }, [isFullNameValid, isEmailValid, isPasswordValid]);

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z ]*$/.test(value) || value === "") {
      setFullName(value);
      setIsFullNameValid(true);
    } else {
      setIsFullNameValid(false);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (/^\S+@\S+\.\S+$/.test(value) || value === "") {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    if (value.length >= 10 && hasLowerCase && hasDigit && hasSpecialChar) {
      setPasswordStrength("strong");
      setIsPasswordValid(true);
    } else if (
      value.length >= 6 &&
      (hasLowerCase || hasDigit || hasSpecialChar)
    ) {
      setPasswordStrength("moderate");
      setIsPasswordValid(true);
    } else {
      setPasswordStrength("weak");
      setIsPasswordValid(false);
    }
  };

  const handleRegister = () => {
    if (isFullNameValid && isEmailValid && isPasswordValid) {
      setIsSuccessModalOpen(true);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <Box p={6} bg="gray.100" borderRadius="md" boxShadow="md">
      <FormControl mb={4} isRequired isInvalid={!isFullNameValid}>
        <FormLabel>Full Name</FormLabel>
        <Input type="text" value={fullName} onChange={handleFullNameChange} />
        <FormHelperText>
          {isFullNameValid ? null : "Invalid characters"}
        </FormHelperText>
      </FormControl>
      <FormControl mb={4} isRequired isInvalid={!isEmailValid}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={handleEmailChange} />
        <FormHelperText>
          {isEmailValid ? null : "Invalid email format"}
        </FormHelperText>
      </FormControl>
      <FormControl mb={4} isRequired isInvalid={!isPasswordValid}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormHelperText>
          {isPasswordValid
            ? "Minimum 10 characters with at least one lowercase letter, one digit, and one special character"
            : "Password requirements not met"}
        </FormHelperText>
        <Box mt={2}>
          {passwordStrength && (
            <Alert
              status={
                passwordStrength === "weak"
                  ? "error"
                  : passwordStrength === "moderate"
                  ? "warning"
                  : "success"
              }
            >
              <AlertIcon />
              {passwordStrength === "weak"
                ? "Weak"
                : passwordStrength === "moderate"
                ? "Moderate"
                : "Strong"}{" "}
              password
            </Alert>
          )}
        </Box>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handleRegister}
        isDisabled={!isFormValid}
        mt={4}
      >
        Register
      </Button>
      {isSuccessModalOpen && (
        <Box mt={4}>
          <Alert status="success">
            <AlertIcon />
            Registration successful! Welcome, {fullName}!
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={closeSuccessModal}
            />
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default RegistrationForm;

// const RegistrationForm = () => {
//     // We're setting up variables to store user input and status.
//     const [fullName, setFullName] = useState(''); // User's full name
//     const [email, setEmail] = useState(''); // User's email
//     const [password, setPassword] = useState(''); // User's password
//     const [passwordStrength, setPasswordStrength] = useState(''); // Strength of the password (weak, moderate, strong)
//     const [isFullNameValid, setIsFullNameValid] = useState(false); // Is the full name input valid?
//     const [isEmailValid, setIsEmailValid] = useState(false); // Is the email input valid?
//     const [isPasswordValid, setIsPasswordValid] = useState(false); // Is the password input valid?
//     const [isFormValid, setIsFormValid] = useState(false); // Is the entire form valid?
//     const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Should we show the success modal?

//     // We're using an effect to check if the entire form is valid whenever any input changes.
//     useEffect(() => {
//       setIsFormValid(isFullNameValid && isEmailValid && isPasswordValid);
//     }, [isFullNameValid, isEmailValid, isPasswordValid]);

//     // We're defining a function that runs when the user types in the full name input.
//     const handleFullNameChange = (event) => {
//       const value = event.target.value;
//       // If the input matches the allowed pattern (only letters and spaces) or is empty,
//       // we save the value and mark the full name as valid. Otherwise, it's not valid.
//       if (/^[a-zA-Z ]*$/.test(value) || value === '') {
//         setFullName(value);
//         setIsFullNameValid(true);
//       } else {
//         setIsFullNameValid(false);
//       }
//     };

//     // We're defining a function that runs when the user types in the email input.
//     const handleEmailChange = (event) => {
//       const value = event.target.value;
//       // If the input matches the required email pattern or is empty,
//       // we mark the email as valid. Otherwise, it's not valid.
//       if (/^\S+@\S+\.\S+$/.test(value) || value === '') {
//         setIsEmailValid(true);
//       } else {
//         setIsEmailValid(false);
//       }
//     };

//     // We're defining a function that runs when the user types in the password input.
//     const handlePasswordChange = (event) => {
//       const value = event.target.value;
//       // We're checking the strength of the password based on its length,
//       // presence of lowercase letters, digits, and special characters.
//       // Depending on the strength, we update the password strength and validity.
//       if (value.length >= 10 && /[a-z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value)) {
//         setPasswordStrength('strong');
//         setIsPasswordValid(true);
//       } else if (value.length >= 6 && (/[a-z]/.test(value) || /[0-9]/.test(value) || /[!@#$%^&*]/.test(value))) {
//         setPasswordStrength('moderate');
//         setIsPasswordValid(true);
//       } else {
//         setPasswordStrength('weak');
//         setIsPasswordValid(false);
//       }
//     };

//     // We're defining a function that runs when the user clicks the "Register" button.
//     const handleRegister = () => {
//       // If the full name, email, and password are all valid, we show the success modal.
//       if (isFullNameValid && isEmailValid && isPasswordValid) {
//         setIsSuccessModalOpen(true);
//       }
//     };

//     // We're defining a function to close the success modal.
//     const closeSuccessModal = () => {
//       setIsSuccessModalOpen(false);
//     };
