// app/register/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ExpertFormData, expertSchema } from "./schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  CertificationsStep,
  EducationStep,
  ExpertiseStep,
  PersonalInfoStep,
  ReferencesStep,
  PublicationsStep,
} from "./components/steps";
import { registerExpert } from "@expo/lib/actions/actions";
import { Header } from "@expo/components/main-header";

const formSteps = [
  { id: 1, title: "Personal Information" },
  { id: 2, title: "Expertise & Skills" },
  { id: 3, title: "Education" },
  { id: 4, title: "Certifications" },
  { id: 5, title: "Publications" },
  { id: 6, title: "References" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ExpertFormData>({
    resolver: zodResolver(expertSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        bio: "",
        country: "",
        region: "",
      },
      expertise: {
        expertiseAreas: [],
        yearsExperience: 0,
        experiences: [],
        languages: [],
        skills: [],
      },
      education: [],
      certifications: [],
      publications: [],
      references: [],
    },
  });

  const { watch, trigger } = form;
  const watchedFields = watch();

  const isStepValid = async (step: number) => {
    let fieldsToValidate: string[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ["personalInfo"];
        break;
      case 2:
        fieldsToValidate = [
          "expertise.expertiseAreas",
          "expertise.yearsExperience",
          "expertise.experiences",
          "expertise.languages",
          "expertise.skills",
        ];
        break;
      case 3:
        fieldsToValidate = ["education"];
        break;
      case 4:
        fieldsToValidate = ["certifications"];
        break;
      case 5:
        fieldsToValidate = ["publications"];
        break;
      case 6:
        fieldsToValidate = ["references"];
        break;
    }

    const result = await trigger(fieldsToValidate as any);
    console.log(
      "Validation result:",
      result,
      "for fields:",
      fieldsToValidate,
      "step:",
      step
    );

    // For references step, check minimum requirement
    if (step === 6) {
      const references = form.getValues("references");
      if (references.length < 2) {
        toast.error("Please provide at least 2 references");
        return false;
      }
    }

    return result;
  };

  const handleNext = async () => {
    const isValid = await isStepValid(step);
    if (isValid) {
      setStep((s) => Math.min(s + 1, formSteps.length));
    } else {
      toast.error("Please fix the errors before continuing");
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  async function onSubmit(data: ExpertFormData) {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Validate all fields one last time
      const isValid = await form.trigger();
      if (!isValid) {
        setSubmitError("Please fix all validation errors before submitting");
        return;
      }

      // Check minimum requirements
      if (data.references.length < 2) {
        setSubmitError("Please provide at least 2 references");
        return;
      }

      const result = await registerExpert(data);
      
      if (!result) {
        setSubmitError("Registration failed: No response from server");
        return;
      }

      if (result.success) {
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => {
          router.push("/resources/experts");
        }, 1500);
      } else {
        setSubmitError(result.error || "An unknown error occurred");      
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        "Registration failed: " + 
        (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto py-12 px-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Expert Registration</h1>

            {/* Progress Bar */}
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
                <div
                  className="transition-all duration-500 ease-out bg-blue-600"
                  style={{ width: `${(step / formSteps.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between">
                {formSteps.map((formStep) => (
                  <div
                    key={formStep.id}
                    className={`text-sm ${
                      step >= formStep.id ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {formStep.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            noValidate
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step content based on current step */}
                {step === 1 && <PersonalInfoStep form={form} />}
                {step === 2 && <ExpertiseStep form={form} />}
                {step === 3 && <EducationStep form={form} />}
                {step === 4 && <CertificationsStep form={form} />}
                {step === 5 && <PublicationsStep form={form} />}
                {step === 6 && <ReferencesStep form={form} />}
              </motion.div>
            </AnimatePresence>

            {/* Error Display */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-md bg-red-50 p-4 mt-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Registration Error
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        {submitError}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Previous
              </button>

              {step < formSteps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => console.log("Submit button clicked")}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
