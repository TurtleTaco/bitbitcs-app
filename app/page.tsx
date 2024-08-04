"use client";

import * as React from "react";
import { useStyletron } from "baseui";
import { useRouter } from "next/navigation";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { StyledLink } from "baseui/link";
import { StyledDivider, SIZE } from "baseui/divider";
import GoogleSignInButton from "app/ui/GoogleSignInButton";
import { useAuth } from "app/context/AuthContext";

export default function LoginPage() {
  const [css, theme] = useStyletron();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showLoginForm, setShowLoginForm] = React.useState(false);
  const [showSignUpForm, setShowSignUpForm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  React.useEffect(() => {
    if (user && !loading) {
      router.push("/home");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null;
  }

  const isValidEmail = (email: string) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isLoginFormValid = email && password && isValidEmail(email);
  const isSignUpFormValid =
    email && password && firstName && lastName && isValidEmail(email);

  return (
    <div className="flex-1 flex items-center justify-center">
      <main className="flex flex-col items-center justify-center p-4">
        <h1
          className={css({
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "2rem",
            textAlign: "center",
          })}
        >
          Start your personalized learning experience
        </h1>

        {!showSignUpForm && (
          <>
            <div
              className={css({
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginBottom: "1rem",
              })}
            >
              <GoogleSignInButton />
            </div>

            {!showLoginForm ? (
              <Button
                onClick={() => setShowSignUpForm(true)}
                overrides={{
                  BaseButton: {
                    style: {
                      width: "100%",
                      marginBottom: "1rem",
                    },
                  },
                }}
              >
                Continue with email
              </Button>
            ) : (
              <>
                <FormControl label="Email">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    // error={email && !isValidEmail(email)}
                  />
                </FormControl>
                <FormControl label="Password">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                  />
                </FormControl>
                <Button
                  disabled={!isLoginFormValid}
                  onClick={() => {
                    /* Implement login logic */
                  }}
                  overrides={{
                    BaseButton: {
                      style: {
                        width: "100%",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      },
                    },
                  }}
                >
                  Log in
                </Button>
                <StyledLink href="#" className={css({ alignSelf: "center" })}>
                  Forgot password?
                </StyledLink>
              </>
            )}

            <div className={css({ marginTop: "1rem" })}>
              {showLoginForm ? (
                <span>
                  No account yet?{" "}
                  <StyledLink href="#" onClick={() => setShowLoginForm(false)}>
                    <strong>Sign up</strong>
                  </StyledLink>
                </span>
              ) : (
                <span>
                  Existing user?{" "}
                  <StyledLink href="#" onClick={() => setShowLoginForm(true)}>
                    <strong>Log in</strong>
                  </StyledLink>
                </span>
              )}
            </div>
          </>
        )}

        {showSignUpForm && (
          <>
            <FormControl label="Email">
              <Input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                // error={email && !isValidEmail(email)}
              />
            </FormControl>
            <FormControl label="Password">
              <Input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
              />
            </FormControl>
            <FormControl label="First Name">
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl label="Last Name">
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </FormControl>
            <Button
              disabled={!isSignUpFormValid}
              onClick={() => {
                /* Implement sign up logic */
              }}
              overrides={{
                BaseButton: {
                  style: {
                    width: "100%",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  },
                },
              }}
            >
              Sign up
            </Button>
            <span className={css({ textAlign: "center", fontSize: "12px" })}>
              By clicking sign up, I agree to BitBitCS's Terms and Privacy
              policy
            </span>
            <StyledLink
              href="#"
              onClick={() => setShowSignUpForm(false)}
              className={css({ marginTop: "1rem" })}
            >
              Back to login
            </StyledLink>
          </>
        )}
      </main>
    </div>
  );
}