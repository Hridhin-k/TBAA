"use client";

import { ExperiencePicker } from "@/components/application/ExperiencePicker";
import { submitRegistration } from "@/lib/api/registration";
import {
  getJourneyProgress,
  getJourneyStepIndex,
  journeySteps,
} from "@/lib/data/application-journey";
import {
  applicationStepIds,
  applicationStepValidators,
  experienceOptions,
  registrationSchema,
  type ApplicationStepId,
  type RegistrationSchema,
} from "@/lib/validation/registration";
import { omit, cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";
import { FloatingField } from "@/components/ui/FloatingField";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Label } from "@/components/ui/shadcn/label";
import { Progress } from "@/components/ui/shadcn/progress";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Pencil,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormStatus = "idle" | "loading" | "success" | "error";

const easeOut = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 48 : -48,
    opacity: 0,
  }),
};

const defaultValues: RegistrationSchema = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  city: "",
  profession: "",
  experience: "",
  motivation: "",
  portfolioLink: "",
  instagram: "",
  linkedin: "",
  website: "",
  agreement: false,
};

export function ApplicationJourney() {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState<ApplicationStepId>("intro");
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [submittedName, setSubmittedName] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    watch,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onTouched",
  });

  const values = watch();
  const stepMeta = journeySteps.find((s) => s.id === step)!;
  const stepIndex = getJourneyStepIndex(step);
  const progress = getJourneyProgress(step);

  const focusFirstField = useCallback(() => {
    requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not([aria-hidden="true"]), textarea, button[role="radio"]'
      );
      focusable?.focus();
    });
  }, []);

  useEffect(() => {
    if (step !== "intro" && step !== "review" && status !== "success") {
      focusFirstField();
    }
  }, [step, status, focusFirstField]);

  const goToStep = (target: ApplicationStepId, dir: number) => {
    setDirection(dir);
    setStep(target);
    setErrorMessage("");
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    if (step === "intro") return true;

    const validator = applicationStepValidators[step as keyof typeof applicationStepValidators];
    if (!validator) return true;

    const fields = Object.keys(validator.shape) as (keyof RegistrationSchema)[];
    const valid = await trigger(fields);
    return valid;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (!valid) return;

    const currentIndex = applicationStepIds.indexOf(step);
    if (currentIndex < applicationStepIds.length - 1) {
      goToStep(applicationStepIds[currentIndex + 1], 1);
    }
  };

  const handleBack = () => {
    const currentIndex = applicationStepIds.indexOf(step);
    if (currentIndex > 0) {
      goToStep(applicationStepIds[currentIndex - 1], -1);
    }
  };

  const handleSubmit = async () => {
    const data = getValues();
    if (data.website) return;
    if (status === "loading") return;

    const valid = await trigger();
    if (!valid) return;

    const nextCount = submitCount + 1;
    setSubmitCount(nextCount);
    if (nextCount > 3) {
      setStatus("error");
      setErrorMessage("Too many attempts. Please try again later.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const registrationData = omit(data, ["website"]);
      await submitRegistration({
        ...registrationData,
        portfolioLink: registrationData.portfolioLink || undefined,
      });
      setSubmittedName(data.fullName);
      setStatus("success");
      reset(defaultValues);
      setStep("intro");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const experienceLabel =
    experienceOptions.find((o) => o.value === values.experience)?.label ?? values.experience;

  const reviewItems: { label: string; value: string; editStep: ApplicationStepId }[] = [
    { label: "Name", value: values.fullName, editStep: "identity" },
    { label: "Email", value: values.email, editStep: "contact" },
    { label: "Phone", value: values.phone, editStep: "contact" },
    { label: "City", value: values.city, editStep: "background" },
    { label: "Age", value: values.age, editStep: "background" },
    { label: "Profession", value: values.profession, editStep: "background" },
    { label: "Experience", value: experienceLabel, editStep: "experience" },
    {
      label: "Motivation",
      value: values.motivation.length > 120 ? `${values.motivation.slice(0, 120)}…` : values.motivation,
      editStep: "story",
    },
    ...(values.portfolioLink
      ? [{ label: "Portfolio", value: values.portfolioLink, editStep: "work" as ApplicationStepId }]
      : []),
    { label: "Instagram", value: values.instagram, editStep: "work" },
    { label: "LinkedIn", value: values.linkedin, editStep: "work" },
  ];

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

  if (status === "success") {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-mist-dark bg-white p-6 text-center md:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="relative mx-auto mb-6 inline-flex items-center justify-center w-16 h-16">
          {!reducedMotion && (
            <motion.span
              className="absolute inset-0 rounded-full border border-accent/40"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <motion.span
            className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent"
            initial={reducedMotion ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            <motion.span
              initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.18, duration: 0.4, ease: easeOut }}
            >
              <Check className="w-9 h-9 text-white" aria-hidden="true" />
            </motion.span>
          </motion.span>
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Your seat is reserved.
        </h3>
        <p className="text-stone leading-relaxed max-w-md mx-auto mb-3">
          Thank you, {submittedName || "applicant"}. We&apos;ve received your
          application and will be in touch within two weeks.
        </p>
        <p className="text-sm text-stone-light mb-8">
          Selected candidates will be invited for a conversation with our team.
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            setStatus("idle");
            setSubmitCount(0);
            setStep("intro");
          }}
        >
          Start a new application
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-mist-dark bg-white">
      {/* Progress header */}
      {step !== "intro" && (
        <div className="px-5 md:px-8 pt-5 pb-4 border-b border-mist-dark">
          <div className="flex items-center justify-between gap-4 mb-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-stone">
              Step {stepIndex} of {journeySteps.length - 1}
              <span className="mx-2 text-mist-dark" aria-hidden="true">
                ·
              </span>
              {stepMeta.phase}
            </p>
            <span className="text-xs text-stone-light tabular-nums">{progress}%</span>
          </div>
          <Progress value={progress} className="h-px" aria-label="Application progress" />
        </div>
      )}

      <div ref={panelRef} className="px-5 md:px-8 py-6 md:py-8 flex flex-col">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 h-0 w-0 pointer-events-none"
          aria-hidden="true"
          {...register("website")}
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={reducedMotion ? undefined : slideVariants}
            initial={reducedMotion ? false : "enter"}
            animate="center"
            exit={reducedMotion ? undefined : "exit"}
            transition={transition}
            className="flex-1 flex flex-col"
          >
            <div className={cn("mb-4", step === "intro" && "mb-7 md:mb-9")}>
              {step === "intro" && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-accent shrink-0" aria-hidden="true" />
                  <p className="text-[11px] uppercase tracking-[0.28em] text-accent font-medium">
                    Application
                  </p>
                </div>
              )}
              <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-balance">
                {stepMeta.title}
              </h3>
              {stepMeta.subtitle && (
                <p
                  className={cn(
                    "text-sm md:text-base text-stone leading-relaxed",
                    step === "intro" ? "mt-4 max-w-xl" : "mt-2 max-w-3xl"
                  )}
                >
                  {stepMeta.subtitle}
                </p>
              )}
            </div>

            <div className="flex-1 w-full">
              {step === "intro" && (
                <div>
                  <ul
                    className="grid gap-x-8 gap-y-6 border-t border-mist-dark pt-7 sm:grid-cols-3"
                    role="list"
                  >
                    {[
                      "Seven short steps — about five minutes",
                      "One question at a time, no long forms",
                      "Review everything before you send",
                    ].map((item, i) => (
                      <li key={item} className="flex flex-col gap-2">
                        <span className="font-display text-sm font-medium text-accent tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-stone leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-mist-dark pt-7">
                    <Button
                      variant="primary"
                      size="md"
                      magnetic
                      onClick={() => goToStep("identity", 1)}
                      className="gap-2 w-full sm:w-auto"
                    >
                      Begin application
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              )}

              {step === "identity" && (
                <FloatingField
                  id="fullName"
                  label="Full name"
                  error={errors.fullName?.message}
                  large
                >
                  <Input
                    id="fullName"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={!!errors.fullName}
                    className="text-lg md:text-xl font-display font-medium tracking-tight h-auto py-2.5"
                    {...register("fullName")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleNext();
                      }
                    }}
                  />
                </FloatingField>
              )}

              {step === "contact" && (
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  <FloatingField id="email" label="Email" error={errors.email?.message} large>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      aria-invalid={!!errors.email}
                      className="text-lg md:text-xl font-display font-medium tracking-tight h-auto py-2.5"
                      {...register("email")}
                    />
                  </FloatingField>
                  <FloatingField id="phone" label="Phone" error={errors.phone?.message} large>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number"
                      aria-invalid={!!errors.phone}
                      className="text-lg md:text-xl font-display font-medium tracking-tight h-auto py-2.5"
                      {...register("phone")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void handleNext();
                        }
                      }}
                    />
                  </FloatingField>
                </div>
              )}

              {step === "background" && (
                <div className="space-y-5">
                  <FloatingField id="city" label="City" error={errors.city?.message} large>
                    <Input
                      id="city"
                      autoComplete="address-level2"
                      placeholder="City"
                      aria-invalid={!!errors.city}
                      className="text-lg md:text-xl font-display font-medium tracking-tight h-auto py-2.5"
                      {...register("city")}
                    />
                  </FloatingField>
                  <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                    <FloatingField id="age" label="Age" error={errors.age?.message} large>
                      <Input
                        id="age"
                        type="number"
                        min={18}
                        max={65}
                        placeholder="Age"
                        aria-invalid={!!errors.age}
                        className="text-lg md:text-xl font-display font-medium tracking-tight h-auto py-2.5"
                        {...register("age")}
                      />
                    </FloatingField>
                    <FloatingField
                      id="profession"
                      label="Profession"
                      error={errors.profession?.message}
                      large
                    >
                      <Input
                        id="profession"
                        placeholder="Current profession"
                        aria-invalid={!!errors.profession}
                        className="text-lg md:text-xl font-display font-medium tracking-tight h-auto py-2.5"
                        {...register("profession")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            void handleNext();
                          }
                        }}
                      />
                    </FloatingField>
                  </div>
                </div>
              )}

              {step === "experience" && (
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <ExperiencePicker
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.experience?.message}
                    />
                  )}
                />
              )}

              {step === "story" && (
                <Controller
                  name="motivation"
                  control={control}
                  render={({ field }) => {
                    const length = (field.value ?? "").length;
                    const metMinimum = length >= 50;
                    return (
                      <FloatingField
                        id="motivation"
                        label="Your motivation"
                        error={errors.motivation?.message}
                        hint={
                          metMinimum
                            ? "Great — keep going if you'd like."
                            : `${50 - length} more characters to continue`
                        }
                      >
                        <Textarea
                          id="motivation"
                          placeholder="Tell us about your creative journey, what you've tried, and what you're hoping to build..."
                          aria-invalid={!!errors.motivation}
                          className="min-h-[120px] md:min-h-[140px] text-base"
                          {...field}
                        />
                        <p className="text-xs text-muted-foreground tabular-nums text-right mt-2">
                          {length} / 1000
                        </p>
                      </FloatingField>
                    );
                  }}
                />
              )}

              {step === "work" && (
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  <FloatingField
                    id="portfolioLink"
                    label="Portfolio link (optional)"
                    error={errors.portfolioLink?.message}
                    className="md:col-span-2"
                  >
                    <Input
                      id="portfolioLink"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      aria-invalid={!!errors.portfolioLink}
                      {...register("portfolioLink")}
                    />
                  </FloatingField>
                  <FloatingField
                    id="instagram"
                    label="Instagram"
                    error={errors.instagram?.message}
                  >
                    <Input
                      id="instagram"
                      placeholder="Instagram @handle"
                      aria-invalid={!!errors.instagram}
                      {...register("instagram")}
                    />
                  </FloatingField>
                  <FloatingField id="linkedin" label="LinkedIn" error={errors.linkedin?.message}>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="LinkedIn profile URL"
                      aria-invalid={!!errors.linkedin}
                      {...register("linkedin")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void handleNext();
                        }
                      }}
                    />
                  </FloatingField>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-5">
                  <ul className="grid sm:grid-cols-2 gap-x-8 border-t border-mist-dark" role="list">
                    {reviewItems.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-start justify-between gap-3 py-3 border-b border-mist-dark group"
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-1">
                            {item.label}
                          </p>
                          <p className="text-ink leading-relaxed break-words">{item.value || "—"}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => goToStep(item.editStep, -1)}
                          className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-stone hover:text-ink transition-colors shrink-0 pt-1"
                          aria-label={`Edit ${item.label}`}
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>

                  <Controller
                    name="agreement"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="agreement"
                            checked={field.value === true}
                            onCheckedChange={(checked) => field.onChange(checked === true)}
                            aria-invalid={!!errors.agreement}
                          />
                          <Label
                            htmlFor="agreement"
                            className="text-sm text-muted-foreground leading-relaxed font-normal cursor-pointer"
                          >
                            I agree to be contacted by The Better Academy regarding my
                            application, and I understand that submitting does not guarantee
                            admission. I have read the{" "}
                            <a
                              href="/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-ink underline underline-offset-2 hover:text-accent"
                            >
                              Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a
                              href="/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-ink underline underline-offset-2 hover:text-accent"
                            >
                              Terms &amp; Conditions
                            </a>
                            .
                          </Label>
                        </div>
                        {errors.agreement?.message && (
                          <p className="text-sm text-destructive" role="alert">
                            {errors.agreement.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}
            </div>

            {status === "error" && errorMessage && (
              <div
                className="flex items-start gap-3 p-4 mt-8 border border-red-200 bg-red-50 text-red-800"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Navigation */}
            {step !== "intro" && (
              <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-mist-dark">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-stone hover:text-ink transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Back
                </button>

                {step !== "review" ? (
                  <Button
                    variant="primary"
                    size="md"
                    magnetic
                    onClick={() => void handleNext()}
                    className="ml-auto gap-2"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    magnetic
                    disabled={status === "loading"}
                    onClick={() => void handleSubmit()}
                    className="ml-auto min-w-[180px]"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Sending...
                      </span>
                    ) : (
                      "Submit application"
                    )}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
