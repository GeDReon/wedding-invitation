"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { buildRsvpPayload, submitRsvp } from "@/lib/googleSheets";
import { rsvpSchema, type RsvpFormValues } from "@/lib/rsvp-schema";
import {
  hasSubmittedRsvp,
  markRsvpSubmitted,
  sanitizeString,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

function ToggleOption({
  selected,
  onClick,
  children,
  disabled,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex-1 rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-300",
        selected
          ? "border-gold-400 bg-gold-100/60 text-wedding-text shadow-soft"
          : "border-beige-200/80 bg-white/40 text-wedding-muted hover:border-gold-300 hover:bg-white/60",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      {children}
    </button>
  );
}

export function RSVP() {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      attendance: undefined,
      withPartner: undefined,
      guests: 1,
      comment: "",
    },
  });

  const attendance = watch("attendance");
  const isAttending = attendance === "yes";

  useEffect(() => {
    setAlreadySubmitted(hasSubmittedRsvp());
  }, []);

  const onSubmit = async (data: RsvpFormValues) => {
    if (alreadySubmitted || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = buildRsvpPayload(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          attendance: data.attendance,
          withPartner: isAttending ? data.withPartner : "no",
          guests: isAttending ? data.guests : 0,
          comment: isAttending ? data.comment : "",
        },
        sanitizeString
      );

      await submitRsvp(payload);

      markRsvpSubmitted();
      setAlreadySubmitted(true);
      reset();
      setShowSuccess(true);
    } catch {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-400">
            Растау
          </p>

          <h2 className="font-serif text-3xl font-light text-wedding-text sm:text-4xl">
            Тойға қатысуыңызды растауыңызды сұраймыз
          </h2>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Card>

            <CardHeader>
              <CardTitle>
                Қонақтарға арналған сауалнама
              </CardTitle>

              <CardDescription>
                2026 жылғы 15 қыркүйекке дейін толтыруыңызды сұраймыз
              </CardDescription>
            </CardHeader>


            <CardContent>

              {alreadySubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 flex items-center gap-3 rounded-2xl border border-gold-200/60 bg-gold-100/40 p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-400" />

                  <p className="text-sm text-wedding-text">
                    Сіз қатысуыңызды растадыңыз.
                  </p>
                </motion.div>
              )}


              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Аты *
                    </Label>

                    <Input
                      id="firstName"
                      placeholder="Атыңыз"
                      disabled={alreadySubmitted || isSubmitting}
                      {...register("firstName")}
                    />

                    {errors.firstName && (
                      <p className="text-xs text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>


                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Тегі *
                    </Label>

                    <Input
                      id="lastName"
                      placeholder="Тегіңіз"
                      disabled={alreadySubmitted || isSubmitting}
                      {...register("lastName")}
                    />

                    {errors.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                </div>


                <div className="space-y-2">

                  <Label htmlFor="phone">
                    Телефон{" "}
                    <span className="font-normal text-wedding-muted">
                      (міндетті емес)
                    </span>
                  </Label>

                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (777) 123-45-67"
                    disabled={alreadySubmitted || isSubmitting}
                    {...register("phone")}
                  />

                </div>



                <div className="space-y-3">

                  <Label>
                    Тойымызға келесіз бе? *
                  </Label>

                  <Controller
                    name="attendance"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-3">

                        <ToggleOption
                          selected={field.value === "yes"}
                          onClick={() => field.onChange("yes")}
                          disabled={alreadySubmitted || isSubmitting}
                        >
                          Иә
                        </ToggleOption>


                        <ToggleOption
                          selected={field.value === "no"}
                          onClick={() => field.onChange("no")}
                          disabled={alreadySubmitted || isSubmitting}
                        >
                          Жоқ
                        </ToggleOption>

                      </div>
                    )}
                  />

                </div>



                <AnimatePresence>

                  {isAttending && (

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 overflow-hidden"
                    >

                      <div className="space-y-3">

                        <Label>
                          Жұбайыңызбен бірге келесіз бе?
                        </Label>


                        <Controller
                          name="withPartner"
                          control={control}
                          render={({ field }) => (

                            <div className="flex gap-3">

                              <ToggleOption
                                selected={field.value === "yes"}
                                onClick={() => field.onChange("yes")}
                                disabled={alreadySubmitted || isSubmitting}
                              >
                                Иә
                              </ToggleOption>


                              <ToggleOption
                                selected={field.value === "no"}
                                onClick={() => field.onChange("no")}
                                disabled={alreadySubmitted || isSubmitting}
                              >
                                Жоқ
                              </ToggleOption>

                            </div>

                          )}
                        />

                      </div>



                      <div className="space-y-2">

                        <Label htmlFor="guests">
                          Қонақтар саны
                        </Label>

                        <Input
                          id="guests"
                          type="number"
                          min={1}
                          max={10}
                          disabled={alreadySubmitted || isSubmitting}
                          {...register("guests")}
                        />

                      </div>



                      <div className="space-y-2">

                        <Label htmlFor="comment">
                          Қосымша ақпарат
                        </Label>


                        <Textarea
                          id="comment"
                          placeholder="Аллергия, тілек немесе басқа ақпарат..."
                          disabled={alreadySubmitted || isSubmitting}
                          {...register("comment")}
                        />

                      </div>


                    </motion.div>

                  )}

                </AnimatePresence>



                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={alreadySubmitted || isSubmitting}
                >

                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Жіберілуде...
                    </>
                  ) : (
                    "Қатысуды растау"
                  )}

                </Button>


              </form>

            </CardContent>

          </Card>

        </motion.div>

      </div>




      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>

        <DialogContent className="text-center">

          <DialogHeader>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100"
            >
              <CheckCircle2 className="h-8 w-8 text-gold-400" />
            </motion.div>


            <DialogTitle>
              Рақмет!
            </DialogTitle>


            <DialogDescription className="text-base">

              Жауабыңыз сәтті қабылданды.

              <br />

              Сізді тойымызда асыға күтеміз ❤️

            </DialogDescription>

          </DialogHeader>


          <Button
            variant="outline"
            onClick={() => setShowSuccess(false)}
            className="mt-2 w-full"
          >
            Жабу
          </Button>


        </DialogContent>

      </Dialog>




      <Dialog open={showError} onOpenChange={setShowError}>

        <DialogContent className="text-center">

          <DialogHeader>

            <DialogTitle>
              Қате пайда болды
            </DialogTitle>


            <DialogDescription>
              Кейінірек қайталап көріңіз.
            </DialogDescription>


          </DialogHeader>


          <Button
            variant="outline"
            onClick={() => setShowError(false)}
            className="mt-2 w-full"
          >
            Жабу
          </Button>


        </DialogContent>

      </Dialog>


    </section>
  );
}